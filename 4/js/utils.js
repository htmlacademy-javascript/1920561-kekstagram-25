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

export {getRandomNumber, getRandomArrayElement};
