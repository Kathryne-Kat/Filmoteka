import { MovieAPI } from './movie-api';
import { createGallery } from './create-card';
import { createPagination } from './pagination';


let movieApiMain = new MovieAPI();

function getMoviesPagination() {
  movieApiMain.getPopularFilmList().then(filmList => {
    const pagination = createPagination(
      filmList.total_results,
      filmList.results.length,
      7,
      filmList.page
    );
    pagination.on('afterMove', async event => {
      console.log('test');
      const responseTrending = await movieApiMain.getPopularFilmList(
        event.page
      );
      createGallery(responseTrending.results);
    });
  });
}

getMoviesPagination();

export function watchedPagination(watched) {
    const pagination = createPagination(watched.length, 20, 7, 1);
  pagination.on('afterMove', async event => {
    const page = event.page - 1;
    createGallery(watched.slice(page * 20, (page + 1) * 20));
  });
}
