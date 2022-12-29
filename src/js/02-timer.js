import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    valueSpans: document.querySelectorAll('.value'),
    timerDiv: document.querySelector('.timer')
};
let selectedDateMs = 0;
let ms = 0;
let timerId = null;
refs.startBtn.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (Date.parse(selectedDates[0]) <= Date.now()) {
          refs.startBtn.disabled = true;
          Notify.failure('Please choose a date in the future');
          return;
      }
      refs.startBtn.disabled = false;
      selectedDateMs = Date.parse(selectedDates[0]);
  },
});

refs.startBtn.addEventListener('click', onSratrBtnClick);

function onSratrBtnClick(event) {
    refs.p = document.querySelector('.endtime');
    if (refs.p) {
      refs.p.innerHTML = '';
    }
    refs.input.disabled = true;
    refs.startBtn.disabled = true;
    refs.timerDiv.style.borderColor = 'yellow';
    timerId = setInterval(() => {
        ms = selectedDateMs - Date.now();
        const date = convertMs(ms);
        refs.valueSpans[0].innerHTML = addLeadingZero(`${date.days}`);
        refs.valueSpans[1].innerHTML = addLeadingZero(`${date.hours}`);
        refs.valueSpans[2].innerHTML = addLeadingZero(`${date.minutes}`);
        refs.valueSpans[3].innerHTML = addLeadingZero(`${date.seconds}`);
        if (ms < 1000) {
            clearInterval(timerId);
            refs.input.disabled = false;
            refs.startBtn.disabled = false;
            refs.timerDiv.style.borderColor = '#00ff00';
            if (refs.p) {
              refs.p.innerHTML = 'TIME IS UP!';
            } else {
              refs.timerDiv.insertAdjacentHTML(
                'afterend',
                `<p class="endtime">TIME IS UP!</p>`
              );
            }
            
        }
    }, 1000);

    function addLeadingZero(value) {
       return value.padStart(2, '0');
    }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
