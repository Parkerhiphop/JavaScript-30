const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
const total = document.querySelector('.total');

const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    return (mins * 60) + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

total.innerHTML = `${hours}:${mins}:${secondsLeft}`;

const displayTimes = () => {
  const videos = Array.from(document.querySelectorAll('.videos li'));

  videos.map((video, index) => {
    video.innerHTML = `Video ${index + 1} <br><br> ${hours}:${mins}:${secondsLeft}`;
  });
};

displayTimes();
