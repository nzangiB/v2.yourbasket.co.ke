import { Nav } from "../components/nav/nav";
import { Hero } from "../components/hero/hero";
import { TopCategories } from "../components/topcategories/topcategories";

import './Home.scss';

export function Home (props) {
    return `
    <div class="container">
      ${Nav()}
      ${Hero()}
      ${TopCategories()}
    </div>
    `;
}

