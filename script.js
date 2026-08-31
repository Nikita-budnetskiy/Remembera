/*
=====================================
REMEMBERA — EMAILJS
=====================================
*/

const EMAILJS_PUBLIC_KEY =
  "-w9MQX60NSE-YBPqt";

const EMAILJS_SERVICE_ID =
  "service_xxjx108";

const USER_TEMPLATE_ID =
  "template_l5g6cba";

const ADMIN_TEMPLATE_ID =
  "template_ax76bnx";


/*
=====================================
ИНИЦИАЛИЗАЦИЯ EMAILJS
=====================================
*/

if (typeof emailjs === "undefined") {

  alert(
    "Не удалось загрузить сервис отправки писем. Пожалуйста, обновите страницу."
  );

} else {

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });

}


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

      const orderSection =
        document.getElementById("order");

      if (orderSection) {

        orderSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }, 250);

  });

});


/*
=====================================
ОТПРАВКА ФОРМЫ
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

      if (
        !selectedFlowerInput ||
        !selectedFlowerInput.value
      ) {

        alert(
          "Пожалуйста, сначала выберите цветы."
        );

        const flowersSection =
          document.getElementById("flowers");

        if (flowersSection) {

          flowersSection.scrollIntoView({
            behavior: "smooth"
          });

        }

        return;
      }


      /*
      Проверяем EmailJS
      */

      if (
        typeof emailjs ===
        "undefined"
      ) {

        alert(
          "Сервис отправки писем не загрузился. Обновите страницу и попробуйте ещё раз."
        );

        return;
      }


      /*
      Получаем значения формы
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
      Проверяем email
      */

      if (!email) {

        alert(
          "Пожалуйста, укажите ваш email."
        );

        return;
      }


      /*
      Данные для обоих шаблонов
      */

      const templateParams = {

        email: email,

        flower: flower,

        person_name:
          personName,

        country:
          country,

        city:
          city,

        cemetery:
          cemetery || "Не указано",

        grave:
          grave || "Не указано",

        message:
          message || "Не указано"

      };


      /*
      Блокируем кнопку
      */

      submitButton.disabled =
        true;

      submitButton.textContent =
        "Отправляем…";


      try {

        /*
        1. ПИСЬМО ПОЛЬЗОВАТЕЛЮ
        */

        const userResponse =
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            USER_TEMPLATE_ID,
            templateParams
          );

        console.log(
          "Письмо пользователю отправлено:",
          userResponse
        );


        /*
        2. ПИСЬМО АДМИНИСТРАТОРУ
        */

        try {

          const adminResponse =
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              ADMIN_TEMPLATE_ID,
              templateParams
            );

          console.log(
            "Письмо администратору отправлено:",
            adminResponse
          );

        }

        catch (adminError) {

          /*
          Пользователю уже всё отправилось,
          поэтому не показываем ему ошибку.
          */

          console.error(
            "Ошибка отправки админского письма:",
            adminError
          );

        }


        /*
        ПОКАЗЫВАЕМ УСПЕХ
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

        /*
        Если не отправилось именно
        письмо пользователю
        */

        console.error(
          "EmailJS error:",
          error
        );

        let status =
          "неизвестно";

        let text =
          "Неизвестная ошибка";

        if (error) {

          if (error.status) {
            status = error.status;
          }

          if (error.text) {
            text = error.text;
          }

          else if (error.message) {
            text = error.message;
          }

          else {

            try {

              text =
                JSON.stringify(error);

            }

            catch {

              text =
                String(error);

            }

          }

        }

        alert(
          "Ошибка EmailJS\n\n" +
          "Статус: " +
          status +
          "\n\n" +
          "Текст: " +
          text
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
НОВАЯ ЗАЯВКА
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

      const flowersSection =
        document.getElementById("flowers");

      if (flowersSection) {

        flowersSection.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

}