const timeDisplay = document.getElementById("time");
const timeContainer = document.getElementById("timeContainer");
const scrambleDisplay = document.getElementById("scramble");
const topBar = document.getElementById("topBar");
var time = 0.00;
var startTime;
var clickStartTime;
var isColorChanged = false;
var isRunning = false;
var justStopped = false;
var red = "#ff0000";
var green = "#00ff00";
var black = "#212529";
var scramble;
const signs = ["F", "R", "B", "L", "U", "D"];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getScramble() {
  let scrambles = [];
  let prevSign;
  for (let i = 0; i < 18; i++) {
    do {
      prevSign = scrambles[scrambles.length - 1];
      var sign = signs[Math.floor(Math.random() * signs.length)];
      switch (getRandomInt(0, 2)) {
      case 0:
        sign = sign + "'";
        break;
      case 1:
        sign = sign + "2";
        break;
      case 2:
        break;
      }
    } while (prevSign == sign);
    scrambles.push(sign);
  }
  return scrambles.join(" ");
}

function updateScramble() {
  scrambleDisplay.innerText = getScramble();
}

function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);
    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
}

function changeColor(color) {
  timeDisplay.style.color = color;
}

function start() {
  if (justStopped) {
    justStopped = false;
    return;
  }
  time = 0.00;
  if (!isRunning) {
    if (isColorChanged) {
      startTime = new Date().getTime();
      isColorChanged = false;
      isRunning = true;
      clickStartTime = undefined;
      changeColor(black);
    } else {
      clickStartTime = undefined;
      changeColor(black);
    }
  }
}

function stop() {
  if (isRunning) {
    updateScramble();
    isRunning = false;
    justStopped = true;
    startTime = null;
  } else {
    clickStartTime = new Date().getTime();
    timeDisplay.style.color = red;
  }
}

function updateTime() {
  if (isRunning) {
    var time = ((new Date().getTime() - startTime) / 1000).toFixed(2);
    timeDisplay.innerText = time;
    scramble
    topBar.style.opacity = "0";
  } else {
    topBar.style.opacity = "1";
    if (new Date().getTime() - clickStartTime > 600) { // 0.6sec
      if (!isColorChanged) {
        changeColor(green);
        isColorChanged = true;
      }
    }
  }
}

timeContainer.addEventListener("click", start);
timeContainer.addEventListener("mousedown", stop);
timeContainer.addEventListener("touchend", start);
timeContainer.addEventListener("touchstart", stop);
window.setInterval(updateTime, 10);
updateScramble();
