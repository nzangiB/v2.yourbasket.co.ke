import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MiniBasketEdit from './MiniBasketEdit';
import MiniBasketCheckout from './MiniBasketCheckout';
import MiniBasketReceipt from './MiniBasketReceipt';

import DataService from '../../../services/data.service';
import HelperService from '../../../services/helper.service';
import AuthService from '../../../services/auth.service';

import { closeBasketEvent } from '../../../helpers/basket';

import './MiniBasket.scss';

function MiniBasket ({ step, setStep, ...props }) {
	const [loading, setLoading] = useState(false);
	const [cart, setCart] = useState([]);
	const [subTotal, setSubTotal] = useState(0);
	const [total, setTotal] = useState(0);

	const className = ['mini-basket', step && '--visible'].filter(Boolean).join(' ');

	const getCartGlobal = async () => {
		let total = 0;
		await DataService.getCart('cart').then((data) => {
			const response = data?.data?.data;
			response.forEach((value) => {
				const price = parseFloat(value.price) * parseInt(value.quantity);
				total = total + price;
			});
			setSubTotal(total);
			setCart(response);
		}).catch((error) => {
			const resMessage = (error.response?.data?.msg) || error.message || error.toString();
			toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
			console.error(resMessage);
		});
	};

	const getCartLocal = async () => {
		let total = 0;
		const response = HelperService.getLocalCart();
		await Promise.all(
			response.map(async (value, i) => {
				const price = parseFloat(value.price) * parseInt(value.quantity);
				total = total + price;

				// get each product from db.
				await DataService.getProductDetail(value.product_id, '').then((data) => {
					if (data?.data?.category) response[i].Product = data?.data?.category;
				}).catch((error) => {
					const resMessage = (error.response?.data?.msg) || error.message || error.toString();
					toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
					console.error(resMessage);
				});
			})
		);

		setSubTotal(total);
		setCart(response);
	};

	const getCart = async () => {
		setLoading(true);

		const auth = AuthService.getCurrentUser();
		if (!auth) {
			getCartLocal();
		} else {
			getCartGlobal();
		}

		setLoading(false);
	};

	let title, content;
	if (loading) {
		title = 'Your Basket';
		content = (
			<section className="mini-basket__items">
				<div className="message">
					<span>Loading...</span>
				</div>
			</section>
		);
	} else {
		if (step?.startsWith('edit')) {
			title = 'Your Basket';
			content = (
				<MiniBasketEdit {...{
					...props,
					loading,
					setLoading,
					getCart,
					cart,
					setCart,
					subTotal,
					setSubTotal,
					total,
					setTotal,
					step,
					setStep
				}}/>
			);
		} else if (step?.startsWith('checkout')) {
			title = 'Your Basket';
			content = (
				<MiniBasketCheckout {...{
					...props,
					loading,
					setLoading,
					getCart,
					cart,
					subTotal,
					setSubTotal,
					total,
					setTotal,
					step,
					setStep
				}}/>
			);
		} else if (step?.startsWith('receipt')) {
			title = 'Your Receipt';
			content = (
				<MiniBasketReceipt {...{ ...props, step, setStep }}/>
			);
		} else {
			title = 'Your Basket';
			content = (
				<div>{step}</div>
			);
		}
	}

	const closeEvent = () => {
	};

	const minimizeEvent = () => {
	};

	const maximizeEvent = () => {
	};

	return (
		<>
			<ToastContainer/>
			<div className={className}>
				<header className="mini-basket__header">
					{/* <button className={"btn --icon icon-back"} onClick={closeBasketEvent}> */}
					{/*  <object data={require("../icons/caret-left.svg")} name={"Back"}/> */}
					{/* </button> */}
					<button className={'btn --icon icon-close'} onClick={closeBasketEvent}>
						<object data={require('../icons/close.svg')} name={'Close'}/>
					</button>
					<div className={'title'}>{title}</div>
					{/* <button className={"btn --icon icon-minimize"} onClick={minimizeBasketEvent}> */}
					{/*  <object data={require("../icons/minimize.svg")} name={"Back"}/> */}
					{/* </button> */}
					{/* <button className={"btn --icon icon-maximize"} onClick={maximizeBasketEvent}> */}
					{/*  <object data={require("../icons/maximize.svg")} name={"Back"}/> */}
					{/* </button> */}
				</header>
				{content}
			</div>
		</>
	);
}

export default MiniBasket;
