import {  uploadingFile  } from './photo-uploader.js';

const FILE_TYPES = ['gif', 'jpg' , 'jpeg', 'png'];
const preview = document.querySelector('.img-upload__preview').querySelector('img');

uploadingFile.addEventListener('change' , () => {
  const file = uploadingFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    preview.src = URL.createObjectURL(file);
  }
});
