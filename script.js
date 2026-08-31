/*
=====================================
REMEMBERA — EMAILJS
=====================================
*/


const EMAILJS_PUBLIC_KEY =
  "-w9MQX60NSE-YBPqt";


const EMAILJS_SERVICE_ID =
  "service_xxjx108";


const EMAILJS_TEMPLATE_ID =
  "template_l5g6cba";



/*
=====================================
ПОДКЛЮЧАЕМ EMAILJS
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

  card.addEventListener(
    "click",
    () => {


      /*
      Убираем старое выделение
      */

      flowerCards.forEach(
        (item) => {

          item.classList.remove(
            "selected"
          );

        }
      );



      /*
      Выделяем новые цветы
      */

      card.classList.add(
        "selected"
      );



      /*
      Получаем название цветов
      */

      const flower =
        card.dataset.flower;



      /*
      Сохраняем выбор
      */

      selectedFlowerInput.value =
        flower;



      /*
      Показываем возле формы
      */

      summaryFlower.textContent =
        flower;



      /*
      Переходим к форме
      */

      setTimeout(
        () => {

          const orderSection =
            document.getElementById(
              "order"
            );


          if (orderSection) {

            orderSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        },
        250
      );


    }
  );

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
          document.getElementById(
            "flowers"
          );


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
      Получаем элементы формы
      */

      const emailElement =
        document.getElementById(
          "email"
        );


      const personNameElement =
        document.getElementById(
          "personName"
        );


      const countryElement =
        document.getElementById(
          "country"
        );


      const cityElement =
        document.getElementById(
          "city"
        );


      const cemeteryElement =
        document.getElementById(
          "cemetery"
        );


      const graveElement =
        document.getElementById(
          "grave"
        );


      const messageElement =
        document.getElementById(
          "message"
        );



      /*
      Получаем значения
      */

      const email =
        emailElement.value.trim();


      const personName =
        personNameElement.value.trim();


      const country =
        countryElement.value.trim();


      const city =
        cityElement.value.trim();


      const cemetery =
        cemeteryElement.value.trim();


      const grave =
        graveElement.value.trim();


      const message =
        messageElement.value.trim();


      const flower =
        selectedFlowerInput.value;



      /*
      Дополнительная проверка email
      */

      if (!email) {

        alert(
          "Пожалуйста, укажите ваш email."
        );

        return;

      }



      /*
      Блокируем кнопку
      */

      submitButton.disabled =
        true;


      submitButton.textContent =
        "Отправляем…";



      /*
      Данные для EmailJS
      */

      const templateParams = {

        /*
        Используется в:
        To Email = {{email}}
        */

        email: email,


        /*
        Используется в письме:
        {{flower}}
        */

        flower: flower,


        /*
        Остальные данные
        уже передаём на будущее
        */

        person_name:
          personName,

        country:
          country,

        city:
          city,

        cemetery:
          cemetery ||
          "Не указано",

        grave:
          grave ||
          "Не указано",

        message:
          message ||
          "Не указано"

      };



      console.log(
        "Remembera: отправляем письмо",
        templateParams
      );



      try {


        /*
        EMAILJS
        */

        const response =
          await emailjs.send(

            EMAILJS_SERVICE_ID,

            EMAILJS_TEMPLATE_ID,

            templateParams

          );



        console.log(
          "EmailJS success:",
          response
        );



        /*
        Успех
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
        Показываем реальную
        ошибку EmailJS
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

            status =
              error.status;

          }


          if (error.text) {

            text =
              error.text;

          }

          else if (
            error.message
          ) {

            text =
              error.message;

          }

          else {

            try {

              text =
                JSON.stringify(
                  error
                );

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


        /*
        Возвращаем кнопку
        */

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


      /*
      Очищаем форму
      */

      orderForm.reset();



      /*
      Показываем её снова
      */

      orderForm.style.display =
        "block";


      successMessage
        .classList
        .remove(
          "visible"
        );



      /*
      Убираем выбор цветов
      */

      flowerCards.forEach(
        (card) => {

          card.classList.remove(
            "selected"
          );

        }
      );



      /*
      Очищаем выбранные цветы
      */

      selectedFlowerInput.value =
        "";


      summaryFlower.textContent =
        "Цветы пока не выбраны";



      /*
      Возвращаем пользователя
      к цветам
      */

      const flowersSection =
        document.getElementById(
          "flowers"
        );


      if (flowersSection) {

        flowersSection.scrollIntoView({
          behavior: "smooth"
        });

      }


    }
  );

}