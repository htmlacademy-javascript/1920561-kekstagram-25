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

let loaderCounter = MAX_COMMENT_SHOW;

const currentCommentsList = [];

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
  commentsLoaderButton.addEventListener('click' , onCommentsLoaderButtonClick);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  bodySelector.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  currentCommentsList.splice(0);
  loaderCounter = MAX_COMMENT_SHOW;
}

pictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

const getComments = (dataArray, value) => {
  const rendedArray = dataArray.slice(0, value);
  for (let i = 0 ; i < rendedArray.length; i++) {
    const commentsElement = socialComment.cloneNode(true);
    commentsElement.querySelector('.social__picture').src = rendedArray[i].avatar;
    commentsElement.querySelector('.social__picture').alt = rendedArray[i].name;
    commentsElement.querySelector('.social__text').textContent = rendedArray[i].message;
    commentsFragment.append(commentsElement);
    socialCommentsShow.textContent = rendedArray.length;
  }
  socialCommentatorsContainer.innerHTML = '';
  socialCommentatorsContainer.append(commentsFragment);
  return rendedArray.length === dataArray.length;
};

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

      user.comments.forEach((elem) => currentCommentsList.push(elem));

      getComments(currentCommentsList, MAX_COMMENT_SHOW);

      if (currentCommentsList.length < MAX_COMMENT_SHOW) {
        socialCommentsShow.textContent = currentCommentsList.length;
        commentsLoaderButton.classList.add('hidden');
      }

      if (currentCommentsList.length > MAX_COMMENT_SHOW) {
        commentsLoaderButton.classList.remove('hidden');
      }

    });
    picturesContainer.append(picturesFragment);
  });

function onCommentsLoaderButtonClick (evt) {
  loaderCounter += MAX_COMMENT_SHOW;
  if(getComments(currentCommentsList, loaderCounter)) {
    evt.target.classList.add('hidden');
  }
}

export {  renderFeed , picturesContainer  };
