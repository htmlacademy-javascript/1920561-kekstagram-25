// Загрузка изображений других пользователей с удалённого сервера: https://25.javascript.pages.academy/kekstagram/data. (ТЗ 4.1-4.3)

import { getRandomNumber } from './utils.js';
import { createCommentatorsObject } from './user-post-comments.js';

const USERSTOTAL = 25;
const COMMENTSTOTAL = 3;

const getPictureUrl = function (userIndex) {
  return `photos/${  userIndex  }.jpg`;
};

const createCommentsArray = function (commentsNumber) {
  const commentsArray = [];
  for (let i = 0; i < commentsNumber; i++) {
    commentsArray.push(createCommentatorsObject(i));
  }
  return commentsArray;
};

const createUserObject = function (userIndex) {
  return {
    id: userIndex + 1,
    url: getPictureUrl(userIndex + 1),
    description: 'Моё фото',
    likes: getRandomNumber(15, 200),
    comments: createCommentsArray(COMMENTSTOTAL),
  };
};

const createUsersArray = function (usersNumber) {
  const USERSARRAY = [];
  for (let i = 0; i < usersNumber; i++) {
    USERSARRAY.push(createUserObject(i));
  }
  return USERSARRAY;
};

export const FEED = createUsersArray(USERSTOTAL);
