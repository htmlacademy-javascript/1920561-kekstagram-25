import {  isEscapeKey, createMessage  } from './utils.js';
import {
  getCheckedHashtags,
  cancelDoubleWhiteSpace,
  checkMaxHashtags,
  checkTextHashtags,
  checkUniqueHashtags,
  validateTextLength,
  MAX_HASHTAGS,
  MAX_COMMENT_LENGTH
} from './editor-control-comment.js';
import {  effectSlider,
  effectsOptions,
  updatePreviewImgFilter,
  getEffectsEventListener,
  removeEffectsEventListener  } from './editor-control-effects.js';
import {  sendData  } from './api.js';
import { resetScale, imgPreview } from './editor-control-scale.js';

const bodySelector = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadingFile = form.querySelector('#upload-file');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgCancelButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const hashtagsArea = form.querySelector('.text__hashtags');
const imgComment = form.querySelector('.text__description');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');


const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text--invalid',
  errorTextParent: 'text',
  errorTextTag: 'span',
  errorTextClass: 'text__error'
});

const cb = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadImg();
  }
};

function openUploadImg () {
  imgUploadOverlay.classList.remove('hidden');
  bodySelector.classList.add('modal-open');
  document.addEventListener('keydown', cb);
  getEffectsEventListener();
}

function closeUploadImg () {
  imgUploadOverlay.classList.add('hidden');

  effectSlider.noUiSlider.updateOptions(effectsOptions.none.noUiSliderOption);
  effectSlider.classList.add('hidden');
  updatePreviewImgFilter('none');
  pristine.reset();
  resetScale();
  imgPreview.style.transform = 'none';

  form.reset();
  bodySelector.classList.remove('modal-open');
  document.removeEventListener('keydown', cb);
  removeEffectsEventListener();
}

const onCommentFocus = () => {
  document.removeEventListener('keydown', cb);
};

const offCommentFocus = () => {
  document.addEventListener('keydown', cb);
};

hashtagsArea.addEventListener('focusin', () => {
  onCommentFocus();
});

hashtagsArea.addEventListener('focusout', () => {
  offCommentFocus();
});

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const getErrorMesage = (condition , errorMessage) => {
  if (condition) {
    pristine.addError(
      hashtagsArea,
      errorMessage
    );
  }
};

pristine.addValidator(
  imgComment,
  validateTextLength,
  `Не больше ${MAX_COMMENT_LENGTH} символов`
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const hashtagsArray = cancelDoubleWhiteSpace(hashtagsArea.value).toLowerCase().split(' ');
  const hashtagsValidationResult = getCheckedHashtags(hashtagsArray);

  const isValid = pristine.validate();

  if (isValid && hashtagsValidationResult) {
    blockSubmitButton();
    sendData(
      () => {
        closeUploadImg();
        createMessage(successMessageTemplate);
        unblockSubmitButton();
      },
      () => {
        closeUploadImg();
        createMessage(errorMessageTemplate);
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  } else {
    getErrorMesage(!checkMaxHashtags(hashtagsArray) , `Не больше ${MAX_HASHTAGS} хэштегов`);
    getErrorMesage(checkTextHashtags(hashtagsArray) , 'Хэштеги не должны содержать спецсимволы (!@$%...), иметь длину от 2 до 20 символов и начинаться с #');
    getErrorMesage(!checkUniqueHashtags(hashtagsArray) , 'Хэштеги не должны повторяться');
  }
});

export {  bodySelector, uploadingFile  };
