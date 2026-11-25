/* Astronomy math + celestial-sphere renderer */
(function(){
const D = Math.PI / 180, R = 180 / Math.PI;
const AS = window.AS = { D, R, EPS: 23.44 };
const sin = x => Math.sin(x * D), cos = x => Math.cos(x * D);
AS.norm = a => ((a % 360) + 360) % 360;
AS.MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const CUM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
AS.doyLabel = n => { n = Math.round(n); let m = 11; while (m > 0 && CUM[m] >= n) m--; return (n - CUM[m]) + ' ' + AS.MONTHS[m]; };
/* Sun's ecliptic longitude (deg) for day-of-year (1..365), simple but good to ~1° */
AS.sunLon = doy => { const n = doy - 1.5, g = 357.528 + 0.9856003 * n; return AS.norm(280.46 + 0.9856474 * n + 1.915 * sin(g) + 0.02 * sin(2 * g)); };
AS.sunDec = doy => Math.asin(sin(AS.EPS) * sin(AS.sunLon(doy))) * R;
AS.sunRA = doy => { const l = AS.sunLon(doy); return AS.norm(Math.atan2(cos(AS.EPS) * sin(l), cos(l)) * R); };
/* equation of time in minutes (apparent - mean) */
AS.eot = doy => { const B = 360 / 365 * (doy - 81); return 9.87 * sin(2 * B) - 7.53 * cos(B) - 1.5 * sin(B); };
/* hour angle H, declination, latitude (deg) -> {alt, az} az from N through E */
AS.altaz = (H, dec, lat) => {
  const alt = Math.asin(sin(lat) * sin(dec) + cos(lat) * cos(dec) * cos(H)) * R;
  const az = AS.norm(Math.atan2(-cos(dec) * sin(H), sin(dec) * cos(lat) - cos(dec) * cos(H) * sin(lat)) * R);
  return { alt, az };
};
AS.enu = (alt, az) => [cos(alt) * sin(az), cos(alt) * cos(az), sin(alt)];
/* semi-diurnal arc (deg of hour angle) for a body at dec, altitude h0 */
AS.semiArc = (dec, lat, h0 = 0) => { const c = (sin(h0) - sin(lat) * sin(dec)) / (cos(lat) * cos(dec)); return c <= -1 ? 180 : c >= 1 ? 0 : Math.acos(c) * R; };
AS.jd = date => date.getTime() / 86400000 + 2440587.5;
AS.gmst = jd => AS.norm(280.46061837 + 360.98564736629 * (jd - 2451545));
AS.kepler = (M, e) => { let E = e < 0.8 ? M : Math.PI; for (let i = 0; i < 30; i++) { const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); E -= d; if (Math.abs(d) < 1e-10) break; } return E; };
AS.hm = h => { h = ((h % 24) + 24) % 24; let H = Math.floor(h), m = Math.round((h - H) * 60); if (m === 60) { H = (H + 1) % 24; m = 0; } return String(H).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ' น.'; };
AS.dirName = az => ['เหนือ', 'ตะวันออกเฉียงเหนือ', 'ตะวันออก', 'ตะวันออกเฉียงใต้', 'ใต้', 'ตะวันตกเฉียงใต้', 'ตะวันตก', 'ตะวันตกเฉียงเหนือ'][Math.round(AS.norm(az) / 45) % 8];

/* ---------- Celestial sphere (horizon) renderer ----------
   world frame ENU: x=East, y=North, z=Up.  camera on unit vector c (az psi from N, elevation eps) */
AS.Sphere = function (cx, cy, Rad, psi, eps) {
  const c = [sin(psi) * cos(eps), cos(psi) * cos(eps), sin(eps)];
  let r = [-c[1], c[0], 0]; const n = Math.hypot(r[0], r[1]) || 1; r = [r[0] / n, r[1] / n, 0];
  const u = [c[1] * r[2] - c[2] * r[1], c[2] * r[0] - c[0] * r[2], c[0] * r[1] - c[1] * r[0]];
  this.P = v => ({ x: cx + Rad * (v[0] * r[0] + v[1] * r[1] + v[2] * r[2]), y: cy - Rad * (v[0] * u[0] + v[1] * u[1] + v[2] * u[2]), d: v[0] * c[0] + v[1] * c[1] + v[2] * c[2], up: v[2] >= -1e-9 });
  this.cx = cx; this.cy = cy; this.R = Rad;
};
/* draw polyline of ENU vectors; styles by visibility: front/back × above/below horizon */
AS.Sphere.prototype.path = function (ctx, vs, col, lw = 1.5, opt = {}) {
  const pts = vs.map(this.P);
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const front = (a.d + b.d) / 2 >= 0, up = a.up && b.up;
    if (opt.only === 'front' && !front) continue; if (opt.only === 'back' && front) continue;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.globalAlpha = (front ? 1 : 0.45) * (up ? 1 : 0.6);
    ctx.setLineDash(up ? [] : [4, 4]);
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke();
  }
  ctx.globalAlpha = 1; ctx.setLineDash([]);
};
/* standard scene: horizon disc, cardinal points, meridian, zenith, celestial equator & pole for latitude */
AS.Sphere.prototype.base = function (ctx, lat, o = {}) {
  const S = this, g = A.g;
  const circ = f => { const a = []; for (let i = 0; i <= 120; i++) a.push(f(i * 3)); return a; };
  // sphere outline
  g.circle(ctx, S.cx, S.cy, S.R, 'rgba(40,60,120,.10)', 'rgba(140,160,220,.35)', 1);
  // horizon disc
  const hz = circ(t => S.P([sin(t), cos(t), 0]));
  ctx.beginPath(); hz.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath();
  ctx.fillStyle = 'rgba(56,120,90,.28)'; ctx.fill(); ctx.strokeStyle = '#5fb88f'; ctx.lineWidth = 1.5; ctx.stroke();
  // meridian (N-Z-S)
  if (o.meridian !== false) S.path(ctx, circ(t => [0, cos(t), sin(t)]).slice(0, 61), 'rgba(200,200,230,.35)', 1);
  // cardinal points
  [['N', 0, 'เหนือ'], ['E', 90, 'ตะวันออก'], ['S', 180, 'ใต้'], ['W', 270, 'ตะวันตก']].forEach(([k, az, t]) => { const p = S.P([sin(az) * 1.09, cos(az) * 1.09, 0]); g.text(ctx, t, p.x, p.y + 4, { a: 'center', s: 12.5, w: 600, c: '#8fe0b8' }); });
  const z = S.P([0, 0, 1]); g.circle(ctx, z.x, z.y, 2.5, '#e9edf8'); g.text(ctx, 'จุดเหนือศีรษะ', z.x + 6, z.y - 4, { s: 11.5, c: '#c7d2fe' });
  if (o.equator !== false) {
    // celestial equator: dec=0 for all H
    S.path(ctx, circ(H => { const q = AS.altaz(H, 0, lat); return AS.enu(q.alt, q.az); }), '#a5b4fc', 1.6);
    const e = AS.altaz(0, 0, lat); const ep = S.P(AS.enu(e.alt, e.az)); g.text(ctx, 'เส้นศูนย์สูตรฟ้า', ep.x + 6, ep.y - 6, { s: 11.5, c: '#a5b4fc' });
  }
  if (o.pole !== false) {
    const np = AS.enu(lat, 0), sp = AS.enu(-lat, 180);
    S.path(ctx, [sp, [0, 0, 0], np].map(v => v), 'rgba(165,180,252,.7)', 1.2);
    const p = S.P(np); g.circle(ctx, p.x, p.y, 3, '#a5b4fc'); g.text(ctx, 'ขั้วฟ้าเหนือ', p.x + 6, p.y - 4, { s: 11.5, c: '#a5b4fc' });
  }
  // observer
  g.circle(ctx, S.cx, S.cy, 3.5, '#e9edf8');
};
/* path of a star through a full day */
AS.Sphere.prototype.dayCircle = function (ctx, dec, lat, col, lw = 1.4) {
  const a = []; for (let H = 0; H <= 360; H += 3) { const q = AS.altaz(H, dec, lat); a.push(AS.enu(q.alt, q.az)); }
  this.path(ctx, a, col, lw);
};
/* drag-to-rotate helper; state {psi, eps} */
AS.orbitDrag = (c, st, redraw) => A.drag(c.cv, { move(x, y, dx, dy) { st.psi = AS.norm(st.psi - dx * 0.5); st.eps = Math.max(-5, Math.min(89, st.eps + dy * 0.4)); redraw(); } });
})();
