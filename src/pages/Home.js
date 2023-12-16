import { Nav } from "../components/nav/nav";
import { Hero } from "../components/hero/hero";

import './Home.scss';

export function Home (props) {
    return `
    <div class="container">
      ${Nav()}
      ${Hero()}
    </div>
    `;
}

