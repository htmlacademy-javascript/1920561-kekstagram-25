// Просмотр изображения загруженного другим пользователем на весь экран (ТЗ 4.4, 4-5)
import {  FEED  } from './news-feed.js';

const BIGPICTURE = document.querySelector('.big-picture');
const USERPICTURES = document.querySelectorAll('.picture');
const PICTURECANCEL = document.querySelector('#picture-cancel');
const SOCIALCOMMENTATORSCONTAINER = BIGPICTURE.querySelector('.social__comments');
const SOCIALCOMMENT = SOCIALCOMMENTATORSCONTAINER.querySelector('.social__comment');
const COMMENTSFRAGMENT = document.createDocumentFragment();

const pictureClickHandler = function (picture, data) {
  picture.addEventListener('click', () => {
    BIGPICTURE.querySelector('.big-picture__img').querySelector('img').src = data.url;
    BIGPICTURE.querySelector('.likes-count').textContent = data.likes;
    BIGPICTURE.querySelector('.comments-count').textContent = data.comments.length;
    BIGPICTURE.querySelector('.social__caption').textContent = data.description;

    data.comments.forEach((elem) => {
      const COMMENTSELEMENT = SOCIALCOMMENT.cloneNode(true);
      COMMENTSELEMENT.querySelector('.social__picture').src = elem.url;
      COMMENTSELEMENT.querySelector('.social__picture').alt = elem.name;
      COMMENTSELEMENT.querySelector('.social__text').textContent = elem.message;
      COMMENTSFRAGMENT.append(COMMENTSELEMENT);
    });

    SOCIALCOMMENTATORSCONTAINER.innerHTML = '';
    SOCIALCOMMENTATORSCONTAINER.append(COMMENTSFRAGMENT);
  });
};

for (let i = 0; i < USERPICTURES.length; i++) {
  USERPICTURES[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    BIGPICTURE.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    BIGPICTURE.querySelector('.social__comment-count').classList.add('hidden');
    BIGPICTURE.querySelector('.comments-loader').classList.add('hidden');
  });
  pictureClickHandler(USERPICTURES[i], FEED[i]);
}

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    BIGPICTURE.classList.add('hidden');
  }
});

PICTURECANCEL.addEventListener('click', () => {
  BIGPICTURE.classList.add('hidden');
});

