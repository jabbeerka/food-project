function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, weight, height, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !weight || !height || !age || !ratio) {
            result.textContent = "____";
            return;
        }
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1* height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))* ratio);
        }
    }
    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem=> {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex'))  {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function getSelectInfo (selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem=> {
            elem.addEventListener('click', (e) => {
                let target = e.target;
                if (target.getAttribute('data-ratio')) {
                    ratio = +target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +target.getAttribute('data-ratio'));
                } else {
                    sex = target.getAttribute('id');
                    localStorage.setItem('sex', target.getAttribute('id'));
                }
                elements.forEach(elem=> {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getSelectInfo('#gender div', 'calculating__choose-item_active');
    getSelectInfo('.calculating__choose_big div', 'calculating__choose-item_active');


    function getInputInfo (selector) {
        const input = document.querySelectorAll(selector);

        input.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.match(/\D/g)) {
                    input.style.border = '2px solid red';
                } else {
                    input.style.border = 'none';
                }
                switch (input.getAttribute('id')) {
                    case 'height' : height = +input.value;
                    break;
                    case 'weight' : weight = +input.value;
                    break;
                    case 'age' : age = +input.value;
                    break;
                }
                
            });
            calcTotal();
        });
    }
    getInputInfo('#height');
    getInputInfo('#weight');
    getInputInfo('#age');
}
export default calc;