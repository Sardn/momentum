

import playList from "./playList.js";

// аудио плеер audio player
const toggleAudioBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playlistContainer = document.querySelector('.play-list');
const audioName = document.querySelector('.audio-name-text');
const audio = new Audio();
let playNum = 0;
let isPlay = false;
let currTime;
// продвинутый аудио плеер advanced audio player
const volumeBtn = document.querySelector('.volume-button');
const volumeLine = document.querySelector('.volume-slider');
let mousedown = false;
const timeLine = document.querySelector(".timeline");


playList.forEach(el => { // создаем плейлист create a playlist html
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    li.setAttribute('data-src', el.src);
    playlistContainer.append(li);
});

const playItems = document.querySelectorAll('.play-item');

function playAudio() { // play/stop 
    if (!isPlay) {
        audio.src = playList[playNum].src;

        if (currTime) {
            audio.currentTime = currTime;
        } else {
            audio.currentTime = 0;
        }

        audio.play();

        audioName.textContent = playList[playNum].title;

        isPlay = true;
    } else {
        audio.pause();
        currTime = audio.currentTime;

        isPlay = false;
    }

    toggleAudioIcon();

    changeActiveAudio();
}

function changeActiveAudio() { // меняем стиль иконки активного аудио change the style of the active audio icon
    let currentAudio = document.querySelector(`[data-src="${playList[playNum].src}"]`);
    playItems.forEach(item => item.classList.remove('item-active'));
    currentAudio.classList.add('item-active');
}

function toggleAudioIcon() { // меняем иконку change icon play
    if (isPlay) {
        toggleAudioBtn.classList.add('pause');
    } else {
        toggleAudioBtn.classList.remove('pause');
    }
}

function prevAudio() { // предыдущий / следующий трек previous / next track
    isPlay = false;
    currTime = 0;

    if (playNum > 0) {
        playNum--;
    } else {
        playNum = playList.length - 1;
    }

    playAudio();
    toggleAudioIcon();
}

function nextAudio() {
    isPlay = false;
    currTime = 0;

    if (playNum < playList.length - 1) {
        playNum++;
    } else {
        playNum = 0;
    }

    playAudio();
    toggleAudioIcon();
}

toggleAudioBtn.addEventListener('click', playAudio);

playPrevBtn.addEventListener('click', prevAudio);
playNextBtn.addEventListener('click', nextAudio);

audio.addEventListener('ended', function () {
    nextAudio();
    changeActiveAudio();
});

// продвинутый аудио-плеер advanced audio player 
function getTimeCodeFromNum(num) { // вычисляем длительность аудио calculate audio duration
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    let hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) {
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    } else {
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }
}

audio.addEventListener("loadeddata", () => { // записали длительность аудио recorded audio duration
    document.querySelector('.length').textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = 1;
});

function updateProgress() { // заполнение прогресс-бара filling the progress bar
    timeLine.value = (audio.currentTime / audio.duration) * 100;
    timeLine.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${(audio.currentTime / audio.duration) * 100}%, #C4C4C4 ${(audio.currentTime / audio.duration) * 100}%, #C4C4C4 100%)`;

    document.querySelector(".current").textContent = getTimeCodeFromNum(audio.currentTime); // текущее время аудио current audio time
}

audio.addEventListener('timeupdate', updateProgress);

function scrub(event) { // перемотка по прогрессбару scroll through the progress bar
    const scrubTime = (event.offsetX / timeLine.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;

    const value = timeLine.value;
    timeLine.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

timeLine.addEventListener('click', scrub);
timeLine.addEventListener('mousemove', (event) => mousedown && scrub(event));
timeLine.addEventListener('mousedown', () => mousedown = true);
timeLine.addEventListener('mouseup', () => mousedown = false);

function handleRangeUpdate() { // громкость volume
    audio.volume = volumeLine.value;

    volumeLine.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${volumeLine.value * 100}%, #C4C4C4 ${volumeLine.value * 100}%, #C4C4C4 100%)`;

    if (volumeLine.value === '0') {
        volumeBtn.classList.add('volume-mute');
    } else {
        volumeBtn.classList.remove('volume-mute')
    }
}

function toggleVolume() {
    volumeBtn.classList.toggle('volume-mute');

    if (volumeBtn.classList.contains('volume-mute')) {
        volumeLine.value = 0;
    } else {
        volumeLine.value = 1;
    }

    handleRangeUpdate();
}

volumeLine.addEventListener('change', handleRangeUpdate);
volumeLine.addEventListener('mousemove', handleRangeUpdate);

volumeBtn.addEventListener('click', toggleVolume);