import rightArrow from "../../assets/icons/arrow_right_blue.svg"
import leftArrow from "../../assets/icons/arrow_left_dark.svg"
import galleryItem from "../../assets/images/gallery-item.jpg"

import './topCategories.scss';

export function TopCategories (props) {
    return `
    <div class="Categories__container">
        <div class="Categories__title  product-title">
            <p>SHOP OUR TOP CATEGORIES</p>
            <div class="Categories__arrows">
                <a href="#"><img src="${leftArrow}" alt="left arrow"></a>
                <a href="#"><img src="${rightArrow}" alt="right arrow"></a>
            </div>
        </div>

        <div class="Categories__gallery">
            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Home audio</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Refrigerators</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Television</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Smart phones</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Appliances</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Home &amp; Kitchen</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Laptops</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Headphones</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${galleryItem}" alt="gallery image">
                </div>
                <p>Furniture</p>
            </div>
        </div>
        


    </div>
    `;
}

