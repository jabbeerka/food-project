
 function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
        modal.classList.remove('hide');
        modal.classList.add('show', 'fade');
        document.body.style.overflow = 'hidden';
    if (modalTimerId) {
            clearInterval(modalTimerId);
        }
    }
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show', 'fade');
    modal.classList.add('hide');
    document.body.style.overflow = '';
    }
function modals(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
    callModalBtn = document.querySelectorAll(triggerSelector);

    callModalBtn.forEach(btn => {
    btn.addEventListener('click', ()=> 
        showModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', function(e){
    if(e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal(modalSelector);
    }
    });
    document.addEventListener("keydown", (e)=> {
    if (e.code === "Escape" && modal.classList.contains('show')){
        closeModal(modalSelector);
    }
    });

    function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal(modalSelector,modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
    }
    window.addEventListener('scroll', showModalByScroll);
}
export default modals;
export {closeModal};
export {showModal};