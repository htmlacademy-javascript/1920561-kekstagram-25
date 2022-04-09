import {  isEscapeKey  } from './utils.js';
import {  bodySelector  } from './photo-uploader.js';

const MAX_COMMENT_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const socialCommentatorsContainer = bigPicture.querySelector('.social__comments');
const socialCommentsCounter = bigPicture.querySelector('.social__comment-count');
const socialCommentsTotal = socialCommentsCounter.querySelector('.comments-count');
const socialCommentsShow =  socialCommentsCounter.querySelector('.comments-show');
const socialComment = socialCommentatorsContainer.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
const commentsFragment = document.createDocumentFragment();
const pictureCancel = document.querySelector('#picture-cancel');

let getComments;
let loaderCounter = MAX_COMMENT_SHOW;

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
  loaderCounter = MAX_COMMENT_SHOW;
}

pictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

const renderFeed = (array) =>
  array.forEach((user) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = user.url;
    pictureElement.querySelector('.picture__likes').textContent = user.likes;
    pictureElement.querySelector('.picture__comments').textContent = user.comments.length;

    picturesFragment.append(pictureElement);

    pictureElement.addEventListener('click', () => {
      openBigPicture();

      bigPicture.querySelector('.big-picture__img').querySelector('img').src = user.url;
      bigPicture.querySelector('.likes-count').textContent = user.likes;
      socialCommentsTotal.textContent = user.comments.length;
      bigPicture.querySelector('.social__caption').textContent = user.description;
      socialCommentsShow.textContent = MAX_COMMENT_SHOW;

      if (user.comments.length < MAX_COMMENT_SHOW) {
        socialCommentsShow.textContent = user.comments.length;
        commentsLoaderButton.classList.add('hidden');
      }

      if (user.comments.length > MAX_COMMENT_SHOW) {
        commentsLoaderButton.classList.remove('hidden');
      }

      getComments = (value) => {
        const rendedArray = user.comments.slice(0, value);
        for (let i = 0 ; i < rendedArray.length; i++) {
          const elem = rendedArray[i];
          const commentsElement = socialComment.cloneNode(true);
          commentsElement.querySelector('.social__picture').src = elem.avatar;
          commentsElement.querySelector('.social__picture').alt = elem.name;
          commentsElement.querySelector('.social__text').textContent = elem.message;
          commentsFragment.append(commentsElement);
          socialCommentsShow.textContent = rendedArray.length;
        }
        socialCommentatorsContainer.innerHTML = '';
        socialCommentatorsContainer.append(commentsFragment);
        return rendedArray.length === user.comments.length;
      };

      getComments(MAX_COMMENT_SHOW);
    });
    picturesContainer.append(picturesFragment);
  });

commentsLoaderButton.addEventListener('click' , (evt) => {
  loaderCounter+=MAX_COMMENT_SHOW;
  if(getComments(loaderCounter)) {
    evt.target.classList.add('hidden');
  }
});

export {  renderFeed , picturesContainer  };
