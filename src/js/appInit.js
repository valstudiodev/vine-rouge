"use strict"

export function initLoadAnimation() {
   initPageMaster(600, '#AF6900');
}

/**
 * УНІВЕРСАЛЬНИЙ СКРИПТ ЗАВАНТАЖЕННЯ ТА АНІМАЦІЙ
 */

function initPageMaster(delay = 600, barColor = '#ff4500') {
   const html = document.documentElement;

   // 1. Створюємо прогрес-бар
   const progressBar = document.createElement('div');
   progressBar.id = 'loader-progress-bar';
   progressBar.style.backgroundColor = barColor;
   html.appendChild(progressBar);

   let progress = 0;
   const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + '%';
   }, 150);

   // 2. Функція активації сторінки
   const activatePage = () => {
      if (html.getAttribute('init-page-loader') === 'ready') return;

      clearInterval(interval);
      progressBar.style.width = '100%';

      setTimeout(() => {
         html.setAttribute('init-page-loader', 'ready');

         // Запускаємо обсервер для скрол-анімацій
         initAnimationObserver();

         setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => progressBar.remove(), 400);
         }, 300);
      }, delay);
   };

   // Слухачі завантаження
   window.addEventListener('load', activatePage);
   setTimeout(activatePage, 4000); // Запобіжник (fail-safe)
}

function initAnimationObserver() {
   const elements = document.querySelectorAll('[class*="--anim"]');
   if (!elements.length) return;

   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         const el = entry.target;
         const isOnce = el.getAttribute('data-once') !== "false";

         if (entry.isIntersecting) {
            const children = el.querySelectorAll('.anim-child');
            const delay = parseInt(el.dataset.delay) || 0;
            const step = parseInt(el.dataset.step) || 150;

            if (children.length > 0) {
               children.forEach((child, index) => {
                  setTimeout(() => child.classList.add('animate'), delay + (index * step));
               });
            } else {
               setTimeout(() => el.classList.add('animate'), delay);
            }

            if (isOnce) observer.unobserve(el);
         } else if (!isOnce) {
            // Якщо data-once="false", скидаємо анімацію при виході з кадру
            el.classList.remove('animate');
            el.querySelectorAll('.anim-child').forEach(c => c.classList.remove('animate'));
         }
      });
   }, { threshold: 0.15 });

   elements.forEach(el => observer.observe(el));
}












