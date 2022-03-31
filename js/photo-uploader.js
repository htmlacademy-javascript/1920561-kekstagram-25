// Отправка данных на сервер (ТЗ 2.3; 2.4; 3)
import {  isEscapeKey } from './utils.js';
import {  getCheckedHashtags , cancelDoubleWhiteSpace  } from './editor-control-comment.js';
import {  effectSlider , effectsOptions , updatePreviewImgFilter  } from './editor-control-effects.js';

const bodySelector = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadingFile = form.querySelector('#upload-file');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgCancelButton = form.querySelector('.img-upload__cancel');
const hashtagsArea = form.querySelector('.text__hashtags');
const imgComment = form.querySelector('.text__description');

const pristine = new Pristine(form);

const onUploadImgEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadImg();
  }
};

function openUploadImg () {
  imgUploadOverlay.classList.remove('hidden');
  bodySelector.classList.add('modal-open');
  document.addEventListener('keydown', onUploadImgEscKeyDown);
}

function closeUploadImg () {
  imgUploadOverlay.classList.add('hidden');

  effectSlider.noUiSlider.updateOptions(effectsOptions.none.noUiSliderOption);
  effectSlider.classList.add('hidden');
  updatePreviewImgFilter('none');

  form.reset();
  bodySelector.classList.remove('modal-open');
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

form.addEventListener('submit', (evt) => {
  const hashtagsArray = cancelDoubleWhiteSpace(hashtagsArea.value).split(' ');
  const hashtagsResult = getCheckedHashtags(hashtagsArray);
  const isValid = pristine.validate();
  if (!isValid || !hashtagsResult) {
    evt.preventDefault();
  }
});

export {  bodySelector  };
