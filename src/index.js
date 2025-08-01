import './styles/main.scss';
// import { Tooltip, Toast, Popover } from 'bootstrap';
// Импорт Bootstrap JS
// import 'bootstrap';

document.addEventListener('DOMContentLoaded', function() {
    console.log('true');
    
    const burger = document.querySelector('.header__burger');
    const closeBtn = document.querySelector('.header__mobile-close');
    const mobileNav = document.querySelector('.header__mobile-menu-nav');
    const overlay = document.querySelector('.header__overlay');

    burger.addEventListener('click', function() {
        // mobileNav.classList.add('active');
        // mobileNav.style.display = 'block';
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    });

    closeBtn.addEventListener('click', function() {
        // mobileNav.style.display = 'none';
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
    });

    overlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});
