import { Nav } from '../../components/Nav/Nav';
import { Footer } from '../../components/Footer/Footer';
import { ProductInfo } from '../../components/ProductInfo/ProductInfo';
import { MoreDeals } from '../../components/moreDeals/moreDeals';
import { Signup } from '../../components/Signup/Signup';
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

