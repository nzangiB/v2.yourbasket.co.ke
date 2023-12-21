import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { productInfo } from '../../components/productInfo/productInfo';
import { moreDeals } from '../../components/moreDeals/moreDeals';
import { Signup } from '../../components/signup/signup';
import { Advert } from '../../components/advert/advert';

import './productPage.scss';

export function productPage (props) {
    return `
    <div class="container productPage__container">
      ${Nav()}
      ${productInfo()}
      ${moreDeals()}
      ${Advert()}
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

