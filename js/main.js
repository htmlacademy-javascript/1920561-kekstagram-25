function getRandomNumber (min , max) {
  let resultNumber;
  if (max <= min || min < 0) {
    resultNumber = 'error';
  } else {
    resultNumber = Math.floor(Math.random() * ((max + 1) - min) + min);
  }
  return resultNumber;
}
getRandomNumber();

function checkString (checkingString , maxSymbol) {
  let resultString;
  const stringSymbols = checkingString.length;
  if (stringSymbols <= maxSymbol) {
    resultString = 'ok';
  } else {
    resultString = 'error';
  }
  return resultString;
}
checkString();
