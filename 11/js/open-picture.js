import {  renderFeed , picturesContainer  } from './render-feed.js';
import {  getRandomNumber , debounce  } from './utils.js';

const filter = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDefault = document.querySelector('#filter-default');
const filterButtonDiscussed = document.querySelector('#filter-discussed');

const MAX_RANDOM_PICTURES = 10;
const RENDER_DELAY = 500;

const filterRandom = (array) => {
  picturesContainer.querySelectorAll('.picture').forEach((elem) => elem.remove());
  let result = [];
  while (result.length !== MAX_RANDOM_PICTURES) {
    const elem = getRandomNumber(0 , array.length - 1);
    result.push(array[elem]);
    result = result.filter((value, index, arr) => arr.indexOf(value) === index);
  }
  return result.slice().slice(0 , MAX_RANDOM_PICTURES);
};

const filterDiscussed = (array) => {
  picturesContainer.querySelectorAll('.picture').forEach((elem) => elem.remove());
  return array.slice().sort((a, b) => a.likes < b.likes ? 1 : -1);
};

const filterDefault = (array) => {
  picturesContainer.querySelectorAll('.picture').forEach((elem) => elem.remove());
  return array;
};

const getButtonClass = (button) => {
  button.addEventListener('click', (evt) => {
    filterButtons.forEach((elem) => {
      elem.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  });
};

const getNewsFeed = (array) => {
  filter.classList.remove('img-filters--inactive');
  renderFeed(array);
  getButtonClass(filterButtonRandom);
  filterButtonRandom.addEventListener('click' , debounce(() => renderFeed(filterRandom(array)),  RENDER_DELAY));
  getButtonClass(filterButtonDefault);
  filterButtonDefault.addEventListener('click' , debounce(() => renderFeed(filterDefault(array)),  RENDER_DELAY));
  getButtonClass(filterButtonDiscussed);
  filterButtonDiscussed.addEventListener('click' , debounce(() => renderFeed(filterDiscussed(array)),  RENDER_DELAY));
};

export {  getNewsFeed  };
