import {closeModal, showModal} from './modals';
import {postData} from '../services/services';

function feeds(modalTimerId, formSelector) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading : "Загрузка...",
        success : "Спасибо, скоро мы с вами свяжемся!",
        failure : "Произошла ошибка"
    };
    forms.forEach(item => {
        sendPostData(item);
    });

    function sendPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
                //   
                //   formData.forEach((value,key) => {
                //     obj[key] = value;
                //   });
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(()=> {
                showThanksModal(message.failure);
            }).finally(()=>{
                form.reset();
            });
        });
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}
export default feeds;