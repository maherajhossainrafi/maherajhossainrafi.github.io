// Copy-email button in the terminal card. Falls back to selecting the text if the Clipboard API is unavailable.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  const status = document.querySelector('[data-copy-status]');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.classList.add('is-copied');
      if (status) status.textContent = 'Email address copied';
      window.setTimeout(() => { btn.classList.remove('is-copied'); if (status) status.textContent = ''; }, 2000);
    } catch (e) {
      const sel = window.getSelection();
      const link = document.querySelector('.terminal .t-arg');
      if (sel && link) { const r = document.createRange(); r.selectNodeContents(link); sel.removeAllRanges(); sel.addRange(r); }
      if (status) status.textContent = 'Press Ctrl+C to copy the selected address';
    }
  });
});
