import{getRandomNumber, getRandomArrayElement, getRandomDataArray, generateFilePath} from './util.js'

const AVATARS_COUNTER = 10;
const ADVERTS_NUMBER = 10;

const titles = [
  'Приглашаем на открытую вечеринку в честь Дня святого Валентина!',
  'Приглашаем на концерт местной примадонны!',
  'Приглашаем на дегустацию изысканных деликатесов французской кухни!',
];

const housingTypes = [
  'palace',
  'flat',
  'house',
  'hotel', 
  'bungalow',
];

const checkin = [
  '12:00',
  '13:00',
  '14:00',
];

const checkout = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elavator',
  'conditioner',
];

const descriptions = [
  'Старинное, аутентичное помощение, пестрящее лучшими элементами японской архитектуры 20-го века, бережно сохранённое ради вашего эстетического удовольствия!',
  'Современное, роскошное помещение, пестрящее всеми возможными проявлениями архитектуры и живописи постмодерна!',
];

const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const Coordinates = {
  xMin: 35.65000,
  xMax: 35.70000,
  yMin: 139.70000,
  yMax: 139.80000,
  signCounter: 5,
};

const Prices = {
  min: 1,
  max: 100000,
};

const Rooms = {
  min: 1,
  max: 100,
};

const Guests = {
  min: 1,
  max: 50,
};

const createAdvert = () => { 
  const advert = {
    author: {
      avatar: generateFilePath('img/avatars/user', AVATARS_COUNTER, '.png'),
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: getRandomNumber(Coordinates.xMin, Coordinates.xMax, Coordinates.signCounter) + ', ' + getRandomNumber(Coordinates.yMin, Coordinates.yMax, Coordinates.signCounter),
      price: getRandomNumber(Prices.min, Prices.max),
      type: getRandomArrayElement(housingTypes),
      rooms: getRandomNumber(Rooms.min, Rooms.max),
      guests: getRandomNumber(Guests.min, Guests.max),
      checkin: getRandomArrayElement(checkin),
      checkout: getRandomArrayElement(checkout),
      features: getRandomDataArray(features),
      description: getRandomArrayElement(descriptions),
      photos: getRandomDataArray(photos),
    },
    location: {
      x: getRandomNumber(Coordinates.xMin, Coordinates.xMax, Coordinates.signCounter),
      y: getRandomNumber(Coordinates.yMin, Coordinates.yMax, Coordinates.signCounter),
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