// создание хэштегов и комментария для фото пользователя (ТЗ 2.3, 2.4)

const MAX_HASHTAGS = 5;
const re = /^#[A-ZА-ЯЁёа-яa-z0-9]{1,19}$/;

const cancelDoubleWhiteSpace = (string) => {
  const whiteSpaceRegEx = /^ +| +$|( ) +/g;
  return string.replace(whiteSpaceRegEx, '$1');
};

const checkHashtagIsEmpty = (array) => array[0] === '';

const checkMaxHashtags = (array) => array.length <= MAX_HASHTAGS;

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

export {  getCheckedHashtags , cancelDoubleWhiteSpace  };
