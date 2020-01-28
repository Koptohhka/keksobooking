( () => {
    let formData = document.querySelector('.ad-form');

    let submitForm = () => {
        let form  = new FormData(formData);
        window.backend.upload(window.tools.renderSuccess, window.tools.renderError, form);
    }

    formData.addEventListener('submit', (evt) => {
        evt.preventDefault();
        submitForm();
    })
}) ()