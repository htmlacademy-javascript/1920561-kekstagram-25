// Изменение масштаба загружаемого изображения (ТЗ 2.1)

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const SCALE_STEP = 25;
const MIN_SCALE = 0;
const MAX_SCALE = 100;

let DEFAULT_SCALE = 100;

scaleSmaller.addEventListener('click', () => {
  if(DEFAULT_SCALE > MIN_SCALE) {
    DEFAULT_SCALE -= SCALE_STEP;
    imgPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
    scaleValue.value = `${DEFAULT_SCALE}%`;
  }
});

scaleBigger.addEventListener('click', () => {
  if(DEFAULT_SCALE < MAX_SCALE) {
    DEFAULT_SCALE += SCALE_STEP;
    imgPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
    scaleValue.value = `${DEFAULT_SCALE}%`;
  }
});

export {  imgPreview  };
