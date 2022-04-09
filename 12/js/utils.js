const getRandomNumber = (a, b) => {
  const MIN = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const MAX = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const RESULT = Math.random() * (MAX - MIN + 1) + MIN;
  return Math.floor(RESULT);
};

const messageFragment = document.createDocumentFragment();

const isEscapeKey = (evt) => evt.key === 'Escape';

const onMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageEvent();
  }
};

function closeMessageEvent () {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onMessageEscKeyDown);
}

const closeMessageTest = (message , messageTypeButton) => {
  document.addEventListener('keydown', onMessageEscKeyDown);
  messageTypeButton.addEventListener('click', () => {
    closeMessageEvent();
  });
  document.addEventListener('click' , (evt) => {
    if(evt.target === message){
      closeMessageEvent();
    }
  });
};

const createMessage = (messageTypeTemplate) => {
  const messageElement = messageTypeTemplate.cloneNode(true);
  messageFragment.append(messageElement);
  document.body.append(messageFragment);
  const CloseButton = messageElement.querySelector('button');
  closeMessageTest(messageElement , CloseButton);
};

const createGetDataError = () => {
  const messageElement = document.createElement('h1');
  messageElement.classList.add('error__get-data');
  messageElement.textContent = 'При загрузке данных с сервера произошла ошибка';
  document.body.prepend(messageElement);
};
// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay) => {
  let timeoutid;
  return (...rest) => {
    clearTimeout(timeoutid);
    timeoutid = setTimeout(() => { callback.apply(this, rest); }, timeoutDelay);
  };
};

export {  isEscapeKey, createMessage , getRandomNumber, debounce, createGetDataError  };
