// Вам необходимо создать навигационное меню для веб-сайта, в
// котором меняется активный пункт при клике без фактического
// перехода на другие страницы. Меню должно обладать следующими
// характеристиками:
// 1. Подсветка активного пункта: При клике на пункт меню он
// должен становиться активным, и для активного пункта должен
// применяться определенный стиль (например, изменение цвета
// фона). Если выбрать другой пункт, предыдущий должен
// перестать быть активным.
// 2. Эффекты наведения: При наведении курсора на пункты меню
// должны применяться эффекты (например, изменение цвета
// текста или фона) для подсказки пользователю, что пункт меню
// является интерактивным.

const menuEl = document.querySelector(".menu");
const listLink = menuEl.querySelectorAll(".menu__link");
const popUpEl = document.querySelector(".popup");
const closePopUpEl = popUpEl.querySelector(".close-popUp");

menuEl.addEventListener("click", function ({ target }) {
  [...listLink]
    .find((item) => item.classList.contains("active"))
    .classList.remove("active");
  target.classList.add("active");
  if (target.classList.contains("open-popUp")) {
    console.log("нажали кнопку");
    popUpEl.classList.add("d-none");
  }
});
closePopUpEl.addEventListener("click", function () {
  popUpEl.classList.remove("d-none");
});
