/* Procedural planet renderer: textured discs with limb darkening, sunlight shading, phases and rings */
(function(){
const P = window.PLANET = {};
const cache = new Map();
const rng = seed => { let s = seed % 2147483646 + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const TAU = Math.PI * 2;
P.COL = { mercury: '#a39d94', venus: '#e6cf98', earth: '#3b78c9', moon: '#b3afa6', mars: '#cf6a3a', jupiter: '#d9bb92', saturn: '#e3cf98', uranus: '#a6dfe3', neptune: '#4a6fd6', pluto: '#cdb79c', comet: '#dfe9ff' };

function blob(c, R, x, y, r, col, a, n, sd, soft) {   // irregular patch made of overlapping circles (soft = feathered edges)
  const rnd = rng(sd);
  const rgb = col.match(/\w\w/g).map(h => parseInt(h, 16)).join(',');
  for (let i = 0; i < n; i++) {
    const ang = rnd() * TAU, d = rnd() * r * 0.8, cx = x + Math.cos(ang) * d, cy = y + Math.sin(ang) * d * 0.8, rr = r * (0.25 + rnd() * 0.45);
    if (soft) { const g = c.createRadialGradient(cx, cy, 0, cx, cy, rr); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(0.6, `rgba(${rgb},${a * 0.6})`); g.addColorStop(1, `rgba(${rgb},0)`); c.fillStyle = g; }
    else { c.fillStyle = col; c.globalAlpha = a; }
    c.beginPath(); c.arc(cx, cy, rr, 0, TAU); c.fill(); c.globalAlpha = 1;
  }
}
function bands(c, R, list, wave, sd) {          // horizontal bands with wavy edges: [yTop, yBot, colour] in -1..1
  const rnd = rng(sd);
  list.forEach(([a, b, col], i) => {
    const ph = rnd() * TAU, amp = wave * (0.5 + rnd());
    c.beginPath();
    for (let x = -R; x <= R; x += R / 24) c.lineTo(x, a * R + Math.sin(x / R * 9 + ph) * amp * R);
    for (let x = R; x >= -R; x -= R / 24) c.lineTo(x, b * R + Math.sin(x / R * 7 + ph * 1.7) * amp * R);
    c.closePath(); c.fillStyle = col; c.fill();
  });
}
function craters(c, R, n, sd, dark, light) {
  const rnd = rng(sd);
  for (let i = 0; i < n; i++) {
    const ang = rnd() * TAU, d = Math.sqrt(rnd()) * R * 0.95, x = Math.cos(ang) * d, y = Math.sin(ang) * d, cr = R * (0.008 + rnd() * rnd() * rnd() * 0.08);
    const g = c.createRadialGradient(x + cr * 0.15, y + cr * 0.15, 0, x, y, cr); g.addColorStop(0, dark); g.addColorStop(0.85, dark); g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.beginPath(); c.arc(x, y, cr, 0, TAU); c.fill();
    c.beginPath(); c.arc(x, y, cr * 0.92, Math.PI * 0.05, Math.PI * 0.95); c.strokeStyle = light; c.lineWidth = Math.max(0.4, cr * 0.18); c.stroke();
  }
}
const PAINT = {
  mercury(c, R) {
    c.fillStyle = '#9d978d'; c.fillRect(-R, -R, 2 * R, 2 * R);
    for (let i = 0; i < 7; i++) blob(c, R, (rng(i + 3)() - 0.5) * 1.6 * R, (rng(i + 9)() - 0.5) * 1.6 * R, R * 0.35, i % 2 ? '#7f7a72' : '#c2bcb0', 0.35, 9, i + 21, true);
    craters(c, R, 220, 5, 'rgba(70,66,60,.35)', 'rgba(235,230,220,.3)');
  },
  moon(c, R) {
    c.fillStyle = '#b8b4aa'; c.fillRect(-R, -R, 2 * R, 2 * R);
    // near-side maria, roughly where they appear from Earth (north up)
    [[-0.35, -0.38, 0.30], [0.12, -0.42, 0.20], [0.28, -0.1, 0.24], [0.62, -0.28, 0.13], [-0.55, 0.05, 0.38], [0.2, 0.3, 0.16], [0.45, 0.22, 0.13], [-0.3, 0.42, 0.16]]
      .forEach(([x, y, r], i) => blob(c, R, x * R, y * R, r * R, '#67645e', 0.5, 26, 40 + i, true));
    for (let i = 0; i < 40; i++) { const q = rng(300 + i); blob(c, R, (q() - 0.5) * 1.9 * R, (q() - 0.5) * 1.9 * R, R * 0.12, q() < 0.5 ? '#8d8981' : '#cfcbc1', 0.25, 4, 500 + i, true); }
    craters(c, R, 260, 11, 'rgba(95,91,85,.28)', 'rgba(245,241,233,.22)');
    c.beginPath(); c.arc(-0.12 * R, 0.66 * R, R * 0.02, 0, TAU); c.fillStyle = 'rgba(245,242,234,.8)'; c.fill();
  },
  venus(c, R) {
    const g = c.createLinearGradient(0, -R, 0, R); g.addColorStop(0, '#f1e2b6'); g.addColorStop(0.5, '#e6cc90'); g.addColorStop(1, '#efdcab'); c.fillStyle = g; c.fillRect(-R, -R, 2 * R, 2 * R);
    c.globalAlpha = 0.35; bands(c, R, [[-0.7, -0.5, '#d9b878'], [-0.2, 0.0, '#f6ead0'], [0.25, 0.42, '#d6b170'], [0.6, 0.75, '#f3e4c0']], 0.08, 7); c.globalAlpha = 1;
    c.globalAlpha = 0.25; c.strokeStyle = '#fff6df'; c.lineWidth = R * 0.08; for (let i = 0; i < 4; i++) { c.beginPath(); c.ellipse(-R * 0.1, 0, R * (0.3 + i * 0.22), R * (0.15 + i * 0.12), 0.3, 0.4, 2.6); c.stroke(); } c.globalAlpha = 1;
  },
  earth(c, R) {
    const g = c.createRadialGradient(-R * 0.3, -R * 0.3, 0, 0, 0, R); g.addColorStop(0, '#2f6fc0'); g.addColorStop(1, '#123a7a'); c.fillStyle = g; c.fillRect(-R, -R, 2 * R, 2 * R);
    [[-0.45, -0.25, 0.42, '#3e7d3b'], [-0.2, 0.35, 0.32, '#7b8a45'], [0.4, -0.35, 0.36, '#4d8840'], [0.5, 0.25, 0.25, '#9a8452'], [0.05, -0.05, 0.18, '#5d8f3f']]
      .forEach(([x, y, r, col], i) => blob(c, R, x * R, y * R, r * R, col, 0.95, 18, 60 + i));
    c.fillStyle = '#f4f8ff'; c.beginPath(); c.ellipse(0, -R * 0.97, R * 0.6, R * 0.16, 0, 0, TAU); c.fill(); c.beginPath(); c.ellipse(0, R * 0.98, R * 0.7, R * 0.14, 0, 0, TAU); c.fill();
    const rnd = rng(77); c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineCap = 'round';
    for (let i = 0; i < 14; i++) { const y = (rnd() - 0.5) * 1.7 * R, x = (rnd() - 0.5) * 1.6 * R; c.lineWidth = R * (0.025 + rnd() * 0.05); c.beginPath(); c.moveTo(x - R * 0.3, y); c.quadraticCurveTo(x, y - R * 0.12 * (rnd() - 0.5), x + R * (0.2 + rnd() * 0.3), y + R * 0.05); c.stroke(); }
  },
  mars(c, R) {
    const g = c.createLinearGradient(0, -R, 0, R); g.addColorStop(0, '#d97c48'); g.addColorStop(1, '#bf5a2f'); c.fillStyle = g; c.fillRect(-R, -R, 2 * R, 2 * R);
    [[-0.3, 0.05, 0.4], [0.35, -0.1, 0.3], [0.1, 0.35, 0.28], [-0.5, -0.4, 0.2]].forEach(([x, y, r], i) => blob(c, R, x * R, y * R, r * R, '#7c3a23', 0.5, 22, 90 + i, true));
    craters(c, R, 30, 4, 'rgba(110,50,30,.3)', 'rgba(255,200,160,.18)');
    c.fillStyle = 'rgba(255,255,255,.92)'; c.beginPath(); c.ellipse(R * 0.05, -R * 0.93, R * 0.35, R * 0.14, 0, 0, TAU); c.fill();
  },
  jupiter(c, R) {
    c.fillStyle = '#ecdcc0'; c.fillRect(-R, -R, 2 * R, 2 * R);
    bands(c, R, [[-1, -0.8, '#b29b80'], [-0.66, -0.56, '#d4b796'], [-0.4, -0.18, '#c08d63'], [-0.16, 0.06, '#f3e9d6'], [0.1, 0.3, '#b98258'], [0.44, 0.54, '#d2b190'], [0.68, 1, '#b39d84']], 0.006, 3);
    c.globalAlpha = 0.35; bands(c, R, [[-0.33, -0.3, '#9c6a46'], [0.2, 0.23, '#97603d'], [-0.6, -0.58, '#b68f6a']], 0.004, 8); c.globalAlpha = 1;
    const rnd = rng(19); c.fillStyle = 'rgba(255,250,240,.8)'; for (let i = 0; i < 9; i++) { c.beginPath(); c.ellipse((rnd() - 0.5) * 1.6 * R, (rnd() < 0.5 ? -0.45 : 0.42) * R, R * 0.05, R * 0.025, 0, 0, TAU); c.fill(); }
    c.fillStyle = '#c4553b'; c.beginPath(); c.ellipse(R * 0.3, R * 0.38, R * 0.16, R * 0.085, 0, 0, TAU); c.fill(); c.strokeStyle = 'rgba(245,225,200,.8)'; c.lineWidth = R * 0.02; c.stroke();
  },
  saturn(c, R) {
    c.fillStyle = '#e8d6a2'; c.fillRect(-R, -R, 2 * R, 2 * R);
    bands(c, R, [[-1, -0.7, '#c9b285'], [-0.55, -0.38, '#dcc490'], [-0.18, 0.05, '#f0e2b8'], [0.15, 0.3, '#d8bc84'], [0.48, 0.62, '#d1b47f'], [0.75, 1, '#c2ab86']], 0.004, 5);
  },
  uranus(c, R) { c.fillStyle = '#a7e0e4'; c.fillRect(-R, -R, 2 * R, 2 * R); c.globalAlpha = 0.25; bands(c, R, [[-0.4, -0.2, '#c9f0f2'], [0.2, 0.35, '#8fcfd6']], 0.01, 2); c.globalAlpha = 1; },
  neptune(c, R) { c.fillStyle = '#3f66cf'; c.fillRect(-R, -R, 2 * R, 2 * R); c.globalAlpha = 0.4; bands(c, R, [[-0.5, -0.35, '#5a83e0'], [0.1, 0.22, '#2f4fb0']], 0.03, 8); c.globalAlpha = 1; c.fillStyle = '#233d8a'; c.beginPath(); c.ellipse(-R * 0.2, R * 0.25, R * 0.14, R * 0.08, 0, 0, TAU); c.fill(); },
  pluto(c, R) { c.fillStyle = '#c9b49a'; c.fillRect(-R, -R, 2 * R, 2 * R); blob(c, R, R * 0.25, R * 0.1, R * 0.4, '#f3e8dc', 0.85, 14, 3); blob(c, R, -R * 0.45, R * 0.2, R * 0.3, '#7a5038', 0.6, 12, 4); craters(c, R, 20, 3, 'rgba(90,70,50,.25)', 'rgba(255,240,220,.2)'); }
};
P.texture = (kind, r) => {
  const d = window.devicePixelRatio || 1, S = Math.max(16, Math.min(kind === 'moon' ? 1600 : 900, Math.ceil(r * d / 8) * 16));
  const key = kind + ':' + S; if (cache.has(key)) return cache.get(key);
  const cv = document.createElement('canvas'); cv.width = cv.height = S; const c = cv.getContext('2d'); const R = S / 2;
  c.translate(R, R); c.beginPath(); c.arc(0, 0, R, 0, TAU); c.clip();
  (PAINT[kind] || PAINT.mercury)(c, R);
  // limb darkening + soft highlight
  const g = c.createRadialGradient(-R * 0.25, -R * 0.25, R * 0.1, 0, 0, R); g.addColorStop(0, 'rgba(255,255,255,.10)'); g.addColorStop(0.7, 'rgba(0,0,0,0)'); g.addColorStop(1, kind === 'venus' || kind === 'jupiter' || kind === 'saturn' || kind === 'uranus' || kind === 'neptune' ? 'rgba(40,25,10,.45)' : 'rgba(0,0,0,.35)');
  c.fillStyle = g; c.fillRect(-R, -R, 2 * R, 2 * R);
  if (cache.size > 80) cache.clear(); cache.set(key, cv); return cv;
};
function rings(ctx, x, y, r, tilt, half) {      // half: 'back' | 'front'
  const segs = [[1.24, 1.52, 'rgba(170,150,120,.35)'], [1.52, 1.95, 'rgba(232,214,170,.92)'], [2.03, 2.27, 'rgba(214,196,156,.85)']];
  ctx.save(); ctx.translate(x, y); ctx.scale(1, tilt);
  ctx.beginPath(); if (half === 'back') ctx.rect(-3 * r, -3 * r, 6 * r, 3 * r); else ctx.rect(-3 * r, 0, 6 * r, 3 * r); ctx.clip();
  segs.forEach(([a, b, col]) => { ctx.beginPath(); ctx.arc(0, 0, r * (a + b) / 2, 0, TAU); ctx.strokeStyle = col; ctx.lineWidth = r * (b - a); ctx.stroke(); });
  ctx.beginPath(); ctx.arc(0, 0, r * 1.99, 0, TAU); ctx.strokeStyle = 'rgba(20,16,10,.6)'; ctx.lineWidth = r * 0.06; ctx.stroke();
  ctx.restore();
}
/* shadow path for the unlit part as seen by the observer. k = lit fraction, litRight = bright limb on the right */
function phaseShadow(ctx, x, y, r, k, litRight, alpha) {
  ctx.save(); ctx.translate(x, y); if (!litRight) ctx.scale(-1, 1);
  const tx = r * (1 - 2 * k);
  ctx.beginPath(); ctx.arc(0, 0, r + 0.5, -Math.PI / 2, Math.PI / 2, true);
  ctx.ellipse(0, 0, Math.abs(tx), r + 0.5, 0, Math.PI / 2, -Math.PI / 2, tx > 0);
  ctx.closePath(); ctx.fillStyle = `rgba(4,6,14,${alpha})`; ctx.fill();
  ctx.restore();
}
/* main entry.  o: {sun: angle (rad, screen) pointing from the planet toward the Sun} or {phase: {k, litRight}}; tilt for Saturn rings; glow */
P.draw = (ctx, x, y, r, kind, o = {}) => {
  r = Math.max(1, r);
  if (kind === 'comet') return P.comet(ctx, x, y, r, o.sun);
  if (kind === 'sun') return A.g.sun(ctx, x, y, r);
  const tilt = o.tilt == null ? 0.32 : o.tilt;
  if (kind === 'saturn' && o.rings !== false) rings(ctx, x, y, r, tilt, 'back');
  if (kind === 'earth' && r > 6) { const g = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.18); g.addColorStop(0, 'rgba(120,180,255,.45)'); g.addColorStop(1, 'rgba(120,180,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.18, 0, TAU); ctx.fill(); }
  if (kind === 'venus' && r > 6) { const g = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.12); g.addColorStop(0, 'rgba(255,240,200,.35)'); g.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.12, 0, TAU); ctx.fill(); }
  ctx.drawImage(P.texture(kind, r), x - r, y - r, 2 * r, 2 * r);
  if (o.sun != null) {
    const cx = Math.cos(o.sun), cy = Math.sin(o.sun);
    const g = ctx.createLinearGradient(x + cx * r, y + cy * r, x - cx * r, y - cy * r);
    g.addColorStop(0, 'rgba(4,6,14,0)'); g.addColorStop(0.42, 'rgba(4,6,14,0.05)'); g.addColorStop(0.56, 'rgba(4,6,14,0.72)'); g.addColorStop(1, 'rgba(4,6,14,0.94)');
    ctx.beginPath(); ctx.arc(x, y, r + 0.3, 0, TAU); ctx.fillStyle = g; ctx.fill();
  } else if (o.phase) {
    phaseShadow(ctx, x, y, r, o.phase.k, o.phase.litRight, o.phase.alpha || 0.9);
  }
  if (kind === 'saturn' && o.rings !== false) rings(ctx, x, y, r, tilt, 'front');
};
P.comet = (ctx, x, y, r, sunAng) => {
  const a = sunAng == null ? 0 : sunAng + Math.PI, L = r * 9;
  const g = ctx.createLinearGradient(x, y, x + Math.cos(a) * L, y + Math.sin(a) * L); g.addColorStop(0, 'rgba(200,225,255,.75)'); g.addColorStop(1, 'rgba(200,225,255,0)');
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, -r * 0.9); ctx.quadraticCurveTo(L * 0.5, -r * 2.2, L, -r * 1.6); ctx.lineTo(L, r * 1.6); ctx.quadraticCurveTo(L * 0.5, r * 2.2, 0, r * 0.9); ctx.closePath(); ctx.restore();
  ctx.fillStyle = g; ctx.fill();
  const h = ctx.createRadialGradient(x, y, 0, x, y, r * 2); h.addColorStop(0, '#ffffff'); h.addColorStop(0.35, 'rgba(210,230,255,.85)'); h.addColorStop(1, 'rgba(180,210,255,0)'); ctx.fillStyle = h; ctx.beginPath(); ctx.arc(x, y, r * 2, 0, TAU); ctx.fill();
};
})();
