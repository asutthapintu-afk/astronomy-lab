(function(){
const ZOD = ['Psc', 'Ari', 'Tau', 'Gem', 'Cnc', 'Leo', 'Vir', 'Lib', 'Sco', 'Oph', 'Sgr', 'Cap', 'Aqr'];
A.reg({
  id: 'lab-sun', no: 5, title: 'การเคลื่อนที่ของดวงอาทิตย์', short: 'เส้นทางรายวันของดวงอาทิตย์ จุดขึ้น–ตกที่เปลี่ยนตามฤดูกาล เวลาสุริยคติกับเวลามาตรฐาน และการเคลื่อนบนสุริยวิถีผ่านจักรราศี',
  courses: ['2015326 · ปฏิบัติการที่ 5', '2015231 · สัปดาห์ 7'], ref: 'OpenStax Astronomy 2e หัวข้อ 2.1 The Sky Above, 4.2 The Seasons และ 4.3 Keeping Time',
  steps: `<ol>
    <li>ตั้งผู้สังเกตที่มหาสารคาม เลือกวันวสันตวิษุวัต กดเล่นเพื่อดูดวงอาทิตย์เคลื่อนที่ตลอดวัน บันทึกเวลาขึ้น–ตก มุมทิศที่ขึ้น–ตก และมุมเงยเที่ยง</li>
    <li>ทำซ้ำในวันครีษมายันและเหมายัน เปรียบเทียบเส้นทางทั้งสาม (เส้นสีจางแสดงเส้นทางวันอ้างอิง)</li>
    <li>ดูแผนภาพด้านล่าง สังเกตตำแหน่งดวงอาทิตย์บนสุริยวิถีในพิกัด RA–Dec และกลุ่มดาวจักรราศีที่ดวงอาทิตย์อยู่ในแต่ละเดือน</li>
    <li>อ่านความยาวเงาของเสาสูง 1 เมตร เวลา 12:00 น. ตามนาฬิกาในวันต่าง ๆ</li></ol>`,
  theory: `<h3>การเคลื่อนที่รายวัน</h3>
    <p>ดวงอาทิตย์ขึ้นทางขอบฟ้าด้านตะวันออก ผ่านเมริเดียนเวลาเที่ยงสุริยคติ และตกทางตะวันตก เส้นทางรายวันขนานกับเส้นศูนย์สูตรฟ้า ที่เดคลิเนชัน δ ของวันนั้น</p>
    <div class="eq">มุมทิศที่ขึ้น: cos A = sin δ / cos φ &nbsp;&nbsp; (วิษุวัต: ขึ้นตรงทิศตะวันออก A = 90°)</div>
    <h3>การเคลื่อนที่รายปีบนสุริยวิถี</h3>
    <p>ดวงอาทิตย์เคลื่อนไปทางตะวันออกเทียบกับดาวฤกษ์วันละประมาณ 1° (360°/365.25 วัน) ตามเส้น <b>สุริยวิถี (ecliptic)</b> ซึ่งเอียง 23.44° กับเส้นศูนย์สูตรฟ้า ผ่านกลุ่มดาวจักรราศี 13 กลุ่ม (รวมคนแบกงู Ophiuchus)</p>
    <h3>เวลาสุริยคติกับเวลามาตรฐาน</h3>
    <p>ประเทศไทยใช้เวลามาตรฐาน UTC+7 อ้างอิงลองจิจูด 105° E นอกจากนี้วงโคจรรีและแกนเอียงทำให้เวลาสุริยคติจริงคลาดจากเวลาเฉลี่ย เรียกว่า <b>สมการเวลา (Equation of Time)</b> ได้ถึง ±16 นาที</p>
    <div class="eq">เวลานาฬิกา = เวลาสุริยคติจริง − สมการเวลา + (105° − λ)/15° ชั่วโมง</div>
    <div class="eq">ความยาวเงาของเสาสูง L: s = L / tan h</div>`,
  questions: [
    { q: 'ผลการสังเกตดวงอาทิตย์ที่มหาสารคาม', table: { cols: ['วันที่', 'เวลาขึ้น', 'มุมทิศที่ขึ้น', 'เวลาตก', 'มุมทิศที่ตก', 'มุมเงยเที่ยง'], rows: ['21 มี.ค.', '21 มิ.ย.', '23 ก.ย.', '22 ธ.ค.'] } },
    { q: 'จุดขึ้นของดวงอาทิตย์เลื่อนไปอย่างไรตลอดปี จุดที่ขึ้นเหนือสุดและใต้สุดตรงกับวันใด' },
    { q: 'เวลาเที่ยงสุริยคติ (ดวงอาทิตย์ผ่านเมริเดียน) ที่มหาสารคามตรงกับกี่นาฬิกาในวันต่าง ๆ และเหตุใดจึงไม่ตรงกับ 12:00 น.' },
    { q: 'ในเดือนพฤศจิกายน ดวงอาทิตย์อยู่ในกลุ่มดาวใด และในคืนเดือนพฤศจิกายนเราจะเห็นกลุ่มดาวจักรราศีใดอยู่กลางฟ้าตอนเที่ยงคืน' },
    { q: 'บันทึกความยาวเงาของเสาสูง 1 m เวลาเที่ยงสุริยคติ และทิศของเงาในวันที่ 21 มิ.ย. และ 22 ธ.ค. อธิบายความแตกต่าง' }
  ],
  mount(stage, ctrls) {
    const st = { lat: 16.18, lon: 103.3, doy: 80, t: 9, run: true, speed: 1.5, psi: 160, eps: 20 };
    const sph = A.canvas(stage, { ratio: 0.58, min: 320, max: 540, cap: 'เส้นทางดวงอาทิตย์บนท้องฟ้า (ลากเพื่อหมุนมุมมอง)' }, draw);
    const ecl = A.canvas(stage, { ratio: 0.34, min: 220, max: 320, cap: 'ตำแหน่งดวงอาทิตย์บนสุริยวิถีตลอดปี (พิกัด RA–Dec)' }, drawEcl);
    AS.orbitDrag(sph, st, () => sph.redraw());
    const dec = () => AS.sunDec(st.doy);
    const clock = solar => solar - AS.eot(st.doy) / 60 + (105 - st.lon) / 15;
    function draw(ctx, W, H) {
      const q = AS.altaz((st.t - 12) * 15, dec(), st.lat);
      const day = q.alt > 0;
      const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, day ? '#16306b' : '#060b1a'); bg.addColorStop(1, day ? '#1d3d7a' : '#0b1430'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      if (!day) A.g.stars(ctx, W, H, 90);
      const S = new AS.Sphere(W / 2, H / 2 + 12, Math.min(W, H) * 0.4, st.psi, st.eps);
      [[172, 'ครีษมายัน'], [80, 'วิษุวัต'], [356, 'เหมายัน']].forEach(([d]) => S.dayCircle(ctx, AS.sunDec(d), st.lat, 'rgba(255,204,77,.25)', 1));
      S.base(ctx, st.lat, { equator: false });
      S.dayCircle(ctx, dec(), st.lat, '#ffcc4d', 2.2);
      const p = S.P(AS.enu(q.alt, q.az));
      if (q.alt >= 0) A.g.sun(ctx, p.x, p.y, 8); else A.g.circle(ctx, p.x, p.y, 6, '#7a6a3a');
      // gnomon shadow on horizon disc
      if (q.alt > 1) {
        const o = S.P([0, 0, 0]); const len = Math.min(0.9, 0.12 / Math.tan(q.alt * AS.D));
        const sh = S.P([-Math.sin(q.az * AS.D) * len, -Math.cos(q.az * AS.D) * len, 0]); const top = S.P([0, 0, 0.12]);
        A.g.line(ctx, o.x, o.y, sh.x, sh.y, 'rgba(0,0,0,.6)', 4); A.g.line(ctx, o.x, o.y, top.x, top.y, '#e9edf8', 2.5);
      }
      A.g.text(ctx, 'เส้นจาง: เส้นทางวันครีษมายัน / วิษุวัต / เหมายัน', 12, H - 12, { s: 12, c: '#ffe7a3' });
    }
    function drawEcl(ctx, W, H) {
      const box = { x: 44, y: 34, w: W - 60, h: H - 70 };
      const ax = A.g.axes(ctx, box, { x0: 0, x1: 24, y0: -40, y1: 40, revx: true, xt: [0, 4, 8, 12, 16, 20, 24], yt: [-30, 0, 30], xf: v => v + 'h', yf: v => (v > 0 ? '+' : '') + v + '°' });
      ctx.save(); ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip();
      SKY.stars.forEach(s => { if (s[2] > 3.5 || Math.abs(s[1]) > 40) return; A.g.circle(ctx, ax.X(s[0] / 15), ax.Y(s[1]), Math.max(0.6, 2.6 - s[2] * 0.55), 'rgba(220,230,255,.75)'); });
      // equator & ecliptic
      A.g.line(ctx, box.x, ax.Y(0), box.x + box.w, ax.Y(0), 'rgba(165,180,252,.6)', 1, [4, 4]);
      ctx.beginPath(); for (let l = 0; l <= 360; l += 2) { const ra = AS.norm(Math.atan2(Math.cos(23.44 * AS.D) * Math.sin(l * AS.D), Math.cos(l * AS.D)) * AS.R) / 15, de = Math.asin(Math.sin(23.44 * AS.D) * Math.sin(l * AS.D)) * AS.R; const x = ax.X(ra), y = ax.Y(de); l === 0 || ra < 0.05 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.strokeStyle = '#ffcc4d'; ctx.lineWidth = 1.4; ctx.stroke();
      SKY.cons.forEach(c => { if (!ZOD.includes(c[0])) return; A.g.text(ctx, c[1], ax.X(c[2] / 15), ax.Y(c[3]) + (c[3] > 0 ? -14 : 22), { s: 11.5, a: 'center', c: '#7dd3fc' }); });
      const ra = AS.sunRA(st.doy) / 15; A.g.sun(ctx, ax.X(ra), ax.Y(dec()), 7);
      ctx.restore();
      A.g.text(ctx, '— สุริยวิถี   - - เส้นศูนย์สูตรฟ้า   ← ตะวันออก', box.x + 4, H - 10, { s: 11.5, c: '#c7d2fe' });
    }
    A.ui.h(ctrls, 'ผู้สังเกต');
    A.ui.range(ctrls, { label: 'ละติจูด φ', min: -90, max: 90, step: 0.1, value: st.lat, fmt: v => Math.abs(v).toFixed(1) + '° ' + (v >= 0 ? 'N' : 'S') }, v => { st.lat = v; all(); });
    A.ui.range(ctrls, { label: 'ลองจิจูด λ (สำหรับเวลานาฬิกา UTC+7)', min: 95, max: 110, step: 0.1, value: st.lon, fmt: v => v.toFixed(1) + '° E' }, v => { st.lon = v; all(); });
    A.ui.h(ctrls, 'วันและเวลา');
    const rd = A.ui.range(ctrls, { label: 'วันที่', min: 1, max: 365, value: st.doy, fmt: v => AS.doyLabel(v) }, v => { st.doy = v; all(); });
    A.ui.buttons(ctrls, [['วสันตวิษุวัต', () => rd.set(80, true)], ['ครีษมายัน', () => rd.set(172, true)], ['ศารทวิษุวัต', () => rd.set(266, true)], ['เหมายัน', () => rd.set(356, true)]]);
    const rt = A.ui.range(ctrls, { label: 'เวลาสุริยคติท้องถิ่น', min: 0, max: 24, step: 0.01, value: st.t, fmt: v => AS.hm(v) }, v => { st.t = v; all(); });
    A.ui.range(ctrls, { label: 'ความเร็วจำลอง', min: 0.2, max: 6, step: 0.1, value: st.speed, unit: 'ชม./วินาที' }, v => st.speed = v);
    const [bp] = A.ui.buttons(ctrls, [['หยุด', () => { st.run = !st.run; bp.textContent = st.run ? 'หยุด' : 'เล่น'; }]]);
    const out = A.ui.out(ctrls, [['clk', 'เวลานาฬิกา (UTC+7)'], ['alt', 'มุมเงย / มุมทิศ'], ['rise', 'ขึ้น (เวลานาฬิกา)'], ['raz', 'มุมทิศที่ขึ้น'], ['noon', 'เที่ยงสุริยคติ (นาฬิกา)'], ['hn', 'มุมเงยเที่ยง'], ['set', 'ตก (เวลานาฬิกา)'], ['saz', 'มุมทิศที่ตก'], ['eot', 'สมการเวลา'], ['sh', 'เงาเสา 1 m ขณะนี้'], ['con', 'ดวงอาทิตย์อยู่ในกลุ่มดาว']]);
    // Sun's constellation along the ecliptic (IAU boundaries, approximate entry dates)
    const ZD = [[19, 'แพะทะเล (Capricornus)'], [47, 'คนแบกหม้อน้ำ (Aquarius)'], [71, 'ปลา (Pisces)'], [109, 'แกะ (Aries)'], [134, 'วัว (Taurus)'], [171, 'คนคู่ (Gemini)'], [202, 'ปู (Cancer)'], [222, 'สิงโต (Leo)'], [259, 'หญิงสาว (Virgo)'], [304, 'คันชั่ง (Libra)'], [327, 'แมงป่อง (Scorpius)'], [334, 'คนแบกงู (Ophiuchus)'], [352, 'คนยิงธนู (Sagittarius)']];
    function zodiacOf() { let n = 'คนยิงธนู (Sagittarius)'; ZD.forEach(([d, t]) => { if (st.doy >= d) n = t; }); return n; }
    function all() {
      sph.redraw(); ecl.redraw();
      const d = dec(), q = AS.altaz((st.t - 12) * 15, d, st.lat), sa = AS.semiArc(d, st.lat);
      out.set('clk', AS.hm(clock(st.t))); out.set('alt', q.alt.toFixed(1) + '° / ' + q.az.toFixed(1) + '°');
      if (sa > 0 && sa < 180) {
        out.set('rise', AS.hm(clock(12 - sa / 15))); out.set('set', AS.hm(clock(12 + sa / 15)));
        out.set('raz', AS.altaz(-sa, d, st.lat).az.toFixed(1) + '°'); out.set('saz', AS.altaz(sa, d, st.lat).az.toFixed(1) + '°');
      } else { ['rise', 'set', 'raz', 'saz'].forEach(k => out.set(k, sa >= 180 ? 'ไม่ตก' : 'ไม่ขึ้น')); }
      out.set('noon', AS.hm(clock(12))); out.set('hn', (90 - Math.abs(st.lat - d)).toFixed(1) + '°');
      const e = AS.eot(st.doy); out.set('eot', (e >= 0 ? '+' : '−') + Math.abs(e).toFixed(1) + ' นาที');
      out.set('sh', q.alt > 0.5 ? (1 / Math.tan(q.alt * AS.D)).toFixed(2) + ' m ชี้ทิศ ' + AS.dirName(q.az + 180) : 'ไม่มี (กลางคืน)');
      out.set('con', zodiacOf());
    }
    A.loop(dt => { if (!st.run) return; st.t = (st.t + dt * st.speed) % 24; rt.set(st.t); all(); });
    all();
  }
});
})();
