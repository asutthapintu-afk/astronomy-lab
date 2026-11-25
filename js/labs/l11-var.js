(function(){
// [name, P (d), mean V, amplitude, note]
const TGT = {
  dcep: ['δ Cephei (ต้นแบบ)', 5.366, 3.95, 0.88, 'กลุ่มดาวเซฟิอุส'],
  etaaql: ['η Aquilae', 7.177, 3.87, 0.80, 'กลุ่มดาวนกอินทรี'],
  lcar: ['ℓ Carinae', 35.56, 3.72, 0.90, 'กลุ่มดาวกระดูกงูเรือ'],
  lmc: ['ดาวแปรแสงในเมฆแมกเจลแลนใหญ่', 12.3, 0, 0.75, 'LMC'],
  m31: ['Hubble V1 ในดาราจักรแอนดรอเมดา', 31.4, 0, 1.0, 'M31'],
  x: ['ดาวปริศนา X', 18.7, 0, 0.7, 'ไม่ทราบ']
};
const MU = { lmc: 18.48, m31: 24.42, x: 21.3 };
const PL = P => -2.43 * (Math.log10(P) - 1) - 4.05;            // Benedict et al. (2007), V band
const shape = ph => { const u = ((ph - 0.7) % 1 + 1) % 1; return u < 0.3 ? 0.5 - 0.5 * Math.cos(Math.PI * u / 0.3) : 0.5 + 0.5 * Math.cos(Math.PI * (u - 0.3) / 0.7); }; // 0..1, max at phase 0
A.reg({
  id: 'lab-var', no: 11, title: 'ดาวแปรแสงและการวัดระยะทาง', short: 'ดาวแปรแสงเซฟีด การหาคาบจากข้อมูลสังเกต ความสัมพันธ์คาบ–กำลังส่องสว่าง และการคำนวณระยะทางด้วยโมดูลัสระยะทาง',
  courses: ['2015231 · สัปดาห์ 14'], ref: 'OpenStax Astronomy 2e หัวข้อ 19.3 Variable Stars: One Key to Cosmic Distances และ 26.4 The Extragalactic Distance Scale',
  steps: `<ol>
    <li>เลือกดาวแปรแสง ดูกราฟ “ข้อมูลดิบ” ซึ่งเป็นค่าโชติมาตรที่วัดได้ในคืนต่าง ๆ (มีความคลาดเคลื่อน)</li>
    <li>ประมาณคาบคร่าว ๆ จากข้อมูลดิบ แล้วเปลี่ยนเป็น “พับเฟส” ปรับคาบทดลองจนจุดข้อมูลเรียงเป็นเส้นโค้งเดียวที่คมที่สุด บันทึกคาบที่ได้</li>
    <li>อ่านโชติมาตรสว่างสุดและจางสุดจากกราฟที่พับเฟสแล้ว หาค่าเฉลี่ย ⟨m⟩</li>
    <li>กรอกคาบและ ⟨m⟩ ในเครื่องคำนวณ ระบบจะหาโชติมาตรสัมบูรณ์ M จากความสัมพันธ์คาบ–กำลังส่องสว่าง และระยะทาง d</li>
    <li>กด “ตรวจคำตอบ” เพื่อเทียบกับค่าจริง ทำซ้ำกับดาวดวงอื่น</li></ol>`,
  theory: `<h3>ดาวแปรแสงชนิดเซฟีด</h3>
    <p>ดาวเซฟีดเป็นดาวยักษ์ใหญ่สีเหลืองที่ขยายและหดตัวเป็นจังหวะ (กลไกแคปปาจากการแตกตัวเป็นไอออนของฮีเลียม) ทำให้ความสว่างเปลี่ยนเป็นคาบ 1–100 วัน กราฟแสงสว่างขึ้นเร็วและจางลงช้า</p>
    <p>เฮนเรียตตา ลีวิตต์ (ค.ศ. 1912) พบว่าเซฟีดในเมฆแมกเจลแลนเล็กที่มีคาบยาวกว่าจะสว่างกว่า เรียกว่า <b>ความสัมพันธ์คาบ–กำลังส่องสว่าง (Leavitt law)</b> ทำให้เซฟีดเป็น “เทียนมาตรฐาน” สำหรับวัดระยะทาง ฮับเบิลใช้วิธีนี้พิสูจน์ใน ค.ศ. 1924 ว่าแอนดรอเมดาอยู่นอกดาราจักรทางช้างเผือก</p>
    <div class="eq">M_V = −2.43 (log₁₀ P − 1) − 4.05 &nbsp;&nbsp; (P ในหน่วยวัน)</div>
    <div class="eq">โมดูลัสระยะทาง: m − M = 5 log₁₀ d − 5 &nbsp; ⇒ &nbsp; d = 10^((m − M + 5)/5) พาร์เซก</div>
    <h3>ดาวแปรแสงชนิดอื่น</h3>
    <p><b>RR Lyrae</b> คาบ 0.2–1 วัน M ≈ +0.6 ใช้วัดระยะในกระจุกดาวทรงกลม &nbsp; <b>Mira</b> ดาวยักษ์แดงคาบ 100–1000 วัน &nbsp; <b>ดาวคู่อุปราคา</b> เปลี่ยนความสว่างเพราะการบังกัน (ปฏิบัติการที่ 10)</p>
    <p class="note">ตัวจำลองไม่คิดการดูดกลืนแสงโดยฝุ่นระหว่างดาว ซึ่งในงานจริงต้องแก้ค่าด้วย</p>`,
  questions: [
    { q: 'ผลการวิเคราะห์ดาวแปรแสง', table: { cols: ['ดาว', 'คาบ P (วัน)', 'm สว่างสุด', 'm จางสุด', '⟨m⟩', 'M จาก P–L', 'ระยะทาง d'], rows: ['δ Cephei', 'η Aquilae', 'ดาวใน LMC', 'Hubble V1 (M31)', 'ดาวปริศนา X'] } },
    { q: 'อธิบายวิธีที่ใช้หาคาบจากการพับเฟส คาบทดลองที่ผิดเล็กน้อยทำให้กราฟเป็นอย่างไร' },
    { q: 'ถ้าเซฟีดสองดวงมี ⟨m⟩ เท่ากัน แต่ดวงหนึ่งมีคาบยาวกว่า ดวงใดอยู่ไกลกว่า เพราะเหตุใด' },
    { q: 'ระยะทางของแอนดรอเมดาที่คำนวณได้ ทำไมการค้นพบของฮับเบิลจึงเปลี่ยนความเข้าใจเรื่องขนาดของเอกภพ' },
    { q: 'ถ้าไม่ได้แก้ผลของฝุ่นที่ทำให้ดาวดูจางลง 0.5 แมกนิจูด ระยะทางที่ได้จะคลาดไปกี่เปอร์เซ็นต์ และไปทางใด' }
  ],
  mount(stage, ctrls) {
    const st = { k: 'dcep', mode: 'raw', trial: 5.0, model: false, t: 0, run: true, pIn: '', mIn: '' };
    const row = A.el('div', { class: 'duo' }); stage.append(row);
    const star = A.canvas(row, { ratio: 0.75, min: 220, max: 330, cap: 'การเต้นของดาวเซฟีด' }, drawStar);
    const pl = A.canvas(row, { ratio: 0.75, min: 220, max: 330, cap: 'ความสัมพันธ์คาบ–กำลังส่องสว่าง' }, drawPL);
    const obs = A.canvas(stage, { ratio: 0.36, min: 250, max: 340, cap: 'ข้อมูลการสังเกต (โชติมาตรปรากฏ V)' }, drawObs);
    const T = () => TGT[st.k];
    const mean = () => st.k in MU ? PL(T()[1]) + MU[st.k] : T()[2];
    const dist = () => 10 ** ((mean() - PL(T()[1]) + 5) / 5);
    let data = [];
    const gen = () => { let s = 1 + Object.keys(TGT).indexOf(st.k) * 977; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; data = []; const P = T()[1], span = Math.max(40, P * 4.5), n = 70; for (let i = 0; i < n; i++) { const t = r() * span; const g = Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(6.283 * r()); const m = mean() + T()[3] * (0.5 - shape(t / P)) + g * 0.035 * (st.k in MU ? 2 : 1); data.push([t, m]); } data.sort((a, b) => a[0] - b[0]); st.span = span; };
    function drawStar(ctx, W, H) {
      A.g.stars(ctx, W, H, 50);
      const ph = st.t, s = shape(ph), cx = W * 0.32, cy = H / 2 + 8;
      // radius maximum lags brightness max (~0.35 phase); temperature follows brightness
      const rr = Math.min(W, H) * 0.22 * (1 + 0.08 * Math.sin(2 * Math.PI * (ph - 0.1)));
      const Tk = 5400 + 1300 * s; const u = (Tk - 5000) / 2000;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr * 1.6); g.addColorStop(0, `rgba(255,${200 + u * 40},${120 + u * 90},.95)`); g.addColorStop(0.62, `rgba(255,${180 + u * 50},${90 + u * 100},.9)`); g.addColorStop(1, 'rgba(255,190,110,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rr * 1.6, 0, 7); ctx.fill();
      A.g.circle(ctx, cx, cy, rr, `rgb(255,${205 + u * 40},${140 + u * 90})`);
      const bx = W * 0.62, bw = W * 0.32;
      [['ความสว่าง', s], ['อุณหภูมิผิว', s], ['รัศมี', 0.5 + 0.5 * Math.sin(2 * Math.PI * (ph - 0.1))]].forEach(([t, v], i) => { const y = 50 + i * 52; A.g.text(ctx, t, bx, y, { s: 12, c: '#c7d2fe' }); ctx.fillStyle = '#1b2550'; ctx.fillRect(bx, y + 8, bw, 12); ctx.fillStyle = ['#ffcc4d', '#ff8f80', '#7dd3fc'][i]; ctx.fillRect(bx, y + 8, bw * (0.1 + 0.9 * v), 12); });
      A.g.text(ctx, `เฟส ${ph.toFixed(2)}`, bx, H - 14, { s: 12.5, w: 600 });
    }
    function drawPL(ctx, W, H) {
      const box = { x: 56, y: 36, w: W - 72, h: H - 82 };
      const ax = A.g.axes(ctx, box, { x0: 0, x1: 2, y0: -1.5, y1: -7, xt: [0, 0.5, 1, 1.5, 2], yt: [-2, -3, -4, -5, -6, -7], xf: v => (10 ** v).toFixed(v < 1 ? 1 : 0), xl: 'คาบ P (วัน, สเกลลอการิทึม)', yl: 'M_V', ylo: 40 });
      A.g.line(ctx, ax.X(0), ax.Y(PL(1)), ax.X(2), ax.Y(PL(100)), '#ffcc4d', 2);
      [5.366, 7.177, 10.15, 35.56, 3.73, 16.4, 27.0].forEach(P => A.g.circle(ctx, ax.X(Math.log10(P)), ax.Y(PL(P) + (Math.sin(P * 7) * 0.12)), 3, '#a5b4fc'));
      const P = parseFloat(st.pIn); if (P > 0) { A.g.circle(ctx, ax.X(Math.log10(P)), ax.Y(PL(P)), 7, null, '#ff8f80', 2.5); A.g.text(ctx, 'ค่าของฉัน', ax.X(Math.log10(P)) + 10, ax.Y(PL(P)) + 4, { s: 12, c: '#ff8f80' }); }
      A.g.text(ctx, 'สว่างกว่า ↑', box.x + 6, box.y + 16, { s: 11.5, c: '#9aa7c7' });
    }
    function drawObs(ctx, W, H) {
      const ms = data.map(d => d[1]), lo = Math.min(...ms) - 0.1, hi = Math.max(...ms) + 0.1;
      const box = { x: 56, y: 36, w: W - 74, h: H - 80 };
      const fold = st.mode === 'fold';
      const x1 = fold ? 2 : st.span;
      const ax = A.g.axes(ctx, box, { x0: 0, x1, y0: hi, y1: lo, xt: fold ? [0, 0.5, 1, 1.5, 2] : Array.from({ length: 6 }, (_, i) => Math.round(st.span * i / 5)), yt: [hi, (hi + lo) / 2, lo].map(v => +v.toFixed(2)), yf: v => v.toFixed(2), xl: fold ? `เฟส (พับด้วยคาบทดลอง ${st.trial.toFixed(3)} วัน แสดง 2 รอบ)` : 'เวลา (วัน นับจากคืนแรก)', yl: 'm_V' });
      if (fold && st.model) { ctx.beginPath(); for (let k = 0; k <= 400; k++) { const ph = k / 200; const m = mean() + T()[3] * (0.5 - shape(ph)); const x = ax.X(ph), y = ax.Y(m); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = 'rgba(255,204,77,.5)'; ctx.stroke(); }
      data.forEach(([t, m]) => {
        if (fold) { const ph = ((t / st.trial) % 1 + 1) % 1; [ph, ph + 1].forEach(p => A.g.circle(ctx, ax.X(p), ax.Y(m), 3.2, '#7dd3fc')); }
        else A.g.circle(ctx, ax.X(t), ax.Y(m), 3.2, '#7dd3fc');
      });
      A.g.text(ctx, 'สว่าง ↑', 8, box.y + 12, { s: 11.5, c: '#9aa7c7' });
    }
    A.ui.h(ctrls, 'ดาวเป้าหมาย');
    A.ui.select(ctrls, { label: 'ดาวแปรแสง', value: st.k, options: Object.entries(TGT).map(([k, v]) => [k, v[0]]) }, v => { st.k = v; gen(); ans.textContent = ''; all(); });
    A.ui.seg(ctrls, { label: 'การแสดงข้อมูล', value: 'raw', options: [['raw', 'ข้อมูลดิบ'], ['fold', 'พับเฟส']] }, v => { st.mode = v; obs.redraw(); });
    const rp = A.ui.range(ctrls, { label: 'คาบทดลอง', min: 1, max: 50, step: 0.001, value: st.trial, fmt: v => v.toFixed(3), unit: 'วัน' }, v => { st.trial = v; np.set(v); obs.redraw(); });
    const np = A.ui.num(ctrls, { label: 'ปรับละเอียด (พิมพ์คาบ)', value: st.trial, step: 0.001, min: 0.1 }, v => { st.trial = v; rp.set(Math.min(50, v)); obs.redraw(); });
    A.ui.check(ctrls, { label: 'แสดงเส้นแบบจำลอง (ครูใช้ตรวจ)', value: false }, v => { st.model = v; obs.redraw(); });
    A.ui.h(ctrls, 'เครื่องคำนวณระยะทาง');
    const ip = A.ui.num(ctrls, { label: 'คาบที่วัดได้ P (วัน)', value: '' }, v => { st.pIn = v; calc(); });
    const im = A.ui.num(ctrls, { label: 'โชติมาตรปรากฏเฉลี่ย ⟨m⟩', value: '' }, v => { st.mIn = v; calc(); });
    const out = A.ui.out(ctrls, [['M', 'โชติมาตรสัมบูรณ์ M'], ['mu', 'โมดูลัสระยะทาง m − M'], ['d', 'ระยะทาง d']]);
    const ans = A.el('div', { class: 'note' });
    A.ui.buttons(ctrls, [['ตรวจคำตอบ', () => { const d = dist(), P = parseFloat(st.pIn), m = parseFloat(st.mIn); if (!(P > 0) || !isFinite(m)) { ans.textContent = 'กรอกคาบและโชติมาตรเฉลี่ยก่อน'; return; } const mine = 10 ** ((m - PL(P) + 5) / 5); const err = (mine - d) / d * 100; ans.innerHTML = `ค่าจริง: P = ${T()[1]} วัน, ⟨m⟩ = ${mean().toFixed(2)}, d = ${fmtD(d)}<br>คำตอบของคุณคลาดเคลื่อน ${err >= 0 ? '+' : ''}${err.toFixed(1)}% ${Math.abs(err) < 10 ? '— ดีมาก' : Math.abs(err) < 25 ? '— ใช้ได้' : '— ลองหาคาบหรือค่าเฉลี่ยใหม่'}`; }]]);
    ctrls.append(ans);
    const fmtD = d => d > 1e5 ? (d / 1e6).toFixed(3) + ' ล้านพาร์เซก (' + (d * 3.2616 / 1e6).toFixed(2) + ' ล้านปีแสง)' : d > 3000 ? (d / 1000).toFixed(1) + ' กิโลพาร์เซก (' + Math.round(d * 3.2616).toLocaleString() + ' ปีแสง)' : Math.round(d) + ' พาร์เซก (' + Math.round(d * 3.2616).toLocaleString() + ' ปีแสง)';
    function calc() { const P = parseFloat(st.pIn), m = parseFloat(st.mIn); if (P > 0) out.set('M', PL(P).toFixed(2)); if (P > 0 && isFinite(m)) { out.set('mu', (m - PL(P)).toFixed(2)); out.set('d', fmtD(10 ** ((m - PL(P) + 5) / 5))); } pl.redraw(); }
    function all() { star.redraw(); pl.redraw(); obs.redraw(); }
    A.loop(dt => { if (!st.run) return; st.t = (st.t + dt * 0.25) % 1; star.redraw(); });
    gen(); all();
  }
});
})();
