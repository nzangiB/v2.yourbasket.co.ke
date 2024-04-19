import { createRoot } from 'react-dom/client';
import { Component } from '@wearearchangel/handcrafted';

import Layout from './_layout';
import MiniBasket from '../../components/basket/mini-basket/MiniBasket';
import MiniBasketReceipt from '../../components/basket/mini-basket/MiniBasketReceipt';

import './basket.scss';

function BasketPage (props) {
	return (
		<Layout>
			<MiniBasket/>
		</Layout>
	);
}

function CheckoutPage (props) {
	return (
		<Layout>
			<h1>Checkout</h1>
		</Layout>
	);
}

function ReceiptPage (props) {
	return (
		<Layout>
			<MiniBasketReceipt/>
		</Layout>
	);
}

class Basket extends Component {
	controller ({ component }) {
		const root = this.root !== null ? this.root : createRoot(component);
		root.render(<BasketPage {...this.props}/>);
	}
}

class Checkout extends Component {
	controller ({ component }) {
		const root = this.root !== null ? this.root : createRoot(component);
		root.render(<CheckoutPage {...this.props}/>);
	}
}

class Receipt extends Component {
	controller ({ component }) {
		const root = this.root !== null ? this.root : createRoot(component);
		root.render(<ReceiptPage {...this.props}/>);
	}
}

const routes = [
	{ path: '/basket{/}?', template: Basket },
	{ path: '/basket/checkout', template: Checkout },
	{ path: '/basket/receipt', template: Receipt }
];

export default routes;
