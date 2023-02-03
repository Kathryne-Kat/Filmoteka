// //import { MovieAPI } from "./movie-api";
// import createCards from './modal-film-info'

// const refs = {
//     modalOpenElV: document.querySelector('.js-modal-open-video'),
//     backdropElV: document.querySelector('.js-backdrop-video'),
//     closeModalElV: document.querySelector('.js-modal-close-video'),
//     //onTrailer: document.querySelector('.trailer'),
//     trailerIf:document.querySelector('.videoww'),
 
// };

// const onModalOpen = () => {
  
//     refs.backdropElV.classList.remove('is-hidden');
//     document.body.classList.add('no-scroll');
//     document.addEventListener('keydown', onEscKeyPress);    
// };

// // const onTrailerClick = async e => {
// //   const idFilm = refs.onTrailer.dataset.filmId
// //   console.log(idFilm);
// //   try {

// //         const data = await movieAPI.getFilmTlailer(idFilm);
// //     console.log('154', data);
// //     console.log('154', data.results[0].key);
// // const trailerMarkup=`<iframe id="ytplayer" type="text/html" width="1000" height="600"
// //   src="http://www.youtube.com/embed/${data.results[0].key}?autoplay=1&origin=http://example.com"
// //   frameborder="0"/>`
// //     refs.trailerIf.innerHTML = trailerMarkup;    
// //     //  <iframe width="560" height="315" src="https://www.youtube.com/embed/63b5c3d9af95900099ef5610" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
// //     } catch (err) {
// //         console.log(err);
// //     }
// // }


// const closeModal = () => {  
//     refs.trailerIf.innerHTML ='';
//   refs.backdropElV.classList.add('is-hidden'); 
//     document.body.classList.remove('no-scroll');
//     document.removeEventListener('keydown', onEscKeyPress);    
// };

// const onEscKeyPress = e => {
//     if (e.code === 'Escape') {
//         closeModal();
//     }
// };

// const onBackdropElClick = e => {
//     const { target, currentTarget } = e;
//     if (target !== currentTarget) {
//         return;
//     }
//     closeModal();
// };

// refs.modalOpenElV.addEventListener('click', onModalOpen);
// refs.closeModalElV.addEventListener('click', closeModal);
// refs.backdropElV.addEventListener('click', onBackdropElClick);
// refs.onTrailer.addEventListener('click', onTrailerClick)
