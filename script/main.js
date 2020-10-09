"use strict";

const contactForm = document.querySelector('.contact-form form'),
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


contactForm.addEventListener('input', checkForm);
formButton.addEventListener('click', event => {
  event.preventDefault();

  if (checkEmail(emailInput.value.trim()) !== false) {
    errorForm.textContent = 'К сожалению на данный момент отправка письма не возможна. Для связи можете использовать соц.сети ниже';
    errorForm.style.color = 'green';
    contactForm.reset();
  } else {
    errorForm.textContent = 'Email введен неверно!';
  }
});

let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
  V = 0.5; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (let i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
    e.preventDefault(); //отменяем стандартное поведение
    let w = window.pageYOffset, // производим прокрутка прокрутка
      hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
    let t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
      start = null;
    requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
    function step(time) {
      if (start === null) start = time;
      let progress = time - start,
        r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
      window.scrollTo(0, r);
      if (r != w + t) {
        requestAnimationFrame(step)
      } else {
        location.hash = hash // URL с хэшем
      }
    }
  }, false);
}