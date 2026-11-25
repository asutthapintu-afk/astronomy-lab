(function(){
const TH = { Ori: 'นายพราน', UMa: 'หมีใหญ่ (จระเข้)', UMi: 'หมีเล็ก', Sco: 'แมงป่อง', CMa: 'สุนัขใหญ่', CMi: 'สุนัขเล็ก', Tau: 'วัว', Gem: 'คนคู่', Leo: 'สิงโต', Cyg: 'หงส์', Lyr: 'พิณ', Aql: 'นกอินทรี', Cas: 'แคสซิโอเปีย', Cru: 'กางเขนใต้', Sgr: 'คนยิงธนู', Peg: 'ม้าบิน', And: 'แอนดรอเมดา', Per: 'เพอร์ซิอุส', Aur: 'สารถี', Boo: 'คนเลี้ยงสัตว์', Vir: 'หญิงสาว', Cen: 'คนครึ่งม้า', Car: 'กระดูกงูเรือ', Lep: 'กระต่าย', Aqr: 'คนแบกหม้อน้ำ', Psc: 'ปลา', Ari: 'แกะ', Cnc: 'ปู', Lib: 'คันชั่ง', Cap: 'แพะทะเล', Oph: 'คนแบกงู', Dra: 'มังกร', Her: 'เฮอร์คิวลีส', Cep: 'เซฟิอุส', Eri: 'แม่น้ำ', Hya: 'งูไฮดรา', PsA: 'ปลาใต้', Crv: 'อีกา', Vel: 'ใบเรือ', Pup: 'ท้ายเรือ', Lup: 'หมาป่า', Cet: 'ปลาวาฬ', Tri: 'สามเหลี่ยม', Del: 'ปลาโลมา', Sge: 'ลูกศร', CrB: 'มงกุฎเหนือ', Col: 'นกพิราบ', Gru: 'นกกระเรียน' };
const bvCol = bv => { const t = Math.max(-0.3, Math.min(1.8, bv)); const r = t < 0.4 ? 170 + t * 150 : 255, g = t < 0.4 ? 200 + t * 100 : 255 - (t - 0.4) * 70, b = t < 0.4 ? 255 : 255 - (t - 0.4) * 130; return `rgb(${r | 0},${g | 0},${b | 0})`; };
A.reg({
  id: 'lab-chart', no: 7, title: 'การอ่านแผนที่ดาวและการดูดาวเบื้องต้น', short: 'แผนที่ดาวตามวัน เวลา และตำแหน่งผู้สังเกต กลุ่มดาวสำคัญ ดาวสว่าง และการเตรียมดูดาวภาคสนาม',
  courses: ['2015326 · ภาคสนาม สัปดาห์ 16', '2015231 · สัปดาห์ 9'], ref: 'OpenStax Astronomy 2e หัวข้อ 2.1 The Sky Above และภาคผนวก The Constellations',
  steps: `<ol>
    <li>ตั้งวันที่และเวลาที่จะออกดูดาวภาคสนาม (ค่าเริ่มต้น: วันนี้ 20:00 น. ที่มหาสารคาม)</li>
    <li>แผนที่ดาวแสดงท้องฟ้าทั้งหมดเหนือขอบฟ้า <b>ทิศเหนืออยู่ด้านบน ทิศตะวันออกอยู่ด้านซ้าย</b> เพราะใช้ชูขึ้นเหนือศีรษะ วงกลมรอบนอกคือขอบฟ้า จุดกลางคือจุดเหนือศีรษะ</li>
    <li>เลือกกลุ่มดาวเพื่อเน้น ชี้เมาส์ (หรือแตะ) ที่ดาวเพื่ออ่านชื่อ ความสว่าง มุมเงยและมุมทิศ</li>
    <li>เลื่อนเวลาทีละชั่วโมงหรือเปลี่ยนเดือน สังเกตว่ากลุ่มดาวเคลื่อนไปทางใด</li>
    <li>ปรับ “ความสว่างจำกัด” ให้ตรงกับสภาพท้องฟ้า (ในเมือง ~3, ชนบท ~5)</li></ol>`,
  theory: `<h3>การอ่านแผนที่ดาว</h3>
    <p>แผนที่ดาวแบบหมุนได้ (planisphere) แสดงท้องฟ้าเหนือขอบฟ้าที่วันและเวลาหนึ่ง เมื่อชูแผนที่ขึ้นเหนือศีรษะ ทิศบนแผนที่จะตรงกับทิศจริง จึงเห็นตะวันออกอยู่ซ้ายมือเมื่อทิศเหนืออยู่ด้านบน การหาดาวควรเริ่มจากกลุ่มดาวเด่น เช่น นายพราน (ฤดูหนาว) แมงป่อง (ฤดูร้อน–ฝน) และหมีใหญ่ แล้วใช้เป็นจุดนำทาง</p>
    <h3>ความสว่างของดาว (โชติมาตร)</h3>
    <div class="eq">m₁ − m₂ = −2.5 log₁₀(F₁/F₂) &nbsp;&nbsp; ต่างกัน 5 แมกนิจูด = สว่างต่างกัน 100 เท่า</div>
    <p>ค่าโชติมาตรยิ่งน้อยยิ่งสว่าง ดาวซิริอุส m = −1.46 ตาเปล่าในที่มืดเห็นได้ถึง m ≈ 6</p>
    <h3>ท้องฟ้าเปลี่ยนตามเวลาและฤดูกาล</h3>
    <p>ดาวขึ้นเร็วขึ้นวันละประมาณ 4 นาที (หรือเดือนละ 2 ชั่วโมง) เพราะวันดาราคติสั้นกว่าวันสุริยคติ กลุ่มดาวที่เห็นตอนหัวค่ำจึงเปลี่ยนไปตามฤดูกาล</p>
    <h3>เทคนิคภาคสนาม</h3>
    <p>ให้ตาปรับสภาพในความมืด 15–20 นาที ใช้ไฟฉายแสงสีแดง วัดมุมด้วยมือเหยียดสุดแขน: นิ้วก้อย ≈ 1°, กำปั้น ≈ 10°, กางนิ้วโป้ง–นิ้วก้อย ≈ 20°</p>`,
  questions: [
    { q: 'วันที่และเวลาที่สังเกต สถานที่ และสภาพท้องฟ้า (เมฆ แสงรบกวน ความสว่างจำกัดที่ประมาณได้)' },
    { q: 'บันทึกดาวสว่างที่ระบุได้', table: { cols: ['ชื่อดาว', 'กลุ่มดาว', 'โชติมาตร', 'มุมเงย (ประมาณด้วยมือ)', 'มุมทิศ', 'สี'], rows: ['', '', '', '', ''] } },
    { q: 'กลุ่มดาวที่เห็นใกล้จุดเหนือศีรษะ ทางทิศตะวันออก และทางทิศตะวันตก ณ เวลาที่สังเกต' },
    { q: 'เปรียบเทียบแผนที่ดาวเวลา 20:00 น. กับ 23:00 น. ในคืนเดียวกัน กลุ่มดาวนายพราน (หรือกลุ่มดาวเด่นอื่น) เคลื่อนที่ไปทางใดและประมาณกี่องศา' },
    { q: 'ถ้าต้องการเห็นกลุ่มดาวแมงป่องเต็มกลุ่มตอนหัวค่ำ (20:00 น.) ควรดูในเดือนใด อธิบายวิธีหาคำตอบจากตัวจำลอง' }
  ],
  mount(stage, ctrls) {
    const now = new Date();
    const st = { lat: 16.18, lon: 103.3, date: new Date(now.getFullYear(), now.getMonth(), now.getDate()), hour: 20, mag: 4.5, lines: true, names: true, cons: true, grid: true, hi: '', hover: null };
    const ch = A.canvas(stage, { ratio: 0.82, min: 340, max: 760, cap: 'ท้องฟ้าเหนือขอบฟ้า · ทิศเหนืออยู่บน ตะวันออกอยู่ซ้าย' }, draw);
    let proj = [];
    const lst = () => { const ms = Date.UTC(st.date.getFullYear(), st.date.getMonth(), st.date.getDate()) + (st.hour - 7) * 3600000; return AS.norm(AS.gmst(ms / 86400000 + 2440587.5) + st.lon); };
    function draw(ctx, W, H) {
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 30, L = lst();
      const P = (ra, de) => { const q = AS.altaz(L - ra, de, st.lat); if (q.alt < -0.5) return null; const r = R * Math.tan((90 - q.alt) * AS.D / 2); return [cx - r * Math.sin(q.az * AS.D), cy - r * Math.cos(q.az * AS.D), q]; };
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, '#0a1330'); g.addColorStop(1, '#14204a'); A.g.circle(ctx, cx, cy, R, g, '#5fb88f', 2);
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
      if (st.grid) { [30, 60].forEach(a => A.g.circle(ctx, cx, cy, R * Math.tan((90 - a) * AS.D / 2), null, 'rgba(150,170,230,.18)')); [0, 45, 90, 135].forEach(a => { const s = Math.sin(a * AS.D), c = Math.cos(a * AS.D); A.g.line(ctx, cx - R * s, cy - R * c, cx + R * s, cy + R * c, 'rgba(150,170,230,.12)'); }); }
      // ecliptic
      ctx.beginPath(); let pen = false; for (let l = 0; l <= 360; l += 2) { const ra = AS.norm(Math.atan2(Math.cos(23.44 * AS.D) * Math.sin(l * AS.D), Math.cos(l * AS.D)) * AS.R), de = Math.asin(Math.sin(23.44 * AS.D) * Math.sin(l * AS.D)) * AS.R; const p = P(ra, de); if (!p) { pen = false; continue; } pen ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); pen = true; } ctx.strokeStyle = 'rgba(255,204,77,.35)'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
      if (st.lines) for (const id in SKY.lines) {
        const hi = id === st.hi;
        SKY.lines[id].forEach(seg => { ctx.beginPath(); let pen = false; seg.forEach(([ra, de]) => { const p = P(ra, de); if (!p) { pen = false; return; } pen ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); pen = true; }); ctx.strokeStyle = hi ? '#7dd3fc' : 'rgba(125,180,252,.32)'; ctx.lineWidth = hi ? 2.2 : 1; ctx.stroke(); });
      }
      proj = [];
      for (const s of SKY.stars) {
        if (s[2] > st.mag) break;
        const p = P(s[0], s[1]); if (!p) continue;
        const r = Math.max(0.7, 4.2 - s[2] * 0.72);
        A.g.circle(ctx, p[0], p[1], r, bvCol(s[3]));
        proj.push([p[0], p[1], s, p[2]]);
        if (st.names && s[4] && s[2] < 1.6) A.g.text(ctx, s[4], p[0] + r + 3, p[1] + 4, { s: 11.5, c: '#dbe4ff' });
      }
      if (st.cons) SKY.cons.forEach(c => { const p = P(c[2], c[3]); if (!p || (!TH[c[0]] && c[0] !== st.hi)) return; A.g.text(ctx, TH[c[0]] || c[1], p[0], p[1], { a: 'center', s: c[0] === st.hi ? 14 : 11.5, w: c[0] === st.hi ? 700 : 500, c: c[0] === st.hi ? '#7dd3fc' : 'rgba(165,180,252,.75)' }); });
      ctx.restore();
      [['เหนือ', 0], ['ตะวันออก', 90], ['ใต้', 180], ['ตะวันตก', 270]].forEach(([t, a]) => A.g.text(ctx, t, cx - (R + 16) * Math.sin(a * AS.D), cy - (R + 16) * Math.cos(a * AS.D) + 5, { a: 'center', s: 13, w: 700, c: '#8fe0b8' }));
      if (st.onCount) st.onCount(proj.length);
      if (st.hover) { const [x, y, s, q] = st.hover; A.g.circle(ctx, x, y, 9, null, '#ffcc4d', 1.5); const t = `${s[4] || 'ดาว'} · m = ${s[2].toFixed(2)} · มุมเงย ${q.alt.toFixed(0)}° มุมทิศ ${q.az.toFixed(0)}°`; A.g.text(ctx, t, Math.min(W - 10, Math.max(10, x)), y < 40 ? y + 26 : y - 14, { s: 12.5, w: 600, a: x > W / 2 ? 'right' : 'left', bg: 'rgba(6,11,26,.85)' }); }
    }
    A.drag(ch.cv, { hover: pick, down: pick, leave() { st.hover = null; ch.redraw(); } });
    function pick(x, y) { let best = null, bd = 18; proj.forEach(p => { const d = Math.hypot(p[0] - x, p[1] - y) - (6 - p[2][2]); if (d < bd) { bd = d; best = p; } }); st.hover = best; ch.redraw(); }
    A.ui.h(ctrls, 'วันและเวลา (เวลาประเทศไทย)');
    const pad = n => String(n).padStart(2, '0');
    const di = A.el('input', { type: 'date', id: 'c-date', value: `${st.date.getFullYear()}-${pad(st.date.getMonth() + 1)}-${pad(st.date.getDate())}` });
    di.addEventListener('change', () => { const [y, m, d] = di.value.split('-').map(Number); if (y) { st.date = new Date(y, m - 1, d); all(); } });
    ctrls.append(A.el('div', { class: 'row' }, [A.el('label', { for: 'c-date', text: 'วันที่' }), di]));
    const rh = A.ui.range(ctrls, { label: 'เวลา', min: 0, max: 24, step: 0.25, value: st.hour, fmt: v => AS.hm(v) }, v => { st.hour = v; all(); });
    A.ui.buttons(ctrls, [['−1 ชม.', () => rh.set((st.hour + 23) % 24, true)], ['+1 ชม.', () => rh.set((st.hour + 1) % 24, true)], ['+1 เดือน', () => { st.date = new Date(st.date.getFullYear(), st.date.getMonth() + 1, st.date.getDate()); di.value = `${st.date.getFullYear()}-${pad(st.date.getMonth() + 1)}-${pad(st.date.getDate())}`; all(); }], ['ขณะนี้', () => { const n = new Date(); st.date = new Date(n.getFullYear(), n.getMonth(), n.getDate()); di.value = `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`; const utc = n.getUTCHours() + n.getUTCMinutes() / 60; rh.set(Math.round(((utc + 7) % 24) * 4) / 4, true); }]]);
    A.ui.h(ctrls, 'ผู้สังเกต');
    A.ui.range(ctrls, { label: 'ละติจูด', min: -60, max: 70, step: 0.1, value: st.lat, fmt: v => Math.abs(v).toFixed(1) + '° ' + (v >= 0 ? 'N' : 'S') }, v => { st.lat = v; all(); });
    A.ui.range(ctrls, { label: 'ลองจิจูด', min: 97, max: 106, step: 0.1, value: st.lon, fmt: v => v.toFixed(1) + '° E' }, v => { st.lon = v; all(); });
    A.ui.h(ctrls, 'การแสดงผล');
    const list = SKY.cons.map(c => [c[0], (TH[c[0]] ? TH[c[0]] + ' · ' : '') + c[1]]).sort((a, b) => (TH[b[0]] ? 1 : 0) - (TH[a[0]] ? 1 : 0) || a[1].localeCompare(b[1]));
    A.ui.select(ctrls, { label: 'เน้นกลุ่มดาว', value: '', options: [['', '— ไม่เน้น —']].concat(list) }, v => { st.hi = v; all(); });
    A.ui.range(ctrls, { label: 'ความสว่างจำกัด (แสดงถึงโชติมาตร)', min: 1, max: 5.2, step: 0.1, value: st.mag, fmt: v => v.toFixed(1) }, v => { st.mag = v; all(); });
    A.ui.check(ctrls, { label: 'เส้นกลุ่มดาว', value: true }, v => { st.lines = v; all(); });
    A.ui.check(ctrls, { label: 'ชื่อดาวสว่าง', value: true }, v => { st.names = v; all(); });
    A.ui.check(ctrls, { label: 'ชื่อกลุ่มดาว', value: true }, v => { st.cons = v; all(); });
    A.ui.check(ctrls, { label: 'เส้นมุมเงย 30° / 60°', value: true }, v => { st.grid = v; all(); });
    const out = A.ui.out(ctrls, [['lst', 'เวลาดาราคติท้องถิ่น'], ['n', 'จำนวนดาวที่แสดง']]);
    A.ui.note(ctrls, 'เส้นประสีทองคือสุริยวิถี ดาวเคราะห์และดวงจันทร์จะอยู่ใกล้เส้นนี้');
    function all() { ch.redraw(); const L = lst(); out.set('lst', AS.hm(L / 15).replace(' น.', ' h')); }
    st.onCount = n => out.set('n', n + ' ดวง');
    all();
  }
});
})();
