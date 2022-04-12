const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const scaleValue = document.querySelector('.scale__control--value');
const scaleControls = document.querySelectorAll('.scale__control');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
let changingScale = DEFAULT_SCALE;

for (let i = 0; i < scaleControls.length; i++) {
  scaleControls[i].addEventListener('click', (evt) => {
    if(evt.target.classList.contains('scale__control--smaller') && changingScale > MIN_SCALE) {
      changingScale -= SCALE_STEP;
    }
    if(evt.target.classList.contains('scale__control--bigger') && changingScale < MAX_SCALE) {
      changingScale += SCALE_STEP;
    }
    imgPreview.style.transform = `scale(${changingScale / 100})`;
    scaleValue.value = `${changingScale}%`;
  });
}

const resetScale = () => {
  changingScale = DEFAULT_SCALE;
};

export {  imgPreview, resetScale  };
