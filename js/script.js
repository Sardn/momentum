
// календарь и часы calendar and clock
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
// приветствие greeting
const greetingBlock = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
// смена фона background change
const body = document.querySelector('body');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');
let randomNum = getRandomNum(1, 20);
// погода weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const userCity = document.querySelector('.city');
let city;
// перевод приложения application translation
const ruBtn = document.querySelector('.ru-btn');
const enBtn = document.querySelector('.en-btn');

let language = 'en';
const dateLang = {
    ru: 'ru-Ru',
    en: 'en-Us'
};
const timeOfDayLang = {
    ru: { 'Night': 'Доброй Ночи', 'Morning': 'Доброе Утро', 'Afternoon': 'Добрый День', 'Evening': 'Добрый Вечер' },
    en: { 'Night': 'Good Night', 'Morning': 'Good Morning', 'Afternoon': 'Good Afternoon', 'Evening': 'Good Evening' }
}
const weatherLang = {
    ru: {
        humidity: 'Влажность',
        windSpeed: 'Скорость ветра'
    },
    en: {
        humidity: 'Humidity',
        windSpeed: 'Wind speed'
    }
};
const errorLang = {
    ru: 'Ошибка! Город не найден для',
    en: 'Error! City not found for'
}
const ms = {
    ru: 'м/с',
    en: 'm/s'
};
const placeholderLang = {
    ru: '[Введите имя]',
    en: '[Enter name]'
};
const settingsLang = {
    ru: {
        time: 'Время',
        date: 'Дата',
        greeting: 'Приветствие',
        quote: 'Цитата',
        weather: 'Погода',
        player: 'Плеер',
        todo: 'Список дел',
        title: 'Скрыть / показать',
        background: 'Фон',
        settingsTitle: 'Настройки'
    },
    en: {
        time: 'Time',
        date: 'Date',
        greeting: 'Greeting',
        quote: 'Quote',
        weather: 'Weather',
        player: 'Player',
        todo: 'TODO',
        title: 'Show this components:',
        background: 'Background',
        settingsTitle: 'Settings'
    }
};
// const linksLang = {
//     ru: {
//         title: 'Ссылки',
//         add: 'Добавить ссылку',
//         name: 'Название',
//         url: 'Ссылка',
//         create: 'Создать'
//     },
//     en: {
//         title: 'Links',
//         add: 'Add New Link',
//         name: 'Name',
//         url: 'Link',
//         create: 'Create'
//     }
// }
// валидация validation URL
const myRegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
// фон background api
const apiRadios = Array.from(document.querySelectorAll('.api-radio'));
let currentApi = 'GitHub';
const apiUrls = {
    GitHub: `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay().toLocaleLowerCase()}/${randomNum.toString().padStart(2, 0)}.jpg`,
    Unsplash: `https://api.unsplash.com/photos/random?orientation=landscape&query=nature+${timeOfDayLang['en'][getTimeOfDay()].toLowerCase()}&client_id=gOMGlf8xCGTGtHeINwLRpIabG1_xQKPHt5Uv42VCybU`,
    Flickr: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d4c905a9f52e4e7c35ef12ed95069c7d&tags=nature&extras=url_l&format=json&nojsoncallback=1`
}

// часы и календарь clock and calendar
function showTime() { // показать время show time
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    timeBlock.textContent = currentTime;
    showDate();

    getTimeOfDay()
    showGreeting(timeOfDayLang[language][getTimeOfDay()]);

    setTimeout(showTime, 1000);
}

showTime();

function showDate() { // дни недели days of the week
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString(dateLang[language], options);

    dateBlock.textContent = currentDate;
}

// приветствие  greeting
function getTimeOfDay() { // время суток times of day
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours >= 0 && hours < 6) {
        timeOfDay = 'Night';
    } else if (hours >= 6 && hours < 12) {
        timeOfDay = 'Morning';
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'Afternoon';
    } else if (hours >= 18) {
        timeOfDay = 'Evening';
    }

    return timeOfDay;
}

function showGreeting(lang) {
    greetingBlock.textContent = `${lang},`;
}

function setLocalStorage() { // имя пользователя name user
    localStorage.setItem('name', nameInput.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
}

window.addEventListener('load', getLocalStorage);

apiRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        currentApi = event.target.value;
        setBG();
    });
});

async function getLinkToImage() {
    const url = apiUrls[currentApi];
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

// смена фона background change
function getRandomNum(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function setBG() {
    const img = new Image();

    if (currentApi === 'GitHub') {
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay().toLocaleLowerCase()}/${randomNum.toString().padStart(2, 0)}.jpg`;
    } else if (currentApi === 'Unsplash') {
        getLinkToImage().then(data => img.src = data.urls.regular);
    } else if (currentApi === 'Flickr') {
        getLinkToImage().then(data => img.src = data.photos.photo[getRandomNum(0, data.photos.photo.length - 1)].url_l);
    }

    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
}

setBG();

function getSlideNext() { // slider
    if (randomNum < 20) {
        randomNum++;
        setBG();
    } else {
        randomNum = 1;
        setBG();
    }
}

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum--;
        setBG();
    } else {
        randomNum = 20;
        setBG();
    }
}

nextBtn.addEventListener('click', getSlideNext);
prevBtn.addEventListener('click', getSlidePrev);

// weather
if (localStorage.getItem('userCity')) {
    city = localStorage.getItem('userCity');
    userCity.value = localStorage.getItem('userCity');
} else {
    city = 'Minsk';
    userCity.value = 'Minsk';
}

async function getWeather(city, lang, m) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=7b0f3f723c44214351510a6932e741bc&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);

        temperature.textContent = `${Math.round(Number(data.main.temp))}°C`;
        weatherDescription.textContent = data.weather[0].description;

        wind.textContent = `${weatherLang[lang].windSpeed}: ${Math.round(Number(data.wind.speed))}${m}`;

        humidity.textContent = `${weatherLang[lang].humidity}: ${Math.round(Number(data.main.humidity))}%`;

        localStorage.setItem('userCity', userCity.value);
        userCity.value = data.name;
    } catch (e) {
        userCity.value = 'Error! City not found for';
        // console.log(`Error! ${e}`);
    }
}

getWeather(city, language, ms[language], errorLang[language]);

userCity.addEventListener('change', function () {
    getWeather(userCity.value, language, ms[language], errorLang[language]);
});

// application translation
function translate() {
    getWeather(userCity.value, language, ms[language], errorLang[language]);
    nameInput.placeholder = placeholderLang[language];
    showTime();

    settingsChecks.forEach(check => {
        check.nextElementSibling.textContent = settingsLang[language][check.value];
    });
}
ruBtn.addEventListener('click', function () {
    language = 'ru';
    translate();
});

enBtn.addEventListener('click', function () {
    language = 'en';
    translate();
});

