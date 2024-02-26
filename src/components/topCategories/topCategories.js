import placeholder from "../../assets/images/placeholder.png";
import rightArrow from "../../assets/icons/arrow_right_blue.svg";
import leftArrow from "../../assets/icons/arrow_left_dark.svg";

import "./topCategories.scss";

function TopCategory (category) {
  const image = category.file_path
    ? `https://api.yourbasket.co.ke/${category.file_path}`
    : placeholder;

  return `
    <a href="/categories/${category.slug}" class="gallery__item">
        <div class="gallery__image">
            <img src=${image} class="w-100" alt="${category.name}" />
        </div>
        <p>${category.name}</p>
    </a>
  `;
}

export function TopCategories (props) {
  const { topCategories } = props;

  return `
    <div class="topCategories">
        <div class="topCategories__title">
            <p>SHOP OUR TOP CATEGORIES</p>
            <div class="topCategories__arrows">
                <a href="#"><img src="${leftArrow}" alt="left arrow"></a>
                <a href="#"><img src="${rightArrow}" alt="right arrow"></a>
            </div>
        </div>

        <div class="topCategories__gallery">
            ${topCategories && topCategories.length > 0 ? topCategories.map(TopCategory).join("") : ""}
        </div>
    </div>
  `;
}
