export const openBasketEvent = (event, step) => {
  event?.preventDefault();

  const basket = document.getElementById("basket");
  if (basket) basket.dataset.step = step;
};

export const closeBasketEvent = (event) => {
  event?.preventDefault();

  const basket = document.getElementById("basket");
  if (basket) basket.dataset.step = "";
};
