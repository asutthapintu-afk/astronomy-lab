(function(){
const PRE = {
  algol: ['คล้ายดาวอัลกอล (β Persei)', { m1: 3.17, m2: 0.70, r1: 2.73, r2: 3.48, t1: 12500, t2: 4500, a: 14.1, i: 81.4 }],
  twin: ['ดาวคล้ายดวงอาทิตย์ 2 ดวง', { m1: 1, m2: 1, r1: 1, r2: 1, t1: 5800, t2: 5800, a: 6, i: 90 }],
  diff: ['ดาวร้อนเล็ก + ดาวเย็นใหญ่', { m1: 2, m2: 1, r1: 1.5, r2: 2.5, t1: 9000, t2: 4500, a: 8, i: 88 }],
  graze: ['อุปราคาบางส่วน (i ต่ำ)', { m1: 1.5, m2: 1.2, r1: 1.6, r2: 1.3, t1: 7000, t2: 6000, a: 7, i: 76 }],
  planet: ['ดาวเคราะห์ผ่านหน้าดาวฤกษ์ (Hot Jupiter)', { m1: 1, m2: 0.001, r1: 1, r2: 0.1, t1: 5800, t2: 1200, a: 10, i: 88.5 }]
};
const tCol = T => { const u = Math.max(0, Math.min(1, (Math.log10(T) - 3.45) / 1.0)); return `rgb(${Math.round(255 - u * 80)},${Math.round(150 + u * 80)},${Math.round(90 + u * 165)})`; };
function overlap(d, r1, r2) {   // area of intersection of two circles
  if (d >= r1 + r2) return 0;
  if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) ** 2;
  const a = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1)), b = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
  return a + b - 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
}
A.reg({
  id: 'lab-ebin', no: 10, title: 'ดาวคู่อุปราคา', short: 'กราฟแสงของระบบดาวคู่ที่บังกัน ผลของรัศมี อุณหภูมิ และมุมเอียงวงโคจร พร้อมกราฟความเร็วตามแนวเล็ง',
  courses: ['2015231 · สัปดาห์ 13'], ref: 'OpenStax Astronomy 2e หัวข้อ 18.2 Measuring Stellar Masses และ 18.3 Diameters of Stars',
  steps: `<ol>
    <li>เลือก “ดาวคล้ายดวงอาทิตย์ 2 ดวง” กดเล่น สังเกตภาพดาวที่เห็นจากโลกและกราฟแสง ระบุตำแหน่งที่เกิดอุปราคา</li>
    <li>เพิ่มอุณหภูมิของดาวดวงที่ 1 เป็น 9,000 K สังเกตว่าอุปราคาปฐมภูมิ (ลึกกว่า) เกิดเมื่อดาวดวงใดถูกบัง</li>
    <li>ลดมุมเอียง i จาก 90° ลงทีละน้อย หามุมที่อุปราคาหายไป และเทียบกับเงื่อนไข cos i &lt; (R₁+R₂)/a</li>
    <li>เปลี่ยนรัศมีของดาว สังเกตความกว้างและรูปทรงของหลุมแสง (ก้นแบนเมื่อเกิดอุปราคาเต็มดวง)</li>
    <li>เลือก “ดาวเคราะห์ผ่านหน้าดาวฤกษ์” วัดความลึกของหลุมแสง แล้วคำนวณรัศมีดาวเคราะห์จาก ΔF/F ≈ (R_p/R_*)²</li></ol>`,
  theory: `<h3>ดาวคู่อุปราคา</h3>
    <p>ถ้าระนาบวงโคจรของดาวคู่เกือบอยู่ในแนวเล็งของเรา (มุมเอียง i ใกล้ 90°) ดาวทั้งสองจะบังกันสลับไปมา ทำให้ความสว่างรวมลดลงเป็นคาบ กราฟความสว่างตามเวลาเรียกว่า <b>กราฟแสง (light curve)</b> ซึ่งมีหลุมแสง 2 แห่งต่อหนึ่งคาบ</p>
    <ul><li><b>อุปราคาปฐมภูมิ</b> (ลึกกว่า) เกิดเมื่อดาวที่มีอุณหภูมิผิวสูงกว่าถูกบัง เพราะความสว่างต่อหน่วยพื้นที่ ∝ T⁴</li><li>ระยะเวลาของอุปราคาบอก <b>รัศมี</b> ของดาวเทียบกับขนาดวงโคจร</li><li>เมื่อรวมกับกราฟความเร็วตามแนวเล็ง (สเปกโทรสโกปี) จะได้ <b>มวลของดาวทั้งสอง</b> โดยตรง</li></ul>
    <div class="eq">ฟลักซ์จากดาว F ∝ R²T⁴ &nbsp;&nbsp; เงื่อนไขเกิดอุปราคา: a cos i &lt; R₁ + R₂</div>
    <div class="eq">กฎข้อ 3 ของเคปเลอร์ (นิวตัน): M₁ + M₂ = a³ / P² &nbsp; (a ใน AU, P ในปี, M ในมวลดวงอาทิตย์)</div>
    <div class="eq">ความเร็วตามแนวเล็ง: K₁ = 2πa₁ sin i / P &nbsp;&nbsp; M₁/M₂ = K₂/K₁</div>
    <p class="note">ตัวจำลองใช้วงโคจรวงกลมและจานดาวสว่างสม่ำเสมอ (ไม่คิดการมืดคล้ำที่ขอบ) ดาวจริงจึงมีหลุมแสงโค้งมนกว่าเล็กน้อย</p>`,
  questions: [
    { q: 'ผลของอุณหภูมิต่อความลึกของหลุมแสง', table: { cols: ['T₁ (K)', 'T₂ (K)', 'ความลึกอุปราคาปฐมภูมิ', 'ความลึกอุปราคาทุติยภูมิ', 'ดาวที่ถูกบังในอุปราคาปฐมภูมิ'], rows: ['5800', '9000', '12000'] } },
    { q: 'มุมเอียงต่ำสุดที่ยังเกิดอุปราคาสำหรับระบบ “ดาวคล้ายดวงอาทิตย์ 2 ดวง” (a = 6 R☉) จากตัวจำลองและจากการคำนวณ' },
    { q: 'กราฟแสงแบบก้นแบนหมายความว่าอย่างไร เกิดได้ในเงื่อนไขใด' },
    { q: 'ระบบ Hot Jupiter: ความลึกของหลุมแสงเท่าใด คำนวณรัศมีดาวเคราะห์เป็นหน่วยรัศมีดาวพฤหัสบดี (R☉ ≈ 9.73 R_J)' },
    { q: 'จากกราฟความเร็วตามแนวเล็งของระบบ “คล้ายดาวอัลกอล” อ่านค่า K₁, K₂ แล้วคำนวณอัตราส่วนมวล M₁/M₂ เทียบกับค่าที่ตั้งไว้' }
  ],
  mount(stage, ctrls) {
    const st = Object.assign({ ph: 0.85, run: true, speed: 0.12 }, PRE.twin[1]);
    const r = A.el('div', { class: 'duo' }); stage.append(r);
    const sky = A.canvas(r, { ratio: 0.62, min: 220, max: 320, cap: 'ภาพที่เห็นจากโลก (ขยายมาก)' }, drawSky);
    const top = A.canvas(r, { ratio: 0.62, min: 220, max: 320, cap: 'มุมมองจากด้านบนของระนาบวงโคจร' }, drawTop);
    const lc = A.canvas(stage, { ratio: 0.3, min: 220, max: 290, cap: 'กราฟแสง (ฟลักซ์สัมพัทธ์เทียบเฟส)' }, drawLC);
    const rv = A.canvas(stage, { ratio: 0.22, min: 180, max: 230, cap: 'กราฟความเร็วตามแนวเล็ง' }, drawRV);
    const M = () => st.m1 + st.m2;
    const P = () => 365.25 * Math.sqrt((st.a / 215.03) ** 3 / M());
    const pos = ph => { const th = 2 * Math.PI * ph + Math.PI / 2, ci = Math.cos(st.i * AS.D), si = Math.sin(st.i * AS.D); const f1 = -st.m2 / M(), f2 = st.m1 / M(); const x = st.a * Math.cos(th), y = st.a * Math.sin(th); return { s1: [f1 * x, f1 * y * ci, f1 * y * si], s2: [f2 * x, f2 * y * ci, f2 * y * si], th }; };
    const flux = ph => {
      const p = pos(ph), d = Math.hypot(p.s2[0] - p.s1[0], p.s2[1] - p.s1[1]);
      const f1 = st.r1 ** 2 * st.t1 ** 4, f2 = st.r2 ** 2 * st.t2 ** 4, tot = f1 + f2;
      const ov = overlap(d, st.r1, st.r2) / Math.PI;
      const lost = p.s2[2] > p.s1[2] ? ov * st.t1 ** 4 : ov * st.t2 ** 4;
      return (tot - lost) / tot;
    };
    let curve = [];
    const build = () => { curve = []; for (let k = 0; k <= 600; k++) curve.push(flux(k / 600)); };
    function drawSky(ctx, W, H) {
      A.g.stars(ctx, W, H, 50);
      const p = pos(st.ph), ext = Math.max(st.a * 0.5 + Math.max(st.r1, st.r2), st.r1 + st.r2) * 1.15;
      const sc = Math.min(W / 2, H / 2 - 14) / ext, cx = W / 2, cy = H / 2 + 8;
      const bodies = [[p.s1, st.r1, st.t1, '1'], [p.s2, st.r2, st.t2, '2']].sort((a, b) => a[0][2] - b[0][2]);
      bodies.forEach(([s, rr, T, n]) => { const g = ctx.createRadialGradient(cx + s[0] * sc, cy - s[1] * sc, 0, cx + s[0] * sc, cy - s[1] * sc, Math.max(1, rr * sc)); g.addColorStop(0, '#fff'); g.addColorStop(0.5, tCol(T)); g.addColorStop(1, tCol(T)); A.g.circle(ctx, cx + s[0] * sc, cy - s[1] * sc, Math.max(1.5, rr * sc), g); A.g.text(ctx, n, cx + s[0] * sc, cy - s[1] * sc + Math.max(1.5, rr * sc) + 14, { a: 'center', s: 12, w: 700 }); });
    }
    function drawTop(ctx, W, H) {
      A.g.stars(ctx, W, H, 40);
      const sc = Math.min(W, H) * 0.36 / (st.a * Math.max(st.m1, st.m2) / M() + Math.max(st.r1, st.r2)), cx = W / 2, cy = H / 2 + 4;
      const a1 = st.a * st.m2 / M(), a2 = st.a * st.m1 / M(), th = pos(st.ph).th;
      A.g.circle(ctx, cx, cy, a1 * sc, null, 'rgba(255,255,255,.2)'); A.g.circle(ctx, cx, cy, a2 * sc, null, 'rgba(255,255,255,.2)');
      A.g.circle(ctx, cx, cy, 2, '#9aa7c7');
      A.g.circle(ctx, cx - a1 * sc * Math.cos(th), cy - a1 * sc * Math.sin(th), Math.max(2, st.r1 * sc), tCol(st.t1));
      A.g.circle(ctx, cx + a2 * sc * Math.cos(th), cy + a2 * sc * Math.sin(th), Math.max(2, st.r2 * sc), tCol(st.t2));
      A.g.arrow(ctx, cx, H - 26, cx, H - 6, '#7dd3fc', 1.5); A.g.text(ctx, 'ไปยังโลก', cx + 8, H - 10, { s: 11.5, c: '#7dd3fc' });
      A.g.text(ctx, 'จุดศูนย์กลางมวล', cx + 6, cy - 6, { s: 11, c: '#9aa7c7' });
    }
    function drawLC(ctx, W, H) {
      const lo = Math.min(...curve), y0 = Math.max(0, lo - (1 - lo) * 0.15 - 0.001);
      const box = { x: 56, y: 36, w: W - 74, h: H - 76 };
      const ax = A.g.axes(ctx, box, { x0: 0, x1: 1, y0, y1: 1 + (1 - y0) * 0.08, xt: [0, 0.25, 0.5, 0.75, 1], yt: [y0, (y0 + 1) / 2, 1].map(v => +v.toFixed(4)), yf: v => v.toFixed(3), xl: 'เฟส (คาบ P = ' + P().toFixed(2) + ' วัน)' });
      ctx.beginPath(); curve.forEach((f, k) => { const x = ax.X(k / 600), y = ax.Y(f); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.strokeStyle = '#ffcc4d'; ctx.lineWidth = 2; ctx.stroke();
      const f = flux(st.ph); A.g.circle(ctx, ax.X(st.ph), ax.Y(f), 5, '#7dd3fc', '#fff');
    }
    function drawRV(ctx, W, H) {
      const per = P() * 86400, si = Math.sin(st.i * AS.D), K1 = 2 * Math.PI * st.a * 696000 * st.m2 / M() * si / per, K2 = 2 * Math.PI * st.a * 696000 * st.m1 / M() * si / per;
      const Km = Math.max(K1, K2, 1) * 1.15, box = { x: 84, y: 32, w: W - 102, h: H - 64 };
      const ax = A.g.axes(ctx, box, { x0: 0, x1: 1, y0: -Km, y1: Km, xt: [0, 0.25, 0.5, 0.75, 1], yt: [-Math.round(Km * 0.8), 0, Math.round(Km * 0.8)], yf: v => v + ' km/s' });
      // radial velocity: positive = receding. star2 moves with d/dt of depth z = -v_r
      const plot = (K, sgn, col) => { ctx.beginPath(); for (let k = 0; k <= 200; k++) { const ph = k / 200, v = sgn * K * Math.cos(2 * Math.PI * ph + Math.PI / 2); const x = ax.X(ph), y = ax.Y(v); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.stroke(); };
      plot(K1, 1, tCol(st.t1)); plot(K2, -1, tCol(st.t2));
      A.g.line(ctx, ax.X(st.ph), box.y, ax.X(st.ph), box.y + box.h, 'rgba(125,211,252,.6)', 1);
      A.g.text(ctx, `K₁ = ${K1.toFixed(1)} km/s   K₂ = ${K2.toFixed(1)} km/s`, W - 18, 24, { s: 12, a: 'right', c: '#c7d2fe' });
    }
    A.ui.h(ctrls, 'ระบบดาวคู่');
    const sel = A.ui.select(ctrls, { label: 'ระบบตัวอย่าง', value: 'twin', options: Object.entries(PRE).map(([k, v]) => [k, v[0]]).concat([['c', 'กำหนดเอง']]) }, k => { if (k === 'c') return; Object.assign(st, PRE[k][1]); Object.keys(ctl).forEach(n => ctl[n].set(st[n])); all(); });
    const ctl = {};
    const add = (k, label, min, max, step, unit, fmt) => ctl[k] = A.ui.range(ctrls, { label, min, max, step, value: st[k], unit, fmt }, v => { st[k] = v; sel.set('c'); all(); });
    add('m1', 'มวลดาว 1 (M☉)', 0.1, 10, 0.01); add('m2', 'มวลดาว 2 (M☉)', 0.001, 10, 0.001);
    add('r1', 'รัศมีดาว 1 (R☉)', 0.05, 6, 0.01); add('r2', 'รัศมีดาว 2 (R☉)', 0.05, 6, 0.01);
    add('t1', 'อุณหภูมิดาว 1', 3000, 30000, 100, 'K'); add('t2', 'อุณหภูมิดาว 2', 1000, 30000, 100, 'K');
    add('a', 'ระยะห่าง a (R☉)', 2, 30, 0.1); add('i', 'มุมเอียงวงโคจร i', 60, 90, 0.1, '°');
    A.ui.range(ctrls, { label: 'ความเร็วจำลอง', min: 0.02, max: 0.5, step: 0.01, value: st.speed, unit: 'คาบ/วินาที' }, v => st.speed = v);
    const [bp] = A.ui.buttons(ctrls, [['หยุด', () => { st.run = !st.run; bp.textContent = st.run ? 'หยุด' : 'เล่น'; }]]);
    const out = A.ui.out(ctrls, [['P', 'คาบการโคจร'], ['f', 'ฟลักซ์ขณะนี้'], ['d1', 'ความลึกหลุมแสง (เฟส 0)'], ['d2', 'ความลึกหลุมแสง (เฟส 0.5)'], ['ecl', 'เงื่อนไขอุปราคา']]);
    function all() {
      build(); sky.redraw(); top.redraw(); lc.redraw(); rv.redraw();
      out.set('P', P().toFixed(3) + ' วัน'); out.set('f', flux(st.ph).toFixed(4));
      out.set('d1', ((1 - flux(0)) * 100).toFixed(2) + '%'); out.set('d2', ((1 - flux(0.5)) * 100).toFixed(2) + '%');
      const c = st.a * Math.cos(st.i * AS.D); out.set('ecl', c < st.r1 + st.r2 ? `เกิด (a cos i = ${c.toFixed(2)} < ${(st.r1 + st.r2).toFixed(2)})` : `ไม่เกิด (a cos i = ${c.toFixed(2)})`);
    }
    A.loop(dt => { if (!st.run) return; st.ph = (st.ph + dt * st.speed) % 1; sky.redraw(); top.redraw(); lc.redraw(); rv.redraw(); out.set('f', flux(st.ph).toFixed(4)); });
    all();
  }
});
})();
