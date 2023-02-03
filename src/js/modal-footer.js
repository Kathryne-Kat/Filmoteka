const refs = {
    footerModalOpenEl: document.querySelector('[data-modal__footer-open]'),
    footerCloseBtnEl: document.querySelector('.footer__close-btn'),
    footerModalEl: document.querySelector('[data__footer-modal]'),
  };


 refs.footerModalOpenEl.addEventListener('click', toggleModal);
    refs.footerCloseBtnEl.addEventListener('click', toggleModal);
  
    function toggleModal() {
       refs. footerModalEl.classList.toggle('is-hidden');
    }

     document.addEventListener('keydown', function(e) {
       if (e.key === 'Escape') {
          toggleModal()
    hideModal()
    }
    });







   

