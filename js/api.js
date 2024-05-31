const getData = (onSuccess) => {
  return fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
    .then ((advertsData) => advertsData.json())
    .then((advertsArray) => onSuccess(advertsArray))
    .catch((err) => alert(err))
};

export {getData};