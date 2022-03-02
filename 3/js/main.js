const USERSTOTAL = 25;
const COMMENTSTOTAL = 3;
const COMMENTATORSTOTAL = 100;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTATORSNAMES = [
  'Иван',
  'Мария',
  'Виктор',
  'Юлия',
  'Александр',
  'Валерий',
];

const getPictureUrl = function (userIndex) {
  const FORWARDZERO = `0${  userIndex }`;
  return (userIndex < 10 ? `photos/${  FORWARDZERO  }.jpg` : `photos/${  userIndex  }.jpg`);
};

const getAvatarUrl = function (userIndex) {
  return `img/avatar-${  userIndex  }.svg`;
};

/* Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random */
function getRandomNumber (a, b) {
  const MIN = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const MAX = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const RESULT = Math.random() * (MAX - MIN + 1) + MIN;
  return Math.floor(RESULT);
}


const getRandomArrayElement = function (element) {
  return element[getRandomNumber(0 , element.length - 1)];
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

const createCommentsObject = function (userIndex) {
  userIndex = getRandomArrayElement(createCommentatorsId(COMMENTATORSTOTAL));
  return {
    id: userIndex,
    url: getAvatarUrl(getRandomNumber(1 , 6)),
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(COMMENTATORSNAMES),
  };
};

const createCommentsArray = function (commentsNumber) {
  const commentsArray = [];
  for (let i = 0; i < commentsNumber; i++) {
    commentsArray.push(createCommentsObject(i));
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

createUsersArray(USERSTOTAL);
