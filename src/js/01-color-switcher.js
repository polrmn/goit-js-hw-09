const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

let timerId = null;

stopBtnRef.disabled = true;

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;
    timerId = setInterval(changeBodyBackgroundColor, 1000);
}

function onStopBtnClick() {
    startBtnRef.disabled = false;
    stopBtnRef.disabled = true;
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}