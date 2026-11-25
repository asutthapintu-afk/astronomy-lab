(function(){
const PL = { mercury: ['ดาวพุธ', 0.387, '#c9b9a6'], venus: ['ดาวศุกร์', 0.723, '#f3dca2'], mars: ['ดาวอังคาร', 1.524, '#ff8f6b'], jupiter: ['ดาวพฤหัสบดี', 5.203, '#e6c59a'], saturn: ['ดาวเสาร์', 9.537, '#e8d7a6'] };
A.reg({
  id: 'lab-models', no: 1, title: 'แบบจำลองระบบสุริยะ', short: 'เปรียบเทียบแบบจำลองโลกเป็นศูนย์กลางของทอเลมีกับดวงอาทิตย์เป็นศูนย์กลางของโคเปอร์นิคัส การเคลื่อนที่ถอยหลังและเฟสของดาวศุกร์',
  courses: ['2015326 · ปฏิบัติการที่ 1', '2015231 · สัปดาห์ 2'], ref: 'OpenStax Astronomy 2e หัวข้อ 2.2 Ancient Astronomy และ 2.4 The Birth of Modern Astronomy',
  steps: `<ol>
    <li>เลือก <b>แบบจำลองดวงอาทิตย์เป็นศูนย์กลาง</b> และดาวเคราะห์ “ดาวอังคาร” กดเล่น สังเกตเส้นเล็งจากโลกไปยังดาวอังคาร และกราฟลองจิจูดสุริยวิถีด้านล่าง</li>
    <li>หาช่วงที่ดาวอังคาร <b>เคลื่อนที่ถอยหลัง</b> (เส้นบนกราฟเบนไปทางขวา) ตรวจว่าขณะนั้นโลกกับดาวอังคารอยู่ตำแหน่งใดเทียบกับดวงอาทิตย์ บันทึกภาพ</li>
    <li>เปลี่ยนเป็นดาวศุกร์ สังเกตภาพ “ดาวเคราะห์ที่เห็นจากโลก” บันทึกเฟสและขนาดปรากฏที่มุมห่างต่าง ๆ</li>
    <li>เปลี่ยนเป็น <b>แบบจำลองโลกเป็นศูนย์กลาง (ทอเลมี)</b> แล้วสังเกตเฟสของดาวศุกร์อีกครั้ง เปรียบเทียบกับผลการสังเกตของกาลิเลโอ (ค.ศ. 1610) ที่พบดาวศุกร์มีเฟสครบทุกแบบ</li>
    <li>ตอบคำถามในใบงาน</li></ol>`,
  theory: `<h3>แบบจำลองโลกเป็นศูนย์กลาง (Geocentric)</h3>
    <p>ทอเลมี (ราว ค.ศ. 150) วางโลกนิ่งอยู่ที่ศูนย์กลาง ดาวเคราะห์เคลื่อนบนวงกลมเล็กเรียกว่า <b>วงรอบเล็ก (epicycle)</b> ซึ่งจุดศูนย์กลางเคลื่อนไปบน <b>วงรอบใหญ่ (deferent)</b> รอบโลก การซ้อนกันของสองวงกลมทำให้อธิบายการเคลื่อนที่ถอยหลังได้ สำหรับดาวพุธและดาวศุกร์ จุดศูนย์กลางของ epicycle ต้องอยู่บนเส้นโลก–ดวงอาทิตย์ตลอดเวลา จึงอยู่ใกล้ดวงอาทิตย์บนท้องฟ้าเสมอ</p>
    <h3>แบบจำลองดวงอาทิตย์เป็นศูนย์กลาง (Heliocentric)</h3>
    <p>โคเปอร์นิคัส (ค.ศ. 1543) วางดวงอาทิตย์ที่ศูนย์กลาง ดาวเคราะห์ที่อยู่ใกล้ดวงอาทิตย์โคจรเร็วกว่า การเคลื่อนที่ถอยหลังเป็นผลของ <b>การแซงกัน</b> เช่น เมื่อโลกแซงดาวอังคารใกล้ตำแหน่งตรงข้ามดวงอาทิตย์ (opposition)</p>
    <div class="eq">คาบซินอดิก: 1/S = |1/P − 1/E| &nbsp; (E = 1 ปี, P = คาบดาราคติของดาวเคราะห์)</div>
    <h3>เฟสของดาวศุกร์เป็นหลักฐานชี้ขาด</h3>
    <p>ในแบบจำลองทอเลมี ดาวศุกร์อยู่ระหว่างโลกกับดวงอาทิตย์เสมอ จึงเห็นได้แค่เสี้ยวหรือดับ แต่ในแบบจำลองดวงอาทิตย์เป็นศูนย์กลาง ดาวศุกร์ไปอยู่ด้านไกลของดวงอาทิตย์ได้ จึงเห็นเกือบเต็มดวงแต่ขนาดเล็ก กาลิเลโอพบเฟสครบทุกแบบและขนาดเปลี่ยนตามเฟส ซึ่งสอดคล้องกับแบบจำลองดวงอาทิตย์เป็นศูนย์กลาง</p>
    <div class="eq">สัดส่วนพื้นที่สว่าง k = (1 + cos α)/2 &nbsp; (α = มุมเฟส ดวงอาทิตย์–ดาวเคราะห์–โลก)</div>`,
  questions: [
    { q: 'ในแบบจำลองดวงอาทิตย์เป็นศูนย์กลาง ดาวอังคารเคลื่อนที่ถอยหลังเมื่ออยู่ในตำแหน่งใดเทียบกับโลกและดวงอาทิตย์ อธิบายสาเหตุ' },
    { q: 'วัดคาบซินอดิกของดาวอังคารจากตัวจำลอง (เวลาระหว่างการถอยหลังสองครั้งติดกัน) แล้วเทียบกับค่าที่คำนวณจากสูตร', table: { cols: ['ดาวเคราะห์', 'คาบซินอดิกที่วัดได้ (ปี)', 'คาบซินอดิกจากสูตร (ปี)'], rows: ['ดาวอังคาร', 'ดาวพฤหัสบดี', 'ดาวศุกร์'] } },
    { q: 'บันทึกเฟสและขนาดปรากฏของดาวศุกร์ในแบบจำลองทั้งสอง', table: { cols: ['มุมห่างจากดวงอาทิตย์', 'เฟส (ดวงอาทิตย์เป็นศูนย์กลาง)', 'เฟส (โลกเป็นศูนย์กลาง)'], rows: ['ใกล้ 0° (ร่วมทิศ)', 'ประมาณ 46° (ห่างมากสุด)', 'ใกล้ 0° อีกด้าน'] } },
    { q: 'ทำไมดาวศุกร์จึงไม่เคยปรากฏห่างจากดวงอาทิตย์เกิน ~47° และเหตุใดจึงไม่เคยเห็นดาวศุกร์กลางดึก' },
    { q: 'หลักฐานใดจากตัวจำลองที่ช่วยตัดสินว่าแบบจำลองใดถูกต้อง อธิบายพร้อมอ้างอิงภาพที่บันทึก' }
  ],
  mount(stage, ctrls) {
    const st = { model: 'helio', pl: 'mars', t: 0, run: true, speed: 0.4, trail: [] };
    const top = A.el('div', { class: 'duo' }); stage.append(top);
    const orb = A.canvas(top, { ratio: 0.9, min: 300, max: 520, cap: 'มุมมองจากเหนือระนาบวงโคจร' }, drawOrbit);
    const view = A.canvas(top, { ratio: 0.9, min: 300, max: 520, cap: 'ดาวเคราะห์ที่เห็นจากโลก (ขยาย)' }, drawView);
    const grf = A.canvas(stage, { ratio: 0.32, min: 200, max: 300, cap: 'ลองจิจูดสุริยวิถีที่เห็นจากโลก ตามเวลา' }, drawGraph);
    const geo = () => {
      const a = PL[st.pl][1], T = Math.pow(a, 1.5);
      const te = 2 * Math.PI * st.t, tp = 2 * Math.PI * st.t / T + 1.1;
      const E = [Math.cos(te), Math.sin(te)], P = [a * Math.cos(tp), a * Math.sin(tp)];
      const v = [P[0] - E[0], P[1] - E[1]], s = [-E[0], -E[1]];
      const lon = AS.norm(Math.atan2(v[1], v[0]) * AS.R), slon = AS.norm(Math.atan2(s[1], s[0]) * AS.R);
      const dist = Math.hypot(v[0], v[1]);
      // phase angle at planet between Sun and Earth
      const ps = [-P[0], -P[1]], pe = [-v[0], -v[1]];
      let alpha;
      if (st.model === 'helio') alpha = Math.acos((ps[0] * pe[0] + ps[1] * pe[1]) / (a * dist));
      else {
        // Ptolemaic: inferior planets' epicycle centre lies on Earth–Sun line, below the Sun's sphere (Sun at 2.2 units)
        if (a < 1) { const c = [s[0] * 1, s[1] * 1], pos = [c[0] + (P[0]), c[1] + (P[1])]; const sun = [s[0] * 2.2, s[1] * 2.2]; const q1 = [sun[0] - pos[0], sun[1] - pos[1]], q2 = [-pos[0], -pos[1]]; alpha = Math.acos((q1[0] * q2[0] + q1[1] * q2[1]) / (Math.hypot(...q1) * Math.hypot(...q2))); }
        else alpha = Math.acos((ps[0] * pe[0] + ps[1] * pe[1]) / (a * dist));
      }
      let elong = AS.norm(lon - slon); if (elong > 180) elong -= 360;
      return { a, T, E, P, v, s, lon, slon, dist, alpha, elong };
    };
    function drawOrbit(ctx, W, H) {
      const g = geo(); A.g.stars(ctx, W, H, 90);
      const cx = W / 2, cy = H / 2;
      if (st.model === 'helio') {
        const sc = Math.min(W, H) * 0.44 / Math.max(g.a, 1);
        A.g.circle(ctx, cx, cy, sc, null, 'rgba(125,211,252,.35)'); A.g.circle(ctx, cx, cy, g.a * sc, null, 'rgba(255,255,255,.25)');
        A.g.sun(ctx, cx, cy, 9);
        const ex = cx + g.E[0] * sc, ey = cy - g.E[1] * sc, px = cx + g.P[0] * sc, py = cy - g.P[1] * sc;
        const L = Math.max(W, H); const ux = (px - ex), uy = (py - ey), n = Math.hypot(ux, uy);
        A.g.line(ctx, ex, ey, ex + ux / n * L, ey + uy / n * L, 'rgba(255,240,180,.55)', 1.2, [6, 5]);
        A.g.circle(ctx, ex, ey, 6, '#5aa9ff'); A.g.text(ctx, 'โลก', ex + 9, ey - 8, { s: 12.5 });
        A.g.circle(ctx, px, py, 5.5, PL[st.pl][2]); A.g.text(ctx, PL[st.pl][0], px + 9, py - 8, { s: 12.5 });
      } else {
        const sc = Math.min(W, H) * 0.42 / (g.a < 1 ? 2.3 : g.a + 1);
        A.g.circle(ctx, cx, cy, 7, '#5aa9ff'); A.g.text(ctx, 'โลก (นิ่ง)', cx + 9, cy + 18, { s: 12.5 });
        const sd = g.a < 1 ? 2.2 : 1;
        const sx = cx + g.s[0] * sd * sc, sy = cy - g.s[1] * sd * sc;
        A.g.circle(ctx, cx, cy, sd * sc, null, 'rgba(255,204,77,.35)'); A.g.sun(ctx, sx, sy, 8);
        let C, pos;
        if (g.a < 1) { C = [g.s[0], g.s[1]]; pos = [C[0] + g.P[0], C[1] + g.P[1]]; A.g.circle(ctx, cx, cy, sc, null, 'rgba(255,255,255,.22)'); A.g.circle(ctx, cx + C[0] * sc, cy - C[1] * sc, g.a * sc, null, 'rgba(165,180,252,.6)'); }
        else { C = [g.P[0], g.P[1]]; pos = [C[0] + g.s[0], C[1] + g.s[1]]; A.g.circle(ctx, cx, cy, g.a * sc, null, 'rgba(255,255,255,.22)'); A.g.circle(ctx, cx + C[0] * sc, cy - C[1] * sc, sc, null, 'rgba(165,180,252,.6)'); }
        A.g.line(ctx, cx, cy, cx + C[0] * sc, cy - C[1] * sc, 'rgba(165,180,252,.5)', 1);
        A.g.circle(ctx, cx + C[0] * sc, cy - C[1] * sc, 2.5, '#a5b4fc');
        const px = cx + pos[0] * sc, py = cy - pos[1] * sc;
        A.g.line(ctx, cx, cy, cx + (px - cx) * 5, cy + (py - cy) * 5, 'rgba(255,240,180,.55)', 1.2, [6, 5]);
        A.g.circle(ctx, px, py, 5.5, PL[st.pl][2]); A.g.text(ctx, PL[st.pl][0], px + 9, py - 8, { s: 12.5 });
        A.g.text(ctx, 'วงรอบใหญ่ (deferent) · วงรอบเล็ก (epicycle)', 12, H - 12, { s: 12, c: '#a5b4fc' });
      }
    }
    function drawView(ctx, W, H) {
      const g = geo(); const cx = W / 2, cy = H / 2 - 10;
      const dmin = Math.abs(g.a - 1);   // closest approach -> largest disc
      const r = Math.max(5, Math.min(W, H) * 0.34 * dmin / g.dist);
      const k = (1 + Math.cos(g.alpha)) / 2;
      const litRight = g.elong < 0; // planet west of Sun -> Sun to its east (left on sky, looking south) -> lit side left. sky E is left
      A.g.phase(ctx, cx, cy, r, k, !litRight, '#202842', PL[st.pl][2]);
      A.g.text(ctx, `สว่าง ${Math.round(k * 100)}% · ขนาดปรากฏสัมพัทธ์ ×${(1 / g.dist).toFixed(2)}`, W / 2, H - 38, { a: 'center', s: 13.5, w: 600 });
      A.g.text(ctx, `มุมห่างจากดวงอาทิตย์ ${Math.abs(g.elong).toFixed(0)}° ทาง${g.elong > 0 ? 'ตะวันออก (เห็นหัวค่ำ)' : 'ตะวันตก (เห็นเช้ามืด)'}`, W / 2, H - 16, { a: 'center', s: 12.5, c: '#9aa7c7' });
    }
    function drawGraph(ctx, W, H) {
      const box = { x: 46, y: 36, w: W - 64, h: H - 74 };
      const span = Math.max(3, Math.pow(PL[st.pl][1], 1.5) < 1 ? 2.5 : 3);
      const tmin = Math.max(0, st.t - span);
      const ax = A.g.axes(ctx, box, { x0: 0, x1: 360, y0: tmin + span, y1: tmin, revx: true, xt: [0, 60, 120, 180, 240, 300, 360], yt: [], xl: '← ตะวันออก   ลองจิจูดสุริยวิถี (องศา)   ตะวันตก →' });
      A.g.text(ctx, 'เวลา ↓', 6, box.y + 14, { s: 11.5, c: '#9aa7c7' });
      const pts = st.trail.filter(p => p.t >= tmin);
      const plot = (key, col, lw) => { ctx.beginPath(); let prev = null; pts.forEach(p => { const x = ax.X(p[key]), y = ax.Y(p.t); if (prev && Math.abs(p[key] - prev) > 180) ctx.moveTo(x, y); else if (!prev) ctx.moveTo(x, y); else ctx.lineTo(x, y); prev = p[key]; }); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); };
      plot('slon', 'rgba(255,204,77,.7)', 1.5); plot('lon', PL[st.pl][2], 2.2);
      const last = pts[pts.length - 1];
      if (last) { A.g.circle(ctx, ax.X(last.lon), ax.Y(last.t), 4, PL[st.pl][2]); A.g.circle(ctx, ax.X(last.slon), ax.Y(last.t), 4, '#ffcc4d'); }
      A.g.text(ctx, '— ดวงอาทิตย์', W - 190, 24, { s: 12, c: '#ffcc4d' }); A.g.text(ctx, '— ' + PL[st.pl][0], W - 100, 24, { s: 12, c: PL[st.pl][2] });
    }
    // controls
    A.ui.h(ctrls, 'ตั้งค่าแบบจำลอง');
    A.ui.seg(ctrls, { label: 'แบบจำลอง', value: 'helio', options: [['helio', 'ดวงอาทิตย์เป็นศูนย์กลาง'], ['geo', 'โลกเป็นศูนย์กลาง']] }, v => { st.model = v; all(); });
    A.ui.select(ctrls, { label: 'ดาวเคราะห์', value: 'mars', options: Object.entries(PL).map(([k, v]) => [k, v[0]]) }, v => { st.pl = v; st.trail = []; st.t = 0; all(); });
    const sp = A.ui.range(ctrls, { label: 'ความเร็วจำลอง', min: 0.05, max: 2, step: 0.05, value: 0.4, unit: 'ปี/วินาที' }, v => st.speed = v);
    const [bp] = A.ui.buttons(ctrls, [['หยุด', () => { st.run = !st.run; bp.textContent = st.run ? 'หยุด' : 'เล่น'; }], ['เริ่มใหม่', () => { st.t = 0; st.trail = []; all(); }]]);
    const out = A.ui.out(ctrls, [['t', 'เวลาที่ผ่านไป'], ['lon', 'ลองจิจูดที่เห็นจากโลก'], ['el', 'มุมห่างจากดวงอาทิตย์'], ['d', 'ระยะห่างจากโลก'], ['mot', 'การเคลื่อนที่ปรากฏ'], ['syn', 'คาบซินอดิก (สูตร)']]);
    let prevLon = null;
    function all() { orb.redraw(); view.redraw(); grf.redraw(); const g = geo(); out.set('t', A.fmt(st.t, 2) + ' ปี'); out.set('lon', g.lon.toFixed(1) + '°'); out.set('el', Math.abs(g.elong).toFixed(1) + '° ' + (g.elong > 0 ? 'ตอ.' : 'ตต.')); out.set('d', g.dist.toFixed(2) + ' AU'); out.set('syn', (1 / Math.abs(1 - 1 / g.T)).toFixed(3) + ' ปี'); }
    A.loop(dt => {
      if (!st.run) return;
      st.t += dt * st.speed; const g = geo();
      st.trail.push({ t: st.t, lon: g.lon, slon: g.slon }); if (st.trail.length > 4000) st.trail.shift();
      if (prevLon != null) { let d = g.lon - prevLon; if (d > 180) d -= 360; if (d < -180) d += 360; out.set('mot', d >= 0 ? 'ไปทางตะวันออก (ปกติ)' : 'ถอยหลัง (retrograde)'); }
      prevLon = g.lon; all();
    });
    all();
  }
});
})();
