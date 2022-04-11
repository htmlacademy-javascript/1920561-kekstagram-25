import {  imgPreview  } from './editor-control-scale.js';

const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectSliderWrapper = document.querySelector('.img-upload__effect-level');
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

const effectsOptions =
{
  none:
  {
    noUiSliderOption:
    {
      start: 0,
    },
  },

  chrome:
  {
    noUiSliderOption:
    {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    },
  },

  sepia:
  {
    noUiSliderOption:
    {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    },
  },

  marvin:
  {
    noUiSliderOption:
    {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
    },
  },

  phobos:
  {
    noUiSliderOption:
    {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    },
  },

  heat:
  {
    noUiSliderOption:
    {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    },
  },
};

const updatePreviewImgFilter = (filterParam) => {
  effectValue.value = effectSlider.noUiSlider.get();
  imgPreview.style.filter = filterParam;
};

effectSliderWrapper.classList.add('hidden');

function cb (evt) {
  if (evt.target.id === 'effect-none') {
    effectSliderWrapper.classList.add('hidden');
    effectSlider.noUiSlider.updateOptions(effectsOptions.none.noUiSliderOption);
    effectSlider.noUiSlider.on('update', () => {
      updatePreviewImgFilter('none');
    });
  } else {
    effectSliderWrapper.classList.remove('hidden');
    effectSlider.classList.remove('hidden');

    if (evt.target.id === 'effect-chrome') {
      effectSlider.noUiSlider.updateOptions(effectsOptions.chrome.noUiSliderOption);
      effectSlider.noUiSlider.on('update', () => {
        updatePreviewImgFilter(`grayscale(${effectValue.value})`);
      });
    }

    if (evt.target.id === 'effect-sepia') {
      effectSlider.noUiSlider.updateOptions(effectsOptions.sepia.noUiSliderOption);
      effectSlider.noUiSlider.on('update', () => {
        updatePreviewImgFilter(`sepia(${effectValue.value})`);
      });
    }

    if (evt.target.id === 'effect-marvin') {
      effectSlider.noUiSlider.updateOptions(effectsOptions.marvin.noUiSliderOption);
      effectSlider.noUiSlider.on('update', () => {
        updatePreviewImgFilter(`invert(${effectValue.value}%)`);
      });
    }

    if (evt.target.id === 'effect-phobos') {
      effectSlider.noUiSlider.updateOptions(effectsOptions.phobos.noUiSliderOption);
      effectSlider.noUiSlider.on('update', () => {
        updatePreviewImgFilter(`blur(${effectValue.value}px)`);
      });
    }

    if (evt.target.id === 'effect-heat') {
      effectSlider.noUiSlider.updateOptions(effectsOptions.heat.noUiSliderOption);
      effectSlider.noUiSlider.on('update', () => {
        updatePreviewImgFilter(`brightness(${effectValue.value})`);
      });
    }
  }
}

const getEffectsEventListener = () => {
  effects.forEach((elem) => elem.addEventListener ('change', cb));
};

const removeEffectsEventListener = () => {
  effects.forEach((elem) => elem.removeEventListener ('change', cb));
};

export {  effectSlider , effectsOptions , updatePreviewImgFilter, getEffectsEventListener, removeEffectsEventListener };
