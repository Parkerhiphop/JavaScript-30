/** Get all Elements we need */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__bar');
const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');

// Play & Pause
/*
* Notice : pause -> event; paused -> attribute
*/
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

video.addEventListener('click', togglePlay);
toggleButton.addEventListener('click', togglePlay);

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggleButton.textContent = icon;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); 

// Skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

// handleRangeUpdate -> manipulate volume & playbackRate from video
function handleRangeUpdate() {
  // value come from range
  video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


// progressBar

// the length of progressBar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

// To move the progressBar
function moveProgressBar(e) {
  // get the new point for the progressBar
  const newProgress = (e.offsetX / progress.offsetWidth) * video.duration;
  // currentTime change -> timeUpdate -> handleProgress -> change progressBar
  video.currentTime = newProgress;
}

progress.addEventListener('click', moveProgressBar);

let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && moveProgressBar(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


// fullscreen
function handleSize(e) {
  video.style.height = '100%';

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

fullscreenButton.addEventListener('click', handleSize);