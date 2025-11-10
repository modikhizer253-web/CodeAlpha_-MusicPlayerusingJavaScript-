// Playlist data 
const playlist = [
    { title: "Sunflower", artist: "Post Malone, Swae Lee", src: "Sunflower.mp3" },
    { title: "blinding lights", artist: "The Weeknd", src: "blinding_lights.mp3" },
    { title: "peaches", artist: "Justin Bieber", src: "peaches.mp3" }
];

let currentSongIndex = 0;

// DOM elements
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const duration = document.getElementById('duration');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const playlistUl = document.getElementById('playlist');

// Load playlist into UI
function loadPlaylist() {
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => playSong(index));
        playlistUl.appendChild(li);
    });
}

// Play a specific song
function playSong(index) {
    currentSongIndex = index;
    audio.src = playlist[index].src;
    title.textContent = playlist[index].title;
    artist.textContent = playlist[index].artist;
    audio.play();
    playBtn.textContent = '⏸️';  // Pause symbol
    updateActivePlaylistItem();
}

// active playlist item
function updateActivePlaylistItem() {
    const items = playlistUl.querySelectorAll('li');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentSongIndex);
    });
}

// Format time (MM:SS)
function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

// duration display
function updateDuration() {
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration || 0);
    duration.textContent = `${current} / ${total}`;
}

// Event listeners
audio.addEventListener('loadedmetadata', () => {
    progress.max = audio.duration;
    updateDuration();
});

audio.addEventListener('timeupdate', () => {
    progress.value = audio.currentTime;
    updateDuration();
});

progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
});

volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸️';  // Pause symbol
    } else {
        audio.pause();
        playBtn.textContent = '▶️';  // Play symbol
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(currentSongIndex);
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playSong(currentSongIndex);
});

// Autoplay
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Initialize
loadPlaylist();
playSong(0);