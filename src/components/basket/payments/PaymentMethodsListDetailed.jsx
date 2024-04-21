import io from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { API_URL } from '../../../helpers/constants';
import AuthService from '../../../services/auth.service';
import DataService from '../../../services/data.service';

import Otp from '../security/OTP';
import PaymentMethodsIPayForm from './PaymentMethodsIPayForm';

function PaymentMethodsListDetailed ({ params, query, step, setStep, buyNow, total }) {
	const form = useRef(null);
	const [paymentStep, setPaymentStep] = useState(step || 'checkout');
	const [paymentMethod, setPaymentMethod] = useState('');
	const [orderLoading, setOrderLoading] = useState(false);
	const [orderSent, setOrderSent] = useState(false);
	// const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
	const [data, setData] = useState([]);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const auth = AuthService.getCurrentUser();

	useEffect(() => {
		if (auth) {
			// Get phone and other data if exists in the auth object
			if (auth.data) setData(auth.data);
			if (auth.first_name) setFirstName(auth.first_name);
			if (auth.last_name) setLastName(auth.last_name);
			if (auth.email) setEmail(auth.email);
			if (auth.phone) setPhone(auth.phone);
			// if (auth.data) setCoordinates(data.data.data);

			// if user is authenticated but phone is missing, attempt to get phone from db
			// getUserDetail();
		}
		if (params?.gateway) checkForGateway();
		if (paymentMethod === 'Mpesa') {
			checkPaymentStatus();
		}
	}, [params, paymentMethod]);

	const onChangeFirstName = (e) => {
		const data = e.target.value;
		setFirstName(data);
	};

	const onChangeLastName = (e) => {
		const data = e.target.value;
		setLastName(data);
	};

	const onChangeEmail = (e) => {
		const data = e.target.value;
		const isValid = Boolean(data.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		));
		setEmail(isValid ? data : '');
	};

	const onChangePhone = (e) => {
		setPhone(e.target.value);
	};

	const getUserDetail = async () => {
		await DataService.getUserDetail(data).then((data) => {
			if (data.data.data) setData(data.data.data); // TODO: Investigate why in v1 this and setCoordinates both store the same data.
			if (data.first_name) setFirstName(data.first_name);
			if (data.last_name) setLastName(data.last_name);
			if (data.email) setEmail(data.email);
			if (data.phone) setPhone(data.phone);
			// if (data.data.data) setCoordinates(data.data.data); // TODO: Investigate why thi in v1s and setData both store the same data.
		});
	};

	const checkForGateway = useCallback(() => {
		const searchParams = new URLSearchParams(query);
		if (params?.gateway === 'ipay') {
			if (!orderSent) {
				setOrderSent(true);

				const txncd = searchParams.get('txncd');
				const status = searchParams.get('status');
				const p1 = searchParams.get('p1');
				const id = searchParams.get('id');
				const iPayOid = localStorage.getItem('ipay_oid');
				localStorage.removeItem('ipay_oid');
				if (id === p1 && id === iPayOid) {
					if (status === 'aei7p7yrx4ae34') {
						document.getElementById('inlineRadio1').checked = true;
						submitOrderFinalNew('iPay', [id, txncd]);
					} else {
						toast.error('Payment Failed, Please try again!', { position: toast.POSITION.TOP_RIGHT });
						setStep('checkout');
					}
				} else {
					setStep(undefined);
				}
			}
		}
	}, [total]);

	const checkPaymentStatus = () => {
		const newSocket = io(API_URL);
		newSocket.on('paymentstatus', (data) => {
			console.log(data, 'data');
			const auth = AuthService.getCurrentUser();
			if (parseInt(data.user_id) === parseInt(auth.id)) {
				setOrderLoading(false);
				if (parseInt(data?.data?.ResultCode) === 0) {
					setStep('receipt');
					return newSocket.close();
				} else {
					// console.error(data?.data?.ResultDesc);
					toast.error(data?.data?.ResultDesc, { position: toast.POSITION.TOP_RIGHT });
				}
			}
		});
		return () => newSocket.close();
	};

	const requestOTP = async () => {
		setOrderLoading(true);
		const payload = auth
			? {
				apikey: 'yourbasket2023'
			}
			: {
				first_name: firstName,
				last_name: lastName,
				email,
				phone
			};
		await DataService.sendOtp(payload).then(() => {
			toast.success('OTP sent successfully!', { position: toast.POSITION.TOP_RIGHT });
			setPaymentStep('checkout/otp');
		}).catch((error) => {
			const resMessage = (error.response?.data?.msg) || error.message || error.toString();
			toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
		}).finally(() => {
			setOrderLoading(false);
		});
	};

	const placeOrder = () => {
		submitOrder();
	};

	const submitOrder = () => {
		console.log(paymentMethod);
		if (paymentMethod === 'Cash on delivery') {
			return requestOTP();
		} else {
			return submitOrderFinal();
		}
	};

	const submitOrderFinal = () => {
		if (paymentMethod) {
			return submitOrderFinalNew(paymentMethod);
		} else {
			toast.error('Please select payment method', { position: toast.POSITION.TOP_RIGHT });
		}
	};

	const submitOrderFinalNew = async (paymentMethod, iPayData = []) => {
		setOrderLoading(true);

		const shippingAmount = (localStorage.getItem('shippingAmount') ? JSON.parse(localStorage.getItem('shippingAmount')) : 0);
		const phoneNumber = (localStorage.getItem('phone') ? JSON.parse(localStorage.getItem('phone')) : 0);

		const data = {};
		data.payment_method = paymentMethod;
		// data.total_amount = total+((total*16)/100)+shippingAmount;
		data.total_amount = total + shippingAmount;
		data.item_amount = total;
		data.tax_amount = 0;// (total*16)/100;
		data.address_id = JSON.parse(localStorage.getItem('addressId'));
		data.billing_address_id = JSON.parse(localStorage.getItem('addressId2'));
		data.shipping_amount = shippingAmount;
		data.phone_number = phoneNumber;
		data.ipay_data = iPayData.join('~~');
		data.sale_type = buyNow ? 'buynow' : 'cart';

		await DataService.createOrder(data).then(async (response) => {
			if (response?.data?.data?.order_tracking_id) {
				window.location.href = response.data.data.redirect_url;
			} else if (response?.data?.data?.CheckoutRequestID) {
				// wait for socket listen
				toast.success('M-PESA request sent!', { position: toast.POSITION.TOP_RIGHT });
			} else if (response?.data?.data?.hash) {
				if (response?.data?.data?.formdata) {
					localStorage.setItem('ipay_oid', response?.data?.data?.formdata?.oid);
					const form1 = document.getElementById('ipay-payment-form');
					const entries = Object.entries(response?.data?.data?.formdata);
					await Promise.all(entries.map(([key, val]) => {
						const input = document.createElement('input');
						input.type = 'hidden';
						input.name = key;
						input.value = val;
						form1.appendChild(input);
					}));
					document.getElementById('ipay-payment-form').submit();
				}
			} else {
				localStorage.removeItem('addressId');
				localStorage.removeItem('addressId2');
				localStorage.removeItem('shippingAmount');
				setOrderLoading(false);
				setStep('receipt');
			}
		}).catch((error) => {
			const resMessage = (error.response?.data?.msg) || error.message || error.toString();
			toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
		}).finally(() => {
			setOrderLoading(false);
		});
	};

	const otpVerifiedEvent = () => {
		return submitOrderFinal();
	};

	const changePaymentMethodEvent = (e) => {
		const paymentMethod = e.target.value;
		setPaymentMethod(paymentMethod);
	};

	const payNowEvent = async (e) => {
		e.preventDefault();

		const button = e.target;
		button.disabled = true;
		button.innerHTML = 'Paying...';

		await placeOrder(e);

		button.disabled = false;
		button.innerHTML = 'Pay Now';
	};

	const payLaterEvent = async (e) => {
		e.preventDefault();

		const button = e.target;
		button.disabled = true;
		button.innerHTML = 'Paying...';

		setPaymentMethod('Aspira');
		await placeOrder(e);

		button.disabled = false;
		button.innerHTML = 'Pay Later';
	};

	const payOnDeliveryEvent = useCallback(async (e) => {
		e.preventDefault();

		if (orderLoading) return;  // Prevents running if already processing another payment

		setOrderLoading(true);  // Shows loading indication
		setPaymentMethod('Cash on delivery')

		const button = e.target;
		button.disabled = true;
		button.innerHTML = 'Processing...';

		try {
			// Simulate request OTP call
			await requestOTP();
		} catch (error) {
			console.error('Error processing payment:', error);
			toast.error("Failed to process payment", { position: toast.POSITION.TOP_RIGHT });
		} finally {
			setOrderLoading(false);
			button.disabled = false;
			button.innerHTML = 'Pay on Delivery';
		}

	}, [orderLoading, requestOTP]); // Include all dependencies here


	// const changePaymentMethodEvent = (e) => {
	//   const value = e.target.value;
	//   setSelectedOption(value);
	//   // Reset phone number when changing options
	//   // setPhoneNumber("");
	//   // setPaymentMethod(value);
	//   console.log(value);
	//   if (value === "mpesa") {
	//     // paymentMethodChange('Mpesa');
	//   }
	// };

	if (orderLoading) {
		return (
			<div className={'payment__methods-list--detailed'}>
				<div className={'list-item --selected'}>
					<div className={'list-item__title'}>
						<span>Processing...</span>
					</div>
				</div>
			</div>
		);
	}

	if (paymentStep === 'checkout/otp') {
		return (
			<div className={'payment__methods-list--detailed'}>
				<div className={'list-item'}>
					<div className={'list-item__title'}>
						<span>Pay on Delivery</span>
					</div>
					<Otp otpVerifiedEvent={otpVerifiedEvent} udPhone={phone}/>
				</div>
			</div>
		);
	}

	return (
		<div className={'payment__methods-list--detailed'}>
			<div className={'list-item --selected'}>
				<div className={'list-item__title'}>
					<span>Pay Now</span>
					{/* <object data={require("./icons/arrow-up.svg")} name={"Pay Now"}/> */}
				</div>
				<form ref={form} className={'form details'}>
					<div className="input-field --has-label">
						<label className={'label'}>Choose a payment method</label>
						<select
							className={'input'}
							name="payNow"
							id="payNow"
							defaultValue={paymentMethod}
							onChange={changePaymentMethodEvent}
						>
							<option value="">Choose a payment method</option>
							<option value="Mpesa">M-Pesa</option>
							{/* <option value="Airtel Money">Airtel Money</option> */}
							<option value="iPay">iPay</option>
							<option value="Pesapal">PesaPal</option>
							{/* <option value="Pesalink">Pesalink</option> */}
							{/* <option value="Debit Credit Card">Debit/credit Card</option> */}
							{/* <option value="Amex">Amex</option> */}
						</select>
					</div>
					{paymentMethod === 'Mpesa' && (
						<>
							<div className="input-field">
								<input
									type="tel"
									className="input"
									// value={phone}
									defaultValue={phone}
									onChange={onChangePhone}
									placeholder="Phone Number"
									id="phone-number"
									required
								/>
							</div>
							<button
								type="submit"
								disabled={!paymentMethod || paymentMethod === '' || !phone}
								className={'btn --primary'}
								onClick={payNowEvent}
							>
								<span>Pay Now</span>
							</button>
						</>
					)}
				</form>
				<PaymentMethodsIPayForm/>
			</div>
			{/* <div className={"list-item --selected"}> */}
			{/*  <div className={"list-item__title"}> */}
			{/*    <span>Pay Later with Aspira</span> */}
			{/*    /!* <object data={require("./icons/arrow-down.svg")} name={"Pay Later with Aspira"}/> *!/ */}
			{/*  </div> */}
			{/*  <div className={"list-item__content"}> */}
			{/*    <p className={"text"}> */}
			{/*			YourBasket is offering to give you flexibility in your spending. Simply checkout and our agents will */}
			{/*			contact */}
			{/*			you with more details on your order. Prices might change when paying with Aspira. */}
			{/*    </p> */}
			{/*    <button disabled={true} className={"btn --primary"} onClick={payLaterEvent}>Pay Later</button> */}
			{/*  </div> */}
			{/* </div> */}
			<div className={'list-item --selected'}>
				<div className={'list-item__title'}>
					<span>Pay on Delivery</span>
					{/* <object data={require("./icons/arrow-down.svg")} name={"Pay on Delivery"}/> */}
				</div>
				<div className={'list-item__content'}>
					<p className={'text'}>YourBasket will send you an OTP to verify your order before it's expedited.</p>
				</div>
				<form className={'form details'}>
					<div className="input-field">
						<input
							type="text"
							className="input"
							placeholder="First Name"
							// disabled={isFieldDisabled}
							defaultValue={firstName}
							onChange={onChangeFirstName}
							id="first-name"
							required
						/>
						<input
							type="text"
							className="input"
							placeholder="Last Name"
							// disabled={isFieldDisabled}
							defaultValue={lastName}
							onChange={onChangeLastName}
							id="last-name"
							required
						/>
					</div>
					<div className="input-field">
						<input
							type="tel"
							className={'input'}
							placeholder={'Phone Number'}
							// disabled={isFieldDisabled}
							defaultValue={phone}
							onChange={onChangePhone}
							id={'phone-number'}
							required
						/>
					</div>
					<div className="input-field">
						<input
							type="email"
							className="input"
							placeholder="Email"
							// disabled={isFieldDisabled}
							defaultValue={email}
							onChange={onChangeEmail}
							id="email"
							required
						/>
					</div>
				</form>

				<div className={'list-item__content'}>
					<button
						className={'btn --primary'}
						onClick={payOnDeliveryEvent}
						disabled={!auth && !(firstName && lastName && phone && email)}
					>Pay on Delivery
					</button>
				</div>
			</div>
		</div>
	);
}

export default PaymentMethodsListDetailed;
