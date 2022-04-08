// создание хэштегов и комментария для фото пользователя (ТЗ 2.3, 2.4)

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const re = /^#[A-ZА-ЯЁёа-яa-z0-9]{1,19}$/;

const cancelDoubleWhiteSpace = (string) => {
  const whiteSpaceRegEx = /^ +| +$|( ) +/g;
  return string.replace(whiteSpaceRegEx, '$1');
};

const checkHashtagIsEmpty = (array) => array[0] === '';

const checkMaxHashtags = (array) => array.length <= MAX_HASHTAGS;

const checkTextHashtags = (array) => array.some((elem) => re.test(elem));

const checkUniqueHashtags = (array) => {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] === array [i]) {
      return false;
    }
  }
  return true;
};

const validateTextLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const getCheckedHashtags = (array) => {
  if (!checkHashtagIsEmpty(array)) {
    return checkMaxHashtags(array) && checkTextHashtags(array) && checkUniqueHashtags(array);
  }
  return true;
};

export {
  getCheckedHashtags,
  cancelDoubleWhiteSpace,
  checkMaxHashtags,
  checkTextHashtags,
  checkUniqueHashtags,
  validateTextLength,
  checkHashtagIsEmpty,
  MAX_HASHTAGS,
  MAX_COMMENT_LENGTH
};
