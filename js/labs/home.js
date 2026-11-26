A.reg({
  id: 'home',
  mount(main) {
    const labs = A.labs.filter(l => l.no);
    // constellation of labs
    const P = [[60, 210], [120, 150], [190, 175], [250, 110], [320, 140], [370, 70], [430, 120], [395, 205], [300, 235], [215, 265], [140, 300]];
    const seg = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [2, 9], [4, 8]];
    let svg = `<svg viewBox="0 0 490 340" width="100%" role="img" aria-label="แผนที่ปฏิบัติการ 11 เรื่อง เรียงเป็นกลุ่มดาว" style="display:block;background:radial-gradient(ellipse at 60% 40%,#17234f,#070c1d 70%);border-radius:16px;border:1px solid #263259">`;
    let s = 11; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 160; i++) svg += `<circle cx="${(r() * 490).toFixed(1)}" cy="${(r() * 340).toFixed(1)}" r="${(r() * 0.9 + 0.3).toFixed(2)}" fill="#dfe7ff" opacity="${(0.2 + r() * 0.5).toFixed(2)}"/>`;
    seg.forEach(([a, b]) => svg += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="#7dd3fc" stroke-opacity=".35" stroke-width="1.2"/>`);
    labs.forEach((l, i) => { const [x, y] = P[i]; svg += `<a href="#${l.id}"><title>${A.esc(l.title)}</title><circle cx="${x}" cy="${y}" r="15" fill="#7dd3fc" opacity=".12"/><circle cx="${x}" cy="${y}" r="9" fill="#e9edf8"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-family="Sarabun" font-weight="700" font-size="11" fill="#0a1022">${l.no}</text></a>`; });
    svg += '</svg>';
    main.innerHTML = `
    <section class="home-hero">
      <div>
        <div class="kick">ฟิสิกส์ · คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏมหาสารคาม</div>
        <h1>ห้องปฏิบัติการดาราศาสตร์เสมือน</h1>
        <p>ตัวจำลองแบบโต้ตอบ 11 ปฏิบัติการ ครอบคลุมรายวิชา 2015326 ดาราศาสตร์ และ 2015231 ดาราศาสตร์และอวกาศสำหรับครูวิทยาศาสตร์ ทุกปฏิบัติการมีวิธีการทดลอง ทฤษฎีโดยย่อ และใบงานที่บันทึกผลได้ แล้วรวมเป็นรายงานส่งอาจารย์</p>
        <p class="note">ค่าเริ่มต้นของผู้สังเกตคือมหาสารคาม (ละติจูด 16.2° เหนือ ลองจิจูด 103.3° ตะวันออก) ปรับได้ในแต่ละปฏิบัติการ</p>
      </div>
      <div>${svg}</div>
    </section>
    <div class="cards">${labs.map(l => `<a class="card" href="#${l.id}"><span class="n">${l.no}</span><div><b>${A.esc(l.title)}</b><span>${A.esc(l.short)}</span></div></a>`).join('')}</div>
    <p class="note" style="margin-top:18px">เนื้อหาทฤษฎีอ้างอิง OpenStax <i>Astronomy 2e</i> (เอกสารประกอบรายวิชา) และแนวปฏิบัติการของ Nebraska Astronomy Applet Project (astro.unl.edu)</p>`;
  }
});
