( () => {
    let renderError = (errorMessage) => {
        let errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', errorElement);

        let closeErrorModal = (evt) => {
            if (MouseEvent) {
                errorElement.remove();
            } else if (KeyboardEvent) {
                if (evt.keyCode === 27) {
                    errorElement.remove();    
                } 
            }

            document.removeEventListener('click', closeErrorModal);
            document.removeEventListener('keydown', closeErrorModal);
            console.log(1);
        }

        document.addEventListener('click', closeErrorModal);
        document.addEventListener('keydown', closeErrorModal)
    };

    let renderSuccess = () => {
        let successElement = document.querySelector('.success');
        successElement.classList.remove('hidden');
        
        let closeSuccesModal = (evt) => {
            if (MouseEvent) {
                successElement.classList.add('hidden');
            } else if (KeyboardEvent) {
                if (evt.keyCode === 27) {
                    successElement.classList.add('hidden');    
                }
            }

            document.removeEventListener('click', closeSuccesModal);
            document.removeEventListener('keydown', closeSuccesModal); 
            console.log(1);
        }

        document.addEventListener('click', closeSuccesModal);
        document.addEventListener('keydown', closeSuccesModal);
    };

    window.tools = {
        renderError: renderError,
        renderSuccess: renderSuccess
    }
}) ()