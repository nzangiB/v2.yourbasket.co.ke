import { Nav } from "../../components/Nav/Nav";
import { Hero } from "../../components/Hero/Hero";
import { TopCategories } from "../../components/TopCategories/TopCategories";
import { Deals } from "../../components/deals/deals";
import { clearanceSale } from "../../components/clearanceSale.js/clearanceSale";
import { Recommended } from "../../components/Recommended/Recommended";
import { Carousel } from "../../components/carousel/carousel";
import { Signup } from "../../components/Signup/Signup";
import { Featured } from "../../components/featured/featured";
import { Footer } from "../../components/Footer/Footer";

import './home.scss';

export function Home (props) {
    return `
    <div class="container">
      ${Nav()}
      ${Hero()}
      ${TopCategories()}
      ${Deals()}
      ${clearanceSale()}
      ${Recommended()}
      ${Carousel()}
      ${Featured()}
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

