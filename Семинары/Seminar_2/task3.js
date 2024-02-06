// Задание 3.

// У вас есть кнопка "Купить". Создайте скрипт, который при клике
// на эту кнопку меняет её текст на "Товар добавлен в корзину" в
// течение 2 секунд, а затем возвращает исходный текст "Купить".
//     В обработчике события клика также проверьте, является ли
// событие доверенным (event.isTrusted). Если событие является
// доверенным, выполните изменение текста кнопки и убедитесь,
//     что после 2 секунд текст возвращается в исходное состояние.

const btnBuyEl = document.querySelector(".btn__buy");
btnBuyEl.addEventListener("click", function (event) {
  if (event.isTrusted) {
    btnBuyEl.textContent = "Товар добавлен в корзину";
    setTimeout(function () {
      btnBuyEl.textContent = "Купить";
    }, 2000);
  }
});
const clickEvent = new Event("click");

// Вызываем обработчик события
btnBuyEl.dispatchEvent(clickEvent);
