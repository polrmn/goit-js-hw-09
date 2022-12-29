import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('form');

let timerId = null;

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let pos = 1;
  let delayNum = Number(delay.value);
  const amountNum = Number(amount.value);
  const stepNum = Number(step.value);

  for (let i = 0; i < amountNum; i += 1) {
    createPromise(pos, delayNum)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    pos += 1;
    delayNum += stepNum;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
