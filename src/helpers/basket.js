export const openBasketEvent = ({ event, step }) => {
  event?.preventDefault();

  const basket = document.getElementById("basket");
  basket.dataset.step = step;

  const miniBasket = basket.querySelector(".mini-basket");
  if (miniBasket.classList.contains("--visible")) {
    miniBasket.classList.replace("--invisible", "--visible");
  } else {
    miniBasket.classList.add("--visible");
  }
};

export const closeBasketEvent = (e) => {
  e.preventDefault();

  const basket = document.getElementById("basket");
  const miniBasket = basket.querySelector(".mini-basket");
  miniBasket.classList.replace("--visible", "--invisible");
};
