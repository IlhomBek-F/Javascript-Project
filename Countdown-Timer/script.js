const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const newYear = "1 Jan 2022";

function count() {
  const newDate = new Date(newYear);

  const currentTime = new Date();

  const totals = (newDate - currentTime) / 1000;

  const days = Math.floor(totals / 3600 / 24);

  const hours = Math.floor(totals / 3600) % 24;

  const minutes = Math.floor(totals / 60) % 60;

  const seconds = Math.floor(totals) % 60;

  const redFormat =
    seconds < 10
      ? (secondsEl.style.color = "red")
      : (secondsEl.style.color = "green");

  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime(hours);
  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);

  seconds.style = redFormat;
}

count();

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(count, 1000);
