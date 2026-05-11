const navList = document.querySelector('#nav-list');
const hamburgerButton = document.querySelector('#menu-button');

hamburgerButton.addEventListener('click', () => {

    navList.classList.toggle('open');

    hamburgerButton.classList.toggle('open');

    const isOpen = navList.classList.contains('open');

    hamburgerButton.setAttribute('aria-expanded', isOpen);
});