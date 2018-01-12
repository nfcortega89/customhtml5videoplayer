// get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// build our functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
  console.log("Update the button");
}
function skip() {
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  console.log(this.value);
  video[this.name] = this.value;
}
function handleProgress() {
  console.log("handling update");
  const percent = video.currentTime / video.duration;
  const percentx100 = percent * 100;
  progressBar.style.flexBasis = `${percentx100}%`;
}
function scrub(e) {
  console.log(e);
  const scrubTime = e.offsetX / progress.offsetWidth;
  const scrubTime1 = scrubTime * video.duration;
  video.currentTime = scrubTime1;
}
// hook up event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
