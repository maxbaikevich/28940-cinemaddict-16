import { generateComment} from './mock/comment';
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const randomNumberFloat = (min, max, quantity) =>{
  if(max < 0 || min >= max) {
    return;
  }
  if(min < 0) {
    min = 0;
  }
  const number = Math.random() * (max - min + 1) + min;
  return number.toFixed(quantity);
};
export const createComments = (movie) => {
  const commentsId = [];
  movie.forEach((el) => {
    if(el.comments.length !== 0) {
      commentsId.push(...el.comments);
    }
  });
  const comments = Array.from( commentsId, (commentId)=>( generateComment(commentId)));
  return comments;
};
export const timeStempDuration = (runtime) =>{
  const timestamp = runtime* 60;
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - (hours * 60);
  return{
    hours,
    minutes
  };
};
const movieToFilterMap = {
  all:()=> '',
  favorite: (movies) => movies.filter((movie) => movie.userDetails.favorite === true).length,
  watched: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched).length,
  watchlist: (movies) => movies.filter((movie) => movie.userDetails.watchlist).length,
};
export const generateFilter = (movies) => Object.entries(movieToFilterMap).map(
  ([filterName, countMovies]) => ({
    name: filterName,
    count: countMovies(movies),
  }),
);
