const card = document.querySelectorAll('.card');

const cardProgress = item => {
    const progress = item.querySelector('.number h2').textContent,
    circle = item.querySelectorAll('circle')[1];
    
    circle.style.strokeDashoffset = `calc(440 - (440 * ${parseInt(progress)}) / 100)`;

}

card.forEach(item => cardProgress(item));