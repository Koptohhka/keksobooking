( () => {
    let formData = document.querySelector('.ad-form');

    let submitForm = () => {
        let form  = new FormData(formData);
        window.backend.upload(window.tools.renderSuccess, window.tools.renderError, form);
    }

    formData.addEventListener('submit', (evt) => {
        evt.preventDefault();
        submitForm();
    });

    //фильтры для формы
    let dataArray = [];

    let getDataArray = (data) => {
        dataArray = data;
    }

    let mapFiltersForm = document.querySelector('.map__filters');
    let housingType = mapFiltersForm.querySelector('#housing-type');
    let housingPrice = mapFiltersForm.querySelector('#housing-price');
    let housingRooms = mapFiltersForm.querySelector('#housing-rooms');
    let housingGuests = mapFiltersForm.querySelector('#housing-guests');

    let housingFeatures = mapFiltersForm.querySelector('#housing-features');
    let filterWifi = housingFeatures.querySelector('#filter-wifi');
    let filterDishwasher = housingFeatures.querySelector('#filter-dishwasher');
    let filterParking = housingFeatures.querySelector('#filter-parking');
    let filterWasher = housingFeatures.querySelector('#filter-washer');
    let filterElevator = housingFeatures.querySelector('#filter-elevator');
    let filterConditioner = housingFeatures.querySelector('#filter-conditioner');

    let toFilterHouse = () => {
        let housingTypeValue = housingType.value;
        let filteredHouses = dataArray.filter( (it) => {
            if (housingTypeValue !== 'any') {
                return it.offer.type === housingTypeValue;
            } else {
                return dataArray;
            }
        });
        window.map.removePinsMarkup();
        window.map.renderPinsMarkup(filteredHouses);
    }
    

    let toFilterPrice = () => {
        let housingPriceValue = housingPrice.value;
        let filteredPrices = dataArray.filter( (it) => {
            if (housingPriceValue !== 'any') {
                if (housingPriceValue === 'middle') {
                    return it.offer.price >= 10000 && it.offer.price <= 50000;
                } else if (housingPriceValue === 'low') {
                    return it.offer.price <= 10000;
                } else if (housingPriceValue === 'high') {
                    return it.offer.price >= 50000;
                }
            } else {
                return dataArray;
            }
        });
        window.map.removePinsMarkup();
        window.map.renderPinsMarkup(filteredPrices);
    }

    let toFilterRooms = () => {
        let housingRoomsValue = housingRooms.value;
        let filteredRooms = dataArray.filter( (it) => {
        if (housingRoomsValue !== 'any') {
            return it.offer.rooms === Number(housingRoomsValue);
        } else {
            return dataArray;
        }
        });
        window.map.removePinsMarkup();
        window.map.renderPinsMarkup(filteredRooms);
    }

    let toFilterGuests = () => {
        let housingGuestsValue = housingGuests.value; //проблэмы с типизацией
        let filteredGuests = dataArray.filter( (it) => {
            if (housingGuestsValue !== 'any' && housingGuestsValue !== '0') {
                return it.offer.guests === Number(housingGuestsValue);
            } else if (housingGuestsValue === 'any') {
                return dataArray;
            } 
        })
        window.map.removePinsMarkup();
        window.map.renderPinsMarkup(filteredGuests);
    }

    let toFilterFeatures = (checkbox) => {
        if (checkbox.checked) {
            let filteredArray = [];

            dataArray.forEach((it) => {
                for (let i = 0; i < it.offer.features.length; i++) {
                    if (it.offer.features[i] === checkbox.value) {
                        filteredArray.push(it); 
                    }
                }                
            });

            window.map.removePinsMarkup();
            window.map.renderPinsMarkup(filteredArray);   
        } else {
            window.map.renderPinsMarkup(dataArray);
        } 
    }

    housingType.addEventListener('change', toFilterHouse);
    housingPrice.addEventListener('change', toFilterPrice);
    housingRooms.addEventListener('change', toFilterRooms);
    housingGuests.addEventListener('change', toFilterGuests);

    filterWifi.addEventListener('change', () => {
        toFilterFeatures(filterWifi);
    });
    filterDishwasher.addEventListener('change', () => {
        toFilterFeatures(filterDishwasher);
    });

    filterParking.addEventListener('change', () => {
        toFilterFeatures(filterParking);
    });

    filterWasher.addEventListener('change', () => {
        toFilterFeatures(filterWasher);
    });

    filterElevator.addEventListener('change', () => {
        toFilterFeatures(filterElevator);
    });

    filterConditioner.addEventListener('change', () => {
        toFilterFeatures(filterConditioner);
    });

    window.formFilters = {
        getDataArray: getDataArray
    }
}) ()
