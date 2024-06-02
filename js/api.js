const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
    .then ((advertsData) => advertsData.json())
    .then((advertsArray) => onSuccess(advertsArray))
    .catch((error) => onFail(error))
};

const sendData = (onFail, body) => {
  fetch('https://23.javascript.htmlacademy.pro/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        return 
      } else {
        onFail();
      }
    })
    .catch(() => onFail())
};

export {getData, sendData};