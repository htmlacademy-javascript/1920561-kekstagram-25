// Контроль комментариев под постом пользователя (ТЗ 4.7, 4.8)
import {getRandomArrayElement, getRandomNumber} from './utils.js';
import {COMMENTATORS_TOTAL, messages, commentatorsNames} from './commentstors-data.js';

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
  userIndex = getRandomArrayElement(createCommentatorsId(COMMENTATORS_TOTAL));
  return {
    id: userIndex,
    url: getAvatarUrl(getRandomNumber(1 , 6)),
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(commentatorsNames),
  };
};

export { createCommentatorsObject };
