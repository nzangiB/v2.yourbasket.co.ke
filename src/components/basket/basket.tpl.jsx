import { useCallback, useEffect, useState } from 'react';
import { useHash } from './basket.hooks';

import MiniBasket from './mini-basket/MiniBasket';

function BasketTpl (props) {
	const [step, setStep] = useState(props.step);
	const [hash, setHash] = useHash();

	function getStepAttr () {
		const component = document.getElementById(props.id);
		return component?.dataset?.step;
	}

	function setStepAttr (step) {
		const component = document.getElementById(props.id);
		component.dataset.step = step;
	}

	useEffect(() => {
		const basket = document.getElementById('basket');
		const miniBasket = basket?.querySelector('.mini-basket');
		if (!miniBasket) props.render();

		// const component = document.getElementById(props.id);
		//   console.log("step", component?.dataset?.step, step);
		//   // setStep(component?.dataset?.step);
		// if (step !== component?.dataset?.step) setStep(component?.dataset?.step);
		// if (component?.dataset?.step !== step) setStepAttr(step);

		// const target = document.getElementById(props.id);
		// if (!target.dataset.step) setStepAttr("");
		// props.observer(setStep).observe(target, props.observerOptions);
		// console.log("target", target, target.dataset.step);
		// console.log("props.observer", getStepAttr(), step);
		// if (step) {
		//   console.log("step.Disconnecting...", step);
		//   props.observer(setStep).disconnect();
		// } else {
		//   console.log("step.Observing...", step);
		//   props.observer(setStep).observe(target, props.observerOptions);
		// }
	}, [hash, step, props.step]);

	useEffect(() => {
		const url = new URL(location.href);
		const urlStep = url.searchParams.get('basket');
		if (urlStep) {
			setStepAttr(urlStep);
			url.searchParams.delete('basket');
			history.pushState({}, '', url.href);
		}
	}, []);

	return <MiniBasket step={step} setStep={setStep} {...props} />;
}

export default BasketTpl;
