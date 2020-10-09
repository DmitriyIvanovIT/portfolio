const worksCards = document.querySelector('.works-cards');

const getData = async () => await fetch('db/worksDB.json');

getData()
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        worksCards.textContent = '';

        const renderCard = item => {
            worksCards.insertAdjacentHTML('afterbegin', `
                <div class="works-card" data-work="${item.tools}">
                    <div class="imgBx">
                        <img src="${item.images}" alt="${item.name}">
                    </div>
                    <div class="content">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                        <div class="buttons">
                            ${item.page ? `<a href="${item.page}" target="_blank">Посмотреть сайт</a>` : ''}
                            ${item.codes ? `<a href="${item.codes}" target="_blank">Посмотреть код</a>` : ''}
                        </div>
                    </div>
                </div>
            `);
        };

        data.forEach(renderCard);

        const card = document.querySelectorAll('.card'),
            worksCard = document.querySelectorAll('.works-card'),
            filterWork = document.querySelector('.filter-work');

        const closeCard = () => {
                worksCard.forEach(item => item.classList.remove('active'));
            },
            openCard = elem => {
                closeCard();
                elem.classList.add('active');
            },
            filterWorks = value => {
                if (value === 'Все работы') {
                    worksCard.forEach(item => item.removeAttribute('style'));
                } else {
                    worksCard.forEach(item => {
                        if (item.dataset.work === value) {
                            item.removeAttribute('style');
                        } else {
                            item.style.display = 'none';
                        }
                    });
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
        });
        worksCard.forEach(item => {
            item.addEventListener('mouseover', () => {
                if (!item.classList.contains('active')) {
                    closeCard();
                }
            });
        });

        filterWork.addEventListener('change', () => {
            filterWorks(filterWork.value);
        });

    })
    .catch(error => console.error(error));