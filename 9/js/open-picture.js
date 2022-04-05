import {  isEscapeKey  } from './utils.js';
import {  bodySelector  } from './photo-uploader.js';
import {  getUserData  } from './api.js';

const bigPicture = document.querySelector('.big-picture');
const pictureCancel = document.querySelector('#picture-cancel');
const socialCommentatorsContainer = bigPicture.querySelector('.social__comments');
const socialComment = socialCommentatorsContainer.querySelector('.social__comment');

const commentsFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();


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

const getNewsFeed = (array) => {
  array.forEach((user) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = user.url;
    pictureElement.querySelector('.picture__likes').textContent = user.likes;
    pictureElement.querySelector('.picture__comments').textContent = user.comments.length;
    picturesFragment.append(pictureElement);
    picturesContainer.append(picturesFragment);

    pictureElement.addEventListener('click', () => {
      // После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');

      openBigPicture();

      bigPicture.querySelector('.big-picture__img').querySelector('img').src = user.url;
      bigPicture.querySelector('.likes-count').textContent = user.likes;
      bigPicture.querySelector('.comments-count').textContent = user.comments.length;
      bigPicture.querySelector('.social__caption').textContent = user.description;

      user.comments.forEach((elem) => {
        const commentsElement = socialComment.cloneNode(true);
        commentsElement.querySelector('.social__picture').src = elem.avatar;
        commentsElement.querySelector('.social__picture').alt = elem.name;
        commentsElement.querySelector('.social__text').textContent = elem.message;
        commentsFragment.append(commentsElement);
      });

      socialCommentatorsContainer.innerHTML = '';
      socialCommentatorsContainer.append(commentsFragment);
    });
  });
};

getUserData(getNewsFeed);
