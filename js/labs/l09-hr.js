(function(){
// [name, Teff (K), L (L☉), group] — approximate literature values, for teaching. n = nearest (≤ ~5 pc), b = brightest in the sky
const DATA = [
 ['ดวงอาทิตย์', 5772, 1, 'nb'], ['α Centauri A', 5790, 1.52, 'nb'], ['α Centauri B', 5260, 0.5, 'n'], ['Proxima Centauri', 3042, 0.0017, 'n'], ["Barnard's Star", 3134, 0.0035, 'n'], ['Wolf 359', 2800, 0.0011, 'n'], ['Lalande 21185', 3547, 0.02, 'n'], ['Sirius A', 9940, 25.4, 'nb'], ['Sirius B', 25000, 0.056, 'n'], ['Luyten 726-8 A', 2670, 0.00006, 'n'], ['Ross 154', 3248, 0.0038, 'n'], ['Ross 248', 2799, 0.0018, 'n'], ['ε Eridani', 5084, 0.34, 'n'], ['Lacaille 9352', 3672, 0.033, 'n'], ['Ross 128', 3192, 0.0036, 'n'], ['EZ Aquarii A', 2900, 0.0004, 'n'], ['Procyon A', 6530, 6.93, 'nb'], ['Procyon B', 7740, 0.00049, 'n'], ['61 Cygni A', 4526, 0.153, 'n'], ['61 Cygni B', 4077, 0.085, 'n'], ['Struve 2398 A', 3441, 0.03, 'n'], ['Groombridge 34 A', 3700, 0.022, 'n'], ['ε Indi A', 4630, 0.22, 'n'], ['τ Ceti', 5344, 0.52, 'n'], ['Gliese 1061', 2953, 0.0016, 'n'], ['YZ Ceti', 3056, 0.0022, 'n'], ["Luyten's Star", 3150, 0.0088, 'n'], ["Teegarden's Star", 2904, 0.00073, 'n'], ["Kapteyn's Star", 3550, 0.012, 'n'], ['Lacaille 8760', 3800, 0.072, 'n'], ['Kruger 60 A', 3180, 0.01, 'n'], ["van Maanen's Star", 6220, 0.00017, 'n'], ['40 Eridani A', 5100, 0.46, 'n'], ['40 Eridani B', 16500, 0.013, 'n'], ['70 Ophiuchi A', 5300, 0.6, 'n'],
 ['Canopus', 7350, 10700, 'b'], ['Arcturus', 4286, 170, 'b'], ['Vega', 9602, 40, 'b'], ['Capella', 4970, 79, 'b'], ['Rigel', 12100, 120000, 'b'], ['Achernar', 15000, 3150, 'b'], ['Betelgeuse', 3600, 100000, 'b'], ['Hadar', 25000, 41700, 'b'], ['Altair', 7550, 10.6, 'b'], ['Acrux', 28000, 25000, 'b'], ['Aldebaran', 3910, 439, 'b'], ['Antares', 3570, 75900, 'b'], ['Spica', 25300, 20500, 'b'], ['Pollux', 4666, 32.7, 'b'], ['Fomalhaut', 8590, 16.6, 'b'], ['Deneb', 8525, 196000, 'b'], ['Mimosa', 27000, 34000, 'b'], ['Regulus', 12460, 288, 'b'], ['Adhara', 22200, 38700, 'b'], ['Castor A', 10286, 30, 'b'], ['Gacrux', 3626, 820, 'b'], ['Shaula', 25000, 36000, 'b'], ['Bellatrix', 22000, 9200, 'b'], ['Elnath', 13600, 700, 'b'], ['Miaplacidus', 8866, 210, 'b'], ['Alnilam', 27500, 275000, 'b'], ['Alnair', 13920, 263, 'b'], ['Alnitak', 29000, 250000, 'b'], ['Alioth', 9020, 102, 'b'], ['Dubhe', 4660, 316, 'b'], ['Mirfak', 6350, 5000, 'b'], ['Wezen', 6390, 50000, 'b'], ['Sargas', 7268, 1836, 'b'], ['Kaus Australis', 9960, 375, 'b'], ['Alkaid', 15540, 1350, 'b'], ['Atria', 4150, 5500, 'b'], ['Alhena', 9260, 123, 'b'], ['Peacock', 17700, 2200, 'b'], ['Polaris', 6015, 1260, 'b'], ['Mirzam', 23150, 26600, 'b'], ['Alphard', 4120, 780, 'b'], ['Hamal', 4480, 91, 'b'], ['Diphda', 4800, 145, 'b'], ['Nunki', 18890, 3300, 'b'], ['Saiph', 26500, 56000, 'b'], ['Kochab', 4030, 390, 'b'], ['Rasalhague', 8000, 25, 'b'], ['Algol', 13000, 182, 'b'], ['Denebola', 8500, 15, 'b']
];
const SPEC = [[30000, 'O'], [10000, 'B'], [7500, 'A'], [6000, 'F'], [5200, 'G'], [3700, 'K'], [2400, 'M']];
const spec = T => (SPEC.find(s => T >= s[0]) || SPEC[6])[1];
const tCol = T => { const t = Math.log10(T); const u = Math.max(0, Math.min(1, (t - 3.4) / 1.1)); return `rgb(${Math.round(255 - u * 90)},${Math.round(150 + u * 75 - (u > .6 ? (u - .6) * 60 : 0))},${Math.round(90 + u * 165)})`; };
A.reg({
  id: 'lab-hr', no: 9, title: 'แผนภาพเฮิรตซ์สปรุง–รัสเซลล์', short: 'ความสัมพันธ์ระหว่างอุณหภูมิผิวกับกำลังส่องสว่าง ลำดับหลัก ดาวยักษ์ ดาวแคระขาว และรัศมีจากกฎสเตฟาน–โบลต์ซมันน์',
  courses: ['2015231 · สัปดาห์ 12', '2015326 · บทที่ 5'], ref: 'OpenStax Astronomy 2e หัวข้อ 17.2 Colors of Stars, 18.3 Diameters of Stars และ 18.4 The H–R Diagram',
  steps: `<ol>
    <li>แสดงเฉพาะ “ดาวใกล้ดวงอาทิตย์” สังเกตว่าดาวส่วนใหญ่อยู่บริเวณใดของแผนภาพ นับจำนวนดาวในแต่ละกลุ่ม</li>
    <li>แสดงเฉพาะ “ดาวสว่างที่สุดบนท้องฟ้า” เปรียบเทียบการกระจายตัวกับกลุ่มแรก</li>
    <li>เลื่อนเมาส์ (หรือแตะ) บนแผนภาพเพื่ออ่านอุณหภูมิ กำลังส่องสว่าง และรัศมี ณ ตำแหน่งนั้น เปิดเส้นรัศมีคงที่เพื่อช่วยอ่าน</li>
    <li>ใช้ “วางดาวของฉัน” กรอกอุณหภูมิและกำลังส่องสว่างของดาวที่ได้รับมอบหมาย แล้วจำแนกว่าเป็นดาวชนิดใด</li></ol>`,
  theory: `<h3>แผนภาพ H–R</h3>
    <p>แผนภาพ H–R พล็อตกำลังส่องสว่าง (หรือโชติมาตรสัมบูรณ์) บนแกนตั้ง กับอุณหภูมิผิว (หรือชนิดสเปกตรัม OBAFGKM) บนแกนนอน โดย <b>อุณหภูมิสูงอยู่ทางซ้าย</b> ดาวไม่ได้กระจายแบบสุ่ม แต่รวมกลุ่มเป็น</p>
    <ul><li><b>ลำดับหลัก (main sequence)</b> — ดาวที่เผาไหม้ไฮโดรเจนในแกนกลาง ประมาณ 90% ของดาวทั้งหมด</li><li><b>ดาวยักษ์และดาวยักษ์ใหญ่</b> — เย็นแต่สว่างมากเพราะมีขนาดใหญ่</li><li><b>ดาวแคระขาว</b> — ร้อนแต่สว่างน้อยเพราะเล็กมาก</li></ul>
    <div class="eq">กฎสเตฟาน–โบลต์ซมันน์: L = 4πR²σT⁴ &nbsp; ⇒ &nbsp; R/R☉ = √(L/L☉) · (5772 K / T)²</div>
    <div class="eq">กฎของวีน: λ_max = 2.898 × 10⁻³ m·K / T</div>
    <p>ดาวสว่างที่สุดบนท้องฟ้าส่วนใหญ่ไม่ใช่ดาวทั่วไป แต่เป็นดาวกำลังส่องสว่างสูงที่มองเห็นได้จากระยะไกล (ความเอนเอียงในการเลือกตัวอย่าง) ส่วนดาวใกล้ตัวที่สุดส่วนใหญ่เป็นดาวแคระแดงซึ่งมองด้วยตาเปล่าไม่เห็น</p>
    <p class="note">ข้อมูลดาวในตัวจำลองเป็นค่าโดยประมาณจากเอกสารอ้างอิงเพื่อการเรียนการสอน</p>`,
  questions: [
    { q: 'นับจำนวนดาวในแต่ละกลุ่ม', table: { cols: ['กลุ่มข้อมูล', 'ลำดับหลัก', 'ดาวยักษ์/ยักษ์ใหญ่', 'ดาวแคระขาว'], rows: ['ดาวใกล้ดวงอาทิตย์', 'ดาวสว่างที่สุด'] } },
    { q: 'ทำไมการกระจายตัวของดาวสองกลุ่มจึงแตกต่างกันมาก กลุ่มใดเป็นตัวแทนของดาวในดาราจักรได้ดีกว่า' },
    { q: 'คำนวณรัศมีของดาวต่อไปนี้ด้วยกฎสเตฟาน–โบลต์ซมันน์ แล้วตรวจกับตัวจำลอง', table: { cols: ['ดาว', 'T (K)', 'L (L☉)', 'R (R☉) คำนวณ', 'ชนิด'], rows: ['Betelgeuse', 'Sirius B', 'Vega', 'Proxima Centauri'] } },
    { q: 'ดาวดวงหนึ่งมีอุณหภูมิ 4,000 K และกำลังส่องสว่าง 500 L☉ ดาวนี้อยู่บริเวณใดของแผนภาพ มีรัศมีเท่าใด และมีสีอะไร' },
    { q: 'เส้นรัศมีคงที่บนแผนภาพมีลักษณะอย่างไร อธิบายว่าทำไมดาวแคระขาวจึงอยู่มุมล่างซ้าย' }
  ],
  mount(stage, ctrls) {
    const st = { show: 'both', radius: true, labels: false, mine: null, cur: null };
    const cv = A.canvas(stage, { ratio: 0.72, min: 360, max: 640, cap: 'แผนภาพเฮิรตซ์สปรุง–รัสเซลล์' }, draw);
    let ax, box;
    const Tmin = Math.log10(2300), Tmax = Math.log10(40000), Lmin = -5, Lmax = 6.2;
    function draw(ctx, W, H) {
      box = { x: 70, y: 46, w: W - 96, h: H - 100 };
      // spectral class band
      ax = A.g.axes(ctx, box, { x0: Tmin, x1: Tmax, y0: Lmin, y1: Lmax, revx: true, xt: [3000, 5000, 7000, 10000, 20000, 30000].map(Math.log10), yt: [-4, -2, 0, 2, 4, 6], xf: v => Math.round(10 ** v).toLocaleString(), yf: v => '10' + ({ '-4': '⁻⁴', '-2': '⁻²', 0: '⁰', 2: '²', 4: '⁴', 6: '⁶' })[v], xl: 'อุณหภูมิผิว (K) — ร้อนอยู่ทางซ้าย', yl: 'กำลังส่องสว่าง (L☉)', ylo: 52 });
      SPEC.forEach(([T, s], i) => { const hi = i ? SPEC[i - 1][0] : 50000; const x1 = ax.X(Math.min(Tmax, Math.log10(hi))), x2 = ax.X(Math.max(Tmin, Math.log10(T))); A.g.text(ctx, s, (x1 + x2) / 2, box.y - 8, { a: 'center', s: 13, w: 700, c: tCol((T + Math.min(hi, 40000)) / 2) }); });
      ctx.save(); ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip();
      // region labels
      const lab = (t, T, L, c) => A.g.text(ctx, t, ax.X(Math.log10(T)), ax.Y(L), { a: 'center', s: 13, w: 600, c });
      lab('ดาวยักษ์ใหญ่', 6000, 5.3, 'rgba(255,180,140,.55)'); lab('ดาวยักษ์', 4300, 2.6, 'rgba(255,190,140,.55)'); lab('ลำดับหลัก', 14000, 1.2, 'rgba(165,200,255,.55)'); lab('ดาวแคระขาว', 14000, -3.4, 'rgba(220,220,255,.55)');
      if (st.radius) [0.01, 0.1, 1, 10, 100, 1000].forEach(R => {
        ctx.beginPath(); [Tmin, Tmax].forEach((lt, i) => { const L = 2 * Math.log10(R) + 4 * (lt - Math.log10(5772)); i ? ctx.lineTo(ax.X(lt), ax.Y(L)) : ctx.moveTo(ax.X(lt), ax.Y(L)); }); ctx.strokeStyle = 'rgba(110,231,183,.28)'; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
        const lt = Math.log10(3000), L = 2 * Math.log10(R) + 4 * (lt - Math.log10(5772)); if (L > Lmin && L < Lmax) A.g.text(ctx, R + ' R☉', ax.X(lt) + 4, ax.Y(L) - 4, { s: 11, c: 'rgba(110,231,183,.8)' });
      });
      DATA.forEach(d => {
        const inN = d[3].includes('n'), inB = d[3].includes('b');
        if (st.show === 'n' && !inN || st.show === 'b' && !inB) return;
        const x = ax.X(Math.log10(d[1])), y = ax.Y(Math.log10(d[2]));
        A.g.circle(ctx, x, y, d[0] === 'ดวงอาทิตย์' ? 6 : 4.2, tCol(d[1]), st.show === 'both' ? (inB ? '#ffffff' : null) : null, 1);
        if (st.labels || d[0] === 'ดวงอาทิตย์') A.g.text(ctx, d[0], x + 7, y + 4, { s: 11, c: '#c7d2fe' });
      });
      if (st.mine) { const x = ax.X(Math.log10(st.mine[0])), y = ax.Y(Math.log10(st.mine[1])); A.g.circle(ctx, x, y, 8, null, '#ff8f80', 2.5); A.g.text(ctx, 'ดาวของฉัน', x + 10, y - 8, { s: 12, w: 600, c: '#ff8f80' }); }
      if (st.cur) { const [x, y] = st.cur; A.g.line(ctx, x, box.y, x, box.y + box.h, 'rgba(255,255,255,.25)'); A.g.line(ctx, box.x, y, box.x + box.w, y, 'rgba(255,255,255,.25)'); }
      ctx.restore();
      if (st.show === 'both') A.g.text(ctx, '● มีขอบขาว = ดาวสว่างที่สุด   ● ไม่มีขอบ = ดาวใกล้ที่สุด', box.x, H - 6, { s: 11.5, c: '#9aa7c7' });
    }
    const out = { el: null };
    A.drag(cv.cv, { hover: probe, down: probe, leave() { st.cur = null; cv.redraw(); } });
    function probe(x, y) {
      if (!box || x < box.x || x > box.x + box.w || y < box.y || y > box.y + box.h) return;
      st.cur = [x, y]; cv.redraw();
      const lt = Tmax - (x - box.x) / box.w * (Tmax - Tmin), lL = Lmin + (box.y + box.h - y) / box.h * (Lmax - Lmin);
      const T = 10 ** lt, L = 10 ** lL, R = Math.sqrt(L) * (5772 / T) ** 2;
      let best = null, bd = 12; DATA.forEach(d => { if (st.show === 'n' && !d[3].includes('n') || st.show === 'b' && !d[3].includes('b')) return; const dd = Math.hypot(ax.X(Math.log10(d[1])) - x, ax.Y(Math.log10(d[2])) - y); if (dd < bd) { bd = dd; best = d; } });
      if (best) setOut(best[1], best[2], best[0]); else setOut(T, L, 'ตำแหน่งเคอร์เซอร์');
    }
    function setOut(T, L, name) { const R = Math.sqrt(L) * (5772 / T) ** 2; o.set('n', name); o.set('T', Math.round(T).toLocaleString() + ' K (' + spec(T) + ')'); o.set('L', L < 0.01 ? L.toExponential(1) + ' L☉' : (+L.toPrecision(3)).toLocaleString() + ' L☉'); o.set('R', R < 0.1 ? R.toFixed(4) + ' R☉' : (+R.toPrecision(3)).toLocaleString() + ' R☉'); o.set('w', (2.898e6 / T).toFixed(0) + ' nm'); }
    A.ui.h(ctrls, 'ชุดข้อมูล');
    A.ui.seg(ctrls, { value: 'both', options: [['n', 'ดาวใกล้ที่สุด'], ['b', 'ดาวสว่างที่สุด'], ['both', 'ทั้งสองชุด']] }, v => { st.show = v; cv.redraw(); });
    A.ui.check(ctrls, { label: 'เส้นรัศมีคงที่', value: true }, v => { st.radius = v; cv.redraw(); });
    A.ui.check(ctrls, { label: 'ชื่อดาวทุกดวง', value: false }, v => { st.labels = v; cv.redraw(); });
    const o = A.ui.out(ctrls, [['n', 'ดาว / ตำแหน่ง'], ['T', 'อุณหภูมิ (ชนิดสเปกตรัม)'], ['L', 'กำลังส่องสว่าง'], ['R', 'รัศมี'], ['w', 'ความยาวคลื่นสูงสุด (วีน)']]);
    A.ui.h(ctrls, 'วางดาวของฉัน');
    const iT = A.ui.num(ctrls, { label: 'อุณหภูมิ T (K)', value: 4000, min: 2300, max: 40000 }, () => {});
    const iL = A.ui.num(ctrls, { label: 'กำลังส่องสว่าง L (L☉)', value: 500, min: 0.00001 }, () => {});
    A.ui.buttons(ctrls, [['วางบนแผนภาพ', () => { const T = iT.get(), L = iL.get(); if (T > 0 && L > 0) { st.mine = [T, L]; setOut(T, L, 'ดาวของฉัน'); cv.redraw(); } }], ['ล้าง', () => { st.mine = null; cv.redraw(); }]]);
    setOut(5772, 1, 'ดวงอาทิตย์');
  }
});
})();
