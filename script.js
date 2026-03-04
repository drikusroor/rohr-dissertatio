// ═══════════════════════════════════════════════
// Theme: system (default) | light | dark
// ═══════════════════════════════════════════════
(function () {
  const STORAGE_KEY = 'rohr-theme';
  const THEMES = ['system', 'light', 'dark'];
  const ICONS = { system: '\u{1F5A5}', light: '\u{2600}\u{FE0F}', dark: '\u{1F319}' }; // 🖥️ ☀️ 🌙

  function applyTheme(theme) {
    document.body.classList.remove('theme-system', 'theme-light', 'theme-dark');
    document.body.classList.add('theme-' + theme);

    // Update button states
    THEMES.forEach(function (t) {
      var btn = document.getElementById('theme-' + t);
      if (btn) btn.classList.toggle('active', t === theme);
    });

    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* noop */ }
  }

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  // Expose globally
  window.setTheme = applyTheme;

  // Initialise on DOM ready
  var stored = getStoredTheme();
  var initial = (stored && THEMES.indexOf(stored) !== -1) ? stored : 'system';
  applyTheme(initial);
})();

// ═══════════════════════════════════════════════
// Toggle Latin originals
// ═══════════════════════════════════════════════
function toggleLatin(btn, showLabel, hideLabel) {
  document.body.classList.toggle('hide-latin');
  btn.textContent = document.body.classList.contains('hide-latin') ? showLabel : hideLabel;
}

// ═══════════════════════════════════════════════
// Scroll-triggered fade-in
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.translation-block, .finding, .argument-item, .context-card, .timeline-item'
  ).forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
