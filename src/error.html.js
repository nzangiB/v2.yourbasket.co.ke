import favicon from "./favicon.ico";
import font from "./fonts/hubot-sans.woff2";

const name = "YourBasket | Online Shopping for Furniture, Appliances & More!";
const description = "There's an error in your basket!";
const keywords = "Handcrafted, Starter, Kit";

export default `<!DOCTYPE html>
		<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
		<head>
		    <meta charset="utf-8">
		      
		    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		    <meta http-equiv="Content-type" content="text/html; charset=UTF-8">
		
		    <meta name="msapplication-tap-highlight" content="no"/>
		    <meta name="viewport" content="width=device-width, initial-scale=1"/>
		    <meta name="description" content="${description}"/>
		    <meta name="keywords" content="${keywords}"/>
		
		    <link rel="manifest" href="/manifest.json"/>
		    <link rel="shortcut icon" href="${favicon}"/>
		    <link rel="preload" href="${font}" as="font" type="font/woff2" crossorigin>
		
		    <title>${name}</title>
		</head>
		
		<body>
		    <main class="page"></main>
		</body>
		</html>
`;
