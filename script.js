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
      Снимаем выделение
      с остальных карточек
      */

      flowerCards.forEach(
        (item) => {

          item.classList.remove(
            "selected"
          );

        }
      );



      /*
      Выделяем выбранную
      */

      card.classList.add(
        "selected"
      );



      const flower =
        card.dataset.flower;



      /*
      Сохраняем название
      в скрытое поле формы
      */

      selectedFlowerInput.value =
        flower;



      /*
      Показываем выбор
      рядом с формой
      */

      summaryFlower.textContent =
        flower;



      /*
      Через небольшой момент
      прокручиваем к форме
      */

      setTimeout(() => {

        document
          .getElementById("order")
          .scrollIntoView({

            behavior: "smooth",

            block: "start"

          });

      }, 250);


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
      Проверяем,
      были ли выбраны цветы
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

      submitButton.disabled =
        true;


      submitButton.textContent =
        "Отправляем…";



      /*
      Получаем данные формы
      */

      const formData =
        new FormData(orderForm);



      try {


        const response =
          await fetch(

            orderForm.action,

            {

              method: "POST",

              body: formData,

              headers: {

                Accept:
                  "application/json"

              }

            }

          );



        /*
        Успешная отправка
        */

        if (response.ok) {


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



        /*
        Ошибка сервиса формы
        */

        else {


          alert(
            "Не удалось отправить запрос. Пожалуйста, попробуйте ещё раз."
          );


        }


      }



      /*
      Ошибка соединения
      */

      catch (error) {


        console.error(error);


        alert(
          "Произошла ошибка соединения. Пожалуйста, попробуйте позже."
        );


      }



      /*
      Возвращаем кнопку
      */

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


      /*
      Очищаем форму
      */

      orderForm.reset();



      /*
      Возвращаем форму
      */

      orderForm.style.display =
        "block";


      successMessage
        .classList
        .remove("visible");



      /*
      Снимаем выбранные цветы
      */

      flowerCards.forEach(
        (card) => {

          card.classList.remove(
            "selected"
          );

        }
      );



      /*
      Очищаем значение
      */

      selectedFlowerInput.value =
        "";


      summaryFlower.textContent =
        "Цветы пока не выбраны";



      /*
      Возвращаем пользователя
      к выбору цветов
      */

      document
        .getElementById("flowers")
        .scrollIntoView({

          behavior: "smooth"

        });


    }
  );

}