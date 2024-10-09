// Initialize variables
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

// DOM elements
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Function to start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 1000);
    isRunning = true;
  }
}

// Function to pause the stopwatch
function pauseStopwatch() {
  if (isRunning) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

// Function to reset the stopwatch
function resetStopwatch() {
  clearInterval(intervalId);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00';
  lapsContainer.innerHTML = ''; // Clear all lap records
}

// Function to update the stopwatch display
function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  display.textContent = formattedTime;
}

// Function to record lap time
function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
  }
}

// Function to format time in HH:MM:SS format
function formatTime(timeInMillis) {
  const totalSeconds = Math.floor(timeInMillis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Function to add leading zeros
function pad(number) {
  return number.toString().padStart(2, '0');
}
