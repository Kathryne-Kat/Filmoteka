import { MovieAPI } from "./movie-api";

const refs = {
    modalOpenEl: document.querySelector('.js-modal-open'),
    backdropEl: document.querySelector('.js-backdrop'),
    closeModalEl: document.querySelector('.js-modal-close'),
    infoCard:document.querySelector('.description-modal_info'),
    watchedBtn:document.querySelector('.js-watched'),
    queueBtn:document.querySelector('.js-queue'),
    description: document.querySelector('.info'),
    onTrailer: document.querySelector('.trailer'),
  trailerIf: document.querySelector('.videoww'),
    modalOpenElV: document.querySelector('.js-modal-open-video'),
    backdropElV: document.querySelector('.js-backdrop-video'),
  closeModalElV: document.querySelector('.js-modal-close-video'),
    errF:document.querySelector('.not_found'),
};

const movieAPI = new MovieAPI();

export const createCards = cardInfo => {
    const { poster_path, title, vote_average, vote_count, popularity, original_title, genres, overview,id } = cardInfo
  const genresEl = [];
  //console.log(cardInfo);
    for (genre of genres) {
        genresEl.push(genre.name);        
    }
    refs.watchedBtn.dataset.filmId = id;
  refs.queueBtn.dataset.filmId = id;
  refs.onTrailer.dataset.filmId = id;
  const posterMarkup = `
        <img
        class="description-modal_img"
        src="https://image.tmdb.org/t/p/w500${poster_path}"
        alt="poster"
        width="340px"
      />`;

    const infoMarkup=`<div class="description-modal_wrap">
        <h2 class="description-modal_title">${title}</h2>
        <ul class="description-modal_list">
          <li class="description-modal_item">
            <p class="slash">Vote/Voles</p>
            <div>
              <span class="description-rating">${vote_average.toFixed(1)} </span> &nbsp;/ 
              <span class="description-rating1">  ${vote_count}</span>
            </di>
          </li>
          <li class="description-modal_item">
            <p>Popularity</p>
            <span>${popularity.toFixed(1)}</span>
          </li>
          <li class="description-modal_item">
            <p>Original Title</p>
            <span>${original_title}</span>
          </li>
          <li class="description-modal_item">
            <p class="genres">Genre</p>
            <span class="genres">${genresEl.join(', ')}</span>
          </li>
          <li class="description-modal_item">
            <p class="description-modal_about">ABOUT</p>
            <p class="description-modal_about">${overview}</p>
          </li>          
        </ul>
            
    </div>        
            `;  
  return [posterMarkup, infoMarkup ]   
};

const addMoveInfo = async (id) => {
    try {
        const data = await movieAPI.getFilmFullInfo(id);             
        const [posterMarkup, infoMarkup] = createCards(data);         
        refs.infoCard.insertAdjacentHTML('afterbegin',posterMarkup);
        refs.description.insertAdjacentHTML('afterbegin',infoMarkup);
    } catch (err) {
        console.log(err);
    }
};

const saveToLS = (key, value) => {
  try {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

export const loadToLS = key => {
  try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? [] : JSON.parse(serializedState);
    } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

// localStorage.removeItem('filmWatched');
// localStorage.removeItem('filmQueue');

let arrFilmWatched = loadToLS('filmWatched');  
let arrFilmQueue = loadToLS('filmQueue');

const onModalOpen =async e => {
  e.preventDefault(); 
  refs.queueBtn.classList.remove('disable');
  refs.watchedBtn.classList.remove('disable');
  refs.watchedBtn.textContent = 'add to watched'; 
  refs.queueBtn.textContent='add to queue'; 
const idFilm = e.target.dataset.id;
//console.log('112',arrFilmWatched);
  for (let el of arrFilmWatched) {
    //console.log('114', el);
    //console.log('115',idFilm);
    if (+el === +idFilm) {
      refs.watchedBtn.classList.add('disable');
    refs.watchedBtn.textContent='added to watched';   
  }
  }
  for (let el of arrFilmQueue) {
    //console.log('120',el);
    if (+el === +idFilm) {
      refs.queueBtn.classList.add('disable');
    refs.queueBtn.textContent='added to queue';   
    } 
}
  
  setTimeout(() => {
    refs.watchedBtn.classList.remove('is-hidden');
   // refs.watchedBtn.classList.add('disable'); 
    refs.queueBtn.classList.remove('is-hidden');
    refs.onTrailer.classList.remove('is-hidden');
  }, 200)

    if (e.target.offsetParent.className!=="card-list__item") {
        return;
    } 
    
    addMoveInfo(idFilm)    
    refs.backdropEl.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscKeyPress);   
};

const onBtnWatchedClick=e=>{
  e.preventDefault();
  refs.watchedBtn.classList.add('disable');
  refs.watchedBtn.textContent='added to watched'; 
  const idFilm=refs.watchedBtn.dataset.filmId
  arrFilmWatched.push(idFilm)
  const filterArrFilmWatched = arrFilmWatched.filter((value, i, arr) => arr.indexOf(value) === i);
  saveToLS('filmWatched', filterArrFilmWatched)
}

const onBtnQueueClick= e=>{
  e.preventDefault();  
  refs.queueBtn.classList.add('disable');
  refs.queueBtn.textContent='added to queue'; 
  const idFilm=refs.queueBtn.dataset.filmId
  arrFilmQueue.push(idFilm)
  const filterArrFilmQueue=arrFilmQueue.filter((value, i, arr)=>arr.indexOf(value)===i)    
  saveToLS('filmQueue', filterArrFilmQueue)   
}

const screenWidth = window.screen.width
const screenHeight = window.screen.height
//console.log('151',screenWidth, screenHeight);


const onTrailerClick = async e => {
  const idFilm = refs.onTrailer.dataset.filmId

  try {
    const data = await movieAPI.getFilmTlailer(idFilm);
        //console.log('160', data.results[1].key); 
    let keys = ''; 
    
    if (data.results.length === 0) {
      //refs.errF.textContent = 'Movie trailer not found!'
      refs.errF.classList.remove('is-hidden');
      console.log('Movie trailer not found!');
      //  refs.backdropEl.classList.add('is-hidden'); 
      return;
    } else {
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].name.toLowerCase().includes('official trailer')) {
          keys = +i;
        }
      }     

      let widthV = 0;
      let heightV = 0;
      if (screenWidth > 1240) {
        widthV = 1000;
        heightV = 600;
      } else if (screenWidth > 768) {
        widthV = 760;
        heightV = 430;
      } else if (screenWidth > 480) {
        widthV = 470;
        heightV = 265;
      } else {
        widthV = 300;
        heightV = 170;
      }

      const trailerMarkup = `<iframe id="ytplayer" 
                            type="text/html" 
                            width="${widthV}" 
                            height="${heightV}"
                            src="http://www.youtube.com/embed/${data.results[keys].key}?autoplay=1&fs=1&origin=http://example.com"
                            frameborder="0" />`
      refs.trailerIf.innerHTML = trailerMarkup;
    }
  } catch (err) {
        console.log(err);
    }
}

const closeModal = () => {    
  refs.backdropEl.classList.add('is-hidden'); 
  refs.watchedBtn.classList.add('is-hidden');
  refs.queueBtn.classList.add('is-hidden');
  refs.onTrailer.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscKeyPress);
  refs.infoCard.firstElementChild.remove();
  refs.description.firstElementChild.remove();
  refs.errF.classList.add('is-hidden');
};

const onEscKeyPress = e => {
    if (e.code === 'Escape') {
        closeModal();
    }
};

const onBackdropElClick = e => {
    const { target, currentTarget } = e;
    if (target !== currentTarget) {
        return;
    }
    closeModal();
};

refs.modalOpenEl.addEventListener('click', onModalOpen);
refs.closeModalEl.addEventListener('click', closeModal);
refs.backdropEl.addEventListener('click', onBackdropElClick);
refs.watchedBtn.addEventListener('click', onBtnWatchedClick);
refs.queueBtn.addEventListener('click', onBtnQueueClick);
refs.onTrailer.addEventListener('click', onTrailerClick)

//-------MODAL OF TRAILER------//

const onModalOpenV = () => {  
    refs.backdropElV.classList.remove('is-hidden');   
    refs.backdropElV.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');   
    refs.backdropEl.classList.add('is-hidden'); 

};

const closeModalV = () => {  
    refs.trailerIf.innerHTML ='';
  refs.backdropElV.classList.add('is-hidden'); 
    document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscKeyPress); 
  refs.backdropEl.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');  
};

const onBackdropElClickV = e => {
    const { target, currentTarget } = e;
    if (target !== currentTarget) {
        return;
    }
    closeModalV();
};

refs.modalOpenElV.addEventListener('click', onModalOpenV);
refs.closeModalElV.addEventListener('click', closeModalV);
refs.backdropElV.addEventListener('click', onBackdropElClickV);
