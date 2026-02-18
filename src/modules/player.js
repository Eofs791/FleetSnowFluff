import { trackList } from "../data/tracks";

let currentIndex = 0;
let isPlaying = false;
const audio = new Audio();

function loadTrack(index) {
    const track = trackList[index];
    audio.src = track.src;
    audio.load();
    document.getElementById("title-text").innerText = track.title;
}

function playTrack() {
    audio.play().then(() => {
        isPlaying = true;
    }).catch(error => {
        console.error("播放失败:", error);
    });
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
}

function preTrack() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = trackList.length - 1;
    }

    loadTrack(currentIndex);
    playTrack();
}

function nextTrack() {
    currentIndex++;

    if (currentIndex > trackList.length - 1) {
        currentIndex = 0;
    }

    loadTrack(currentIndex);
    playTrack();
}

export function initPlayer() {
    loadTrack(currentIndex);

    const playBtn = document.getElementById("play-btn");
    const preBtn = document.getElementById("pre-btn");
    const nextBtn = document.getElementById("next-btn");

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    preBtn.addEventListener('click', preTrack);
    nextBtn.addEventListener('click', nextTrack);

    audio.addEventListener('ended', nextTrack);
}