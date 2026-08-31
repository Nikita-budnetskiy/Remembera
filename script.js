const flowerCards =
  document.querySelectorAll(".flower-card");

const selectedFlowerInput =
  document.getElementById("selectedFlowerInput");

const selectedPriceInput =
  document.getElementById("selectedPriceInput");

const summaryFlower =
  document.getElementById("summaryFlower");

const summaryPrice =
  document.getElementById("summaryPrice");

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
---------------------------------------
ТЕКУЩИЙ ГОД
---------------------------------------
*/

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/*
---------------------------------------
ВЫБОР ЦВЕТОВ
---------------------------------------
*/

flowerCards.forEach((card) => {

  card.addEventListener("click", () => {

    flowerCards.forEach((item) => {
      item.classList.remove("selected");
    });


    card.classList.add("selected");


    const flower =
      card.dataset.flower;

    const price =
      card.dataset.price;


    selectedFlowerInput.value =
      flower;

    selectedPriceInput.value =
      price + " €";


    summaryFlower.textContent =
      flower;

    summaryPrice.textContent =
      price.replace(".", ",") + " €";


    /*
    Плавно прокручиваем
    пользователя к форме
    */

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
---------------------------------------
ОТПРАВКА ФОРМЫ
---------------------------------------
*/

if (orderForm) {

  orderForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      /*
      Проверяем,
      выбраны ли цветы
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
      Меняем текст кнопки
      */

      submitButton.disabled = true;

      submitButton.textContent =
        "Отправляем…";


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
                Accept: "application/json"
              }
            }
          );


        if (response.ok) {

          orderForm.style.display =
            "none";

          successMessage
            .classList
            .add("visible");

        }

        else {

          alert(
            "Не удалось отправить запрос. Пожалуйста, попробуйте ещё раз."
          );

        }

      }

      catch (error) {

        console.error(error);

        alert(
          "Произошла ошибка соединения. Пожалуйста, попробуйте позже."
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
---------------------------------------
НОВЫЙ ЗАКАЗ
---------------------------------------
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


      flowerCards.forEach((card) => {
        card.classList.remove("selected");
      });


      selectedFlowerInput.value =
        "";

      selectedPriceInput.value =
        "";


      summaryFlower.textContent =
        "Цветы пока не выбраны";

      summaryPrice.textContent =
        "—";


      document
        .getElementById("flowers")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}