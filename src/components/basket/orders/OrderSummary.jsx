import { useEffect, useState } from 'react';
import { KES } from '../../../helpers/formatting';

import './OrderSummary.scss';

function OrderSummary ({ loading, subTotal, setSubTotal, total, setTotal }) {
	const [subTotalTax, setSubTotalTax] = useState(0);
	const [coupon, setCoupon] = useState(0);
	const [deliveryFees, setDeliveryFees] = useState(0);
	// const [total, setTotal] = useState(0);

	useEffect(() => {
		setSubTotalTax(0);
		// setSubTotalTax(subTotal * 0.16);

		setCoupon(0);

		const deliveryFee = localStorage.getItem('shippingAmount')
			? JSON.parse(localStorage.getItem('shippingAmount'))
			: 0;
		setDeliveryFees(deliveryFee);

		setTotal(subTotal + subTotalTax + deliveryFees - coupon);
	}, [subTotal, total]);

	return (
		<div className={'order__summary'}>
			<div className="summary__item">
				<span className="text">SubTotal</span>
				<span className="text">{KES.format(subTotal)}</span>
			</div>
			{/* <div className="summary__item"> */}
			{/*  <span className="text"> */}
			{/*    <span>Tax</span> */}
			{/*    <object data={require("./icons/information.svg")} name={"Read more"}/> */}
			{/*  </span> */}
			{/*  <span className="text">{KES.format(subTotalTax)}</span> */}
			{/* </div> */}
			{/* <div className="summary__item"> */}
			{/*  <span className="text"> */}
			{/*    <span>Delivery Fees</span> */}
			{/*    {deliveryFees = 0 */}
			{/*      ? ( */}
			{/*      <object data={require("./icons/information.svg")} name={"Add Delivery Location"}/> */}
			{/*    ) */}
			{/*      : ( */}
			{/*      <object data={require("./icons/edit.svg")} name={"Change Delivery Location"}/> */}
			{/*    )} */}
			{/*  </span> */}
			{/*  <span className="text">Based on delivery option</span> */}
			{/*  <span className="text">{KES.format(deliveryFees)}</span> */}
			{/* </div> */}
			{/* <div className="summary__item"> */}
			{/*  <span className="text">Coupon</span> */}
			{/*  <span className="text">{KES.format(coupon)}</span> */}
			{/* </div> */}
			<div className="summary__item">
				<span className="text">Total</span>
				<span className="text">{KES.format(total)}</span>
			</div>
		</div>
	);
}

export default OrderSummary;
