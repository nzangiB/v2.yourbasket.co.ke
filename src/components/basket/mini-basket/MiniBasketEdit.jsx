import { useEffect, useState } from 'react';

import OrderList from '../orders/OrderList';
import OrderSummary from '../orders/OrderSummary';
import PaymentMethodsList from '../payments/PaymentMethodsList';

import './MiniBasketEdit.scss';

function MiniBasketEdit ({ cart, setCart, getCart, subTotal, setSubTotal, total, setTotal, step, setStep, ...props }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const component = document.getElementById(props.id);
		const scrollable = component?.querySelector('.mini-basket');
		if (scrollable) scrollable.scrollTop = 0;
	}, [step]);

	const checkoutNowEvent = (e) => {
		setStep('checkout');
	};

	const checkoutLaterEvent = (e) => {
		setStep('checkout/later');
	};

	useEffect(() => {
		getCart().then(() => { setLoading(false); });
	}, [step, subTotal]);

	if (loading) {
		return (
			<section className="mini-basket__edit">
				<div className="message">
					<span>Loading...</span>
				</div>
			</section>
		);
	}

	return !loading && (
		<section className="mini-basket__edit">
			<OrderList {...{ cart, setCart, getCart, setStep }}/>

			{cart.length > 0 && (
				<>
					<section className="payment">
						<div className="payment__methods">
							<div className="payment__methods-title">
								<div className="title">Accepted Payment Methods</div>
							</div>
							<PaymentMethodsList/>
						</div>
						<OrderSummary {...{ subTotal, setSubTotal, total, setTotal }}/>
					</section>

					<section className="btn-group">
						<button className="btn --primary" onClick={checkoutNowEvent}>
							<span>Checkout Now</span>
						</button>
						<div className="text">
							<span>or</span>
						</div>
						<button className="btn --secondary" disabled={true} onClick={checkoutLaterEvent}>
							<object data={require('../icons/calendar.svg')} name={'Checkout Later'}/>
							<span>Checkout Later</span>
						</button>
					</section>
				</>
			)}
		</section>
	);
}

export default MiniBasketEdit;
