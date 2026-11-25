(function(){
const STARS = [['Polaris (ดาวเหนือ)', 2.53, 89.26], ['Vega (ดาวเวกา)', 18.62, 38.78], ['Capella', 5.28, 46.0], ['Sirius (ดาวโจร)', 6.75, -16.72], ['Betelgeuse', 5.92, 7.41], ['Antares (ดาวปาริชาต)', 16.49, -26.43], ['Acrux (กางเขนใต้)', 12.44, -63.1], ['Canopus', 6.4, -52.7]];
const COL = ['#ffe08a', '#9fd3ff', '#ffd1a1', '#cfe6ff', '#ffb08a', '#ff9a7a', '#b9d3ff', '#fff3c4'];
A.reg({
  id: 'lab-sky', no: 4, title: 'การเคลื่อนที่ของทรงกลมท้องฟ้า', short: 'ทรงกลมท้องฟ้า ระบบพิกัดขอบฟ้า (มุมเงย–มุมทิศ) และศูนย์สูตร (RA–Dec) ดาวรอบขั้วฟ้า การขึ้น–ตกของดาว',
  courses: ['2015326 · ปฏิบัติการที่ 4', '2015231 · สัปดาห์ 6'], ref: 'OpenStax Astronomy 2e หัวข้อ 2.1 The Sky Above และ 4.3 Keeping Time',
  steps: `<ol>
    <li>ตั้งละติจูดมหาสารคาม (16.2° N) กดเล่น สังเกตทิศทางที่ดาวทุกดวงหมุนรอบขั้วฟ้า ลากภาพทรงกลมเพื่อหมุนมุมมอง</li>
    <li>เลือกดาวทดสอบทีละดวง บันทึกชนิดของดาว (รอบขั้วฟ้า / ขึ้น–ตก / ไม่ขึ้นเลย) มุมทิศที่ขึ้นและตก และมุมเงยสูงสุดขณะผ่านเมริเดียน</li>
    <li>เปลี่ยนละติจูดเป็น 0°, 45° N, 90° N และ 30° S สังเกตมุมเงยของขั้วฟ้าและขอบเขตของดาวรอบขั้วฟ้า</li>
    <li>ใช้มุมมองท้องฟ้าด้านล่าง (แบบพาโนรามา) ติดตามเส้นทางของดาวตลอดคืน</li></ol>`,
  theory: `<h3>ทรงกลมท้องฟ้า</h3>
    <p>ทรงกลมท้องฟ้าคือทรงกลมสมมติรัศมีไม่จำกัดที่มีโลกอยู่ที่ศูนย์กลาง ดาวทุกดวงดูเหมือนติดอยู่บนผิว การหมุนรอบตัวเองของโลกจากตะวันตกไปตะวันออกทำให้ทรงกลมท้องฟ้าดูหมุนจากตะวันออกไปตะวันตกรอบแกนที่ผ่านขั้วฟ้าเหนือและใต้ ครบรอบใน 1 วันดาราคติ (23 ชม. 56 นาที 4 วินาที)</p>
    <h3>ระบบพิกัด</h3>
    <p><b>ระบบขอบฟ้า:</b> มุมเงย (altitude, h) วัดจากขอบฟ้าขึ้นไป 0°–90° และมุมทิศ (azimuth, A) วัดจากทิศเหนือไปทางตะวันออก 0°–360° ค่าขึ้นกับผู้สังเกตและเวลา<br>
    <b>ระบบศูนย์สูตร:</b> ไรต์แอสเซนชัน (RA, α) วัดเป็นชั่วโมง 0–24 h ตามเส้นศูนย์สูตรฟ้าไปทางตะวันออก และเดคลิเนชัน (Dec, δ) วัดจากเส้นศูนย์สูตรฟ้า ±90° ค่าคงที่สำหรับดาวฤกษ์</p>
    <div class="eq">มุมชั่วโมง H = LST − α &nbsp;&nbsp; sin h = sin φ sin δ + cos φ cos δ cos H</div>
    <div class="eq">ขั้วฟ้ามีมุมเงย = |φ| &nbsp;&nbsp; ดาวรอบขั้วฟ้า (ซีกเหนือ): δ > 90° − φ &nbsp;&nbsp; ไม่ขึ้นเลย: δ < −(90° − φ)</div>
    <div class="eq">มุมเงยสูงสุดขณะผ่านเมริเดียน h_max = 90° − |φ − δ|</div>`,
  questions: [
    { q: 'ผลการสังเกตที่ละติจูด 16.2° N', table: { cols: ['ดาว', 'ชนิด', 'มุมทิศที่ขึ้น', 'มุมทิศที่ตก', 'มุมเงยสูงสุด'], rows: ['Polaris', 'Vega', 'Sirius', 'Antares', 'Acrux', 'Canopus'] } },
    { q: 'ที่ละติจูด 0°, 45° N และ 90° N ขั้วฟ้าเหนือมีมุมเงยเท่าใด และดาวรอบขั้วฟ้ามีเดคลิเนชันในช่วงใด', table: { cols: ['ละติจูด', 'มุมเงยขั้วฟ้าเหนือ', 'ดาวรอบขั้วฟ้า δ >', 'ดาวที่ไม่ขึ้น δ <'], rows: ['0°', '16.2° N', '45° N', '90° N'] } },
    { q: 'ดาวที่มีเดคลิเนชัน 0° ขึ้นและตกที่ทิศใด และอยู่เหนือขอบฟ้านานเท่าใด ไม่ว่าผู้สังเกตอยู่ละติจูดใด อธิบายเหตุผล' },
    { q: 'ทำไมคนไทยจึงมองเห็นกลุ่มดาวกางเขนใต้ได้ แต่คนที่อยู่ลอนดอน (51.5° N) มองไม่เห็น' },
    { q: 'อธิบายว่าเหตุใดพิกัด RA–Dec ของดาวจึงคงที่ แต่มุมเงย–มุมทิศเปลี่ยนตลอดเวลา' }
  ],
  mount(stage, ctrls) {
    const st = { lat: 16.18, lst: 20, star: 1, ra: 18.62, dec: 38.78, run: true, speed: 1.5, psi: 150, eps: 22, all: true, trail: [] };
    const sph = A.canvas(stage, { ratio: 0.62, min: 320, max: 560, cap: 'ทรงกลมท้องฟ้า (ลากเพื่อหมุนมุมมอง)' }, draw);
    const pan = A.canvas(stage, { ratio: 0.28, min: 200, max: 270, cap: 'มุมมองท้องฟ้าของผู้สังเกต (พาโนรามา 360°)' }, drawPan);
    AS.orbitDrag(sph, st, () => sph.redraw());
    const cur = () => { const H = (st.lst - st.ra) * 15; return AS.altaz(H, st.dec, st.lat); };
    function draw(ctx, W, H) {
      A.g.stars(ctx, W, H, 80);
      const S = new AS.Sphere(W / 2, H / 2 + 10, Math.min(W, H) * 0.4, st.psi, st.eps);
      // circumpolar caps
      const cap = 90 - Math.abs(st.lat);
      if (cap < 89.9) { S.dayCircle(ctx, Math.sign(st.lat || 1) * cap, st.lat, 'rgba(110,231,183,.6)', 1); S.dayCircle(ctx, -Math.sign(st.lat || 1) * cap, st.lat, 'rgba(255,143,128,.55)', 1); }
      S.base(ctx, st.lat);
      if (st.all) STARS.forEach((s, i) => { if (i === st.star) return; const q = AS.altaz((st.lst - s[1]) * 15, s[2], st.lat); const p = S.P(AS.enu(q.alt, q.az)); ctx.globalAlpha = q.alt >= 0 ? 0.85 : 0.3; A.g.circle(ctx, p.x, p.y, 2.6, COL[i]); ctx.globalAlpha = 1; });
      S.dayCircle(ctx, st.dec, st.lat, '#ffcc4d', 2);
      const q = cur(); const p = S.P(AS.enu(q.alt, q.az));
      const o = S.P([0, 0, 0]); A.g.line(ctx, o.x, o.y, p.x, p.y, 'rgba(255,204,77,.4)', 1, [2, 3]);
      A.g.circle(ctx, p.x, p.y, 6, q.alt >= 0 ? '#ffcc4d' : '#7a6a3a', '#fff', 1.2);
      A.g.text(ctx, '— ดาวรอบขั้วฟ้า (ขอบเขต)', 12, H - 30, { s: 12, c: '#6ee7b7' }); A.g.text(ctx, '— ไม่ขึ้นเหนือขอบฟ้า (ขอบเขต)', 12, H - 12, { s: 12, c: '#ff8f80' });
      A.g.text(ctx, 'เส้นประ = ใต้ขอบฟ้า', W - 12, H - 12, { s: 12, c: '#9aa7c7', a: 'right' });
    }
    function drawPan(ctx, W, H) {
      const box = { x: 40, y: 34, w: W - 56, h: H - 70 };
      const g = ctx.createLinearGradient(0, box.y, 0, box.y + box.h); g.addColorStop(0, '#070d22'); g.addColorStop(1, '#16244c'); ctx.fillStyle = g; ctx.fillRect(box.x, box.y, box.w, box.h);
      const ax = A.g.axes(ctx, box, { x0: 0, x1: 360, y0: 0, y1: 90, xt: [0, 90, 180, 270, 360], yt: [0, 30, 60, 90], xf: v => ({ 0: 'N', 90: 'E', 180: 'S', 270: 'W', 360: 'N' })[v], yf: v => v + '°' });
      ctx.fillStyle = 'rgba(56,120,90,.5)'; ctx.fillRect(box.x, box.y + box.h - 3, box.w, 3);
      // full-day track of the selected star
      ctx.beginPath(); let pv = null;
      for (let h = 0; h <= 24.01; h += 0.05) { const q = AS.altaz((h - st.ra) * 15, st.dec, st.lat); if (q.alt < 0) { pv = null; continue; } const x = ax.X(q.az), y = ax.Y(q.alt); if (pv == null || Math.abs(q.az - pv) > 180) ctx.moveTo(x, y); else ctx.lineTo(x, y); pv = q.az; }
      ctx.strokeStyle = 'rgba(255,204,77,.45)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
      if (st.all) STARS.forEach((s, i) => { const q = AS.altaz((st.lst - s[1]) * 15, s[2], st.lat); if (q.alt >= 0) { A.g.circle(ctx, ax.X(q.az), ax.Y(q.alt), 2.6, COL[i]); A.g.text(ctx, s[0].split(' ')[0], ax.X(q.az) + 5, ax.Y(q.alt) - 4, { s: 11, c: '#c7d2fe' }); } });
      const q = cur(); if (q.alt >= 0) A.g.circle(ctx, ax.X(q.az), ax.Y(q.alt), 5.5, '#ffcc4d', '#fff');
      else A.g.text(ctx, 'ดาวที่เลือกอยู่ใต้ขอบฟ้า', box.x + box.w / 2, box.y + box.h / 2, { a: 'center', s: 13, c: '#9aa7c7' });
    }
    A.ui.h(ctrls, 'ผู้สังเกตและเวลา');
    A.ui.range(ctrls, { label: 'ละติจูด φ', min: -90, max: 90, step: 0.1, value: st.lat, fmt: v => Math.abs(v).toFixed(1) + '° ' + (v >= 0 ? 'N' : 'S') }, v => { st.lat = v; all(); });
    const rt = A.ui.range(ctrls, { label: 'เวลาดาราคติท้องถิ่น (LST)', min: 0, max: 24, step: 0.01, value: st.lst, fmt: v => AS.hm(v).replace(' น.', ' h') }, v => { st.lst = v; all(); });
    A.ui.range(ctrls, { label: 'ความเร็วจำลอง', min: 0.2, max: 6, step: 0.1, value: st.speed, unit: 'ชม./วินาที' }, v => st.speed = v);
    const [bp] = A.ui.buttons(ctrls, [['หยุด', () => { st.run = !st.run; bp.textContent = st.run ? 'หยุด' : 'เล่น'; }]]);
    A.ui.h(ctrls, 'ดาวทดสอบ');
    const sel = A.ui.select(ctrls, { label: 'เลือกดาว', value: '1', options: STARS.map((s, i) => [String(i), s[0]]).concat([['c', 'กำหนดพิกัดเอง']]) }, v => { if (v !== 'c') { st.star = +v; st.ra = STARS[+v][1]; st.dec = STARS[+v][2]; ra.set(st.ra); de.set(st.dec); } else st.star = -1; all(); });
    const ra = A.ui.range(ctrls, { label: 'ไรต์แอสเซนชัน α', min: 0, max: 24, step: 0.01, value: st.ra, fmt: v => v.toFixed(2) + ' h' }, v => { st.ra = v; st.star = -1; sel.set('c'); all(); });
    const de = A.ui.range(ctrls, { label: 'เดคลิเนชัน δ', min: -90, max: 90, step: 0.1, value: st.dec, fmt: v => (v >= 0 ? '+' : '') + v.toFixed(1) + '°' }, v => { st.dec = v; st.star = -1; sel.set('c'); all(); });
    A.ui.check(ctrls, { label: 'แสดงดาวสว่างอื่น ๆ', value: true }, v => { st.all = v; all(); });
    const out = A.ui.out(ctrls, [['type', 'ชนิดของดาว'], ['alt', 'มุมเงย h'], ['az', 'มุมทิศ A'], ['ha', 'มุมชั่วโมง H'], ['rise', 'ขึ้นที่มุมทิศ'], ['set', 'ตกที่มุมทิศ'], ['hmax', 'มุมเงยสูงสุด'], ['up', 'เวลาอยู่เหนือขอบฟ้า']]);
    function all() {
      sph.redraw(); pan.redraw();
      const q = cur(); let H = AS.norm((st.lst - st.ra) * 15); if (H > 180) H -= 360;
      out.set('alt', q.alt.toFixed(1) + '°'); out.set('az', q.az.toFixed(1) + '° (' + AS.dirName(q.az) + ')'); out.set('ha', (H / 15).toFixed(2) + ' h');
      const sa = AS.semiArc(st.dec, st.lat);
      out.set('type', sa >= 180 ? 'ดาวรอบขั้วฟ้า (ไม่ตก)' : sa <= 0 ? 'ไม่ขึ้นเหนือขอบฟ้า' : 'ขึ้นและตก');
      if (sa > 0 && sa < 180) { const r = AS.altaz(-sa, st.dec, st.lat), s = AS.altaz(sa, st.dec, st.lat); out.set('rise', r.az.toFixed(1) + '°'); out.set('set', s.az.toFixed(1) + '°'); } else { out.set('rise', '–'); out.set('set', '–'); }
      const hm = 90 - Math.abs(st.lat - st.dec); out.set('hmax', hm > 0 ? hm.toFixed(1) + '° ทาง' + (st.dec < st.lat ? 'ใต้' : 'เหนือ') : 'ไม่ขึ้น');
      out.set('up', (2 * sa / 15).toFixed(2) + ' ชม.ดาราคติ');
    }
    A.loop(dt => { if (!st.run) return; st.lst = (st.lst + dt * st.speed) % 24; rt.set(st.lst); all(); });
    all();
  }
});
})();
