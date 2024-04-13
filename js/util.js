const getRandomNumber = (min, max, signCounter = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max === min) {
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
  const targetLength = getRandomNumber(1, data.length)
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

export {getRandomNumber, getRandomArrayElement, getRandomDataArray, generateFilePath};