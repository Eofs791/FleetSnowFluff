import { trackList } from "../data/tracks";

let currentIndex = 0;
let isPlaying = false;
let showList = false;
const audio = new Audio();

function renderPlaylist() {
    const playlist = document.getElementById("playlist");

    trackList.forEach((track, index) => {
        const item = document.createElement("a");
        item.className = "tracklist-item";
        item.style.setProperty('--i', index);
        item.innerHTML = `
            <span class="tracklist-title">${track.title}</span>
            <span class="tracklist-duration">${track.duration}</span>
        `;

        item.addEventListener("click", () => {
            selectTrack(track.id);
        });

        playlist.appendChild(item);
    });
}

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

export function selectTrack(targetId) {
    currentIndex = trackList.findIndex(track => track.id === targetId);
    loadTrack(currentIndex);
    playTrack();
}

export function initPlayer() {
    loadTrack(currentIndex);
    renderPlaylist();

    const playBtn = document.getElementById("play-btn");
    const preBtn = document.getElementById("pre-btn");
    const nextBtn = document.getElementById("next-btn");
    const listBtn = document.getElementById("playlist-btn");
    const playlist = document.getElementById("playlist");

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });
    preBtn.addEventListener('click', preTrack);
    nextBtn.addEventListener('click', nextTrack);

    listBtn.addEventListener('click', () => {
        showList = !showList;
        playlist.classList.toggle("active");

        if (showList) {
            playlist.classList.remove("inactive");
        } else {
            playlist.classList.add("inactive");
            setTimeout(() => {
                playlist.scrollTop = 0;
            }, 600);
        }
    });

    audio.addEventListener('ended', nextTrack);
}