import {  getNewsFeed } from './open-picture.js';
import './photo-uploader.js';
import './editor-control-scale.js';
import './editor-control-effects.js';
import {  getUserData  } from './api.js';
import './photo-preview.js';
import {  createGetDataError  } from './utils.js';

getUserData(getNewsFeed , createGetDataError);
