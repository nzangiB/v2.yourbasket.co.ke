import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';

import './cartCoupon.scss';

export function CartCoupon (props) {
    return `
    <div class="container">
        ${Nav()}
        ${Footer()}
    </div>
    `;
}

