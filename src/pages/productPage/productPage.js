import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { productInfo } from '../../components/productInfo/productInfo';
import { moreDeals } from '../../components/moreDeals/moreDeals';
import { Signup } from '../../components/signup/signup';
import { Advert } from '../../components/advert/advert';

import { productPageModal } from '../../components/modals/productPageModal/productPageModal';

import './productPage.scss';

export function ProductPage (props) {
  const { params } = props;
  const id = params.id;

  return `
    <div class="container productPage__container">
      ${Nav()}
      ${productInfo()}
      <!--${productPageModal()}-->
      ${moreDeals()}
      ${Advert()}
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

