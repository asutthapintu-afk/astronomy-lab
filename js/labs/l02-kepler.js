(function(){
const PRE = { earth: ['โลก', 1, 0.017], mercury: ['ดาวพุธ', 0.387, 0.206], mars: ['ดาวอังคาร', 1.524, 0.093], jupiter: ['ดาวพฤหัสบดี', 5.203, 0.049], pluto: ['ดาวพลูโต', 39.48, 0.249], halley: ['ดาวหางฮัลเลย์', 17.83, 0.967], custom: ['กำหนดเอง', 1, 0.5] };
const SUP = { '-2': '⁻²', 0: '⁰', 2: '²', 4: '⁴', 6: '⁶' };
const REF = [['พุธ', 0.387, 0.241], ['ศุกร์', 0.723, 0.615], ['โลก', 1, 1], ['อังคาร', 1.524, 1.881], ['พฤหัสฯ', 5.203, 11.86], ['เสาร์', 9.537, 29.45], ['ยูเรนัส', 19.19, 84.0], ['เนปจูน', 30.07, 164.8]];
A.reg({
  id: 'lab-kepler', no: 2, title: 'วงโคจรของดาวเคราะห์และกฎของเคปเลอร์', short: 'สำรวจวงรี ความรีของวงโคจร กฎพื้นที่เท่ากันในเวลาเท่ากัน และความสัมพันธ์ P² = a³',
  courses: ['2015326 · ปฏิบัติการที่ 2', '2015231 · สัปดาห์ 3'], ref: 'OpenStax Astronomy 2e หัวข้อ 3.1 The Laws of Planetary Motion และ 3.4 Orbits in the Solar System',
  steps: `<ol>
    <li><b>กฎข้อ 1:</b> เลือก “กำหนดเอง” แล้วเปิด “เส้นจากจุดโฟกัสทั้งสอง” ปรับความรี e จาก 0 ถึง 0.9 สังเกตว่า r₁ + r₂ คงที่เท่ากับ 2a เสมอ</li>
    <li><b>กฎข้อ 2:</b> เปิด “แสดงพื้นที่กวาด” ซึ่งแบ่งคาบเป็นช่วงเวลาเท่ากัน 8 ช่วง อ่านค่าพื้นที่แต่ละช่วงในแผงผลลัพธ์ และสังเกตอัตราเร็วที่จุดใกล้ดวงอาทิตย์ที่สุดกับไกลที่สุด</li>
    <li><b>กฎข้อ 3:</b> เลือกดาวเคราะห์ต่าง ๆ บันทึก a และคาบ P ลงตาราง แล้วดูกราฟ P² กับ a³ ด้านล่าง</li>
    <li>เลือกดาวหางฮัลเลย์ สังเกตอัตราเร็วที่จุดใกล้และไกลดวงอาทิตย์ที่สุด</li></ol>`,
  theory: `<h3>กฎ 3 ข้อของเคปเลอร์</h3>
    <p><b>ข้อ 1 กฎวงรี</b> — ดาวเคราะห์โคจรเป็นวงรีโดยมีดวงอาทิตย์อยู่ที่โฟกัสหนึ่ง ความรี e = c/a โดย c คือระยะจากจุดศูนย์กลางถึงโฟกัส และผลรวมระยะจากโฟกัสทั้งสองคงที่ r₁ + r₂ = 2a</p>
    <div class="eq">ระยะใกล้สุด q = a(1 − e) &nbsp;&nbsp; ระยะไกลสุด Q = a(1 + e)</div>
    <p><b>ข้อ 2 กฎพื้นที่</b> — เส้นเชื่อมดาวเคราะห์กับดวงอาทิตย์กวาดพื้นที่เท่ากันในเวลาเท่ากัน (ผลจากการอนุรักษ์โมเมนตัมเชิงมุม) ดาวเคราะห์จึงเร็วที่สุดที่จุดใกล้ดวงอาทิตย์ (perihelion)</p>
    <div class="eq">v² = GM (2/r − 1/a) &nbsp;&nbsp; (สมการวิส-วิวา)</div>
    <p><b>ข้อ 3 กฎฮาร์มอนิก</b> — กำลังสองของคาบแปรผันตรงกับกำลังสามของกึ่งแกนเอก เมื่อใช้หน่วยปีและหน่วยดาราศาสตร์ (AU) สำหรับวัตถุที่โคจรรอบดวงอาทิตย์</p>
    <div class="eq">P² = a³ &nbsp;&nbsp; (รูปทั่วไปของนิวตัน: P² = 4π²a³ / G(M + m))</div>`,
  questions: [
    { q: 'ปรับ e เป็น 0, 0.3, 0.6, 0.9 (a คงที่) แล้วบันทึกค่า', table: { cols: ['e', 'r₁ + r₂ (AU)', 'ระยะใกล้สุด q (AU)', 'ระยะไกลสุด Q (AU)'], rows: ['0', '0.3', '0.6', '0.9'] } },
    { q: 'จากการแสดงพื้นที่กวาด พื้นที่ในแต่ละช่วงเวลาเท่ากันหรือไม่ ดาวเคราะห์เคลื่อนที่เร็วที่สุดและช้าที่สุดที่ตำแหน่งใด อธิบายด้วยกฎข้อ 2' },
    { q: 'บันทึกคาบและกึ่งแกนเอกของวัตถุต่าง ๆ แล้วคำนวณ P²/a³', table: { cols: ['วัตถุ', 'a (AU)', 'P (ปี)', 'P²/a³'], rows: ['ดาวพุธ', 'ดาวอังคาร', 'ดาวพฤหัสบดี', 'ดาวพลูโต', 'ดาวหางฮัลเลย์'] } },
    { q: 'ดาวหางฮัลเลย์มีอัตราเร็วที่จุดใกล้ดวงอาทิตย์ที่สุดมากกว่าที่จุดไกลที่สุดกี่เท่า เทียบกับอัตราส่วน Q/q' },
    { q: 'ถ้าดาวเคราะห์น้อยดวงหนึ่งมีคาบ 8 ปี กึ่งแกนเอกของมันเป็นเท่าใด แสดงวิธีคิด แล้วตรวจคำตอบด้วยตัวจำลอง' }
  ],
  mount(stage, ctrls) {
    const KIND = { earth: 'earth', mercury: 'mercury', mars: 'mars', jupiter: 'jupiter', pluto: 'pluto', halley: 'comet' };
    const st = { kind: 'mars', a: 1.524, e: 0.093, M: 0, run: true, speed: 0.15, foci: true, sweep: true, vec: true };
    const orb = A.canvas(stage, { ratio: 0.6, min: 300, max: 520, cap: 'วงโคจร (ดวงอาทิตย์อยู่ที่โฟกัส F₁)' }, draw);
    const g3 = A.canvas(stage, { ratio: 0.3, min: 220, max: 280, cap: 'กฎข้อ 3: P² เทียบกับ a³ (สเกลลอการิทึม)' }, draw3);
    const P = () => Math.pow(st.a, 1.5);
    const pos = M => { const E = AS.kepler(M, st.e); const x = st.a * (Math.cos(E) - st.e), y = st.a * Math.sqrt(1 - st.e * st.e) * Math.sin(E); return { x, y, r: Math.hypot(x, y), E }; };
    function draw(ctx, W, H) {
      A.g.stars(ctx, W, H, 90);
      const a = st.a, e = st.e, b = a * Math.sqrt(1 - e * e), c = a * e;
      const sc = Math.min((W - 40) / (2 * a), (H - 50) / (2 * b));
      const ox = W / 2 + c * sc, oy = H / 2 + 6;     // sun (focus) screen position; ellipse center at ox - c*sc
      const X = x => ox + x * sc, Y = y => oy - y * sc;
      if (st.sweep) {
        const n = 8;
        for (let k = 0; k < n; k++) {
          ctx.beginPath(); ctx.moveTo(X(0), Y(0));
          for (let j = 0; j <= 30; j++) { const p = pos(2 * Math.PI * (k + j / 30) / n); ctx.lineTo(X(p.x), Y(p.y)); }
          ctx.closePath(); ctx.fillStyle = k % 2 ? 'rgba(125,211,252,.16)' : 'rgba(165,180,252,.28)'; ctx.fill();
        }
      }
      ctx.beginPath(); ctx.ellipse(X(-c), Y(0), a * sc, b * sc, 0, 0, 7); ctx.strokeStyle = 'rgba(233,237,248,.6)'; ctx.lineWidth = 1.4; ctx.stroke();
      A.g.line(ctx, X(-c - a), Y(0), X(-c + a), Y(0), 'rgba(150,160,200,.35)', 1, [3, 4]);
      A.g.circle(ctx, X(-c), Y(0), 2.5, '#9aa7c7'); A.g.text(ctx, 'C', X(-c) - 4, Y(0) + 16, { s: 11.5, c: '#9aa7c7' });
      const p = pos(st.M);
      if (st.foci) {
        A.g.circle(ctx, X(-2 * c), Y(0), 3, null, '#a5b4fc', 1.5); A.g.text(ctx, 'F₂', X(-2 * c) - 6, Y(0) + 18, { s: 12, c: '#a5b4fc' });
        A.g.line(ctx, X(0), Y(0), X(p.x), Y(p.y), '#ffcc4d', 1.3); A.g.line(ctx, X(-2 * c), Y(0), X(p.x), Y(p.y), '#a5b4fc', 1.3);
      }
      A.g.sun(ctx, X(0), Y(0), 8); A.g.text(ctx, 'F₁', X(0) + 6, Y(0) + 20, { s: 12, c: '#ffcc4d' });
      A.g.text(ctx, 'จุดใกล้ที่สุด', X(a - c) - 4, Y(0) - 10, { s: 11.5, a: 'right', c: '#9aa7c7' });
      A.g.text(ctx, 'จุดไกลที่สุด', X(-a - c) + 4, Y(0) - 10, { s: 11.5, c: '#9aa7c7' });
      if (st.vec) {
        const E = p.E, vx = -Math.sin(E), vy = Math.sqrt(1 - e * e) * Math.cos(E), n = Math.hypot(vx, vy);
        const v = 29.78 * Math.sqrt(2 / p.r - 1 / a), vmax = 29.78 * Math.sqrt((1 + e) / (a * (1 - e)));
        const Lv = 70 * v / vmax;
        A.g.arrow(ctx, X(p.x), Y(p.y), X(p.x) + vx / n * Lv, Y(p.y) - vy / n * Lv, '#6ee7b7', 2);
      }
      PLANET.draw(ctx, X(p.x), Y(p.y), st.kind === 'jupiter' ? 11 : st.kind === 'comet' ? 4 : 8, st.kind, { sun: Math.atan2(Y(0) - Y(p.y), X(0) - X(p.x)) });
    }
    function draw3(ctx, W, H) {
      const box = { x: 58, y: 34, w: W - 80, h: H - 78 };
      const lg = Math.log10;
      const ax = A.g.axes(ctx, box, { x0: -2, x1: 6, y0: -2, y1: 6, xt: [-2, 0, 2, 4, 6], yt: [-2, 0, 2, 4, 6], xf: v => '10' + SUP[v], yf: v => '10' + SUP[v], xl: 'a³ (AU³)', yl: 'P² (ปี²)' });
      A.g.line(ctx, ax.X(-2), ax.Y(-2), ax.X(6), ax.Y(6), 'rgba(255,204,77,.5)', 1.2, [5, 4]);
      REF.forEach(([n, a, p]) => { A.g.circle(ctx, ax.X(3 * lg(a)), ax.Y(2 * lg(p)), 3.5, '#a5b4fc'); A.g.text(ctx, n, ax.X(3 * lg(a)) + 6, ax.Y(2 * lg(p)) + 14, { s: 11, c: '#9aa7c7' }); });
      A.g.circle(ctx, ax.X(3 * lg(st.a)), ax.Y(2 * lg(P())), 6, null, '#7dd3fc', 2.5);
      A.g.text(ctx, 'เส้น P² = a³', ax.X(4.6), ax.Y(5.4), { s: 12, c: '#ffcc4d', a: 'right' });
    }
    A.ui.h(ctrls, 'วงโคจร');
    const pre = A.ui.select(ctrls, { label: 'วัตถุตัวอย่าง', value: 'mars', options: Object.entries(PRE).map(([k, v]) => [k, v[0]]) }, k => { if (KIND[k]) st.kind = KIND[k]; if (k !== 'custom') { ra.set(PRE[k][1]); re.set(PRE[k][2]); st.a = PRE[k][1]; st.e = PRE[k][2]; } all(); });
    const ra = A.ui.range(ctrls, { label: 'กึ่งแกนเอก a', min: 0.2, max: 50, step: 0.001, value: st.a, unit: 'AU', fmt: v => v.toFixed(3) }, v => { st.a = v; pre.set('custom'); all(); });
    const re = A.ui.range(ctrls, { label: 'ความรี e', min: 0, max: 0.97, step: 0.001, value: st.e, fmt: v => v.toFixed(3) }, v => { st.e = v; pre.set('custom'); all(); });
    A.ui.check(ctrls, { label: 'เส้นจากจุดโฟกัสทั้งสอง (กฎข้อ 1)', value: true }, v => { st.foci = v; all(); });
    A.ui.check(ctrls, { label: 'แสดงพื้นที่กวาด 8 ช่วงเวลาเท่ากัน (กฎข้อ 2)', value: true }, v => { st.sweep = v; all(); });
    A.ui.check(ctrls, { label: 'เวกเตอร์ความเร็ว', value: true }, v => { st.vec = v; all(); });
    A.ui.range(ctrls, { label: 'ความเร็วจำลอง', min: 0.02, max: 0.6, step: 0.01, value: st.speed, unit: 'รอบ/วินาที' }, v => st.speed = v);
    const [bp] = A.ui.buttons(ctrls, [['หยุด', () => { st.run = !st.run; bp.textContent = st.run ? 'หยุด' : 'เล่น'; }]]);
    const out = A.ui.out(ctrls, [['P', 'คาบ P'], ['r1', 'r₁ (ถึงดวงอาทิตย์)'], ['r2', 'r₂ (ถึง F₂)'], ['sum', 'r₁ + r₂'], ['v', 'อัตราเร็วขณะนี้'], ['vp', 'อัตราเร็วที่จุดใกล้สุด'], ['va', 'อัตราเร็วที่จุดไกลสุด'], ['area', 'พื้นที่ 1 ช่วง (1/8 คาบ)']]);
    function all() {
      orb.redraw(); g3.redraw();
      const p = pos(st.M), a = st.a, e = st.e, r2 = Math.hypot(p.x + 2 * a * e, p.y);
      const Pv = P(); out.set('P', Pv < 2 ? (Pv * 365.25).toFixed(1) + ' วัน (' + Pv.toFixed(3) + ' ปี)' : Pv.toFixed(3) + ' ปี');
      out.set('r1', p.r.toFixed(3) + ' AU'); out.set('r2', r2.toFixed(3) + ' AU'); out.set('sum', (p.r + r2).toFixed(3) + ' AU');
      out.set('v', (29.78 * Math.sqrt(2 / p.r - 1 / a)).toFixed(2) + ' km/s');
      out.set('vp', (29.78 * Math.sqrt((1 + e) / (a * (1 - e)))).toFixed(2) + ' km/s'); out.set('va', (29.78 * Math.sqrt((1 - e) / (a * (1 + e)))).toFixed(2) + ' km/s');
      out.set('area', (Math.PI * a * a * Math.sqrt(1 - e * e) / 8).toFixed(4) + ' AU²');
    }
    A.loop(dt => { if (!st.run) return; st.M = (st.M + dt * st.speed * 2 * Math.PI) % (2 * Math.PI); orb.redraw(); all(); });
    all();
  }
});
})();
