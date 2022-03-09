// Контроль комментариев под постом пользователя (ТЗ 4.7, 4.8)
import {getRandomArrayElement, getRandomNumber} from './utils.js';
import {COMMENTATORSTOTAL, MESSAGES, COMMENTATORSNAMES} from './commentstors-data.js';

const getAvatarUrl = function (userIndex) {
  return `img/avatar-${  userIndex  }.svg`;
};

const createCommentatorsId = function (maxId) {
  const COMMENTATORSID = [];
  for (let i = 0; COMMENTATORSID.length < maxId; i++) {
    const number = getRandomNumber(1, maxId);
    if (!COMMENTATORSID.includes(number)) {
      COMMENTATORSID.push(number);
    }
  }
  return COMMENTATORSID;
};

const createCommentatorsObject = function (userIndex) {
  userIndex = getRandomArrayElement(createCommentatorsId(COMMENTATORSTOTAL));
  return {
    id: userIndex,
    url: getAvatarUrl(getRandomNumber(1 , 6)),
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(COMMENTATORSNAMES),
  };
};

export { createCommentatorsObject };
