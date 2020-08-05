const card = document.querySelectorAll('.card'),
worksCards = document.querySelector('.works-cards'),
worksCard = document.querySelectorAll('.works-card');

const cardProgress = item => {
    const progress = item.querySelector('.number h2').textContent,
    circle = item.querySelectorAll('circle')[1];
    
    circle.style.strokeDashoffset = `calc(440 - (440 * ${parseInt(progress)}) / 100)`;

}, 
closeCard = () => {
    worksCard.forEach(item => item.classList.remove('active'));
},
openCard = elem => {
    closeCard();
    elem.classList.add('active');
}


card.forEach(item => cardProgress(item));

document.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.works-card')) {
        const item = target.closest('.works-card');

        openCard(item);
    } else {
        closeCard();
    };

});