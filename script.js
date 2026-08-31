/*
=====================================
EMAILJS
=====================================
*/

emailjs.init({
  publicKey: "-w9MOX60NSE-YBPqt"
});


const EMAILJS_SERVICE_ID =
  "service_xxjx108";

const EMAILJS_TEMPLATE_ID =
  "template_l5g6cba";


/*
=====================================
ЭЛЕМЕНТЫ СТРАНИЦЫ
=====================================
*/

const flowerCards =
  document.querySelectorAll(".flower-card");

const selectedFlowerInput =
  document.getElementById("selectedFlowerInput");

const summaryFlower =
  document.getElementById("summaryFlower");

const orderForm =
  document.getElementById("orderForm");

const successMessage =
  document.getElementById("successMessage");

const newOrderButton =
  document.getElementById("newOrderButton");

const submitButton =
  document.getElementById("submitButton");

const currentYear =
  document.getElementById("currentYear");


/*
=====================================
ТЕКУЩИЙ ГОД
=====================================
*/

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/*
=====================================
ВЫБОР ЦВЕТОВ
=====================================
*/

flowerCards.forEach((card) => {

  card.addEventListener("click", () => {

    flowerCards.forEach((item) => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");

    const flower =
      card.dataset.flower;

    selectedFlowerInput.value =
      flower;

    summaryFlower.textContent =
      flower;

    setTimeout(() => {

      document
        .getElementById("order")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }, 250);

  });

});


/*
=====================================
ОТПРАВКА ЗАЯВКИ
=====================================
*/

if (orderForm) {

  orderForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      /*
      Проверяем выбор цветов
      */

      if (!selectedFlowerInput.value) {

        alert(
          "Пожалуйста, сначала выберите цветы."
        );

        document
          .getElementById("flowers")
          .scrollIntoView({
            behavior: "smooth"
          });

        return;
      }


      /*
      Блокируем кнопку
      */

      submitButton.disabled = true;

      submitButton.textContent =
        "Отправляем…";


      /*
      Данные посетителя
      */

      const email =
        document
          .getElementById("email")
          .value
          .trim();

      const personName =
        document
          .getElementById("personName")
          .value
          .trim();

      const country =
        document
          .getElementById("country")
          .value
          .trim();

      const city =
        document
          .getElementById("city")
          .value
          .trim();

      const cemetery =
        document
          .getElementById("cemetery")
          .value
          .trim();

      const grave =
        document
          .getElementById("grave")
          .value
          .trim();

      const message =
        document
          .getElementById("message")
          .value
          .trim();

      const flower =
        selectedFlowerInput.value;


      /*
      Переменные для EmailJS
      */

      const templateParams = {

        email: email,

        flower: flower,

        person_name: personName,

        country: country,

        city: city,

        cemetery:
          cemetery || "Не указано",

        grave:
          grave || "Не указано",

        message:
          message || "Не указано"

      };


      try {

        /*
        Отправляем письмо
        на email посетителя
        */

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );


        /*
        Показываем успешную отправку
        */

        orderForm.style.display =
          "none";

        successMessage
          .classList
          .add("visible");

        successMessage
          .scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

      }

      catch (error) {

        console.error(
          "EmailJS error:",
          error
        );

        alert(
          "Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз."
        );

      }

      finally {

        submitButton.disabled =
          false;

        submitButton.textContent =
          "Оставить виртуальные цветы";

      }

    }
  );

}


/*
=====================================
НОВЫЙ ЗАПРОС
=====================================
*/

if (newOrderButton) {

  newOrderButton.addEventListener(
    "click",
    () => {

      orderForm.reset();

      orderForm.style.display =
        "block";

      successMessage
        .classList
        .remove("visible");

      flowerCards.forEach(
        (card) => {

          card.classList.remove(
            "selected"
          );

        }
      );

      selectedFlowerInput.value =
        "";

      summaryFlower.textContent =
        "Цветы пока не выбраны";

      document
        .getElementById("flowers")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}