// перенесла все в 1 універсальну функцію в create-card

// // об'єкт в якому зберігаються жанри в форматі id:'genre'
import { genreList } from './create-card';

// // ф. для створення галереї, ф. приймає results: (відповідь сервера > response.data.results)
import { createGallery } from './create-card';
import { loadToLS } from './modal-film-info';

// import { MovieAPI } from './js/movie-api';

// let movieLibrary = new MovieAPI();
// movieLibrary.getFilmFullInfo().then(filmList => {
//   console.log(filmList);
// });




// const actionPage = document.querySelector('.menu__link-active');

// if (actionPage.dataset.action === 'library') {
//   return `
//           <li class="card-list__item">
//             <a href="#" class="card-list_link" id="${id}">
//               <div class="card-list__img-box">
//                 <img class="card-list__img" data-id="${id}" src="${poster}" alt=" ${title} ">
//               </div>
//                 <h3 class="card-list__title">${title}</h1>
//                 <div class="card-list__info">
//                   <p class="card-list__text">${genre} |  ${year} </p>
//                   <div class="card-list__rate-box">
//                     <p class="card-list__rate">${average}</p>
//                   </div> 
//                 </div>
//             </a>
//           </li>`;
// }

// Get array with full fillms without repeat

// const movieAPI = new MovieAPI();

// const getFullFilms = () => {
//   let fullFilmList = getWatchedFilms();
//   let queueFilms = getQueueFilms();
//   queueFilms.forEach(element =>
//     fullFilmList.includes(element) ? -1 : fullFilmList.push(element)
//   );
//   return fullFilmList;
// };

// const requestToFilmDatabase = async () => {
//   const data = await movieAPI.getFilmFullInfo('536554');
//   console.log(data);
// };

// getWatchedFilms = () => loadToLS(`filmWatched`);
// getQueueFilms = () => loadToLS(`filmQueue`);
// requestToFilmDatabase();
