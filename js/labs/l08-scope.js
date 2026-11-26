(function(){
const SCOPES = { s60: ['กล้องหักเหแสง 60/700 mm', 60, 700], s80: ['กล้องหักเหแสง 80/900 mm', 80, 900], d200: ['กล้องสะท้อนแสงดอบโซเนียน 200/1200 mm', 200, 1200], sct: ['ชมิดท์–แคสซิเกรน 280/2800 mm', 280, 2800], tno: ['กล้องโทรทรรศน์แห่งชาติ 2.4 m (f/10)', 2400, 24000] };
// angular sizes in arcsec
const TGT = { moon: 'ดวงจันทร์ (31′)', jupiter: 'ดาวพฤหัสบดีและดวงจันทร์บริวาร (44″)', saturn: 'ดาวเสาร์และวงแหวน (วงแหวน 42″)', albireo: 'ดาวคู่ Albireo (ห่าง 34″)', epslyr: 'ดาวคู่ ε¹ Lyrae (ห่าง 2.3″)' };
A.reg({
  id: 'lab-scope', no: 8, title: 'กล้องโทรทรรศน์', short: 'กำลังขยาย อัตราส่วนโฟกัส ความสามารถรวมแสง กำลังแยกภาพ ขอบเขตภาพ และภาพที่เห็นผ่านเลนส์ตา',
  courses: ['2015231 · สัปดาห์ 10', '2015326 · บทที่ 6'], ref: 'OpenStax Astronomy 2e หัวข้อ 6.1 Telescopes และ 6.2 Telescopes Today',
  steps: `<ol>
    <li>เลือกกล้อง 80/900 mm และเลนส์ตา 25 mm คำนวณกำลังขยายด้วยตนเองก่อน แล้วตรวจกับแผงผลลัพธ์</li>
    <li>เปลี่ยนเลนส์ตาเป็น 10, 6 และ 4 mm สังเกตขนาดของวัตถุ ขอบเขตภาพจริง (ส่วนของท้องฟ้าที่เห็น) และความสว่างของภาพ</li>
    <li>เลือกดาวคู่ ε¹ Lyrae (ห่าง 2.3″) ทดลองกล้องหน้ากว้างต่าง ๆ หาว่ากล้องขนาดใดเริ่มแยกดาวสองดวงออกจากกันได้ เทียบกับขีดจำกัดดอว์ส</li>
    <li>เพิ่มค่าความปั่นป่วนของบรรยากาศ (seeing) สังเกตผลต่อกล้องขนาดใหญ่</li>
    <li>ตรวจว่ากำลังขยายเกิน 2 × D (mm) แล้วภาพดีขึ้นหรือไม่</li></ol>`,
  theory: `<h3>หน้าที่หลักของกล้องโทรทรรศน์</h3>
    <p>กล้องโทรทรรศน์มีหน้าที่ <b>รวมแสง</b> และ <b>แยกรายละเอียด</b> ได้ดีกว่าตาเปล่า การขยายเป็นหน้าที่รอง กล้องหักเหแสงใช้เลนส์วัตถุ กล้องสะท้อนแสงใช้กระจกโค้ง กล้องขนาดใหญ่ในปัจจุบันเป็นแบบสะท้อนแสงทั้งหมด</p>
    <div class="eq">กำลังขยาย M = F / f &nbsp;&nbsp; (F = ความยาวโฟกัสเลนส์วัตถุ, f = ความยาวโฟกัสเลนส์ตา)</div>
    <div class="eq">อัตราส่วนโฟกัส N = F / D &nbsp;&nbsp; ความสามารถรวมแสงเทียบตา = (D / 7 mm)²</div>
    <div class="eq">กำลังแยกภาพ: เรย์ลี θ = 1.22 λ/D ≈ 138″/D(mm) &nbsp;&nbsp; ดอว์ส θ ≈ 116″/D(mm)</div>
    <div class="eq">ขอบเขตภาพจริง = ขอบเขตภาพปรากฏของเลนส์ตา / M &nbsp;&nbsp; รูม่านแสงออก = D / M</div>
    <div class="eq">โชติมาตรจำกัด ≈ 7.7 + 5 log₁₀ D(cm) &nbsp;&nbsp; กำลังขยายสูงสุดที่ใช้ได้ ≈ 2 × D(mm)</div>
    <p>บนพื้นโลก ความปั่นป่วนของบรรยากาศ (seeing) จำกัดรายละเอียดที่ราว 1–2″ ไม่ว่ากล้องจะใหญ่เพียงใด จึงต้องใช้ระบบปรับแก้ภาพ (adaptive optics) หรือส่งกล้องขึ้นอวกาศ</p>`,
  questions: [
    { q: 'กล้อง 80/900 mm กับเลนส์ตาขนาดต่าง ๆ (ขอบเขตภาพปรากฏ 52°)', table: { cols: ['เลนส์ตา f (mm)', 'กำลังขยาย', 'ขอบเขตภาพจริง', 'รูม่านแสงออก (mm)', 'ความสว่างของภาพ (สังเกต)'], rows: ['25', '10', '6', '4'] } },
    { q: 'เปรียบเทียบกล้องต่าง ๆ', table: { cols: ['กล้อง', 'อัตราส่วนโฟกัส', 'รวมแสง (เท่าของตา)', 'กำลังแยกภาพ (″)', 'โชติมาตรจำกัด'], rows: ['60/700', '80/900', '200/1200', '2.4 m'] } },
    { q: 'กล้องขนาดหน้ากว้างเล็กที่สุดเท่าใดที่แยกดาวคู่ ε¹ Lyrae (2.3″) ได้ เทียบกับขีดจำกัดดอว์ส' },
    { q: 'เหตุใดการเพิ่มกำลังขยายมากเกินไป (เช่น 600 เท่าในกล้อง 80 mm) จึงไม่ทำให้เห็นรายละเอียดมากขึ้น' },
    { q: 'ทำไมกล้องโทรทรรศน์อวกาศขนาด 2.4 m จึงให้ภาพคมกว่ากล้องบนพื้นโลกขนาด 8 m ในบางกรณี' }
  ],
  mount(stage, ctrls) {
    const st = { D: 80, F: 900, f: 10, afov: 52, tgt: 'jupiter', seeing: 1.5, zoom: 3 };
    const ray = A.canvas(stage, { ratio: 0.3, min: 200, max: 280, cap: 'ทางเดินแสงในกล้องหักเหแสงแบบเคปเลอร์ (มุมขยายเกินจริงเพื่อให้เห็น)' }, drawRay);
    const eye = A.canvas(stage, { ratio: 0.62, min: 300, max: 520, cap: 'ภาพที่เห็นผ่านเลนส์ตา' }, drawEye);
    const M = () => st.F / st.f;
    const res = () => Math.max(116 / st.D, 0);
    function drawRay(ctx, W, H) {
      const x0 = 40, x1 = W - 70, cy = H / 2 + 12;
      const L = st.F + st.f, s = (x1 - x0) / L;
      const xo = x0, xf = x0 + st.F * s, xe = xf + st.f * s;
      const ho = Math.min(H * 0.33, 18 + st.D / 300 * H * 0.3), yoff = ho * 0.35, he = Math.max(12, 0.85 * ho * st.f / st.F + yoff * (1 + st.f / st.F) + 6);
      // tube
      ctx.fillStyle = 'rgba(125,150,220,.07)'; ctx.fillRect(xo, cy - ho - 6, xe - xo, 2 * ho + 12);
      A.g.line(ctx, x0 - 30, cy, W - 10, cy, 'rgba(150,160,200,.3)', 1, [4, 4]);
      const lens = (x, h, c) => { ctx.beginPath(); ctx.ellipse(x, cy, 5, h, 0, 0, 7); ctx.fillStyle = c; ctx.fill(); };
      lens(xo, ho, 'rgba(125,211,252,.55)'); lens(xe, he, 'rgba(165,180,252,.6)');
      const th = Math.atan(yoff / (st.F * s));   // incoming angle (exaggerated)
      const yF = cy + st.F * s * Math.tan(th); // image point (below axis -> inverted)
      [-1, 0, 1].forEach(k => {
        const y0 = cy + k * ho * 0.85;
        const yin = y0 - 30 * Math.tan(th);
        A.g.line(ctx, xo - 30, yin, xo, y0, '#ffcc4d', 1.3);
        A.g.line(ctx, xo, y0, xf, yF, '#ffcc4d', 1.3);
        const ye = yF + (yF - y0) / (xf - xo) * (xe - xf);
        // after eyepiece: parallel rays, direction set by chief ray through eyepiece centre from image point
        const slope = (cy - yF) / (xe - xf);
        A.g.line(ctx, xf, yF, xe, ye, '#ffcc4d', 1.3), A.g.line(ctx, xe, ye, W - 8, ye + slope * (W - 8 - xe), '#ffcc4d', 1.3);
      });
      A.g.line(ctx, xf, cy - 6, xf, yF + 6, 'rgba(255,143,128,.8)', 1.5);
      A.g.text(ctx, 'เลนส์วัตถุ D = ' + st.D + ' mm', xo + 8, cy - ho - 12, { s: 12, c: '#7dd3fc' });
      A.g.text(ctx, 'ระนาบโฟกัส', xf, cy + ho + 18, { s: 11.5, a: 'center', c: '#ff8f80' });
      A.g.text(ctx, 'เลนส์ตา', xe, cy - he - 10, { s: 12, a: 'center', c: '#a5b4fc' });
      A.g.text(ctx, `F = ${st.F} mm`, (xo + xf) / 2, H - 10, { s: 12, a: 'center', c: '#9aa7c7' }); A.g.text(ctx, `f = ${st.f} mm`, Math.min(W - 30, (xf + xe) / 2 + 20), H - 10, { s: 12, a: 'center', c: '#9aa7c7' });
    }
    const off = document.createElement('canvas'), ox = off.getContext('2d');
    function scene(c, R, px) {   // px = pixels per arcsec on screen
      const g = A.g;
      if (st.tgt === 'moon') {
        PLANET.draw(c, 0, 0, 932 * px, 'moon');
      } else if (st.tgt === 'jupiter') {
        PLANET.draw(c, 0, 0, 22 * px, 'jupiter');
        [[-138, 'Io'], [220, 'Europa'], [-351, 'Ganymede'], [618, 'Callisto']].forEach(([d]) => g.circle(c, d * px, (d > 0 ? 1 : -1) * 2 * px, Math.max(0.8, 0.6 * px), '#f2eee6'));
      } else if (st.tgt === 'saturn') {
        PLANET.draw(c, 0, 0, 9.2 * px, 'saturn', { tilt: 0.38 });
        g.circle(c, 180 * px, 20 * px, Math.max(0.8, 0.5 * px), '#f0e6cc');
      } else if (st.tgt === 'albireo') {
        const sz = Math.max(1.2, 1.2 * px); g.circle(c, -17 * px, -5 * px, sz * 1.6, '#ffd27a'); g.circle(c, 17 * px, 5 * px, sz, '#9cc4ff');
      } else {
        const sz = Math.max(1, 0.7 * px); g.circle(c, -1.15 * px, 0, sz, '#f4f7ff'); g.circle(c, 1.15 * px, 0, sz * 0.9, '#f4f7ff');
        g.circle(c, 208 * px, 0, sz, '#f4f7ff'); g.circle(c, 205.7 * px, 0, sz * 0.9, '#f4f7ff');
      }
    }
    function drawEye(ctx, W, H) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.44, cx = W / 2, cy = H / 2;
      const m = M(), px = (m / 3600) / (st.afov / 2) * R * st.zoom; // px per arcsec (display zoom only)
      const blur = Math.max(res(), st.seeing) * px;          // blur diameter in px
      const ep = st.D / m, bright = Math.max(0.25, Math.min(1, ep / 1.2));
      const d = window.devicePixelRatio || 1;
      // render scene at reduced resolution to blur it (works in every browser)
      const k = Math.max(1, blur / 1.2);
      const ow = Math.ceil(2 * R * d / k), oh = ow; off.width = ow; off.height = oh;
      ox.setTransform(d / k, 0, 0, d / k, ow / 2, oh / 2); ox.fillStyle = '#04060c'; ox.fillRect(-R * 2, -R * 2, R * 4, R * 4);
      scene(ox, R, px);
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.globalAlpha = bright; ctx.drawImage(off, cx - R, cy - R, 2 * R, 2 * R); ctx.globalAlpha = 1;
      ctx.restore();
      A.g.circle(ctx, cx, cy, R, null, '#333c55', 3);
      A.g.text(ctx, `${m.toFixed(0)}× · ขอบเขตภาพจริง ${(st.afov / m * 60).toFixed(1)}′` + (st.zoom > 1 ? ` · ซูมจอ ×${st.zoom} (เห็นเฉพาะกลางภาพ)` : ''), 12, H - 14, { s: 13, w: 600 });
      if (m > 2 * st.D) A.g.text(ctx, 'กำลังขยายเกิน 2 × D: ภาพมืดและพร่ามัว (empty magnification)', W - 12, H - 14, { s: 12.5, a: 'right', c: '#ff8f80' });
    }
    A.ui.h(ctrls, 'กล้องโทรทรรศน์');
    A.ui.select(ctrls, { label: 'กล้องสำเร็จรูป', value: 's80', options: Object.entries(SCOPES).map(([k, v]) => [k, v[0]]) }, k => { rD.set(SCOPES[k][1]); rF.set(SCOPES[k][2]); st.D = SCOPES[k][1]; st.F = SCOPES[k][2]; all(); });
    const rD = A.ui.num(ctrls, { label: 'เส้นผ่านศูนย์กลางเลนส์วัตถุ/กระจก D (mm)', value: st.D, min: 10 }, v => { st.D = v; all(); });
    const rF = A.ui.num(ctrls, { label: 'ความยาวโฟกัสกล้อง F (mm)', value: st.F, min: 50 }, v => { st.F = v; all(); });
    A.ui.seg(ctrls, { label: 'เลนส์ตา f', value: 10, options: [[32, '32'], [25, '25'], [10, '10'], [6, '6'], [4, '4'], [2.5, '2.5 mm']] }, v => { st.f = v; all(); });
    A.ui.range(ctrls, { label: 'ขอบเขตภาพปรากฏของเลนส์ตา', min: 40, max: 82, value: st.afov, unit: '°' }, v => { st.afov = v; all(); });
    A.ui.seg(ctrls, { label: 'ซูมจอเพื่อดูรายละเอียด (ไม่ใช่กำลังขยายกล้อง)', value: 3, options: [[1, '×1 ตามจริง'], [3, '×3'], [8, '×8']] }, v => { st.zoom = v; eye.redraw(); });
    A.ui.h(ctrls, 'เป้าหมายและสภาพฟ้า');
    A.ui.select(ctrls, { label: 'วัตถุ', value: st.tgt, options: Object.entries(TGT) }, v => { st.tgt = v; all(); });
    A.ui.range(ctrls, { label: 'ความปั่นป่วนของบรรยากาศ (seeing)', min: 0, max: 4, step: 0.1, value: st.seeing, fmt: v => v ? v.toFixed(1) + '″' : 'อวกาศ (0″)' }, v => { st.seeing = v; all(); });
    const out = A.ui.out(ctrls, [['M', 'กำลังขยาย M'], ['N', 'อัตราส่วนโฟกัส'], ['lgp', 'รวมแสงเทียบตา (7 mm)'], ['res', 'กำลังแยกภาพ ดอว์ส / เรย์ลี'], ['tfov', 'ขอบเขตภาพจริง'], ['ep', 'รูม่านแสงออก'], ['lim', 'โชติมาตรจำกัด'], ['mx', 'กำลังขยายที่ใช้ได้']]);
    function all() {
      ray.redraw(); eye.redraw();
      const m = M(); out.set('M', m.toFixed(1) + ' เท่า'); out.set('N', 'f/' + (st.F / st.D).toFixed(1)); out.set('lgp', Math.round((st.D / 7) ** 2).toLocaleString() + ' เท่า');
      out.set('res', (116 / st.D).toFixed(2) + '″ / ' + (138 / st.D).toFixed(2) + '″'); out.set('tfov', (st.afov / m).toFixed(2) + '° (' + (st.afov / m * 60).toFixed(0) + '′)');
      out.set('ep', (st.D / m).toFixed(2) + ' mm'); out.set('lim', (7.7 + 5 * Math.log10(st.D / 10)).toFixed(1)); out.set('mx', Math.round(st.D / 7) + '–' + Math.round(2 * st.D) + ' เท่า');
    }
    all();
  }
});
})();
