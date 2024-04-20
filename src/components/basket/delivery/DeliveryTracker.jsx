function DeliveryTracker () {
	return (
		<>
			<header>
				<div className={'title'}>Tracking</div>
			</header>
			<section className="delivery__tracking-list">
				<div className="list-item">
					<div className="step__icon">
						<object
							data={require('../icons/checkmark-outlined.svg')}
							name="Completed"
						/>
					</div>
					<div className="step__details">
						<div className="title">Order Placed</div>
						<div className="text">Confirmation email received and payment processed successfully</div>
					</div>
					<div className="step__timestamp">
						<span>Dec 1, 2023</span>
					</div>
				</div>
				<div className="list-item">
					<div className="step__icon">
						<object
							data={require('../icons/checkmark-outline.svg')}
							name="Completed"
						/>
					</div>
					<div className="step__details">
						<div className="title">Processing Order</div>
						<div className="text">Items gathered, verified, and prepared for shipment.</div>
					</div>
					<div className="step__timestamp">
						<span>Dec 2, 2023</span>
					</div>
				</div>
			</section>
		</>
	);
}

export default DeliveryTracker;
