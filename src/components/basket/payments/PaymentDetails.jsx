import OrderSummary from '../orders/OrderSummary';

function PaymentDetails () {
	return (
		<>
			<header>
				<div className="title">Payment Details</div>
			</header>
			<section>
				<div className="content">
					<div className="title">Payment Method:</div>
					<div className="text">Payment Method</div>
				</div>
				<div className="content">
					<div className="title">Payment Name:</div>
					<div className="text">Brian Mugo</div>
				</div>
				<div className="content">
					<div className="title">Payment Date</div>
					<div className="text">December 4th, 2023 09:00AM</div>
				</div>
				<div className="content">
					{/* <OrderSummary getCart={cart}/> */}
				</div>
			</section>
		</>
	);
}

export default PaymentDetails;
