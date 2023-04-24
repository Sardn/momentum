

// настройки приложения

const settingsChecks = Array.from(document.querySelectorAll('.components-input'));
const componentsTitle = document.querySelector('.components-title');

const settings = document.querySelector('.settings')
const settingButton = document.querySelector('.setting-button')
const settingBlock = document.querySelector('.setting-block')
///////////////********* 
settingButton.addEventListener('click', () => {
    settingBlock.classList.toggle('visible')
})
// клик снаружи
document.addEventListener('click', function (e) {
    if (!e.composedPath().includes(settings)) {
        settingBlock.classList.remove('visible');
    }
});

settingsChecks.forEach(check => {
    check.addEventListener('change', function (event) {
        let chosenComponent = document.querySelector('[data-comp="' + event.target.value + '"]');

        if (event.target.checked === true) {
            chosenComponent.classList.remove('component-hidden');
        } else {
            chosenComponent.classList.add('component-hidden');
        }
    });
});