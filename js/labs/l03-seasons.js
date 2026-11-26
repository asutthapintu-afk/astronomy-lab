(function(){
const CITY = { msk: ['มหาสารคาม', 16.18, 103.30], bkk: ['กรุงเทพฯ', 13.75, 100.50], cmi: ['เชียงใหม่', 18.79, 98.98], sgp: ['สิงคโปร์', 1.35, 103.82], ldn: ['ลอนดอน', 51.51, -0.13], syd: ['ซิดนีย์', -33.87, 151.21], tro: ['ทรอมโซ นอร์เวย์', 69.65, 18.96], np: ['ขั้วโลกเหนือ', 90, 0] };
A.reg({
  id: 'lab-seasons', no: 3, title: 'ระบบพิกัดพื้นฐานและฤดูกาล', short: 'ละติจูด–ลองจิจูดบนโลก แกนเอียง 23.44° มุมเงยดวงอาทิตย์เวลาเที่ยง ความยาวกลางวัน และสาเหตุของฤดูกาล',
  courses: ['2015326 · ปฏิบัติการที่ 3', '2015231 · สัปดาห์ 4–5'], ref: 'OpenStax Astronomy 2e หัวข้อ 4.1 Earth and Sky และ 4.2 The Seasons',
  steps: `<ol>
    <li><b>ส่วนที่ 1 พิกัดภูมิศาสตร์:</b> เลือกเมืองต่าง ๆ หรือปรับละติจูด–ลองจิจูด ลากลูกโลกเพื่อหมุน อ่านพิกัดและบันทึกลงตาราง</li>
    <li><b>ส่วนที่ 2 ฤดูกาล:</b> ตั้งผู้สังเกตที่มหาสารคาม เลื่อนวันที่ไปที่ 21 มี.ค., 21 มิ.ย., 23 ก.ย. และ 22 ธ.ค. บันทึกเดคลิเนชันของดวงอาทิตย์ มุมเงยเวลาเที่ยง และความยาวกลางวัน</li>
    <li>ทำซ้ำกับลอนดอนและซิดนีย์ เปรียบเทียบฤดูกาลของซีกโลกเหนือกับใต้</li>
    <li>ดูแผนภาพแสงตกกระทบ อธิบายว่าเหตุใดมุมเงยที่ต่ำทำให้พลังงานต่อพื้นที่น้อยลง</li>
    <li>ปรับวันที่หาว่าดวงอาทิตย์ผ่านจุดเหนือศีรษะ (มุมเงย 90°) ที่มหาสารคามในวันใดบ้าง</li></ol>`,
  theory: `<h3>ระบบพิกัดภูมิศาสตร์</h3>
    <p><b>ละติจูด (φ)</b> คือมุมวัดจากเส้นศูนย์สูตรไปทางเหนือ (+) หรือใต้ (−) มีค่า −90° ถึง +90° <b>ลองจิจูด (λ)</b> คือมุมวัดจากเส้นเมริเดียนแรกที่กรีนิชไปทางตะวันออกหรือตะวันตก 0° ถึง 180° ในทางดาราศาสตร์ ละติจูดของผู้สังเกตเท่ากับมุมเงยของขั้วฟ้า</p>
    <h3>สาเหตุของฤดูกาล</h3>
    <p>แกนหมุนของโลกเอียง 23.44° จากแนวตั้งฉากกับระนาบวงโคจร และชี้ไปทิศเดิมในอวกาศตลอดปี ระหว่างปีดวงอาทิตย์จึงมี <b>เดคลิเนชัน (δ)</b> เปลี่ยนระหว่าง +23.44° (ครีษมายัน ~21 มิ.ย.) และ −23.44° (เหมายัน ~22 ธ.ค.) ฤดูกาลไม่ได้เกิดจากระยะห่างโลก–ดวงอาทิตย์ โลกอยู่ใกล้ดวงอาทิตย์ที่สุดราว 3 ม.ค.</p>
    <div class="eq">มุมเงยดวงอาทิตย์เวลาเที่ยง h = 90° − |φ − δ|</div>
    <div class="eq">ความยาวกลางวัน = (2/15) · arccos(−tan φ · tan δ) ชั่วโมง</div>
    <div class="eq">พลังงานต่อหน่วยพื้นที่ ∝ sin h (แสงที่เอียงกระจายบนพื้นที่กว้างขึ้น)</div>
    <p class="note">ความยาวกลางวันในตัวจำลองคิดจากจุดศูนย์กลางดวงอาทิตย์ที่ขอบฟ้าเรขาคณิต ไม่รวมการหักเหของบรรยากาศและขนาดดวงอาทิตย์ (ค่าจริงยาวกว่าราว 6–8 นาที)</p>`,
  questions: [
    { q: 'บันทึกพิกัดภูมิศาสตร์ของสถานที่ต่าง ๆ', table: { cols: ['สถานที่', 'ละติจูด', 'ลองจิจูด', 'ซีกโลก'], rows: ['มหาสารคาม', 'กรุงเทพฯ', 'ลอนดอน', 'ซิดนีย์'] } },
    { q: 'ผลการสังเกตที่มหาสารคาม (φ = 16.2° N)', table: { cols: ['วันที่', 'δ ดวงอาทิตย์', 'มุมเงยเที่ยง', 'ความยาวกลางวัน', 'พลังงานต่อพื้นที่ (%)'], rows: ['21 มี.ค.', '21 มิ.ย.', '23 ก.ย.', '22 ธ.ค.'] } },
    { q: 'เปรียบเทียบความยาวกลางวันวันที่ 21 มิ.ย. ที่มหาสารคาม ลอนดอน และซิดนีย์ สรุปความสัมพันธ์ระหว่างละติจูดกับความต่างของฤดูกาล' },
    { q: 'ดวงอาทิตย์ผ่านจุดเหนือศีรษะที่มหาสารคามในวันใดบ้าง ทำไมจึงเกิดได้เฉพาะสถานที่ระหว่างละติจูด 23.44° N ถึง 23.44° S' },
    { q: 'นักเรียนคนหนึ่งกล่าวว่า “ฤดูร้อนเกิดเพราะโลกเข้าใกล้ดวงอาทิตย์” ใช้ผลจากตัวจำลองโต้แย้งความเชื่อนี้' }
  ],
  mount(stage, ctrls) {
    const st = { lat: 16.18, lon: 103.30, doy: 172, rot: 103.3, tilt: 20 };
    const r1 = A.el('div', { class: 'duo' }); stage.append(r1);
    const globe = A.canvas(r1, { ratio: 0.85, min: 280, max: 440, cap: 'ส่วนที่ 1 · พิกัดภูมิศาสตร์ (ลากเพื่อหมุน)' }, drawGlobe);
    const side = A.canvas(r1, { ratio: 0.85, min: 280, max: 440, cap: 'ส่วนที่ 2 · แสงอาทิตย์เวลาเที่ยง' }, drawSide);
    const r2 = A.el('div', { class: 'duo' }); stage.append(r2);
    const orbit = A.canvas(r2, { ratio: 0.62, min: 230, max: 340, cap: 'ตำแหน่งโลกในวงโคจร' }, drawOrbit);
    const year = A.canvas(r2, { ratio: 0.62, min: 230, max: 340, cap: 'ตลอดทั้งปีที่ละติจูดนี้' }, drawYear);
    A.drag(globe.cv, { move(x, y, dx, dy) { st.rot -= dx * 0.6; st.tilt = Math.max(-80, Math.min(80, st.tilt + dy * 0.5)); globe.redraw(); } });
    const D = AS.D;
    const noonAlt = (lat, doy) => 90 - Math.abs(lat - AS.sunDec(doy));
    const dayLen = (lat, doy) => 2 * AS.semiArc(AS.sunDec(doy), Math.max(-89.99, Math.min(89.99, lat))) / 15;
    function drawGlobe(ctx, W, H) {
      A.g.stars(ctx, W, H, 60);
      const cx = W / 2, cy = H / 2 + 8, R = Math.min(W, H) * 0.38;
      const P = (la, lo) => { const l = (lo - st.rot) * D, b = la * D, t = st.tilt * D; const x = Math.cos(b) * Math.sin(l), y = Math.sin(b), z = Math.cos(b) * Math.cos(l); const y2 = y * Math.cos(t) - z * Math.sin(t), z2 = y * Math.sin(t) + z * Math.cos(t); return [cx + R * x, cy - R * y2, z2]; };
      const g = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R); g.addColorStop(0, '#2a5aa8'); g.addColorStop(1, '#0d2350');
      A.g.circle(ctx, cx, cy, R, g, 'rgba(125,211,252,.5)');
      const poly = (pts, col, lw) => { for (let i = 0; i < pts.length - 1; i++) { if (pts[i][2] < 0 || pts[i + 1][2] < 0) continue; A.g.line(ctx, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, lw); } };
      for (let la = -60; la <= 60; la += 30) { const pts = []; for (let lo = -180; lo <= 180; lo += 4) pts.push(P(la, lo)); poly(pts, la === 0 ? '#ffcc4d' : 'rgba(200,215,255,.35)', la === 0 ? 1.8 : 1); }
      for (let lo = -180; lo < 180; lo += 30) { const pts = []; for (let la = -90; la <= 90; la += 4) pts.push(P(la, lo)); poly(pts, lo === 0 ? '#ff8f80' : 'rgba(200,215,255,.35)', lo === 0 ? 1.8 : 1); }
      [[23.44, 'rgba(110,231,183,.6)'], [-23.44, 'rgba(110,231,183,.6)']].forEach(([la, c]) => { const pts = []; for (let lo = -180; lo <= 180; lo += 4) pts.push(P(la, lo)); poly(pts, c, 1); });
      const o = P(st.lat, st.lon);
      if (o[2] >= 0) { const e = P(0, st.lon); A.g.line(ctx, cx, cy, e[0], e[1], 'rgba(255,255,255,.5)', 1, [3, 3]); A.g.line(ctx, cx, cy, o[0], o[1], '#7dd3fc', 1.5); A.g.circle(ctx, o[0], o[1], 6, '#7dd3fc', '#fff', 1.5); }
      const np = P(90, 0); if (np[2] >= 0) A.g.text(ctx, 'N', np[0] - 4, np[1] - 6, { s: 12, w: 700 });
      A.g.text(ctx, 'เส้นศูนย์สูตร', 12, H - 34, { s: 12, c: '#ffcc4d' }); A.g.text(ctx, 'เส้นเมริเดียนแรก (กรีนิช)', 12, H - 16, { s: 12, c: '#ff8f80' });
      A.g.text(ctx, 'เขตร้อน ±23.44°', W - 12, H - 16, { s: 12, c: '#6ee7b7', a: 'right' });
    }
    function drawSide(ctx, W, H) {
      const dec = AS.sunDec(st.doy), cx = W * 0.6, cy = H / 2 + 6, R = Math.min(W, H) * 0.3;
      for (let y = cy - R * 1.3; y <= cy + R * 1.3; y += 18) A.g.arrow(ctx, 8, y, cx - Math.sqrt(Math.max(0, R * R - (y - cy) ** 2)) - 4, y, 'rgba(255,204,77,.45)', 1, 6);
      A.g.text(ctx, 'แสงอาทิตย์', 10, 40, { s: 12, c: '#ffcc4d' });
      // day/night
      A.g.circle(ctx, cx, cy, R, '#2a5aa8');
      ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = 'rgba(5,8,20,.72)'; ctx.fill();
      // frame: latitude phi point at angle (phi - dec) above the sun-facing direction (left)
      const pt = (la, k = 1) => { const a = (la - dec) * D; return [cx - k * R * Math.cos(a), cy - k * R * Math.sin(a)]; };
      // axis
      const n1 = pt(90, 1.25), s1 = pt(-90, 1.25); A.g.line(ctx, s1[0], s1[1], n1[0], n1[1], '#e9edf8', 1.5); A.g.text(ctx, 'N', n1[0] + 5, n1[1], { s: 12, w: 700 });
      // latitude chords
      [[0, '#ffcc4d'], [23.44, 'rgba(110,231,183,.7)'], [-23.44, 'rgba(110,231,183,.7)'], [66.56, 'rgba(165,180,252,.6)'], [-66.56, 'rgba(165,180,252,.6)']].forEach(([la, c]) => { const a = pt(la), b = pt(180 - la); A.g.line(ctx, a[0], a[1], b[0], b[1], c, la ? 1 : 1.6); });
      const o = pt(st.lat); const a = (st.lat - dec) * D;
      // local horizon tangent and zenith
      const tx = Math.sin(a), ty = -Math.cos(a); const L = 60;
      A.g.line(ctx, o[0] - tx * L, o[1] - ty * L, o[0] + tx * L, o[1] + ty * L, '#6ee7b7', 2);
      A.g.line(ctx, o[0], o[1], o[0] - Math.cos(a) * 48, o[1] - Math.sin(a) * 48, 'rgba(255,255,255,.6)', 1, [3, 3]);
      A.g.circle(ctx, o[0], o[1], 5, '#7dd3fc', '#fff');
      const h = noonAlt(st.lat, st.doy);
      A.g.text(ctx, `มุมเงยเที่ยง ${h.toFixed(1)}°`, W - 12, H - 16, { s: 13, w: 600, a: 'right', bg: 'rgba(6,11,26,.7)' });
      A.g.text(ctx, `δ☉ = ${dec >= 0 ? '+' : ''}${dec.toFixed(2)}°`, W - 12, 40, { s: 13, a: 'right', c: '#ffcc4d' });
      // beam-spreading inset
      const bx = 12, by = H - 92, bw = 110; const s = Math.max(0.02, Math.sin(Math.max(0, h) * D));
      ctx.fillStyle = 'rgba(6,11,26,.8)'; ctx.fillRect(bx, by - 8, bw + 20, 86);
      A.g.text(ctx, 'แสงกว้าง 1 หน่วย ตกบนพื้น', bx + 4, by + 6, { s: 11, c: '#9aa7c7' });
      const gw = Math.min(bw, 30 / s); A.g.line(ctx, bx + 4, by + 52, bx + 4 + gw, by + 52, '#ffcc4d', 4);
      A.g.text(ctx, `กว้าง ${(1 / s).toFixed(2)} หน่วย · ${(s * 100).toFixed(0)}%`, bx + 4, by + 72, { s: 11.5 });
    }
    function drawOrbit(ctx, W, H) {
      A.g.stars(ctx, W, H, 50);
      const cx = W / 2, cy = H / 2 + 6, rx = W * 0.38, ry = H * 0.3;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.strokeStyle = 'rgba(233,237,248,.35)'; ctx.stroke();
      A.g.sun(ctx, cx, cy, 10);
      // earth heliocentric longitude = sun lon + 180; x to the right = lon 0 direction (vernal equinox direction from Sun)
      // screen: ecliptic longitude 90° points to the right, so the axis tilt (toward λ=90°) is visible
      const pos = l => [cx + rx * Math.cos((l - 90) * D), cy + ry * Math.sin((l - 90) * D)];
      [[80, '21 มี.ค.'], [172, '21 มิ.ย.'], [266, '23 ก.ย.'], [356, '22 ธ.ค.']].forEach(([d, t]) => { const p = pos(AS.sunLon(d) + 180); A.g.circle(ctx, p[0], p[1], 2.5, '#9aa7c7'); A.g.text(ctx, t, p[0], p[1] + (p[1] > cy ? 18 : -10), { s: 11.5, a: 'center', c: '#9aa7c7' }); });
      const p = pos(AS.sunLon(st.doy) + 180);
      // axis tilt points toward ecliptic longitude 90° (toward +y on screen = down) -> screen offset
      const nx = Math.sin(23.44 * D) * 22, ny = -Math.cos(23.44 * D) * 22;
      // lit half faces the Sun
      PLANET.draw(ctx, p[0], p[1], 11, 'earth', { sun: Math.atan2(cy - p[1], cx - p[0]) });
      A.g.line(ctx, p[0] - nx, p[1] - ny, p[0] + nx, p[1] + ny, '#e9edf8', 1.6); A.g.text(ctx, 'N', p[0] + nx + 3, p[1] + ny, { s: 11, w: 700 });
      A.g.text(ctx, 'แกนโลกชี้ทิศเดิมเสมอ (ไปทางดาวเหนือ)', 12, H - 12, { s: 11.5, c: '#9aa7c7' });
    }
    function drawYear(ctx, W, H) {
      const box = { x: 44, y: 50, w: W - 100, h: H - 92 };
      const ax = A.g.axes(ctx, box, { x0: 1, x1: 365, y0: 0, y1: 90, xt: [1, 91, 182, 274, 365], yt: [0, 30, 60, 90], xf: v => AS.doyLabel(v), yf: v => v + '°', xl: '' });
      const Y2 = v => box.y + box.h - v / 24 * box.h;
      [0, 6, 12, 18, 24].forEach(v => A.g.text(ctx, v + ' ชม.', box.x + box.w + 6, Y2(v) + 4, { s: 11, c: '#6ee7b7' }));
      ctx.beginPath(); for (let d = 1; d <= 365; d += 2) { const y = ax.Y(Math.max(0, noonAlt(st.lat, d))); d === 1 ? ctx.moveTo(ax.X(d), y) : ctx.lineTo(ax.X(d), y); } ctx.strokeStyle = '#ffcc4d'; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); for (let d = 1; d <= 365; d += 2) { const y = Y2(dayLen(st.lat, d)); d === 1 ? ctx.moveTo(ax.X(d), y) : ctx.lineTo(ax.X(d), y); } ctx.strokeStyle = '#6ee7b7'; ctx.lineWidth = 2; ctx.stroke();
      A.g.line(ctx, ax.X(st.doy), box.y, ax.X(st.doy), box.y + box.h, '#7dd3fc', 1.5);
      A.g.text(ctx, '— มุมเงยเที่ยง', box.x + 4, 42, { s: 12, c: '#ffcc4d' }); A.g.text(ctx, '— ความยาวกลางวัน', box.x + 110, 42, { s: 12, c: '#6ee7b7' });
    }
    A.ui.h(ctrls, 'ผู้สังเกต');
    A.ui.select(ctrls, { label: 'เลือกสถานที่', value: 'msk', options: Object.entries(CITY).map(([k, v]) => [k, v[0]]) }, k => { const c = CITY[k]; rl.set(c[1]); rn.set(c[2]); st.lat = c[1]; st.lon = c[2]; st.rot = c[2]; all(); });
    const rl = A.ui.range(ctrls, { label: 'ละติจูด φ', min: -90, max: 90, step: 0.01, value: st.lat, fmt: v => Math.abs(v).toFixed(2) + '° ' + (v >= 0 ? 'N' : 'S') }, v => { st.lat = v; all(); });
    const rn = A.ui.range(ctrls, { label: 'ลองจิจูด λ', min: -180, max: 180, step: 0.01, value: st.lon, fmt: v => Math.abs(v).toFixed(2) + '° ' + (v >= 0 ? 'E' : 'W') }, v => { st.lon = v; st.rot = v; all(); });
    A.ui.h(ctrls, 'วันที่');
    const rd = A.ui.range(ctrls, { label: 'วันในรอบปี', min: 1, max: 365, step: 1, value: st.doy, fmt: v => AS.doyLabel(v) }, v => { st.doy = v; all(); });
    A.ui.buttons(ctrls, [['วสันตวิษุวัต', () => rd.set(80, true)], ['ครีษมายัน', () => rd.set(172, true)], ['ศารทวิษุวัต', () => rd.set(266, true)], ['เหมายัน', () => rd.set(356, true)]]);
    const out = A.ui.out(ctrls, [['dec', 'เดคลิเนชันดวงอาทิตย์ δ'], ['h', 'มุมเงยเวลาเที่ยง'], ['dir', 'ดวงอาทิตย์เที่ยงอยู่ทาง'], ['len', 'ความยาวกลางวัน'], ['ins', 'พลังงานต่อพื้นที่ (เทียบแสงตั้งฉาก)'], ['pole', 'มุมเงยของขั้วฟ้าที่มองเห็น']]);
    function all() {
      globe.redraw(); side.redraw(); orbit.redraw(); year.redraw();
      const d = AS.sunDec(st.doy), h = noonAlt(st.lat, st.doy), L = dayLen(st.lat, st.doy);
      out.set('dec', (d >= 0 ? '+' : '') + d.toFixed(2) + '°'); out.set('h', h.toFixed(1) + '°');
      out.set('dir', h >= 89.95 ? 'เหนือศีรษะพอดี' : (st.lat > d ? 'ทิศใต้' : 'ทิศเหนือ'));
      const hh = Math.floor(L), mm = Math.round((L - hh) * 60); out.set('len', L >= 24 ? '24 ชม. (ไม่ตก)' : L <= 0 ? '0 (ไม่ขึ้น)' : `${hh} ชม. ${mm} นาที`);
      out.set('ins', Math.max(0, Math.sin(h * AS.D) * 100).toFixed(0) + '%');
      out.set('pole', Math.abs(st.lat).toFixed(1) + '° (ขั้ว' + (st.lat >= 0 ? 'เหนือ' : 'ใต้') + ')');
    }
    all();
  }
});
})();
