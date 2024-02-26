import placeholder from "../../assets/images/placeholder.png";
import heart from "../../assets/icons/heart-small.svg";
import rating from "../../assets/images/rating.svg";
import coupon from "../../assets/images/coupon.svg";
import standard from "../../assets/images/standard.svg";

import "./productCard.scss";

export function ProductCard (product) {
  const url = "/categories/" + product.mastercategory.slug + "/" + product.category.slug + "/" + product.subcategory.slug + "/" + product.slug;
  const image = product.file_path
    ? `https://api.yourbasket.co.ke/${product.file_path}`
    : placeholder;

  const costPrice = parseFloat(product.cost_price).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
  const offerPrice = parseFloat(product.offer_price).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
  const getDiscountRate = () => Math.floor(0 - ((costPrice - offerPrice) / costPrice) * 100, 100);
  const discount = product.cost_price && product.offer_price && getDiscountRate() > 0 ? getDiscountRate() : null;

  const KES = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0
  });

  const productName = product.name.length > 60 ? product.name.substring(0, 60) + "..." : product.name;
  const productDescription = product.description.split(" ").length > 15 ? product.description.split(" ").slice(0, 15).join(" ") + "..." : product.description;

  return `
        <div class="product-card-container">
            <a class="product-card" id="${product.id}" data-route="${url}">
                <div class="product-card__icons">
                    <div class="discount">
                        ${discount ? `<span>${discount}% OFF</span>` : ""}
                    </div>
                    <div class="icons">
                        <div class="icon">
                            <img src="${heart}" alt="Discount price"/>
                        </div>
                    </div>
                </div>
                <div class="product-card__image">
                    <img src="${image}" alt="${product.file_name}" class="img"/>
                </div>
                <div class="product-card__details">
                    <div class="text">
                        <h4 class="text__title">${productName}</h4>
                        <p class="text__description">${productDescription}</p>
                    </div>
                    <div class="price">
                        ${product.offer_price ? `<div class="price__current">${KES.format(product.offer_price)}</div>` : ""}
                        ${(discount || !product.offer_price) && product.cost_price ? `<div class="price__initial">${KES.format(product.cost_price)}</div>` : ""}
                    </div>
                    <div class="rating">
                        <span class="srt">4.19 out of 5 stars based on  reviews</span>
                        <svg aria-hidden="true" class="icon is-medium">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                        </svg>
                        <svg aria-hidden="true" class="icon is-medium">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                        </svg>
                        <svg aria-hidden="true" class="icon is-medium">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                        </svg>
                        <svg aria-hidden="true" class="icon is-medium">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                        </svg>
                        <svg aria-hidden="true" class="icon is-medium">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                        </svg>
                        <svg aria-hidden="true" class="icon is-medium">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                        </svg>
                        <div class="rating__stars rating__stars--filled">
                        </div>
        <!--                <img src="${standard}" alt="standard icon">-->
        <!--                <img src="${rating}" alt="rating icon">-->
                    </div>
        <!--            <img src="${coupon}" alt="coupon icon">-->
                </div>
            </a>
        </div>
    `;
}
