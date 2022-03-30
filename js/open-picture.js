// Просмотр изображения загруженного другим пользователем на весь экран (ТЗ 4.4, 4-5)
import {  feed  } from './news-feed.js';
import {  isEscapeKey } from './utils.js';
import {  bodySelector  } from './photo-uploader.js';

const bigPicture = document.querySelector('.big-picture');
const userPictures = document.querySelectorAll('.picture');
const pictureCancel = document.querySelector('#picture-cancel');
const socialCommentatorsContainer = bigPicture.querySelector('.social__comments');
const socialComment = socialCommentatorsContainer.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  bodySelector.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeyDown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  bodySelector.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
}

pictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

const onPictureClick = (picture, data) => {
  picture.addEventListener('click', () => {
    // После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    openBigPicture();

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.url;
    bigPicture.querySelector('.likes-count').textContent = data.likes;
    bigPicture.querySelector('.comments-count').textContent = data.comments.length;
    bigPicture.querySelector('.social__caption').textContent = data.description;

    data.comments.forEach((elem) => {
      const commentsElement = socialComment.cloneNode(true);
      commentsElement.querySelector('.social__picture').src = elem.url;
      commentsElement.querySelector('.social__picture').alt = elem.name;
      commentsElement.querySelector('.social__text').textContent = elem.message;
      commentsFragment.append(commentsElement);
    });

    socialCommentatorsContainer.innerHTML = '';
    socialCommentatorsContainer.append(commentsFragment);
  });
};

for (let i = 0; i < userPictures.length; i++) {
  onPictureClick(userPictures[i], feed[i]);
}
