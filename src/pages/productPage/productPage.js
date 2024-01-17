import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { ProductInfo } from '../../components/productInfo/productInfo';
import { MoreDeals } from '../../components/moreDeals/moreDeals';
import { Signup } from '../../components/signup/signup';
import { Advert } from '../../components/advert/advert';

import { ProductPageModal } from '../../components/modals/productPageModal/productPageModal';

import './productPage.scss';

export function ProductPage (props) {
  const { params } = props;
  const id = params.id;

  return `
    <div class="container productPage__container">
      ${Nav()}
      ${ProductInfo({id})}
      <!--${ProductPageModal({id})}-->
      ${MoreDeals()}
      ${Advert()}
      ${Signup()}
      ${Footer()}
    </div>
    `;
}

