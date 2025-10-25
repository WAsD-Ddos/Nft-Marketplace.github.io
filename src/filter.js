function replaceButtonWithColor(target) {
  let elem = filterdButtons.querySelector(".button__choosed");
  elem.classList.remove('button__choosed');
  target.classList.add('button__choosed');
}



function hiddenFilteredCards(type){
    goodsCards.forEach((card) => {
    const typeOf = card.getAttribute('type_of');
    if (typeOf !== type) {
      card.classList.add('card__hidenned');
      hiddenedCards.push(card);
    }
  });
}


// Event listener для фильтрации
filterdButtons.addEventListener('click', function (e) {
  if (e.target.classList.contains('goods__button')) {
    replaceButtonWithColor(e.target);
    let art = 'art';
    let pixel = 'pixel';
    let all = 'all'
    if (e.target.value === art) {
      filterNow = art;
    }
    else if (e.target.value === pixel) {
      filterNow = pixel;
    }
    else {
      filterNow = all;  
    }
    applyAllFilters();
  }
});