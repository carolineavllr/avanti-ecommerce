import Swiper, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import './sass/main.scss';

Swiper.use([Navigation]);

window.addEventListener('load', function() {
  new Swiper(".swiper-banner", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    observeParents: true,
    observer: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  });

  new Swiper(".swiper-products", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }
  });

  let totalCart = 0

  this.document.querySelectorAll(".list-products").forEach(function(element){
    element.addEventListener("click", function(event) {
      const payload = event.target.getAttribute("data-payload")
      if (payload) {
        const quantityElement = event.target.nextElementSibling || event.target.previousElementSibling;
        const quantity = Number(quantityElement.innerHTML) + Number(payload);
        const max = Number(quantityElement.getAttribute('data-available'))
        if (quantity >= 1 && quantity <= max) {
          quantityElement.innerHTML = quantity;
        }
      }
      if (event.target.classList.contains('add')) {
        const quantityElement = event.target.previousElementSibling.querySelector('div[data-available]');
        const totalAvailable = Number(quantityElement.getAttribute('data-available'));
        const quantity = Number(quantityElement.innerHTML);
        const nextTotalAvailable = totalAvailable - quantity;
        totalCart += quantity;
        document.querySelector("span[data-total-cart]").innerHTML = totalCart;
        quantityElement.setAttribute('data-available', nextTotalAvailable);
        if (nextTotalAvailable === 0) {
          event.target.parentElement.innerHTML = '<button class="unavailable">Indisponível</button>'
        } else {
          quantityElement.innerHTML = 1;
        }
      }
    })
  })
});