const togglThemeBtn = document.getElementById('toggle-theme-btn');
const togglThemeImage = document.getElementById('toggle-theme-image');

function setDarkTheme() {
  document.body.classList.add('dark')
  togglThemeImage.src = './assets/svg/moon.png';
  localStorage.theme = 'dark'
}
function setLightTheme() {
  document.body.classList.remove('dark');
  togglThemeImage.src = './assets/svg/sun.png';
  localStorage.theme = 'light'
}

togglThemeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    setLightTheme()
  } else {
    setDarkTheme()
  }
})

if (localStorage.theme === 'dark') {
  setDarkTheme()
  }