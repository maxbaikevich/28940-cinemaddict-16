import {posters, title, description, genre, country, humanFirstName, humanLastName} from '../const';
import {getRandomInteger, randomNumberFloat} from '../utils';
import dayjs from 'dayjs';
const AMOUNT_COMMENTS = 4;
const COMMENTS_COUNT_ID_RONDOM_MIN = 500;
const COMMENTS_COUNT_ID_RONDOM_MAX = 1000;

const generaterandome = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);
  return data[randomIndex];
};
const commentsGenerateId = () => {
  const res = [];
  const commentsIdCount = getRandomInteger(0,AMOUNT_COMMENTS);
  for(let i = 0; i < commentsIdCount; i++) {
    res.push(getRandomInteger(COMMENTS_COUNT_ID_RONDOM_MIN, COMMENTS_COUNT_ID_RONDOM_MAX));
  }
  return res;
};
const generateDescription = () => {
  const res = [];
  const descriptionText = description.split('.');
  const randomIndex = getRandomInteger(1, 5);
  for(let i = 0 ; i <= randomIndex; i++) {
    res.push(descriptionText[i]);
  }
  return res.join('.');
};
const generateGenre = () => {
  const res = [];
  let current = '';
  const random = getRandomInteger(0, 3);
  for(let i  = 0; i <= random; i++){
    current = genre[i];
    if (!res.includes(current)) {
      res.push(current);
    }
  }
  return res;
};
const generateHuman = () => {
  const res = [];
  const random = getRandomInteger(3, 8);
  for(let i = 0; i <= random; i++) {
    res.push(`${humanFirstName[i]} ${humanLastName[i]}`);
  }
  return res;
};
const generateDate = () => dayjs().add(getRandomInteger(-360, 0), 'day').format();
export const generateMovie = () => {
  const alreadyWatched = Boolean(getRandomInteger(0, 1));
  const watchingDate = (alreadyWatched)? generateDate() : '';
  return  {
    id: Math.floor(Math.random() * 100000),
    comments:commentsGenerateId(),
    filmInfo: {
      title: generaterandome(title),
      alternativeTitle: generaterandome(title),
      totalRating: randomNumberFloat(0, 10, 1),
      poster: generaterandome(posters),
      ageRating: getRandomInteger(0, 18),
      director: `${generaterandome(humanFirstName)} ${generaterandome(humanLastName)}`,
      writers: generateHuman(),
      actors: generateHuman(),
      release: {
        date: dayjs().add(getRandomInteger(-50, 0), 'year').format(),
        releaseCountry: generaterandome(country)
      },
      runtime: getRandomInteger(60, 200),
      genre: generateGenre(),
      description : generateDescription()
    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched,
      watchingDate,
      favorite: Boolean(getRandomInteger(0, 1))
    }
  };
};
