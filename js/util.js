const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max, signCounter = 0) => {
  if (min < 0 || max < 0 || max === min) {
    return -1;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  max -= min;
  if (signCounter > 0) {
    return (Math.random() * max + min).toFixed(signCounter)
  }
  return Math.floor(Math.random() * ++max) + min;
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getRandomDataArray = (data) => {
  const targetLength = getRandomNumber(0, data.length)
  if (targetLength === 0) {
    return undefined;
  }
  const dataArray = new Array(targetLength).fill(1);
  return dataArray.reduce((acc) => {
    let dataItem = getRandomArrayElement(data);
    while (acc.some((elem) => elem === dataItem)) {
      dataItem = getRandomArrayElement(data);
    }
    acc.push(dataItem);
    return acc;
  }, [])
};

const generateFilePath = (path, counter, format) => {
  const number = getRandomNumber(1, counter);
  if (number >= 10) {
    return path + number + format;
  }
  return path + '0' + number + format;
};

const disableForm = (formControls) => {
  for (let i = 0; i < formControls.length; i++) {
    formControls[i].disabled = true;
  }
};

const enableForm = (formControls) => {
  for (let i = 0; i < formControls.length; i++) {
    formControls[i].disabled = false;
  }
};

const showAlert = (message) => {
  const alert = document.createElement('div');
  
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = 0;
  alert.style.top = 0;
  alert.style.right = 0;
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  alert.style.fontSize = '25px';
  alert.style.textTransform = 'uppercase';
  alert.style.color = 'white';

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME)
};

export {getRandomNumber, getRandomArrayElement, getRandomDataArray, generateFilePath, disableForm, enableForm, showAlert};