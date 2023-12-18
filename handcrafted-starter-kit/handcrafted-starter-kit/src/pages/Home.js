import { Nav } from "../components/nav/nav";
import { Hero } from "../components/hero/hero";
import {productCard} from "../components/productCard/productCard"

import './Home.scss';

export function Home (props) {
    return `
    <div class="container">
      ${Nav()}
      ${Hero()}
      ${productCard()}
    </div>
    `;
}

