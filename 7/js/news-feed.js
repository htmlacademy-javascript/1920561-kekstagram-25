// Загрузка изображений других пользователей с удалённого сервера: https://25.javascript.pages.academy/kekstagram/data. (ТЗ 4.1-4.3)

import { getRandomNumber } from './utils.js';
import { createCommentatorsObject } from './user-post-comments.js';

const USERS_TOTAL = 25;
const COMMENTS_TOTAL = 3;

const getPictureUrl = (userIndex) => `photos/${  userIndex  }.jpg`;

const createCommentsArray = (commentsNumber) => {
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
    comments: createCommentsArray(COMMENTS_TOTAL),
  };
};

const createUsersArray = (usersNumber) => {
  const usersArray = [];
  for (let i = 0; i < usersNumber; i++) {
    usersArray.push(createUserObject(i));
  }
  return usersArray;
};

export const feed = createUsersArray(USERS_TOTAL);
