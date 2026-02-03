"use strict"

export function initUtils() {
   slidersInit()
}

// ===========================================================================================
// -----------------------------
// SLIDER
// -----------------------------
function slidersInit() {
   if (document.querySelector('.slider-review')) {
      const swiper = new Swiper('.slider-review', {
         loop: true,
         slidesPerView: 1,
         // spaceBetween: 30,

         navigation: {
            nextEl: '.button-arrow--next',
            prevEl: '.button-arrow--prev',
         },

         pagination: {
            el: ".swiper-pagination",
         },

         // breakpoints: {
         //    320: {
         //       slidesPerView: 1.3,
         //       spaceBetween: 10,
         //    },
         //    630: {
         //       slidesPerView: 1.5,
         //       spaceBetween: 15,
         //       centteredSlides: true,
         //    },
         //    930: {
         //       slidesPerView: 2.2,
         //       spaceBetween: 25,
         //       centteredSlides: false,
         //    },
         //    1440: {
         //       slidesPerView: 3,
         //       spaceBetween: 30,
         //    },
         // },
      });
   }
   if (document.querySelector('.slider-spirit')) {
      const swiper = new Swiper('.slider-spirit', {
         loop: true,
         // slidesPerView: 1.1,
         // spaceBetween: 10,

         navigation: {
            nextEl: '.swiper-btn-prev',
            prevEl: '.swiper-btn-next',
         },

         pagination: {
            el: ".pagination-spirit",
         },

         breakpoints: {
            320: {
               slidesPerView: 1.1,
               spaceBetween: 15,
            },
            480: {
               slidesPerView: 1.4,
               spaceBetween: 10,
            },
            830: {
               slidesPerView: 1.7,
               spaceBetween: 15,
            },
            1060: {
               slidesPerView: 2.2,
               spaceBetween: 20,
               centteredSlides: true,
            },
            1300: {
               slidesPerView: 2.6,
               spaceBetween: 25,
               centteredSlides: false,
            },
            1440: {
               slidesPerView: 3,
               spaceBetween: 37,
            },
         },
      });
   }
}


// ===========================================================================================
// -----------------------------
// filter
// -----------------------------
// document.addEventListener('DOMContentLoaded', () => {
//    const menuButtons = document.querySelectorAll('[data-filter]');
//    const galleryItems = document.querySelectorAll('[data-group]');

//    function filterItems(category) {
//       galleryItems.forEach(item => {
//          item.style.display = item.dataset.group === category ? 'grid' : 'none';
//       });
//    }

//    menuButtons.forEach((btn, index) => {
//       btn.addEventListener('click', () => {
//          menuButtons.forEach(b => b.classList.remove('active'));
//          btn.classList.add('active');
//          filterItems(btn.dataset.filter);
//       });

//       if (index === 0) {
//          btn.classList.add('active');
//          filterItems(btn.dataset.filter);
//       }
//    });
// });


// ===========================================================================================
// -----------------------------
// active-link
// -----------------------------
// const links = document.querySelectorAll('.menu-header__link')
// const current = window.location.pathname

// links.forEach(link => {
//    link.addEventListener('active', () => {
//       if (link.getAttribute('href') === current) {
//          link.classList.toggle('active-page')
//       }
//       console.log("works");
//    })
// })


// ===========================================================================================
// -----------------------------
// accordions
// -----------------------------
document.addEventListener("click", (e) => {
   // 1. Шукаємо кнопку-заголовок через closest (делегування)
   const btn = e.target.closest("[data-accordion-btn]");
   if (!btn) return;

   // 2. Знаходимо батьківський елемент та потрібні деталі
   const accordion = btn.closest("[data-accordion]");
   const body = accordion.querySelector("[data-accordion-body]");
   const icon = btn.querySelector("[data-accordion-icon]");

   if (!body) return;

   const isOpen = accordion.classList.contains("is-open");

   if (!isOpen) {
      // --- ВІДКРИТТЯ ---
      accordion.classList.add("is-open");
      if (icon) icon.classList.add("icon-active"); // Клас активної іконки

      body.style.height = `${body.scrollHeight}px`;

      body.addEventListener("transitionend", function handler() {
         if (accordion.classList.contains("is-open")) {
            body.style.height = "auto";
         }
         body.removeEventListener("transitionend", handler);
      }, { once: true });

   } else {
      // --- ЗАКРИТТЯ ---
      body.style.height = `${body.scrollHeight}px`;
      body.offsetHeight; // force reflow

      requestAnimationFrame(() => {
         body.style.height = "0";
         accordion.classList.remove("is-open");
         if (icon) icon.classList.remove("icon-active"); // Прибираємо клас
      });
   }
});
