function addAllCards(){
    if(hiddenedCards !== null){
        hiddenedCards.forEach((card)=>{
          card.classList.remove('card__hidenned');
        })
    }
    hiddenedCards = [];
}

searchInput.addEventListener('focus', () => {
  clearInterval(typingInterval);
  searchInput.setAttribute('data-placeholder', originalPlaceholder);
  searchInput.removeAttribute('placeholder');
  searchInput.value = '';
});

searchInput.addEventListener('blur', () => {
  clearInterval(typingInterval);
  if (!searchInput.value && searchInput.getAttribute('data-placeholder')) {
    startTypingAnimation();
    searchInput.removeAttribute('data-placeholder');
  }
});

function startTypingAnimation() {
  const fullText = searchInput.getAttribute('data-placeholder') || '';
  let currentText = '';
  let index = 0;

  clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    if (index < fullText.length) {
      currentText += fullText[index];
      searchInput.placeholder = currentText;
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);
}



//Hints+Searching


function getAllCardsData() {
    const cardsData = [];
    
    goodsCards.forEach((card) => {
        const cardName = card.getAttribute('name');
        const cardTitle = card.querySelector('.goods__card__title')?.textContent || '';
        const cardType = card.getAttribute('type_of');
        const cardImgUrl = card.querySelector('.goods__card__img img').src;
        cardsData.push({
            element: card,
            name: cardName,
            title: cardTitle,
            type: cardType,
            url:cardImgUrl,
            searchString: (cardName + ' ' + cardTitle + ' ' + cardType + ' nft').toLowerCase()
        });
    });
    
    return cardsData;
}

function initializeSearchData() {
    SearchData = getAllCardsData();
}





function getHints(){
  const generalWordSearch = 'nft';
  const cardName = card.getAttribute('name');
  const cardTitleDiv = card.querySelector('.goods__card__title')?.textContent || '';
  const cardContent = (cardName + ' ' + generalWordSearch + ' ' + cardTitleDiv).toLowerCase();
  return cardContent;
}


function addInputHints(searchLower){
      
}





searchInput.addEventListener('input', () => {
  clearTimeout(InputHintTimer);
  if (searchInput.value) {
    let searchLower = searchInput.value.toLowerCase();
    InputHintTimer = setTimeout(() => {
      addInputHints(searchLower);
   }, InputHintTimertineout);
   
    clearInterval(typingInterval);
    searchInput.removeAttribute('placeholder');
  }
});

// Input searching
function validateInput(input) {
  if (!input.value.trim()) {
    input.focus();
    return false;
  }
  
  const dangerousPatterns = [
    /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /alert\s*\(/gi,
    /document\./gi,
    /window\./gi,
    /<\/?\w+[^>]*>/gi 
  ];
  
  for (let pattern of dangerousPatterns) {
    if (pattern.test(input.value)) {
      alert('Обнаружен запрещенный код');
      input.value = input.value.replace(pattern, '');
      return false;
    }
  }
  
  return true;
}

function findMatches(searchLower, searchData) {
    return searchData.filter(item => {
        return item.searchString.includes(searchLower);
    });
}



function applySearch(searchLower) {
  const Matches = findMatches(searchLower, SearchData);
  
  goodsCards.forEach((card) => {
    const isCardInMatches = Matches.some(match => match.element === card);
    if (!isCardInMatches) {
      card.classList.add('card__hidenned');
      hiddenedCards.push(card);
    }
  });
}



searchButton.addEventListener('click', (event) => {
  if (validateInput(searchInput)) {
    event.preventDefault();
  }
  applyAllFilters();
});


//function for filter and search


function applyAllFilters() {
  console.log('=== applyAllFilters ===');
  console.log('Фильтр:', filterNow);
  console.log('Поиск:', searchInput.value);
  
  addAllCards();
  

  const cardsToShow = [];
  
  goodsCards.forEach((card) => {
    let shouldShow = true;
    
    if (filterNow !== 'all') {
      const typeOf = card.getAttribute('type_of');
      if (typeOf !== filterNow) {
        shouldShow = false;
      }
    }
 
    if (searchInput.value.trim()) {
      const searchLower = searchInput.value.toLowerCase();
      const cardName = card.getAttribute('name');
      const cardTitle = card.querySelector('.goods__card__title')?.textContent || '';
      const searchString = (cardName + ' ' + cardTitle + ' nft').toLowerCase();
      
      if (!searchString.includes(searchLower)) {
        shouldShow = false;
      }
    }
    
    
    if (shouldShow) {
      cardsToShow.push(card);
    } else {
      card.classList.add('card__hidenned');
      hiddenedCards.push(card);
    }
  });

}

