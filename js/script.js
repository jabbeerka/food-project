           import tabs from './modules/tabs';
           import modals from './modules/modals';
           import feed from './modules/feed';
           import slyder from './modules/slyder';
           import calc from './modules/calc';
           import timer from './modules/timer';
           import showModal from './modules/modals';
window.addEventListener('DOMContentLoaded', function () {

    const modalTimerId = setTimeout(()=> showModal('.modal', modalTimerId), 300000);
    tabs('.tabheader__item','.tabcontent','.tabheader__items', "tabheader__item_active");
    modals('#call_modal', '.modal', modalTimerId);
    feed(modalTimerId, 'form');
    slyder({
        container: ".offer__slide",
        slideSelector: '.offer__slider-wrapper',
        total: "#total",
        current: "#current",
        prevBtn: ".offer__slider-prev",
        nextBtn: ".offer__slider-next",
        field: '.offer__slider-field',
        offer: '.offer__slider'
    });
    calc();
    timer('.timer', '2020-06-25');
});