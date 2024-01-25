import { ProductCard } from "../ProductCard/ProductCard";

import "./recommended.scss";

export function Recommended (props) {
  return `
    <div class="recommended">
        <div class="recommended__header">
            <h1 class="recommended__title">DEALS ON ELECTRONICS</h1>
            <a href="#" class="recommended__button">
                <span>See More</span>
            </a>
        </div>
        ${ProductCard()}
    </div>
    `;
}
