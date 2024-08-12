const nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    items = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.addEventListener('click', () => showSlider('next'));
prevBtn.addEventListener('click', () => showSlider('prev'));

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    void runningTime.offsetHeight; // Force a reflow
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

function showSlider(type) {
    const sliderItemsDom = list.querySelectorAll('.carousel .list .item');

    if (sliderItemsDom.length === 0) return; // Safety check

    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation();
