const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const scaleValue = document.querySelector('.scale__control--value');
const scaleControls = document.querySelectorAll('.scale__control');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
let currentScale = DEFAULT_SCALE;

const cb = (evt) => {
  if(evt.target.classList.contains('scale__control--smaller') && currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
  }
  if(evt.target.classList.contains('scale__control--bigger') && currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
  }
  imgPreview.style.transform = `scale(${currentScale / 100})`;
  scaleValue.value = `${currentScale}%`;
};

const addScaleEventListener = () => scaleControls.forEach((elem) => elem.addEventListener('click', cb));

const removeScaleEventListener = () => scaleControls.forEach((elem) => elem.removeEventListener('click', cb));

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
};

export {  imgPreview, resetScale, addScaleEventListener, removeScaleEventListener  };
