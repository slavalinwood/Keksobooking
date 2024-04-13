import{getRandomNumber, getRandomArrayElement, getRandomDataArray, generateFilePath} from './util.js'

const AVATARS_COUNTER = 10;

const TITLES = [
  'Приглашаем на открытую вечеринку в честь Дня святого Валентина!',
  'Приглашаем на концерт местной примадонны!',
  'Приглашаем на дегустацию изысканных деликатесов французской кухни!',
];

const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'hotel', 
  'bungalow',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elavator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Старинное, аутентичное помощение, пестрящее лучшими элементами японской архитектуры 20-го века, бережно сохранённое ради вашего эстетического удовольствия!',
  'Современное, роскошное помещение, пестрящее всеми возможными проявлениями архитектуры и живописи постмодерна!',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const COORDINATES = {
  xMin: 35.65000,
  xMax: 35.70000,
  yMin: 139.70000,
  yMax: 139.80000,
  signCounter: 5,
};

const PRICES = {
  min: 1,
  max: 100000,
};

const ROOMS = {
  min: 1,
  max: 100,
};

const GUESTS = {
  min: 1,
  max: 10,
};

const ADVERTS_NUMBER = 10;

const createAdvert = () => { 
  const advert = {
    author: {
      avatar: generateFilePath('img/avatars/user', AVATARS_COUNTER, '.png'),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: getRandomNumber(COORDINATES.xMin, COORDINATES.xMax, COORDINATES.signCounter) + ', ' + getRandomNumber(COORDINATES.yMin, COORDINATES.yMax, COORDINATES.signCounter),
      price: getRandomNumber(PRICES.min, PRICES.max),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomNumber(ROOMS.min, ROOMS.max),
      guests: getRandomNumber(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomDataArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomDataArray(PHOTOS),
    },
    location: {
      x: getRandomNumber(COORDINATES.xMin, COORDINATES.xMax, COORDINATES.signCounter),
      y: getRandomNumber(COORDINATES.yMin, COORDINATES.yMax, COORDINATES.signCounter),
    },
  };

  return advert;
}

const tempAdverts = new Array(ADVERTS_NUMBER).fill(null).map(() => createAdvert());

const createAdverts = () => {
  return tempAdverts.reduce((acc, advert) => {
    while (acc.some((elem) => elem.author.avatar === advert.author.avatar)) {
      advert.author.avatar = generateFilePath('img/avatars/user', AVATARS_COUNTER, '.png');
    }
    acc.push(advert);
    return acc;
  }, []);
};

export {createAdverts};