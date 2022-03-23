// Контроль комментариев под постом пользователя (ТЗ 4.7, 4.8)
import {getRandomArrayElement, getRandomNumber} from './utils.js';
import {COMMENTATORSTOTAL, MESSAGES, COMMENTATORSNAMES} from './commentstors-data.js';

const getAvatarUrl = (userIndex) => `img/avatar-${  userIndex  }.svg`;

const createCommentatorsId = (maxId) => {
  const commentatorsId = [];
  for (let i = 0; commentatorsId.length < maxId; i++) {
    const number = getRandomNumber(1, maxId);
    if (!commentatorsId.includes(number)) {
      commentatorsId.push(number);
    }
  }
  return commentatorsId;
};

const createCommentatorsObject = (userIndex) => {
  userIndex = getRandomArrayElement(createCommentatorsId(COMMENTATORSTOTAL));
  return {
    id: userIndex,
    url: getAvatarUrl(getRandomNumber(1 , 6)),
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(COMMENTATORSNAMES),
  };
};

export { createCommentatorsObject };
