import { Nav } from "../../components/Nav/Nav";
import { Hero } from "../../components/Hero/Hero";
import { TopCategories } from "../../components/TopCategories/TopCategories";
import { Deals } from "../../components/Deals/Deals";
import { ClearanceSale } from "../../components/ClearanceSale.js/ClearanceSale";
import { Recommended } from "../../components/Recommended/Recommended";
import { Carousel } from "../../components/Carousel/Carousel";
import { Signup } from "../../components/Signup/Signup";
import { Featured } from "../../components/Featured/Featured";
import { Footer } from "../../components/Footer/Footer";

import './home.scss';

export function Home (props) {
    return `
    <div class="container">
      ${Nav()}
      ${Hero()}
      ${TopCategories()}
      ${Deals()}
      ${ClearanceSale()}
      ${Recommended()}
      ${Carousel()}
      ${Featured()}
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

