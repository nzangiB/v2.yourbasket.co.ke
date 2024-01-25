import manifest from "./manifest.json";
import favicon from "./favicon.ico";
import font from "./fonts/hubot-sans.woff2";

import { reportWebVitals } from "./reportWebVitals";

const name = "YourBasket";

export default `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
	
			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			<meta http-equiv="Content-type" content="text/html; charset=UTF-8">
	
			<meta name="msapplication-tap-highlight" content="no"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<meta name="description" content="Web site created using the Handcrafted Starter Kit"/>
			<meta name="keywords" content="Handcrafted, Starter, Kit"/>
	
			<link rel="manifest" href="${manifest}"/>
			<link rel="shortcut icon" href="${favicon}"/>
			<link rel="preload" href="${font}" as="font" type="font/woff2" crossorigin>
	
			<title>${name}</title>
			
			<script type="module" src="${reportWebVitals}"></script>
		</head>
	
		<body>
			<noscript>You need to enable JavaScript to view this site.</noscript>
			<main class="page"></main>
		</body>
	</html>
`;
