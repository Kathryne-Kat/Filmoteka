import { MovieAPI } from './movie-api';
import { createGallery } from './create-card';
import { createPagination } from './pagination';

const api = new MovieAPI();
const searchFormEl = document.querySelector('.form-search');
const cardListEl = document.querySelector('.card-list__main');
const paginationEl = document.getElementById('tui-pagination-container');
const notifyEl = document.querySelector('.notify');

searchFormEl.addEventListener('submit', onLoadMovies);

function onLoadMovies(e) {
  e.preventDefault();
  const keyWord = e.target.elements.searchQuery.value.trim();

  if (keyWord) {
    paginationEl.innerHTML = '';
    getMoviesByKeyWord(keyWord, 1);
  }
}

//Поиск и отображение фильмов по ключевому слову и отрисовка пагинации
function getMoviesByKeyWord(keyWord, page) {
  notifyEl.innerHTML = '';

  api
    .getFilmListByKeyWord(keyWord, page)
    .then(movies => { //Создание галереи по результатам запроса
      if (movies.results.length === 0) {       
        cardListEl.innerHTML = '';
        notifyEl.insertAdjacentText('beforeend', 'Search result not successful. Enter the correct movie name.');
        return movies;
      }
      
      createGallery(movies.results);
      return movies;
    })
    .then(movies => { //Отрисовка пагинации
      if (!paginationEl.childNodes.length && movies.results.length !== 0) {
        const pagination = createPagination(
          movies.total_results,
          movies.results.length,
          7,
          movies.page
        );
        pagination.on('beforeMove', event => {
          getMoviesByKeyWord(keyWord, event.page);
        });
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}
