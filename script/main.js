"use strict";

const card = document.querySelectorAll('.card'),
      worksCards = document.querySelector('.works-cards'),
      worksCard = document.querySelectorAll('.works-card'),
      contactForm = document.querySelector('.contact-form form'),
      formButton = contactForm.querySelector('.form-button'),
      emailInput = contactForm.querySelectorAll('input')[1],
      errorForm = document.querySelector('.error-form');

formButton.disabled = true;
const elementsForm = [...contactForm.elements].filter(elem => elem.type !== 'submit');

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
},
      checkForm = () => {
  const validForm = elementsForm.every(elem => elem.value);
  formButton.disabled = !validForm;
},
      checkEmail = item => {
  const check = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
        valid = check.test(item);
  return valid;
},
      checkName = () => {
  if (nameInput.value.trim() !== '') {
    return true;
  } else {
    return false;
  }
},
      checkMassage = () => {
  if (messageInput.value.trim() !== '') {
    return true;
  } else {
    return false;
  }
};

card.forEach(item => cardProgress(item));
document.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.works-card')) {
    const item = target.closest('.works-card');
    openCard(item);
  } else {
    closeCard();
  }

  ;
});
worksCard.forEach(item => {
  item.addEventListener('mouseover', () => {
    if (!item.classList.contains('active')) {
      closeCard();
    }
  });
});
contactForm.addEventListener('input', checkForm);
formButton.addEventListener('click', event => {
  event.preventDefault();

  if (checkEmail(emailInput.value.trim()) !== false) {
    errorForm.textContent = 'К сожалению на данный момент отправка письма не возможна для связи можете использовать соц.сети ниже';
    errorForm.style.color = 'green';
    contactForm.reset();
  } else {
    errorForm.textContent = 'Email введен неверно!';
  }
});

let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        let w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        let t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}