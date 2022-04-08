// Изменение масштаба загружаемого изображения (ТЗ 2.1)

const scaleValue = document.querySelector('.scale__control--value');
const scaleControl = document.querySelectorAll('.scale__control');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const SCALE_STEP = 25;
const MIN_SCALE = 0;
const MAX_SCALE = 100;
let defaultScale = 100;

for (let i = 0; i < scaleControl.length; i++) {
  scaleControl[i].addEventListener('click', (evt) => {
    if(evt.target.classList.contains('scale__control--smaller') && defaultScale > MIN_SCALE) {
      defaultScale -= SCALE_STEP;
    }
    if(evt.target.classList.contains('scale__control--bigger') && defaultScale < MAX_SCALE) {
      defaultScale += SCALE_STEP;
    }
    imgPreview.style.transform = `scale(${defaultScale / 100})`;
    scaleValue.value = `${defaultScale}%`;
  });
}

export {  imgPreview  };
