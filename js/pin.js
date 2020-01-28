( () => {
    let heightTail = 16;
    let dragLimit = {
        minCoords: {
            x: 0,
            y: 130
        },
        maxCoords: {
            x: 1200,
            y: 600
        }
    }
    let pinCoordsDefault = {
        x: 600,
        y: 375
    }
    let pinSize = {
        width: 65,
        height: 65,
      };

    let mainPin = document.querySelector('.map__pin--main');
    let address = document.getElementById('address');
    address.value = pinCoordsDefault.x + ', ' + pinCoordsDefault.y;

    mainPin.addEventListener('click', window.map.mapActive);
    
    mainPin.addEventListener('mousedown', (evt) => {
        let startCoords = {
            x: evt.clientX,
            y: evt.clientY 
        }

        let onMouseMove = (moveEvt) => {
            let move = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            }

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            }

            let mainPinPosition = {
                x: mainPin.offsetLeft - move.x,
                y: mainPin.offsetTop - move.y
              };

            let borders = {
                top: dragLimit.minCoords.y - mainPin.offsetHeight - heightTail,
                bottom: dragLimit.maxCoords.y - mainPin.offsetHeight - heightTail,
                left: dragLimit.minCoords.x,
                right: dragLimit.maxCoords.x - mainPin.offsetWidth
            };
            
            if (mainPinPosition.x >= borders.left && mainPinPosition.x <= borders.right) {
                mainPin.style.left = mainPinPosition.x + 'px';
            }
            if (mainPinPosition.y >= borders.top && mainPinPosition.y <= borders.bottom) {
                mainPin.style.top = mainPinPosition.y + 'px';
            }

            let pinTailCoords = {
                x: mainPinPosition.x + Math.ceil(pinSize.width / 2),
                y: mainPinPosition.y + pinSize.height + heightTail
            };
            address.value = pinTailCoords.x + ', ' + pinTailCoords.y;
        }

        let onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });

    mainPin.addEventListener('touchstart', (evt) => {
        let startCoords = {
            x: evt.clientX,
            y: evt.clientY 
        }

        let onTouchMove = (moveEvt) => {
            let move = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            }

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            }

            let mainPinPosition = {
                x: mainPin.offsetLeft - move.x,
                y: mainPin.offsetTop - move.y
              };

            let borders = {
                top: dragLimit.minCoords.y - mainPin.offsetHeight - heightTail,
                bottom: dragLimit.maxCoords.y - mainPin.offsetHeight - heightTail,
                left: dragLimit.minCoords.x,
                right: dragLimit.maxCoords.x - mainPin.offsetWidth
            };
            
            if (mainPinPosition.x >= borders.left && mainPinPosition.x <= borders.right) {
                mainPin.style.left = mainPinPosition.x + 'px';
            }
            if (mainPinPosition.y >= borders.top && mainPinPosition.y <= borders.bottom) {
                mainPin.style.top = mainPinPosition.y + 'px';
            }

            let pinTailCoords = {
                x: mainPinPosition.x + Math.ceil(pinSize.width / 2),
                y: mainPinPosition.y + pinSize.height + heightTail
            };
            address.value = pinTailCoords.x + ', ' + pinTailCoords.y;
        }

        let onTouchUp = () => {
            document.removeEventListener('mousemove', onTouchMove);
            document.removeEventListener('mouseup', onTouchUp);
        }

        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchend', onTouchUp);

    });

    window.pin = {
        mainPin: mainPin
    }
}) ()