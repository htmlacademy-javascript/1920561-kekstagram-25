// Наложение эффекта на загружаемое изображение (ТЗ 2.2)
import {  imgPreview  } from './editor-control-scale.js';

const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effects = document.querySelectorAll('.effects__radio');

noUiSlider.create(effectSlider, {
  connect: 'lower',
  range: {
    min: 0,
    max: 100
  },
  start: 0,
  step: 1,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectSlider.classList.add('hidden');

for (let i = 0; i < effects.length; i++) {
  effects[i].addEventListener ('change', () => {

    if (effects[i].id === 'effect-none') {
      effectSlider.classList.add('hidden');
      effectSlider.noUiSlider.updateOptions({
        start: 0,
      });
    } else {

      effectSlider.classList.remove('hidden');

      if (effects[i].id === 'effect-chrome') {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 0,
          step: 0.1,
        });
        effectSlider.noUiSlider.on('update', () => {
          effectValue.value = effectSlider.noUiSlider.get();
          imgPreview.style.filter = `grayscale(${effectValue.value})`;
        });
      }

      if (effects[i].id === 'effect-sepia') {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 0,
          step: 0.1,
        });
        effectSlider.noUiSlider.on('update', () => {
          effectValue.value = effectSlider.noUiSlider.get();
          imgPreview.style.filter = `sepia(${effectValue.value})`;
        });
      }

      if (effects[i].id === 'effect-marvin') {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100
          },
          start: 0,
          step: 1,
        });
        effectSlider.noUiSlider.on('update', () => {
          effectValue.value = effectSlider.noUiSlider.get();
          imgPreview.style.filter = `invert(${effectValue.value}%)`;
        });
      }

      if (effects[i].id === 'effect-phobos') {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 0,
          step: 0.1,
        });
        effectSlider.noUiSlider.on('update', () => {
          effectValue.value = effectSlider.noUiSlider.get();
          imgPreview.style.filter = `blur(${effectValue.value}px)`;
        });
      }

      if (effects[i].id === 'effect-heat') {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3
          },
          start: 0,
          step: 0.1,
        });
        effectSlider.noUiSlider.on('update', () => {
          effectValue.value = effectSlider.noUiSlider.get();
          imgPreview.style.filter = `brightness(${effectValue.value})`;
        });
      }
    }
  });
}
