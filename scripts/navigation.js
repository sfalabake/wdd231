const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#menu-button');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});