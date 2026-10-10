// Поп-апы: открытие, кнопки «Назад» и «Закрыть».
// Тексты окон лежат в index.html внутри тегов <template>.
const overlay = document.getElementById('overlay');
const modalBody = document.getElementById('m-body');
const backBtn = document.getElementById('back');
let current = null;

function show(key) {
  const tpl = document.getElementById('tpl-' + key);
  if (!tpl) return;
  current = tpl;
  modalBody.innerHTML = '';
  const title = document.createElement('h3');
  title.id = 'm-title';
  title.textContent = tpl.dataset.title;
  modalBody.append(title, tpl.content.cloneNode(true));
  backBtn.hidden = !tpl.dataset.parent;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  modalBody.parentElement.scrollTop = 0;
}

function close() {
  overlay.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open]').forEach(btn =>
  btn.addEventListener('click', () => show(btn.dataset.open)));
modalBody.addEventListener('click', e => {
  const btn = e.target.closest('[data-go]');
  if (btn) show(btn.dataset.go);
});
backBtn.addEventListener('click', () => current && show(current.dataset.parent));
document.getElementById('close').addEventListener('click', close);
overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) close(); });
