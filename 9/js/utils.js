const messageFragment = document.createDocumentFragment();

const isEscapeKey = (evt) => evt.key === 'Escape';

const onMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageEvent();
  }
};

function closeMessageEvent () {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onMessageEscKeyDown);
}

const closeMessageTest = (message , messageTypeButton) => {
  document.addEventListener('keydown', onMessageEscKeyDown);
  messageTypeButton.addEventListener('click', () => {
    closeMessageEvent();
  });
  document.addEventListener('click' , (evt) => {
    if(evt.target === message){
      closeMessageEvent();
    }
  });
};

const createMessage = (messageTypeTemplate) => {
  const messageElement = messageTypeTemplate.cloneNode(true);
  messageFragment.append(messageElement);
  document.body.append(messageFragment);
  const CloseButton = messageElement.querySelector('button');
  closeMessageTest(messageElement , CloseButton);
};

export {  isEscapeKey, createMessage  };
