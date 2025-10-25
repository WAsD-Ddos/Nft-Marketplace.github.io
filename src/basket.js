

function basketButtonsInitialiating() {
    goodsCards.forEach((card) => {
        const cardBusketButton = card.querySelector('.goods__card__button-item');
        cardBusketButton.addEventListener('click', addToBasket);
    })
}

function deleteBasketElement() {
    const cardToRemove = this.closest('.goods__card');
    const productKey = cardToRemove.getAttribute('data-product-key');

    delete existingBasket[productKey];

    //refresh
    localStorage.setItem('basket', JSON.stringify(existingBasket));

    cardToRemove.remove();

    if (Object.keys(existingBasket).length === 0) {
        basketCards.innerHTML = '<div class="empty-basket">Корзина пуста</div>';
    }
}


basketButton.addEventListener("click", () => {

    basket.classList.toggle('activeBasket');
    closeSidebar();
    basketButton.classList.toggle('basketActive');

    const basketImg = basketButton.querySelector('img');
    if (basketButton.classList.contains('basketActive')) {
        basketButton.style.position = 'absolute';
        basketButton.style.right = '12px';
        basketButton.style.top = '30px';

        if (basketImg) {
            basketImg.style.width = '30px'; 
        }
    } else {
        basketButton.style.position = '';
        basketButton.style.right = '';

        if (basketImg) {
            basketImg.style.width = '';
        }
    }

    if (basket.classList.contains('activeBasket')) {
        LoadBasket();
    }
})

function createBasketCard(product) {

    const card = document.createElement('div');
    card.className = 'goods__card';

    const cardName = product.name;
    const cardType = product.type;
    const productKey = cardName + cardType;

    card.setAttribute('data-product-key', productKey);
    card.setAttribute('name', cardName || '');
    card.setAttribute('type_of', cardType || '');

    card.innerHTML = `
       <div class="goods__card__close">
            <button class="goods__card__close-button"  type="button">
                <img src="img/close__delete.png" alt="">
            </button>
        </div>
        <div class="goods__card__img">
            <img src="${product.url || ''}" alt="">
        </div>
        <div class="goods__card__title">${product.title || ''}</div>
        <div class="goods__card__info">
            <div class="goods__card__actiontime">
                <div class="goods__card__actiontime-text">Auction time</div>
                <div class="goods__card__actiontime-item" action="false">
                    3h 1m 50s
                </div>
            </div>
            <div class="goods__card__currentbid">
                <div class="goods__card__currentbid-text">Current Bid</div>
                <div class="goods__card__currentbid-item" current_price='false'>
                   0.15 ETH
                </div>
            </div>
        </div>
        <div class="goods__card__button">
            <button class="goods__card__button-item"  type="button">
                BUY
            </button>
        </div>
    `;

    const closeButton = card.querySelector('.goods__card__close-button');
    closeButton.addEventListener('click', deleteBasketElement);


    return card;
}



function LoadBasket() {


    if (Object.keys(existingBasket).length === 0) {
        basketCards.innerHTML = '<div class="empty-basket">Корзина пуста</div>';
        console.log('basket is empty');
        return;
    }

    const emptyMessage = basketCards.querySelector('.empty-basket');
    if (emptyMessage) {
        emptyMessage.remove();
    }

    let currentCards = Array.from(basketCards.querySelectorAll('.goods__card'));
    const displayedKeys = new Set();
    currentCards.forEach(card => {
        const productKey = card.getAttribute('data-product-key');
        if (productKey) {
            displayedKeys.add(productKey);
        }
    });



    Object.entries(existingBasket).forEach(([productKey, cardData]) => {
        if (!displayedKeys.has(productKey)) {
            const cardElement = createBasketCard(cardData);
            basketCards.appendChild(cardElement);
        }
    });
    
}




function addToBasket(event) {
    const button = event.currentTarget;
    const card = button.closest('.goods__card');

    const cardName = card.getAttribute('name');
    const cardType = card.getAttribute('type_of');

    const productData = SearchData.find(item =>
        item.name === cardName && item.type === cardType
    );

    if (!productData) {
        console.log('card is not find (basket)');
        return;
    }

    const productKey = cardName + cardType;



    if (existingBasket[productKey]) {
        console.log('Item in Basket now');
        return;
    }


    existingBasket[productKey] = {
        name: productData.name,
        type: productData.type,
        title: productData.title,
        url: productData.url,
    };

    localStorage.setItem('basket', JSON.stringify(existingBasket));

    console.log('Item in basket! New Basket:', existingBasket);
}


