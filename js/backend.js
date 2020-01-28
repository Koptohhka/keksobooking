( () => {
    const urlGet = 'https://js.dump.academy/keksobooking/data';
    const urlPost = 'https://js.dump.academy/keksobooking';

    let createXhr = (method, url, onLoad, onError) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Произошла ошибка, просим ваc пойти к чёрту.');
            }

            window.pin.mainPin.removeEventListener('click', window.map.mapActive);
        })

        xhr.addEventListener('error', () => {
            onError('Прозошла ошибка соединения, пожалуйста, сходите к врачу.');
        })

        xhr.addEventListener('timeout', () => {
            onError('Сервер долго не отвечает, пожалуйста, сходите к врачу.');    
        })
        xhr.open(method, url);

        return xhr;
    }

    let load = (onLoad, onError) => {
        createXhr('GET', urlGet, onLoad, onError).send();
    }

    let upload = (onLoad, onError, data) => {
        createXhr('POST', urlPost, onLoad, onError).send(data);    
    }

    window.backend = {
        load: load,
        upload: upload
    }
}) ()