(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem('theme');
  var theme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.dataset.palette = 'clay';
  root.dataset.theme = theme;
})();

document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;
  document.querySelector('.theme-toggle')?.addEventListener('click', function () {
    var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  });
});
