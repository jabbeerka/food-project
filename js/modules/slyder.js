function slyder({container, slideSelector, total, prevBtn, nextBtn, field, offer, current}) {
    const slideContents = document.querySelectorAll(container),
        slideCurrent = document.querySelector(current),
        slideTotal = document.querySelector(total),
        slideToLeft = document.querySelector(prevBtn),
        slideToRight = document.querySelector(nextBtn),
        slideWrap = document.querySelector(slideSelector),
        slideField = document.querySelector(field),
        slideOffer = document.querySelector(offer),
        width = window.getComputedStyle(slideWrap).width;

    let slideIndex = 1;
    let offset = 0;

    function getInfo (item, addr) {
        if (item < 10) {
            addr.innerHTML = `0${item}`;
        } else {
            addr.innerHTML = item;
        }
    }
    function plusSlide(n) {
        slideIndex += n;
        if(slideIndex > slideContents.length) {
            slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = slideContents.length;
            }
        }

    getInfo(slideContents.length, slideTotal);
    getInfo(slideIndex, slideCurrent);

    slideField.style.width = 100 * slideContents.length + "%";
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';
    slideWrap.style.overflow = 'hidden';

    slideContents.forEach(slide=> {
        slide.style.width = width;
    });
    slideOffer.style.position = 'relative';
    const dots = document.createElement('ol');
            
    dots.classList.add("carousel-indicators");
    slideOffer.append(dots);
    let dotMassive = [];
    for (let i = 0; i < slideContents.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotMassive.push(dot);
    }
    const dotActive =  (arr) => {
        arr.forEach(dt => dt.style.opacity = '0.5');
        arr[slideIndex-1].style.opacity = 1;
    };
    slideToRight.addEventListener('click', ()=> {
        plusSlide(1);
        if (offset == (+width.replace(/\D/gi, "") * (slideContents.length -1))) {
            offset = 0;
        } else {
            offset += (+width.replace(/\D/gi, ""));
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        getInfo(slideIndex, slideCurrent);
        dotActive(dotMassive);
    });
    slideToLeft.addEventListener('click', ()=> {
        plusSlide(-1);
        if (offset == 0) {
            offset = +width.replace(/\D/gi, "") * (slideContents.length - 1);
        } else {
            offset -= +width.replace(/\D/gi, "");
        }
        slideField.style.transform = `translateX(-${offset}px)`;
        
        getInfo(slideIndex, slideCurrent);
        dotActive(dotMassive);
    });
    document.querySelector('.carousel-indicators').addEventListener('click', (e) => {
        
        if (e.target && e.target.classList.contains('dot')) {
            let slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.replace(/\D/gi, "") * (slideTo -1);
            slideField.style.transform = `translateX(-${offset}px)`;
                getInfo(slideTo, slideCurrent);
                dotActive(dotMassive); 
        }
        
    });
}
export default slyder;