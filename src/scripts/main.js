import { defaults, Router } from '@wearearchangel/handcrafted';

// plugins
import { reportWebVitals } from '../plugins/reportWebVitals';
import { updateViewport } from '../plugins/updateViewport';

// routes
import Home from '../pages/home/home';
import Products from '../pages/products';
import Account from '../pages/account/account';
import Basket from '../pages/basket/basket';
import Login from '../pages/login';
import Register from '../pages/register';
// import ResetPassword from "../pages-v1/reset-password";
// import Support from "../pages-v1/support/support";
// import Fallback from "../pages-v1/fallback";
import Error from '../pages/error';

// initialize defaults
defaults.templateEngine = 'react';
defaults.hash = '#';
defaults.useHash = false;

const routes = [
	...Home,
	...Products,
	...Account,
	...Basket,
	...Login,
	...Register,
	// ...ResetPassword,
	// ...Support,
	// ...Fallback,
	...Error
];

Router(routes).then(() => {
	addEventListener('load', reportWebVitals, false);
	addEventListener('load', updateViewport, false);
	addEventListener('resize', updateViewport, false);
	addEventListener('orientationchange', updateViewport, false);
});
