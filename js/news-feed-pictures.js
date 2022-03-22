import {  FEED  } from './news-feed.js';

const PICTURESCONTAINER = document.querySelector('.pictures');
const PICTURETEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const PICTURESFRAGMENT = document.createDocumentFragment();

FEED.forEach((user) => {
  const PICTUREELEMENT = PICTURETEMPLATE.cloneNode(true);
  PICTUREELEMENT.querySelector('.picture__img').src = user.url;
  PICTUREELEMENT.querySelector('.picture__likes').textContent = user.likes;
  PICTUREELEMENT.querySelector('.picture__comments').textContent = user.comments.length;
  PICTURESFRAGMENT.append(PICTUREELEMENT);
});

PICTURESCONTAINER.append(PICTURESFRAGMENT);
