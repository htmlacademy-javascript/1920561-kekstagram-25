// Отправка данных на сервер (ТЗ 2.3; 2.4; 3)
import {  isEscapeKey } from './utils.js';

const MAX_HASHTAGS = 5;

const form = document.querySelector('.img-upload__form');
const uploadingFile = form.querySelector('#upload-file');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgCancelButton = form.querySelector('.img-upload__cancel');
const hashtagsArea = form.querySelector('.text__hashtags');
const imgComment = form.querySelector('.text__description');

const re = /^#[A-ZА-ЯЁёа-яa-z0-9]{1,19}$/;

const pristine = new Pristine(form);

const onUploadImgEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadImg();
  }
};

function openUploadImg () {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onUploadImgEscKeyDown);
}

function closeUploadImg () {
  imgUploadOverlay.classList.add('hidden');
  form.reset();
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadImgEscKeyDown);
}

const onCommentFocus = () => {
  document.removeEventListener('keydown', onUploadImgEscKeyDown);
};

const offCommentFocus = () => {
  document.addEventListener('keydown', onUploadImgEscKeyDown);
};

imgComment.addEventListener('focusin', () => {
  onCommentFocus();
});

imgComment.addEventListener('focusout', () => {
  offCommentFocus();
});

uploadingFile.addEventListener('change', () => {
  openUploadImg();
});

imgCancelButton.addEventListener('click', () => {
  closeUploadImg();
});

const cancelDoubleWhiteSpace = (string) => {
  const whiteSpaceRegEx = /^ +| +$|( ) +/g;
  return string.replace(whiteSpaceRegEx, '$1');
};

const checkHashtagIsEmpty = (array) => {
  if (array[0] === '') {
    return true;
  } else {
    return false;
  }
};

const checkMaxHashtags = (array) => {
  if(array.length <= MAX_HASHTAGS) {
    return true;
  } else {
    return false;
  }
};

const checkTextHashtags = (array) => {
  for(let i = 0; i < array.length ; i++) {
    if(re.test(array[i])) {
      return true;
    } else {
      return false;
    }
  }
};

const getCheckedHashtags = (array) => {
  if (!checkHashtagIsEmpty(array)){
    if(checkMaxHashtags(array) && checkTextHashtags(array)){
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

form.addEventListener('submit', (evt) => {
  const hashtagsArray = cancelDoubleWhiteSpace(hashtagsArea.value).split(' ');
  const hashtagsResult = getCheckedHashtags(hashtagsArray);
  const isValid = pristine.validate();
  if (!isValid || !hashtagsResult) {
    evt.preventDefault();
  }
});
