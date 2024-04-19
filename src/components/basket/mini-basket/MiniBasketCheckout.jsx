import { useEffect, useState } from 'react';

import DataService from '../../../services/data.service';
import AuthService from '../../../services/auth.service';

import OrderList from '../orders/OrderList';
import OrderSummary from '../orders/OrderSummary';
import PaymentMethodsListDetailed from '../payments/PaymentMethodsListDetailed';

import './MiniBasketCheckout.scss';

function MiniBasketCheckout ({ loading, setLoading, params, query, cart, getCart, subTotal, step, setStep, ...props }) {
	// const [loading, setLoading] = useState(true);
	const [buyNow, setBuyNow] = useState(false);
	const [cartData, setCartData] = useState([]);
	const [total, setTotal] = useState(0);

	const auth = AuthService.getCurrentUser();
	const redirectURL = new URL(window.location.href);
	redirectURL.searchParams.set('basket', 'checkout');
	const loginUrl = '/login?url=' + encodeURIComponent(redirectURL.toString());

	const getProduct = async () => {
		await DataService.getCart('cart').then((data) => {
			const response = data?.data?.data;
			setCartData(response);

			const total = 0;
			response.forEach(value => {
				const price = parseFloat(value.price) * parseInt(value.quantity);
				setTotal(total + price);
			});
		}).catch((error) => {
			const resMessage = (error.response?.data?.msg) || error.message || error.toString();
			console.error(resMessage);
		});
	};

	const getTempProduct = async () => {
		await DataService.getTempCart().then((data) => {
			const response = data?.data?.data;
			setCartData(data?.data?.data);

			const total = 0;
			response.forEach(value => {
				const price = parseFloat(value.price) * parseInt(value.quantity);
				setTotal(total + price);
			});
		}).catch((error) => {
			const resMessage = (error.response?.data?.msg) || error.message || error.toString();
			console.error(resMessage);
		});
	};

	useEffect(() => {
		if (!auth) {
			location.href = loginUrl;
		} else {
			// if (!step.startsWith("checkout/")) {
			//   getCart().then(() => { setLoading(false); });
			// } else {
			getCart();
			// setLoading(false);
			// }
			// if (query?.buynow) {
			//   setBuyNow(true);
			//   getTempProduct();
			// } else {
			//   getProduct();
			// }
		}
	}, [step, subTotal]);

	useEffect(() => {
		const component = document.getElementById(props.id);
		const scrollable = component?.querySelector('.mini-basket');
		if (scrollable) scrollable.scrollTop = 0;
	}, [step]);

	if (loading) {
		return (
			<section className="mini-basket__checkout">
				<div className="message">
					<span>Loading...</span>
				</div>
			</section>
		);
	}

	return !loading && (
		<section className="mini-basket__checkout">
			{auth && (
				<div className="auth">
					<p className="text">
						You are paying as <span>{auth.email}</span>.
						&nbsp;
						<a className="btn --link" rel="noopener follow" href={loginUrl}>Not you?</a>
					</p>
				</div>
			)}

			<div className={'order'}>
				<OrderList {...{ cart, getCart, setStep, disabled: true, editable: true }}/>
				{cart.length > 0 && <OrderSummary {...{ subTotal, total, setTotal }}/>}
			</div>

			{cart.length > 0 && (
				<div className={'payment'}>
					<div className="payment__methods">
						<div className="payment__methods-title">
							<div className="title">Payment</div>
						</div>
						<PaymentMethodsListDetailed {...{ step, setStep, buyNow, total }}/>
					</div>
				</div>
			)}
		</section>
	);
}

export default MiniBasketCheckout;
