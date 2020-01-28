'use strict';
/// !!!

/*let photosContainer  = document.querySelector('.popup__photos');;
              let closeBtn = document.createElement('div');
              closeBtn.style.width = '30px';
              closeBtn.style.height = '30px';
              closeBtn.style.position = 'absolute';
              closeBtn.style.top = '275px';
              closeBtn.style.left = '190px';
              closeBtn.style.background = 'black';
              photosContainer.appendChild(closeBtn);
              console.log(1);*/ 

( () => {
const cardType = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало',
};

const template = document.querySelector('template');
const map = document.querySelector('.map');
const mapPins = document.querySelector('.map__pins');
const mapPinTemplate = template.content.querySelector('.map__pin');
const adTemplate = template.content.querySelector('.map__card');
const popupPhoto = template.content.querySelector('.popup__photo');
const filedsetArray = document.querySelectorAll('fieldset');
const formElement = document.querySelector('.ad-form');
//const mapFiltersContainer = document.querySelector('.map__filters-container');//Зачем мне это?
//const mapFiltersSelects = document.querySelectorAll('.map__filter');//А это зачем?
//const mapFiltersFieldset = document.querySelector('#housing-features');//Это вообще что?

//const mainPin = document.querySelector('.map__pin--main');

let activateForm = () => {
    filedsetArray.forEach(function (it) {
        it.disabled = false;
      });
      formElement.classList.remove('ad-form--disabled');  
};

let deactivateForm = () => {
    filedsetArray.forEach( (it) => {
        it.disabled = true;
      });
}; 

let createPinMarkup = (pinStats) => {
    let pinItem = mapPinTemplate.cloneNode(true);
    pinItem.querySelector('img').src = pinStats.author.avatar;
    pinItem.style.left = pinStats.location.x + 'px';
    pinItem.style.top = pinStats.location.y + 'px';
    pinItem.querySelector('img').alt = pinStats.offer.title;
    let onPinItemClick = () => {
        let mapCardRemovable = map.querySelector('.map__card');
        if (mapCardRemovable) {
          mapCardRemovable.remove();
        }
        map.appendChild(createAd(pinStats));
        //
        let qe = document.querySelector('.popup__photos');
        let q = document.querySelector('.popup__photo');
        window.largePhoto = document.createElement('img');
        largePhoto.classList.add('popup__photo');
        largePhoto.src = q.src;
        largePhoto.style.width = '200px';
        largePhoto.style.height = '200px';
        qe.appendChild(largePhoto);
        console.log(largePhoto);
        //
      };
      pinItem.addEventListener('click', onPinItemClick);

    return pinItem;
};

let renderPinsMarkup = (pinsStats) => {
    let mapPinsFragment = document.createDocumentFragment();
    for (let i = 0; i < 9; i++) {
      mapPinsFragment.appendChild(createPinMarkup(pinsStats[i]));
    }
      mapPins.appendChild(mapPinsFragment);
};

let createFeatureFragment = (addStats) => {
  let featureFragment = document.createDocumentFragment();
  addStats.offer.features.forEach( (it) => {
    let featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + it;
    featureFragment.appendChild(featureItem);
  });
  return featureFragment;
};

let createPhotosFragment = (adStats) => {
    let photosFragment = document.createDocumentFragment();
    for (let i = 0; i < adStats.offer.photos.length; i++) {
      let photoItem = popupPhoto.cloneNode(true);
      photoItem.src = adStats.offer.photos[i];
      let openPhoto = () => {
        largePhoto.src = photoItem.src;
      }

      photoItem.addEventListener('click', openPhoto);
      photosFragment.appendChild(photoItem);
    }
    return photosFragment;
  };

let createAd = (adStats) => {
    let ad = adTemplate.cloneNode(true);
    ad.querySelector('.map__card img').src = adStats.author.avatar;
    ad.querySelector('.popup__title').textContent = adStats.offer.title;
    ad.querySelector('.popup__text--price').textContent = adStats.offer.price + ' ₽/ночь';
    ad.querySelector('.popup__type').textContent = cardType[adStats.offer.type.toUpperCase()];
    ad.querySelector('.popup__text--capacity').textContent = adStats.offer.rooms + ' комнаты для ' + adStats.offer.guests + ' гостей';
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adStats.offer.checkin + ', выезд до ' + adStats.offer.checkout;
    ad.querySelector('.popup__features').innerHTML = '';
    ad.querySelector('.popup__features').appendChild(createFeatureFragment(adStats));
    ad.querySelector('.popup__description').textContent = adStats.offer.description;
    ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
    ad.querySelector('.popup__photos').appendChild(createPhotosFragment(adStats));
    let closeAdBtn = ad.querySelector('.popup__close');

    let closeAd = () => {
      ad.remove();
      closeAdBtn.removeEventListener('click', onCloseAdBtnClick);
    };

    let onCloseAdBtnClick = () => {
        closeAd();
    };
    closeAdBtn.addEventListener('click', onCloseAdBtnClick);

    return ad;
};

  let mapActive = () => {
    map.classList.remove('map--faded');
    window.backend.load(renderPinsMarkup, window.tools.renderError); //собсна вызов рендеринга, снятия блокировки формы, и другое
    activateForm();
};

deactivateForm();//временно

  window.map = {
    mapActive: mapActive
  }
}) ()







