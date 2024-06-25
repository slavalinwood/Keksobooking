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

const createNewFeaturesList = (list, data, map) => {
  if (!data) {
    return
  }
  const tempFeature = list.children[0];
  const newList = document.createDocumentFragment();
  data.forEach((elem) => {
    const feature = tempFeature.cloneNode(true);
    const classNames = feature.classList;
    const lastClass = classNames[classNames.length - 1];
    feature.classList.remove(lastClass);
    feature.classList.add(map[elem]);
    newList.appendChild(feature);
  }) 
  list.innerHTML = '';
  list.appendChild(newList);
};

const createNewPhotosList = (list, data) => {
  if (!data) {
    return
  }
  const tempPhoto = list.children[0];
  data.forEach((elem) => {
    const photo = tempPhoto.cloneNode(true);
    tempPhoto.remove();
    photo.src = elem;
    list.appendChild(photo);
  })
};

const setNumberInputAttributes = (input, number) => {
  input.min = number;
  input.placeholder = number;
};

const disableForm = (form) => {
  const formControls = form.children;
  for (let control of formControls) {
    control.disabled = true;
  }
};

const enableForm = (form) => {
  const formControls = form.children;
  for (let control of formControls) {
    control.disabled = false;
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

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const removeInvalidInputStyle = (input) => {
  if (input.style.outline) {
    input.style.outline = 'none';
  }
};

export {
  getRandomNumber, getRandomArrayElement, getRandomDataArray,
  generateFilePath, disableForm, enableForm,
  showAlert, isEscEvent, isEnterEvent,
  createNewFeaturesList, createNewPhotosList, setNumberInputAttributes,
  removeInvalidInputStyle
};