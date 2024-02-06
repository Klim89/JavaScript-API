// Задание 4

// Вам предоставляется задача создать простой онлайн опросник, который позволяет пользователям
// отвечать на вопросы с вариантами ответов. Ваша задача - разработать интерфейс и функциональность
// для этого опросника, используя HTML, CSS и JavaScript.
// 1. Создайте интерфейс с несколькими вопросами и вариантами ответов. Каждый вопрос должен
// иметь несколько вариантов ответов.
// 2. Реализуйте обработку событий, чтобы пользователи могли выбирать варианты ответов.
// 3. Добавьте кнопку "Завершить опрос", которая будет показывать результаты опроса.
// 4. При нажатии на кнопку "Завершить опрос", вы должны проверить, что пользователь ответил на все
// вопросы, и отобразить выбранные им варианты ответов.
// 5. Если пользователь не ответил на все вопросы, покажите ему сообщение о необходимости ответить
// на все вопросы перед завершением опроса.
// 6. По желанию можно добавить стилизацию опросника с использованием CSS для лучшего
// пользовательского опыта.

const questionsEl = document.querySelectorAll(".question");
const btnSubmitEl = document.getElementById("submit");
const resultEl = document.querySelector(".result");
const errorTextEl = document.querySelector(".errortext");
btnSubmitEl.addEventListener("click", function () {
  const resultArray = [];
  questionsEl.forEach((questionEl) => {
    const valueInput = questionEl.querySelector("input:checked")?.value;
    if (valueInput === undefined) {
      questionEl.classList.add("error");
    } else {
      questionEl.classList.remove("error");
      resultArray.push(valueInput);
    }
  });
  if (resultArray.length === questionsEl.length) {
    resultEl.style.removeProperty("display");

    resultArray.forEach((answer, index) => {
      resultEl.insertAdjacentHTML(
        "beforeend",
        `
        <p id="result-q${index + 1}">Вопрос ${
          index + 1
        }: <span>${answer}</span></p>`
      );
    });
    btnSubmitEl.disabled = true;
    errorTextEl.textContent = "ответил на все вопросы";
  } else {
    errorTextEl.textContent = "не на все вопросы получены ответы";
  }
});
