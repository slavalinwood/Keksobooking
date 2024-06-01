const getData = (onSuccess, onFail) => {
  return fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
    .then ((advertsData) => advertsData.json())
    .then((advertsArray) => onSuccess(advertsArray))
    .catch((error) => onFail(error))
};

export {getData};