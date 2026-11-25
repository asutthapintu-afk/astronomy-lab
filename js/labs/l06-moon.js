(function(){
const NAMES = [[0, 'จันทร์ดับ (เดือนมืด)'], [22.5, 'เสี้ยวข้างขึ้น'], [67.5, 'ข้างขึ้นครึ่งดวง (ขึ้น 8 ค่ำ)'], [112.5, 'ข้างขึ้นค่อนดวง'], [157.5, 'จันทร์เพ็ญ (ขึ้น 15 ค่ำ)'], [202.5, 'ข้างแรมค่อนดวง'], [247.5, 'ข้างแรมครึ่งดวง (แรม 8 ค่ำ)'], [292.5, 'เสี้ยวข้างแรม'], [337.5, 'จันทร์ดับ (เดือนมืด)']];
const phaseName = e => { let n = NAMES[0][1]; NAMES.forEach(([a, t]) => { if (e >= a) n = t; }); return n; };
A.reg({
  id: 'lab-moon', no: 6, title: 'เฟสของดวงจันทร์', short: 'ตำแหน่งดวงจันทร์–โลก–ดวงอาทิตย์ ข้างขึ้นข้างแรม เวลาขึ้น–ตกของดวงจันทร์ และการมองเห็นจากผู้สังเกตบนโลก',
  courses: ['2015326 · ปฏิบัติการที่ 6', '2015231 · สัปดาห์ 11'], ref: 'OpenStax Astronomy 2e หัวข้อ 4.5 Phases and Motions of the Moon และ 4.7 Eclipses of the Sun and Moon',
  steps: `<ol>
    <li>ลากดวงจันทร์ (หรือใช้แถบเลื่อน) ไปรอบโลกในมุมมองจากด้านบน สังเกตภาพเฟสที่ผู้สังเกตบนโลกเห็น บันทึกมุมห่างและชื่อเฟสทั้ง 8 ตำแหน่ง</li>
    <li>ลากคนบนโลก (หรือใช้แถบเวลา) เพื่อเปลี่ยนเวลาของวัน ดูภาพขอบฟ้าด้านขวาว่าดวงอาทิตย์และดวงจันทร์อยู่ที่ใดบนท้องฟ้า</li>
    <li>หาเวลาที่ดวงจันทร์ขึ้น ผ่านเมริเดียน และตก สำหรับเฟสหลักทั้ง 4 เฟส</li>
    <li>สังเกตว่าครึ่งหนึ่งของดวงจันทร์ถูกแสงอาทิตย์ส่องเสมอ แต่ส่วนที่เราเห็นเปลี่ยนไปเพราะอะไร</li></ol>`,
  theory: `<h3>เฟสเกิดจากมุมมอง ไม่ใช่เงาโลก</h3>
    <p>ดวงอาทิตย์ส่องดวงจันทร์ครึ่งดวงเสมอ เฟสที่เห็นขึ้นกับว่าเราเห็นส่วนสว่างนั้นมากเพียงใด ซึ่งกำหนดโดย <b>มุมห่าง (elongation, E)</b> ระหว่างดวงจันทร์กับดวงอาทิตย์เมื่อมองจากโลก เงาของโลกบังดวงจันทร์เฉพาะตอนเกิดจันทรุปราคาเท่านั้น</p>
    <div class="eq">ส่วนที่สว่าง k ≈ (1 − cos E)/2</div>
    <h3>รอบเดือนจันทรคติ</h3>
    <p>คาบซินอดิก (จากจันทร์ดับถึงจันทร์ดับ) 29.53 วัน ยาวกว่าคาบดาราคติ 27.32 วัน เพราะโลกเคลื่อนไปในวงโคจรรอบดวงอาทิตย์ด้วย ปฏิทินไทยนับข้างขึ้น 1–15 ค่ำ และข้างแรม 1–14 หรือ 15 ค่ำ</p>
    <div class="eq">ดวงจันทร์ขึ้นช้าลงวันละประมาณ 24 ชม. × (1/29.53) ≈ 49 นาที</div>
    <div class="eq">เวลาผ่านเมริเดียนโดยประมาณ ≈ 12:00 น. + E/15° ชั่วโมง</div>
    <p class="note">ตัวจำลองนี้วางวงโคจรดวงจันทร์ในระนาบเดียวกับเส้นศูนย์สูตรเพื่อความง่าย (ผู้สังเกตที่เส้นศูนย์สูตร) จึงให้เวลาขึ้น–ตกโดยประมาณ</p>`,
  questions: [
    { q: 'บันทึกเฟสของดวงจันทร์ที่ตำแหน่งต่าง ๆ', table: { cols: ['มุมห่าง E', 'ชื่อเฟส', 'ส่วนที่สว่าง (%)', 'เวลาขึ้น', 'เวลาผ่านเมริเดียน', 'เวลาตก'], rows: ['0°', '45°', '90°', '135°', '180°', '225°', '270°', '315°'] } },
    { q: 'ถ้าเห็นดวงจันทร์ครึ่งดวงอยู่กลางฟ้าตอนพระอาทิตย์ตก เป็นข้างขึ้นหรือข้างแรม และด้านสว่างหันไปทางใด' },
    { q: 'ทำไมจึงไม่เห็นจันทร์เพ็ญในเวลากลางวัน และทำไมเห็นเสี้ยวข้างแรมได้เฉพาะช่วงเช้ามืด' },
    { q: 'ทำไมคาบซินอดิก (29.53 วัน) จึงยาวกว่าคาบดาราคติ (27.32 วัน) วาดภาพประกอบ' },
    { q: 'วันลอยกระทงตรงกับขึ้น 15 ค่ำ เดือน 12 ดวงจันทร์จะขึ้นเวลาประมาณเท่าใด และขึ้นทางทิศใด' }
  ],
  mount(stage, ctrls) {
    const st = { E: 60, t: 18, run: false, speed: 2 };
    const r = A.el('div', { class: 'duo' }); stage.append(r);
    const top = A.canvas(r, { ratio: 1, min: 300, max: 480, cap: 'มุมมองจากเหนือขั้วโลก (ลากดวงจันทร์หรือผู้สังเกต)' }, drawTop);
    const right = A.el('div', { class: 'stage' }); r.append(right);
    const ph = A.canvas(right, { ratio: 0.55, min: 200, max: 240, cap: 'ดวงจันทร์ที่ผู้สังเกตเห็น' }, drawPh);
    const hz = A.canvas(right, { ratio: 0.45, min: 180, max: 230, cap: 'ท้องฟ้าของผู้สังเกต (หันหน้าทิศใต้)' }, drawHz);
    // geometry: Sun to the right (angle 0). Earth rotates CCW seen from N. Moon CCW.
    // Moon angle around Earth from Sun direction = E (elongation, eastward). Observer angle: noon faces Sun -> observer at angle (t-12)*15 + 0 measured ... noon at 0 (facing sun), 18h at 90°
    const geom = (W, H) => { const cx = W * 0.46, cy = H / 2 + 6, R = Math.min(W, H) * 0.34, re = Math.min(W, H) * 0.09; return { cx, cy, R, re }; };
    let dragging = null;
    A.drag(top.cv, {
      down(x, y) { const g = geom(top.W, top.H); const mx = g.cx + g.R * Math.cos(st.E * AS.D), my = g.cy - g.R * Math.sin(st.E * AS.D); const oa = (st.t - 12) * 15 * AS.D; const ox = g.cx + g.re * Math.cos(oa), oy = g.cy - g.re * Math.sin(oa); dragging = Math.hypot(x - mx, y - my) < 30 ? 'm' : Math.hypot(x - ox, y - oy) < 26 || Math.hypot(x - g.cx, y - g.cy) < g.re ? 'o' : Math.hypot(x - g.cx, y - g.cy) > g.R * 0.6 ? 'm' : null; this.move(x, y); },
      move(x, y) { if (!dragging) return; const g = geom(top.W, top.H); const a = AS.norm(Math.atan2(g.cy - y, x - g.cx) * AS.R); if (dragging === 'm') { st.E = a; rE.set(a); } else { st.t = AS.norm(a + 180) / 15; rt.set(st.t); } all(); },
      up() { dragging = null; }
    });
    function drawTop(ctx, W, H) {
      A.g.stars(ctx, W, H, 60);
      const g = geom(W, H);
      for (let y = 20; y < H; y += 26) A.g.arrow(ctx, W - 6, y, W - 40, y, 'rgba(255,204,77,.5)', 1, 6);
      A.g.text(ctx, 'แสงอาทิตย์ →', W - 10, H - 12, { s: 11.5, a: 'right', c: '#ffcc4d', bg: 'rgba(6,11,26,.8)' });
      A.g.circle(ctx, g.cx, g.cy, g.R, null, 'rgba(233,237,248,.25)');
      // 8 reference positions
      for (let k = 0; k < 8; k++) { const a = k * 45 * AS.D; A.g.circle(ctx, g.cx + g.R * Math.cos(a), g.cy - g.R * Math.sin(a), 2, '#4b5a8a'); }
      // Earth with day/night
      A.g.circle(ctx, g.cx, g.cy, g.re, '#0d1a3a');
      ctx.beginPath(); ctx.arc(g.cx, g.cy, g.re, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = '#2a5aa8'; ctx.fill();
      A.g.circle(ctx, g.cx, g.cy, 2, '#e9edf8'); A.g.text(ctx, 'N', g.cx - 4, g.cy - 4, { s: 10, c: '#e9edf8' });
      // observer + horizon
      const oa = (st.t - 12) * 15 * AS.D; const ox = g.cx + g.re * Math.cos(oa), oy = g.cy - g.re * Math.sin(oa);
      const tx = -Math.sin(oa), ty = -Math.cos(oa);
      A.g.line(ctx, ox - tx * 34, oy - ty * 34, ox + tx * 34, oy + ty * 34, '#6ee7b7', 2);
      A.g.line(ctx, ox, oy, ox + Math.cos(oa) * 16, oy - Math.sin(oa) * 16, '#e9edf8', 2.5);
      A.g.circle(ctx, ox + Math.cos(oa) * 18, oy - Math.sin(oa) * 18, 3.5, '#e9edf8');
      // moon (lit half toward the right = sun)
      const mx = g.cx + g.R * Math.cos(st.E * AS.D), my = g.cy - g.R * Math.sin(st.E * AS.D), mr = Math.max(9, g.re * 0.45);
      A.g.circle(ctx, mx, my, mr, '#2a2f40');
      ctx.beginPath(); ctx.arc(mx, my, mr, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.fillStyle = '#e9e4d4'; ctx.fill();
      A.g.line(ctx, g.cx, g.cy, mx, my, 'rgba(125,211,252,.35)', 1, [3, 4]);
      A.g.text(ctx, 'ทิศการโคจรและหมุน: ทวนเข็มนาฬิกา', 12, H - 12, { s: 11.5, c: '#9aa7c7' });
    }
    function drawPh(ctx, W, H) {
      const k = (1 - Math.cos(st.E * AS.D)) / 2, waxing = st.E < 180;
      ctx.fillStyle = '#060b1a'; ctx.fillRect(0, 0, W, H); A.g.stars(ctx, W, H, 40, 3);
      const r = Math.min(W, H) * 0.32;
      A.g.phase(ctx, W / 2, H / 2 + 6, r, k, waxing, '#262c3d', '#ece6d2');
      A.g.text(ctx, phaseName(st.E), W / 2, H - 10, { a: 'center', s: 14, w: 600 });
    }
    function drawHz(ctx, W, H) {
      // observer at equator: altitude of body = 90 - |angle from zenith|; zenith direction = observer angle oa
      const oa = (st.t - 12) * 15;
      const g = ctx.createLinearGradient(0, 0, 0, H); const sunAlt = 90 - Math.abs(AS.norm(0 - oa + 180) - 180);
      const day = sunAlt > 0; g.addColorStop(0, day ? '#2a5fb0' : '#060b1a'); g.addColorStop(1, day ? '#7fb2e8' : '#13204a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const gy = H - 34; ctx.fillStyle = '#1e3b2c'; ctx.fillRect(0, gy, W, H - gy);
      A.g.text(ctx, 'ตะวันออก', 10, H - 12, { s: 12, c: '#8fe0b8' }); A.g.text(ctx, 'ใต้', W / 2, H - 12, { s: 12, c: '#8fe0b8', a: 'center' }); A.g.text(ctx, 'ตะวันตก', W - 10, H - 12, { s: 12, c: '#8fe0b8', a: 'right' });
      // map hour angle-ish: position along sky arc from E (left) to W (right): x = W/2 + (angle from zenith)/90 * W/2
      const body = (ang, draw) => { let d = AS.norm(ang - oa + 180) - 180; /* d>0 => east of zenith */ if (Math.abs(d) > 90) return false; const x = W / 2 - d / 90 * (W / 2 - 24), y = gy - (90 - Math.abs(d)) / 90 * (gy - 26); draw(x, y); return true; };
      const sunUp = body(0, (x, y) => A.g.sun(ctx, x, y, 11));
      const k = (1 - Math.cos(st.E * AS.D)) / 2;
      const moonUp = body(st.E, (x, y) => A.g.phase(ctx, x, y, 12, k, st.E < 180, day ? '#6d8fc7' : '#262c3d', '#ece6d2'));
      A.g.text(ctx, `${sunUp ? 'ดวงอาทิตย์อยู่บนฟ้า' : 'ดวงอาทิตย์ตกแล้ว'} · ${moonUp ? 'เห็นดวงจันทร์' : 'ดวงจันทร์อยู่ใต้ขอบฟ้า'}`, W / 2, 44, { a: 'center', s: 12.5, w: 600, c: '#fff' });
    }
    A.ui.h(ctrls, 'ตำแหน่งดวงจันทร์');
    const rE = A.ui.range(ctrls, { label: 'มุมห่างจากดวงอาทิตย์ E', min: 0, max: 359, step: 1, value: st.E, unit: '°' }, v => { st.E = v; all(); });
    A.ui.buttons(ctrls, [['ดับ', () => rE.set(0, true)], ['ขึ้น 8 ค่ำ', () => rE.set(90, true)], ['เพ็ญ', () => rE.set(180, true)], ['แรม 8 ค่ำ', () => rE.set(270, true)]]);
    A.ui.h(ctrls, 'เวลาของผู้สังเกต');
    const rt = A.ui.range(ctrls, { label: 'เวลาท้องถิ่น', min: 0, max: 24, step: 0.05, value: st.t, fmt: v => AS.hm(v) }, v => { st.t = v; all(); });
    A.ui.range(ctrls, { label: 'ความเร็ว (เมื่อกดเล่น)', min: 0.5, max: 8, step: 0.5, value: st.speed, unit: 'ชม./วินาที' }, v => st.speed = v);
    const [bp] = A.ui.buttons(ctrls, [['เล่น', () => { st.run = !st.run; bp.textContent = st.run ? 'หยุด' : 'เล่น'; }]]);
    const out = A.ui.out(ctrls, [['name', 'เฟส'], ['k', 'ส่วนที่สว่าง'], ['age', 'อายุดวงจันทร์'], ['thai', 'ปฏิทินไทย (โดยประมาณ)'], ['rise', 'ขึ้นประมาณ'], ['tr', 'ผ่านเมริเดียนประมาณ'], ['set', 'ตกประมาณ']]);
    function all() {
      top.redraw(); ph.redraw(); hz.redraw();
      const k = (1 - Math.cos(st.E * AS.D)) / 2, age = st.E / 360 * 29.53;
      out.set('name', phaseName(st.E)); out.set('k', (k * 100).toFixed(0) + '%'); out.set('age', age.toFixed(1) + ' วัน');
      const day = Math.floor(age) + 1; out.set('thai', day <= 15 ? `ขึ้น ${day} ค่ำ` : `แรม ${Math.min(15, day - 15)} ค่ำ`);
      const tr = 12 + st.E / 15; out.set('tr', AS.hm(tr)); out.set('rise', AS.hm(tr - 6)); out.set('set', AS.hm(tr + 6));
    }
    A.loop(dt => { if (!st.run) return; st.t = (st.t + dt * st.speed) % 24; st.E = AS.norm(st.E + dt * st.speed * 360 / (29.53 * 24)); rt.set(st.t); rE.set(Math.round(st.E)); all(); });
    all();
  }
});
})();
