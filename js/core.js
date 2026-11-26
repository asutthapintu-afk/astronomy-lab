/* Core: registry, router, controls, canvas helpers, worksheet & report */
(function(){
const A = window.A = { labs: [], cur: null, _loops: [], _obs: [] };
const $ = (s, r = document) => r.querySelector(s);
A.esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
A.el = (tag, attrs = {}, kids = []) => {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'html') e.innerHTML = attrs[k];
    else if (k === 'text') e.textContent = attrs[k];
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]);
    else e.setAttribute(k, attrs[k]);
  }
  [].concat(kids).forEach(c => c != null && e.append(c));
  return e;
};
A.reg = lab => A.labs.push(lab);
A.fontsReady = (document.fonts && document.fonts.load) ? Promise.all(['400 14px Sarabun', '500 14px Sarabun', '600 14px Sarabun', '700 14px Sarabun'].map(f => document.fonts.load(f, 'กขค'))).catch(() => {}) : Promise.resolve();
A.fmt = (v, d = 2) => (isFinite(v) ? Number(v).toLocaleString('th-TH', {minimumFractionDigits: d, maximumFractionDigits: d}) : '–');
A.toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(A._tt); A._tt = setTimeout(() => t.classList.remove('on'), 1800); };

/* ---------- storage ---------- */
const KEY = 'astrolab:v1';
let S = { student: {}, ans: {}, shots: {} };
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
A.save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { A.toast('พื้นที่บันทึกในเบราว์เซอร์เต็ม — ควรดาวน์โหลดรายงานไว้'); } };
A.state = S;

/* ---------- animation & observers (auto-cleaned per lab) ---------- */
A.loop = fn => {
  let id, last = performance.now(), live = true;
  const f = t => { if (!live) return; const dt = Math.min(0.1, (t - last) / 1000); last = t; fn(dt); id = requestAnimationFrame(f); };
  id = requestAnimationFrame(f);
  const h = { stop() { live = false; cancelAnimationFrame(id); } };
  A._loops.push(h); return h;
};
A.observe = (el, fn) => { const ro = new ResizeObserver(fn); ro.observe(el); A._obs.push(ro); return ro; };

/* Canvas with DPR + aspect sizing.  opts: {ratio, min, max, cap} */
A.canvas = (parent, opts, draw) => {
  const o = Object.assign({ ratio: 0.6, min: 260, max: 620 }, opts);
  const fig = A.el('div', { class: 'fig' });
  const cv = A.el('canvas');
  fig.append(cv);
  if (o.cap) fig.append(A.el('div', { class: 'cap', text: o.cap }));
  parent.append(fig);
  const ctx = cv.getContext('2d');
  const c = { cv, ctx, fig, W: 0, H: 0, draw };
  c.resize = () => {
    const W = fig.clientWidth; if (!W) return;
    const H = Math.round(Math.max(o.min, Math.min(o.max, W * o.ratio)));
    const d = window.devicePixelRatio || 1;
    cv.width = Math.round(W * d); cv.height = Math.round(H * d); cv.style.height = H + 'px';
    ctx.setTransform(d, 0, 0, d, 0, 0); c.W = W; c.H = H; c.redraw();
  };
  c.redraw = () => { if (c.W) { ctx.save(); ctx.clearRect(0, 0, c.W, c.H); c.draw && c.draw(ctx, c.W, c.H); ctx.restore(); } };
  A.observe(fig, c.resize);
  A.fontsReady.then(() => c.redraw());
  return c;
};
/* pointer drag in CSS px */
A.drag = (cv, h) => {
  let on = false;
  const pt = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  cv.addEventListener('pointerdown', e => { on = true; cv.setPointerCapture(e.pointerId); const [x, y] = pt(e); h.down && h.down(x, y); });
  cv.addEventListener('pointermove', e => { const [x, y] = pt(e); if (on) h.move && h.move(x, y, e.movementX, e.movementY); else h.hover && h.hover(x, y); });
  const up = () => { if (on) { on = false; h.up && h.up(); } };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('pointerleave', () => h.leave && h.leave());
};

/* ---------- controls ---------- */
let uid = 0;
A.ui = {
  h(parent, t) { parent.append(A.el('h3', { text: t })); },
  range(parent, o, on) {
    const id = 'c' + (++uid);
    const val = A.el('b');
    const inp = A.el('input', { type: 'range', id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
    const show = () => { const v = +inp.value; val.textContent = (o.fmt ? o.fmt(v) : v) + (o.unit ? ' ' + o.unit : ''); };
    inp.addEventListener('input', () => { show(); on && on(+inp.value); });
    const row = A.el('div', { class: 'row' }, [A.el('label', { for: id }, [o.label, val]), inp]);
    parent.append(row); show();
    return { get: () => +inp.value, set(v, fire) { inp.value = v; show(); if (fire) on && on(+inp.value); }, inp, row };
  },
  select(parent, o, on) {
    const id = 'c' + (++uid);
    const s = A.el('select', { id });
    o.options.forEach(([v, t]) => s.append(A.el('option', { value: v, text: t })));
    if (o.value != null) s.value = o.value;
    s.addEventListener('change', () => on && on(s.value));
    parent.append(A.el('div', { class: 'row' }, [A.el('label', { for: id, text: o.label }), s]));
    return { get: () => s.value, set(v) { s.value = v; }, el: s };
  },
  num(parent, o, on) {
    const id = 'c' + (++uid);
    const s = A.el('input', { id, type: 'number', step: o.step || 'any', value: o.value });
    if (o.min != null) s.min = o.min; if (o.max != null) s.max = o.max;
    s.addEventListener('input', () => { const v = parseFloat(s.value); if (isFinite(v)) on && on(v); });
    parent.append(A.el('div', { class: 'row' }, [A.el('label', { for: id, text: o.label }), s]));
    return { get: () => parseFloat(s.value), set(v) { s.value = v; }, el: s };
  },
  check(parent, o, on) {
    const i = A.el('input', { type: 'checkbox' }); i.checked = !!o.value;
    i.addEventListener('change', () => on && on(i.checked));
    parent.append(A.el('label', { class: 'chk' }, [i, o.label]));
    return { get: () => i.checked, set(v) { i.checked = v; } };
  },
  buttons(parent, list) {
    const b = A.el('div', { class: 'btns' });
    const out = list.map(([t, fn, cls]) => { const x = A.el('button', { class: 'btn ' + (cls || ''), type: 'button', text: t, onclick: fn }); b.append(x); return x; });
    parent.append(b); return out;
  },
  seg(parent, o, on) {           // segmented choice
    const wrap = A.el('div', { class: 'row' });
    if (o.label) wrap.append(A.el('label', { text: o.label }));
    const b = A.el('div', { class: 'btns' });
    let v = o.value;
    const btns = o.options.map(([val, t]) => { const x = A.el('button', { class: 'btn', type: 'button', text: t, onclick: () => set(val, true) }); b.append(x); return [val, x]; });
    const set = (val, fire) => { v = val; btns.forEach(([k, x]) => x.classList.toggle('on', k === v)); if (fire) on && on(v); };
    wrap.append(b); parent.append(wrap); set(v);
    return { get: () => v, set };
  },
  out(parent, rows) {             // rows: [[key,label]]
    const box = A.el('div', { class: 'out' }); const m = {};
    rows.forEach(([k, l]) => { const b = A.el('b', { text: '–' }); m[k] = b; box.append(A.el('span', { text: l }), b); });
    parent.append(box);
    return { set(k, v) { if (m[k]) m[k].textContent = v; }, el: box };
  },
  note(parent, html) { parent.append(A.el('div', { class: 'note', html })); }
};

/* ---------- drawing helpers ---------- */
A.g = {
  circle(ctx, x, y, r, fill, stroke, lw = 1) { ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, 7); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } },
  line(ctx, x1, y1, x2, y2, c, lw = 1, dash) { ctx.beginPath(); ctx.setLineDash(dash || []); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.stroke(); ctx.setLineDash([]); },
  text(ctx, t, x, y, o = {}) { ctx.font = `${o.w || 500} ${(o.s || 13) + 1.5}px ${o.f || '"Sarabun",sans-serif'}`; ctx.fillStyle = o.c || '#e9edf8'; ctx.textAlign = o.a || 'left'; ctx.textBaseline = o.b || 'alphabetic'; if (o.bg) { const w = ctx.measureText(t).width; const ox = o.a === 'center' ? -w / 2 : o.a === 'right' ? -w : 0; ctx.save(); ctx.fillStyle = o.bg; ctx.fillRect(x + ox - 4, y - (o.s || 13) + 1, w + 8, (o.s || 13) + 6); ctx.restore(); ctx.fillStyle = o.c || '#e9edf8'; } ctx.fillText(t, x, y); },
  arrow(ctx, x1, y1, x2, y2, c, lw = 1.5, hs = 8) { A.g.line(ctx, x1, y1, x2, y2, c, lw); const a = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hs * Math.cos(a - .4), y2 - hs * Math.sin(a - .4)); ctx.lineTo(x2 - hs * Math.cos(a + .4), y2 - hs * Math.sin(a + .4)); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); },
  stars(ctx, W, H, n = 140, seed = 7) { let s = seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; for (let i = 0; i < n; i++) { ctx.fillStyle = `rgba(220,230,255,${0.15 + r() * 0.5})`; ctx.fillRect(r() * W, r() * H, r() < .9 ? 1 : 1.6, r() < .9 ? 1 : 1.6); } },
  sun(ctx, x, y, r) { const g = ctx.createRadialGradient(x, y, r * .2, x, y, r * 2.2); g.addColorStop(0, 'rgba(255,215,90,.55)'); g.addColorStop(1, 'rgba(255,200,60,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, 7); ctx.fill(); A.g.circle(ctx, x, y, r, '#ffcc4d'); },
  /* phase disc: k = illuminated fraction 0..1, waxing = lit on right (as seen); rot = rotation of bright limb */
  phase(ctx, x, y, r, k, litRight, dark = '#1f2638', lit = '#e9e4d4', rot = 0) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); if (!litRight) ctx.scale(-1, 1);
    A.g.circle(ctx, 0, 0, r, dark);
    ctx.beginPath(); ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
    const tx = r * (1 - 2 * k);   // terminator ellipse half-width (signed)
    ctx.ellipse(0, 0, Math.abs(tx), r, 0, Math.PI / 2, -Math.PI / 2, tx > 0);
    ctx.fillStyle = lit; ctx.fill(); ctx.restore();
  },
  axes(ctx, box, o) {   // box {x,y,w,h}; o {x0,x1,y0,y1,xl,yl,xt,yt,xf,yf,logx,logy,revx}
    const { x, y, w, h } = box;
    ctx.strokeStyle = '#33406b'; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h);
    const X = v => x + (o.revx ? (o.x1 - v) : (v - o.x0)) / (o.x1 - o.x0) * w;
    const Y = v => y + h - (v - o.y0) / (o.y1 - o.y0) * h;
    (o.xt || []).forEach(v => { const px = X(v); A.g.line(ctx, px, y, px, y + h, 'rgba(120,140,200,.14)'); A.g.text(ctx, o.xf ? o.xf(v) : v, px, y + h + 15, { a: 'center', s: 11.5, c: '#9aa7c7' }); });
    (o.yt || []).forEach(v => { const py = Y(v); A.g.line(ctx, x, py, x + w, py, 'rgba(120,140,200,.14)'); A.g.text(ctx, o.yf ? o.yf(v) : v, x - 6, py + 4, { a: 'right', s: 11.5, c: '#9aa7c7' }); });
    if (o.xl) A.g.text(ctx, o.xl, x + w / 2, y + h + 32, { a: 'center', s: 12.5, c: '#c7d2fe' });
    if (o.yl) { ctx.save(); ctx.translate(x - (o.ylo || 42), y + h / 2); ctx.rotate(-Math.PI / 2); A.g.text(ctx, o.yl, 0, 0, { a: 'center', s: 12.5, c: '#c7d2fe' }); ctx.restore(); }
    return { X, Y };
  }
};

/* ---------- router & rendering ---------- */
function cleanup() { A._loops.forEach(l => l.stop()); A._obs.forEach(o => o.disconnect()); A._loops = []; A._obs = []; }
function renderNav(id) {
  const nav = $('#nav'); nav.innerHTML = '';
  nav.append(A.el('a', { href: '#home', class: id === 'home' ? 'on' : '' }, [A.el('span', { class: 'n', text: '★' }), A.el('span', { class: 't', text: 'หน้าแรก' })]));
  nav.append(A.el('div', { class: 'grp', text: 'ปฏิบัติการ' }));
  A.labs.filter(l => l.no).forEach(l => nav.append(A.el('a', { href: '#' + l.id, class: l.id === id ? 'on' : '' }, [A.el('span', { class: 'n', text: l.no }), A.el('span', { class: 't', text: l.title })])));
  nav.append(A.el('div', { class: 'grp', text: 'ส่งงาน' }));
  nav.append(A.el('a', { href: '#report', class: id === 'report' ? 'on' : '' }, [A.el('span', { class: 'n', text: '✎' }), A.el('span', { class: 't', text: 'รายงานผลการทดลอง' })]));
  const on = nav.querySelector('.on'); if (on && on.scrollIntoView && window.innerWidth < 860) on.scrollIntoView({ inline: 'center', block: 'nearest' });
}
A.route = () => {
  const id = (location.hash || '#home').slice(1);
  cleanup();
  const main = $('#main'); main.innerHTML = ''; window.scrollTo(0, 0);
  renderNav(id);
  if (id === 'report') return renderReport(main);
  const lab = A.labs.find(l => l.id === id) || A.labs.find(l => l.id === 'home');
  A.cur = lab;
  if (!lab.no) { lab.mount(main); return; }
  renderLab(main, lab);
};
A.start = () => { window.addEventListener('hashchange', A.route); A.route(); };

function renderLab(main, lab) {
  const head = A.el('div', { class: 'head' }, [
    A.el('div', {}, [A.el('div', { class: 'kick', text: 'ปฏิบัติการที่ ' + lab.no }), A.el('h1', { text: lab.title })]),
    A.el('div', { class: 'tags' }, lab.courses.map(c => A.el('span', { class: 'tag', text: c })))
  ]);
  const stage = A.el('div', { class: 'stage' });
  const ctrls = A.el('div', { class: 'ctrls' });
  main.append(head, A.el('div', { class: 'lab' }, [stage, ctrls]));
  const inst = lab.mount(stage, ctrls) || {};
  A.ui.buttons(ctrls, [['บันทึกภาพผลการทดลองลงใบงาน', () => snap(lab, stage)]]);
  // tabs
  const tabs = A.el('div', { class: 'tabs', role: 'tablist' });
  const pane = A.el('div', { class: 'pane' });
  const T = [['theory', 'ทฤษฎีโดยย่อ'], ['work', 'ใบงาน / บันทึกผล'], ['steps', 'วิธีการทดลอง']];
  const show = k => { [...tabs.children].forEach(b => b.classList.toggle('on', b.dataset.k === k)); pane.innerHTML = ''; if (k === 'theory') pane.innerHTML = lab.theory + (lab.ref ? `<p class="note">อ่านเพิ่มเติม: ${lab.ref}</p>` : ''); else if (k === 'steps') pane.innerHTML = lab.steps; else renderWork(pane, lab); };
  T.forEach(([k, t]) => tabs.append(A.el('button', { class: 'tab', type: 'button', role: 'tab', 'data-k': k, text: t, onclick: () => show(k) })));
  main.append(tabs, pane); show('steps');
  lab._inst = inst;
}

function snap(lab, stage) {
  const cvs = [...stage.querySelectorAll('canvas')].filter(c => c.width > 0);
  if (!cvs.length) return;
  const W = 1000; const scale = cvs.map(c => W / c.width);
  const H = cvs.reduce((s, c, i) => s + c.height * scale[i] + 8, 0);
  const out = document.createElement('canvas'); out.width = W; out.height = Math.round(H);
  const x = out.getContext('2d'); x.fillStyle = '#060b1a'; x.fillRect(0, 0, W, H);
  let y = 0; cvs.forEach((c, i) => { const h = c.height * scale[i]; x.drawImage(c, 0, y, W, h); y += h + 8; });
  (S.shots[lab.id] = S.shots[lab.id] || []).push(out.toDataURL('image/jpeg', 0.82));
  if (S.shots[lab.id].length > 6) S.shots[lab.id].shift();
  A.save(); A.toast('บันทึกภาพแล้ว (ดูในแท็บใบงาน)');
  const p = document.querySelector('.tab.on'); if (p && p.dataset.k === 'work') p.click();
}

function renderWork(pane, lab) {
  const ans = S.ans[lab.id] = S.ans[lab.id] || {};
  pane.append(A.el('p', { class: 'note', text: 'คำตอบจะบันทึกอัตโนมัติในเบราว์เซอร์นี้ เมื่อทำครบให้ไปที่ “รายงานผลการทดลอง” เพื่อดาวน์โหลดไฟล์ส่งอาจารย์' }));
  lab.questions.forEach((q, i) => {
    const box = A.el('div', { class: 'q' });
    box.append(A.el('p', {}, [A.el('span', { class: 'qn', text: 'ข้อ ' + (i + 1) }), document.createTextNode(q.q)]));
    if (q.table) {
      const t = A.el('table', { class: 'dt' }); const tr = A.el('tr'); q.table.cols.forEach(c => tr.append(A.el('th', { text: c }))); t.append(tr);
      const rows = q.table.rows;
      for (let r = 0; r < rows.length; r++) {
        const row = A.el('tr');
        q.table.cols.forEach((c, j) => {
          const key = `${i}:${r}:${j}`;
          if (j === 0 && rows[r] !== '') { row.append(A.el('th', { text: rows[r] })); return; }
          const inp = A.el('input', { type: 'text', 'aria-label': c, value: ans[key] || '' });
          inp.addEventListener('input', () => { ans[key] = inp.value; A.save(); });
          row.append(A.el('td', {}, inp));
        });
        t.append(row);
      }
      box.append(A.el('div', { class: 'scroll' }, t));
    }
    if (!q.table || q.text) {
      const ta = A.el('textarea', { 'aria-label': 'คำตอบข้อ ' + (i + 1) }); ta.value = ans[i] || '';
      ta.addEventListener('input', () => { ans[i] = ta.value; A.save(); });
      box.append(ta);
    }
    pane.append(box);
  });
  const shots = S.shots[lab.id] || [];
  pane.append(A.el('h3', { text: 'ภาพผลการทดลอง (' + shots.length + ')' }));
  if (!shots.length) pane.append(A.el('p', { class: 'note', text: 'กด “บันทึกภาพผลการทดลองลงใบงาน” ในแผงควบคุม เพื่อแนบภาพจากตัวจำลองเข้ารายงาน' }));
  const wrap = A.el('div', { class: 'shots' });
  shots.forEach((src, k) => wrap.append(A.el('div', { class: 'shot' }, [A.el('img', { src, alt: 'ภาพผลการทดลอง ' + (k + 1) }), A.el('button', { class: 'btn', type: 'button', text: 'ลบ', onclick: () => { shots.splice(k, 1); A.save(); pane.innerHTML = ''; renderWork(pane, lab); } })])));
  pane.append(wrap);
}

/* ---------- report ---------- */
function reportHTML(ids) {
  const st = S.student;
  let h = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><title>รายงานผลการทดลองดาราศาสตร์ - ${A.esc(st.name || '')}</title>
<style>body{font:16px/1.7 "Sarabun","TH Sarabun New","Tahoma",sans-serif;max-width:820px;margin:30px auto;padding:0 20px;color:#111}h1{font-size:24px;margin:0}h2{font-size:19px;border-bottom:2px solid #333;padding-bottom:4px;margin-top:36px;page-break-before:always}h2:first-of-type{page-break-before:auto}.q{margin:12px 0}.q b{display:block}.a{white-space:pre-wrap;border-left:3px solid #999;padding:4px 10px;background:#f6f6f6;min-height:1.5em}table{border-collapse:collapse;margin:6px 0}td,th{border:1px solid #888;padding:3px 8px}img{max-width:100%;margin:8px 0;border:1px solid #ccc}.meta td{border:0;padding:2px 12px 2px 0}</style></head><body>`;
  h += `<h1>รายงานผลการทดลองดาราศาสตร์</h1><table class="meta"><tr><td>ชื่อ–สกุล</td><td>${A.esc(st.name)}</td></tr><tr><td>รหัสนักศึกษา</td><td>${A.esc(st.id)}</td></tr><tr><td>รายวิชา / กลุ่มเรียน</td><td>${A.esc(st.course)} ${A.esc(st.sec)}</td></tr><tr><td>วันที่</td><td>${new Date().toLocaleDateString('th-TH', { dateStyle: 'long' })}</td></tr></table>`;
  ids.forEach(id => {
    const lab = A.labs.find(l => l.id === id); const ans = S.ans[id] || {};
    h += `<h2>ปฏิบัติการที่ ${lab.no}: ${A.esc(lab.title)}</h2>`;
    (S.shots[id] || []).forEach(src => h += `<img src="${src}" alt="">`);
    lab.questions.forEach((q, i) => {
      h += `<div class="q"><b>ข้อ ${i + 1}. ${A.esc(q.q)}</b>`;
      if (q.table) { h += '<table><tr>' + q.table.cols.map(c => `<th>${A.esc(c)}</th>`).join('') + '</tr>'; q.table.rows.forEach((r, ri) => { h += '<tr>' + q.table.cols.map((c, j) => j === 0 && r !== '' ? `<th>${A.esc(r)}</th>` : `<td>${A.esc(ans[`${i}:${ri}:${j}`] || '')}</td>`).join('') + '</tr>'; }); h += '</table>'; }
      if (!q.table || q.text) h += `<div class="a">${A.esc(ans[i] || '')}</div>`;
      h += '</div>';
    });
  });
  return h + '</body></html>';
}
function labHasWork(id) { const a = S.ans[id] || {}; return Object.values(a).some(v => String(v).trim()) || (S.shots[id] || []).length; }
function renderReport(main) {
  main.append(A.el('div', { class: 'head' }, [A.el('div', {}, [A.el('div', { class: 'kick', text: 'ส่งงาน' }), A.el('h1', { text: 'รายงานผลการทดลอง' })])]));
  const wrap = A.el('div', { class: 'pane' });
  const st = S.student;
  const f = (k, l) => { const i = A.el('input', { type: 'text', value: st[k] || '', id: 'st-' + k }); i.addEventListener('input', () => { st[k] = i.value; A.save(); }); return A.el('div', { class: 'row' }, [A.el('label', { for: 'st-' + k, text: l }), i]); };
  const g = A.el('div', { class: 'duo' }, [f('name', 'ชื่อ–สกุล'), f('id', 'รหัสนักศึกษา'), f('course', 'รายวิชา (เช่น 2015326 ดาราศาสตร์)'), f('sec', 'กลุ่มเรียน')]);
  wrap.append(g, A.el('h3', { text: 'เลือกปฏิบัติการที่จะรวมในรายงาน' }));
  const checks = A.labs.filter(l => l.no).map(l => { const i = A.el('input', { type: 'checkbox' }); i.checked = !!labHasWork(l.id); i.dataset.id = l.id; wrap.append(A.el('label', { class: 'chk' }, [i, `ปฏิบัติการที่ ${l.no} ${l.title} ` + (labHasWork(l.id) ? '· มีคำตอบแล้ว' : '· ยังไม่ได้ทำ')])); return i; });
  const ids = () => checks.filter(c => c.checked).map(c => c.dataset.id);
  const msg = A.el('p', { class: 'note' });
  wrap.append(A.el('div', { style: 'height:10px' }));
  A.ui.buttons(wrap, [
    ['ดาวน์โหลดรายงาน (.html พิมพ์เป็น PDF ได้)', async () => {
      const sel = ids(); if (!sel.length) return A.toast('เลือกอย่างน้อย 1 ปฏิบัติการ');
      const html = reportHTML(sel); const name = `รายงานดาราศาสตร์_${(st.id || 'นักศึกษา').replace(/[^\w฀-๿-]/g, '')}.html`;
      try { const d = window.claude && await window.claude.use('downloads'); if (d) { await d.save({ filename: name, data: html }); A.toast('บันทึกไฟล์แล้ว'); return; } } catch (e) { if (e && e.code === 'declined') return; }
      try { const a = A.el('a', { href: URL.createObjectURL(new Blob([html], { type: 'text/html' })), download: name }); document.body.append(a); a.click(); a.remove(); } catch (e) { msg.textContent = 'ดาวน์โหลดไม่ได้ในหน้าต่างนี้ — ใช้ปุ่มคัดลอกแทน'; }
    }, 'pri'],
    ['ดูตัวอย่างรายงาน', () => { const sel = ids(); prev.srcdoc = reportHTML(sel.length ? sel : []); prev.style.display = 'block'; }],
    ['คัดลอกคำตอบเป็นข้อความ', async () => {
      const t = ids().map(id => { const l = A.labs.find(x => x.id === id); const a = S.ans[id] || {}; return `ปฏิบัติการที่ ${l.no} ${l.title}\n` + l.questions.map((q, i) => `ข้อ ${i + 1}. ${q.q}\n${a[i] || (q.table ? '(ตารางข้อมูล — ดูไฟล์รายงาน)' : '')}`).join('\n'); }).join('\n\n');
      try { await navigator.clipboard.writeText(`${st.name || ''} ${st.id || ''}\n\n` + t); A.toast('คัดลอกแล้ว'); } catch (e) { msg.textContent = 'คัดลอกไม่ได้ในหน้าต่างนี้'; }
    }]
  ]);
  const prev = A.el('iframe', { title: 'ตัวอย่างรายงาน', style: 'display:none;width:100%;height:640px;border:1px solid #263259;border-radius:12px;background:#fff;margin-top:14px' });
  wrap.append(msg, prev);
  main.append(wrap);
}
})();
