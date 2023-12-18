import './topcategories.scss';
import ArrowR from "../../assets/icons/arrow_right_blue.svg"
import Leftarrow from "../../assets/icons/arrow_left.svg"
import Galleryitem from "../../assets/images/gallery_item.jpg"

export function TopCategories (props) {
    return `
    <div class="Categories__container">
        <div class="Categories__title">
            <p>SHOP OUR TOP CATEGORIES</p>
            <div class="Categories__arrows>
                <h1>HEY</h1>
                <img src="${Leftarrow}" alt="right arrow">
            </div>
        </div>

        <div class="Categories__gallery">
            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Home audio</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Refrigerators</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Television</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Smart phones</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Appliances</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Home &amp; Kitchen</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Laptops &amp; Desktops</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Headphones</p>
            </div>

            <div class="gallery__item">
                <div class="gallery__image">
                    <img src="${Galleryitem}" alt="gallery image">
                </div>
                <p>Furniture</p>
            </div>
        </div>
        


    </div>
    `;
}

