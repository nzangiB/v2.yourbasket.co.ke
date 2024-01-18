import { Nav } from "../../components/nav/nav";
import { Hero } from "../../components/hero/hero";
import { TopCategories } from "../../components/topCategories/topCategories";
import { Deals } from "../../components/deals/deals";
import { ClearanceSale } from "../../components/clearanceSale.js/clearanceSale";
import { Recommended } from "../../components/recommended/recommended";
import { Carousel } from "../../components/carousel/carousel";
import { Signup } from "../../components/signup/signup";
import { Featured } from "../../components/featured/featured";
import { Footer } from "../../components/footer/footer";

import "./home.scss";

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
