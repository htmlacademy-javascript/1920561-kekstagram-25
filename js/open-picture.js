import {  renderFeed , picturesContainer  } from './render-feed.js';
import {  getRandomNumber , debounce  } from './utils.js';

const MAX_RANDOM_PICTURES = 10;
const RENDER_DELAY = 500;
const filter = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDefault = document.querySelector('#filter-default');
const filterButtonDiscussed = document.querySelector('#filter-discussed');

const getFilterRandom = (array) => {
  picturesContainer.querySelectorAll('.picture').forEach((elem) => elem.remove());
  const results = [];
  for (let i = 0; results.length < MAX_RANDOM_PICTURES; i++) {
    if (getRandomNumber(0,1)) {
      results.push(array[i]);
    }
  }
  return results;
};

const getFilterDiscussed = (array) => {
  picturesContainer.querySelectorAll('.picture').forEach((elem) => elem.remove());
  return array.slice().sort((a, b) => a.likes < b.likes ? 1 : -1);
};

const getFilterDefault = (array) => {
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
  filterButtonRandom.addEventListener('click' , debounce(() => renderFeed(getFilterRandom(array)),  RENDER_DELAY));
  getButtonClass(filterButtonDefault);
  filterButtonDefault.addEventListener('click' , debounce(() => renderFeed(getFilterDefault(array)),  RENDER_DELAY));
  getButtonClass(filterButtonDiscussed);
  filterButtonDiscussed.addEventListener('click' , debounce(() => renderFeed(getFilterDiscussed(array)),  RENDER_DELAY));
};

export {  getNewsFeed  };
