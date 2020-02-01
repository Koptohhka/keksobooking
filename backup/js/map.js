function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function getRandom() {
    return Math.round(Math.random());
}
 
let titleArray = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дв орец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый него степриимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по коле но в воде"];
let addressArray = [/*{{lo cation.x}}, {{location.y}}*/];
let typeArray = ['palace', 'flat', 'house', 'bungalo'];
let checkinArray = ['12:00', '13:00', '14:00'];
let checkoutArray = ['12:00', '13:00', '14:00'];
let featuresArray = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
/*Не забудь про костыли!*/let photosArray = ["/http://o0.github.io/assets/images/tokyo/hotel1.jpg", "/http://o0.github.io/assets/images/tokyo/hotel2.jpg", "/http://o0.github .io/assets/images/tokyo/hotel3.jpg"];

function CreateObject(author, offer, location, avatar, title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, x, y) {
    this.author = author;
    this.offer = offer;
    this.location = location;
    this.author.avatar = avatar;
    this.offer.title = title;
    this.offer.address = address;
    this.offer.price = price;
    this.offer.type = type;
    this.offer.rooms = rooms;
    this.offer.guests = guests;
    this.offer.checkin = checkin;
    this.offer.checkout = checkout;
    this.offer.features = features;
    this.offer.description = description;
    this.offer.photos = photos;
    this.location.x = x + 'px';
    this.location.y = y + 'px';
}
  
let objectArray = [];  
 
for (let i = 0; i < 8; i++) {
    objectArray.push(new CreateObject({}, {}, {}, 
    'img/avatars/user0'+ i + '.png', 
    titleArray[getRandomIntInclusive(0, titleArray.length - 1)],
    '300, 650', 
    getRandomIntInclusive(1000, 1000000), 
    typeArray[getRandomIntInclusive(0, typeArray.length - 1)], 
    getRandomIntInclusive(1, 5), 
    getRandomIntInclusive(2, 10), 
    checkinArray[getRandomIntInclusive(0, checkinArray.length - 1)], 
    checkoutArray[getRandomIntInclusive(0, checkoutArray.length - 1)], 
    [], 
    '', 
    'https://via.placeholder.com/150', 
    getRandomIntInclusive(130, 630),
    getRandomIntInclusive(130, 630))); 
}

let featuresPush = function () {
    for (let i = 0; i < objectArray.length; i++) {
        for (let j = 0; j < featuresArray.length; j++) {
            if (getRandom() === 0) {
                objectArray[i].offer.features.push(featuresArray[j]);//для пуша в массив features из featuresArray
            }
        }
    }
}
featuresPush();

let map = document.querySelector('.map');
let template = document.querySelector('template').content;
let templateCard = template.querySelector('.map__card');
let templateContent = template.querySelector('.map__pin');
let markContainer = document.querySelector('.map__pins');



let renderMark = function (counter) {
    let newMark = templateContent.cloneNode(true);
    let newMarkImage = newMark.querySelector('img');

    newMark.style.left = objectArray[counter].location.x;
    newMark.style.top = objectArray[counter].location.y;

    newMarkImage.src = objectArray[counter].author.avatar;
    newMarkImage.alt = objectArray[counter].offer.title;

    markContainer.appendChild(newMark);
}


let renderMarks = function () {
    for (let i = 0; i < objectArray.length; i++) {
        renderMark(i);
    }
}
//renderMarks();//временно

let cardContainer = document.querySelector('.map'); 


let renderCard = function (counter) {
    let card = templateCard.cloneNode(true);

    let cardTitle = card.querySelector('.popup__title');
    cardTitle.textContent = objectArray[counter].offer.title;

    let cardAdress = card.querySelector('small');
    cardAdress.textContent = objectArray[counter].offer.adress;

    let cardPrice = card.querySelector('.popup__price');
    cardPrice.textContent = objectArray[counter].offer.price + '₽/ночь';

    let cardType = card.querySelector('h4');
    if (objectArray[counter].offer.type === 'flat') {
        cardType.textContent = 'Квартира';
    } else if (objectArray[counter].offer.type === 'palace') {
        cardType.textContent = 'Дворец';
    } else if (objectArray[counter].offer.type === 'house') {
        cardType.textContent = 'дом';
    } else if (objectArray[counter].offer.type === 'bungalo') {
        cardType.textContent = 'Бунгало';
    }

    let cardRooms = card.querySelector('.popup__text--capacity');
    cardRooms.textContent = objectArray[counter].offer.rooms + ' комнат для ' + objectArray[counter].offer.guests + ' гостей';

    let cardTime = card.querySelector('.popup__text-time');
    cardTime.textContent = 'Заезд после ' + objectArray[counter].offer.checkin + ', выезд до ' + objectArray[counter].offer.checkout;


    let createFeatureElement = function (cardFeaturesClass) {
        let newFeatureElement = document.createElement('li');
        newFeatureElement.classList.add(cardFeaturesClass, 'feature');
        cardFeatures.appendChild(newFeatureElement);
    }

    //прошу прощения за эту ебанину ивановну! Я не знал, как отрисовать фичи жилья по-другому :)
    let cardFeatures = card.querySelector('.popup__features');
    let cardFeaturesClass;
    for (let i = 0; i < featuresArray.length; i++) {
        if (objectArray[counter].offer.features[i] === 'wifi') {
            cardFeaturesClass = 'feature--wifi';
            createFeatureElement(cardFeaturesClass);    
    } else if (objectArray[counter].offer.features[i] === 'dishwasher') {
            cardFeaturesClass = 'feature--dishwasher';
            createFeatureElement(cardFeaturesClass);            
    } else if (objectArray[counter].offer.features[i] === 'parking') {
            cardFeaturesClass = 'feature--parking';
            createFeatureElement(cardFeaturesClass);
    } else if (objectArray[counter].offer.features[i] === 'washer') {
            cardFeaturesClass = 'feature--washer';
            createFeatureElement(cardFeaturesClass);
    } else if (objectArray[counter].offer.features[i] === 'elevator') {
            cardFeaturesClass = 'feature--elevator';
            createFeatureElement(cardFeaturesClass);
    } else if (objectArray[counter].offer.features[i] === 'conditioner') {
            cardFeaturesClass = 'feature--conditioner';
            createFeatureElement(cardFeaturesClass);
    }
    }

    let cardDescription = card.querySelector('.popup__description');
    cardDescription.textContent = objectArray[counter].offer.description;

    let cardPicture = card.querySelector('.popup__picture');
    cardPicture.src = objectArray[counter].offer.photos;

    let cardAvatar = card.querySelector('.popup__avatar');
    cardAvatar.src = objectArray[counter].author.avatar;

    cardContainer.appendChild(card);
}

//следующее тз
let mainMark = document.querySelector('.map__pin--main');
let adress = document.getElementById('address');
let formAtcive = document.querySelector('.notice__form');
let fieldsetArray = document.querySelectorAll('fieldset');

let newAdressValue =  mainMark.style.left + mainMark.style.top;

let adressValue = function () {
    adress.value = mainMark.style.left + mainMark.style.top;
}

let mapFadeRemove = function () {
    map.classList.remove('map--faded');
}

let formDisableRemove = function () {
    formAtcive.classList.remove('notice__form--disabled');    
};

let removeDisableAttribute = function () {
    for (let i = 0; i < fieldsetArray.length; i++) {
        fieldsetArray[i].removeAttribute('disabled');
    }
};

mainMark.addEventListener('mouseup', function () {
    
    renderMarks();
    mapFadeRemove();
    adressValue();
    formDisableRemove();
    removeDisableAttribute();

    let renderedMark = document.querySelectorAll('.map__pin:nth-child(1), .map__pin:nth-child(3), .map__pin:nth-child(4), .map__pin:nth-child(5) , .map__pin:nth-child(6), .map__pin:nth-child(7), .map__pin:nth-child(8), .map__pin:nth-child(9), .map__pin:nth-child(10)');
    console.log(renderedMark);
    for (let i = 0; i < renderedMark.length; i++) {
        renderedMark[i].addEventListener('click', function () {
            renderCard(i);
            
            let renderedCard = cardContainer.querySelector('.map__card');
            let renderedCardImage = renderedCard.querySelector('.popup__avatar');
            let renderedMarkImage = renderedMark[i].querySelector('img');
    
            renderedCardImage.src = renderedMarkImage.src;

            let renderedCardClose = renderedCard.querySelector('.popup__close');
        });
    }
});





