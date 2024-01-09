import { Nav } from '../../components/Nav/Nav';
import { Footer } from '../../components/Footer/Footer';
import { productInfo } from '../../components/ProductInfo/ProductInfo';
import { moreDeals } from '../../components/moreDeals/moreDeals';
import { Signup } from '../../components/Signup/Signup';
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

