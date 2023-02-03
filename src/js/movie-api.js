import axios from 'axios';

export class MovieAPI {
  static BASE_URL = 'https://api.themoviedb.org/';
  static API_KEY = 'a95ff59f8d48ac961c2785119723c43c';

  constructor() {}

  /**
   * getPopularFilmList description
   * @return {JSON} obj response
   */
  async getPopularFilmList(page) {
    const response = await axios.get(
      `${MovieAPI.BASE_URL}3/trending/movie/day`,
      {
        params: {
          api_key: MovieAPI.API_KEY,
          page: page || 1,
        },
      }
    );

    return response.data;
  }

  /**
   * getFilmListByKeyWord description
   * @param  {string} keyWord description
   * @return {JSON}  obj response
   */
  async getFilmListByKeyWord(keyWord, page) {
    const response = await axios.get(`${MovieAPI.BASE_URL}3/search/movie`, {
      params: {
        api_key: MovieAPI.API_KEY,
        query: keyWord,
        page: page,
      },
    });

    return response.data;
  }

  /**
   * getFilmFullInfo description
   * @param  {number} filmId description
   * @return {JSON}  obj response
   */
  async getFilmFullInfo(filmId) {
    const response = await axios.get(`${MovieAPI.BASE_URL}3/movie/${filmId}`, {
      params: {
        api_key: MovieAPI.API_KEY,
      },
    });

    return response.data;
  }

  /**
   * getFilmTlailer description
   * @param  {number} filmId description
   * @return {JSON}  obj response
   */
  async getFilmTlailer(filmId) {
    const response = await axios.get(
      `${MovieAPI.BASE_URL}3/movie/${filmId}/videos`,
      {
        params: {
          api_key: MovieAPI.API_KEY,
        },
      }
    );

    return response.data;
  }

  async getFilmsByGenres() {
    try {
      const response = await axios.get(
        `${MovieAPI.BASE_URL}3/genre/movie/list`,
        {
          params: {
            api_key: MovieAPI.API_KEY,
            language: 'en-US',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  validateResponse(response) {
    if (!response.data) {
      response.data = '';
    }

    return response.data;
  }
}
