const sidebar = document.querySelector('.sidebar');
const sidebarBtn = document.getElementById('sidebar_img-button');
const headerBurgerBtn = document.querySelector('.burger');

const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');

const filterdButtons = document.querySelector(".goods__button-group");
const goodsCards = document.querySelectorAll('.goods__card');
let hiddenedCards = [];
let filterNow = 'all';
let lastButton = 'all'
let existingBasket;


const basketButton = document.querySelector('.tools__basket-item');
const basket = document.querySelector('.basket');
const basketCards = document.querySelector('.basket__cards');

// Input section variables
let originalPlaceholder = searchInput.placeholder;
let typingInterval;

//hints
let InputHintTimer;
const InputHintTimertineout = 1000;

document.addEventListener('DOMContentLoaded',()=>{
   const mediaQuery = window.matchMedia('(max-width: 767px)');
   handleMediaQueryChange(mediaQuery);
   mediaQuery.addEventListener('change', handleMediaQueryChange);

   initializeSearchData();
   basketButtonsInitialiating();
   existingBasket = JSON.parse(localStorage.getItem('basket')) || {};
})

window.addEventListener('storage', (e) => {
    if (e.key === 'basket') {
        existingBasket = JSON.parse(e.newValue) || {};
        console.log('Корзина обновлена из другой вкладки');
    }
});


  function handleMediaQueryChange(e) {
    if (e.matches) {
      sidebar.classList.add('sidebar--close');
    } else {
      sidebar.classList.remove('sidebar--close');
    }
  }
