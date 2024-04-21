const calDiscount = (data) => {
	if (data.offer_price > 0 && data.mrp > 0 && data.offer_price < data.mrp) {
		return (((data.mrp - data.offer_price) / data.mrp) * 100).toFixed(0).replace(/\.0+$/, '') + '% OFF';
	}
};

const getLocalCart = () => {
	let user_cart = JSON.parse(localStorage.getItem('user_cart'));
	if (!user_cart) {
		user_cart = [];
	}
	return user_cart;
};

const setLocalCart = (item, qty = null) => {
	try {
		const user_cart = JSON.parse(localStorage.getItem('user_cart')) || [];
		const itemIndex = user_cart.findIndex(k => parseInt(k.product_id) === parseInt(item.product_id));

		if (itemIndex !== -1) {
			user_cart[itemIndex].quantity = qty === null ? user_cart[itemIndex].quantity + 1 : qty;
		} else {
			user_cart.push({ ...item, quantity: qty || 1 });
		}

		localStorage.setItem('user_cart', JSON.stringify(user_cart));
		// console.log("Current user_cart:", JSON.stringify(user_cart));
	} catch (error) {
		console.error('Error in setLocalCart:', error);
	}
};

const deleteLocalCart = (id) => {
	let user_cart = localStorage.getItem('user_cart');
	user_cart = user_cart ? JSON.parse(user_cart) : [];
	if (user_cart) {
		user_cart = user_cart.filter((k, g) => {
			return (parseInt(k.product_id) !== parseInt(id));
		});
	} else {
		user_cart = [];
	}
	localStorage.setItem('user_cart', JSON.stringify(user_cart));
};

const emptyLocalCart = (id) => {
	const user_cart = [];
	localStorage.setItem('user_cart', JSON.stringify(user_cart));
};

const updateCartCount = () => {
	const cart = document.getElementById('cart-count');
	const cartCount = cart.getElementsByClassName('cart-count');
	if (cartCount && cartCount.length > 0) {
		cartCount[0].innerHTML = getLocalCart().length;
	} else {
		cart.innerHTML = `
        <span class="count">
            ${getLocalCart().length}
        </span>
    `;
	}
};

const getShippingRates = () => {
	const rocheTerre = [
		{
			name: 'Nairobi (Zone A)',
			rate: 190,
			regions: [
				'CBD', 'PARKLANDS', 'KILIMANI', 'NGARA', 'KILELESHWA', 'KIBRA', 'LAVINGTON', 'HURLINGHAM', 'RIVERSIDE', 'KANGEMI', 'ADAMS', 'KAWANGWARE', 'UPPERHILL', 'DAGORETTI CORNER', 'WESTLANDS', 'JAMUHURI'
			]
		},
		{
			name: 'Nairobi (Zone B)',
			rate: 270,
			regions: [
				'LANGATA', 'JOGOO ROAD', 'KAREN', 'EMBAKASI', 'SOUTH B/C', 'KASARANI', 'NAIROBI WEST', 'KARIOBANGI', 'MADARAKA DANDORA', 'MOMBASA ROAD TO JKIA', 'PANGANGI', 'HIGHRIDGE', 'RACECOURSE', 'LORESHO', 'LENANA', 'KITASURU', 'MUTHAIGA', 'RUNDA', 'UMOJA', 'WAITHAKA', 'LOWER KABETE', 'KABIRIA', 'KAYOLE'
			]
		},
		{
			name: 'Kiambu',
			rate: 300,
			regions: [
				'UTHIRU', 'THIKA', 'KINOO', 'MUGUGA', 'LIMURU', 'KIAMBU TOWN', 'KIKUYU ', 'BANANA', 'RUIRU'
			]
		},
		{
			name: 'Machakos',
			rate: 400,
			regions: [
				'MLOLONGO', 'ATHI RIVER'
			]
		}
	];

	const drift = [
		{
			name: 'Nairobi (Zone A)',
			rate: 200,
			regions: [
				'CBD', 'PARKLANDS', 'KILIMANI', 'NGARA', 'KILELESHWA', 'KIBRA', 'LAVINGTON', 'HURLINGHAM', 'RIVERSIDE', 'KANGEMI', 'ADAMS', 'KAWANGWARE', 'UPPERHILL', 'DAGORETTI CORNER', 'WESTLANDS', 'JAMUHURI'
			]
		},
		{
			name: 'Nairobi (Zone B)',
			rate: 370,
			regions: [
				'LANGATA', 'JOGOO ROAD', 'KAREN', 'EMBAKASI', 'SOUTH B/C', 'KASARANI', 'NAIROBI WEST', 'KARIOBANGI', 'MADARAKA DANDORA', 'MOMBASA ROAD TO JKIA', 'PANGANGI', 'HIGHRIDGE', 'RACECOURSE', 'LORESHO', 'LENANA', 'KITASURU', 'MUTHAIGA', 'RUNDA', 'UMOJA', 'WAITHAKA', 'LOWER KABETE', 'KABIRIA', 'KAYOLE'
			]
		},
		{
			name: 'Kiambu',
			rate: 500,
			regions: [
				'UTHIRU', 'THIKA', 'KINOO', 'MUGUGA', 'LIMURU', 'KIAMBU TOWN', 'KIKUYU ', 'BANANA', 'RUIRU'
			]
		},
		{
			name: 'Machakos',
			rate: 480,
			regions: [
				'UTHIRU', 'THIKA', 'KINOO', 'MUGUGA', 'LIMURU', 'KIAMBU TOWN', 'KIKUYU ', 'BANANA', 'RUIRU'
			]
		}
	];

	const pickupMtaani = [
		{
			name: 'Waiyaki Way',
			rate: 350,
			regions: [
				'CHIROMO', 'KILELESHWA', 'ABC', 'KANGEMI/UTHIRU', 'KINOO/MUTHIGA/KIKUYU', 'LOWER KABETE SPRING VALLEY', 'LOWER KABETE BEFORE UON', 'LOWER KABETE AFTER UON', 'KITUSURU', 'WANGIGE', 'THIGIRI RIDGE'
			]
		},
		{
			name: 'Thika Road',
			rate: 370,
			regions: [
				'NGARA/PANGANI', 'ALSOPS/ROASTERS/GUMBA', 'LUCKY SUMMER/MATHARE NORTH', 'ROYSAMBU/USIU', 'MIREMA/ZIMMERMAN', 'KASARANI BEFORE SUNTON', 'KASARANI MWIKI/GITHURAI', 'KAHAWA WENDANI/SUKARI/KU', 'RUIRU/KIMBO/JUJA'
			]
		},
		{
			name: 'Kiambu',
			rate: 500,
			regions: [
				'UTHIRU', 'THIKA', 'KINOO', 'MUGUGA', 'LIMURU', 'KIAMBU TOWN', 'KIKUYU ', 'BANANA', 'RUIRU'
			]
		},
		{
			name: 'Machakos',
			rate: 480,
			regions: [
				'UTHIRU', 'THIKA', 'KINOO', 'MUGUGA', 'LIMURU', 'KIAMBU TOWN', 'KIKUYU ', 'BANANA', 'RUIRU'
			]
		}
	];

	const cossim = [];

	const transformDeliveryListFormat = (listItemsV1, provider) => {
		const listItemsV2 = [];

		// transform
		for (const item of listItemsV1) {
			const { name, rate, regions } = item;
			const newName = name;
			const newRegions = [];
			for (const region of regions) {
				newRegions.push({
					name: region,
					provider,
					rate
				});
			}

			const newItem = {
				name: newName,
				regions: newRegions
			};

			listItemsV2.push(newItem);
		}

		return listItemsV2;
	};

	const mergeDeliveryList = (suppliers) => {
		const mergedSuppliers = new Map([]);
		for (const supplier of suppliers) {
			for (const [, { name, regions }] of Object.entries(supplier)) {
				mergedSuppliers.set(name, [
					...mergedSuppliers.get(name) || [],
					...regions
				]);
			}
		}

		const mergedList = [];
		for (const [name, regions] of mergedSuppliers) {
			mergedList.push({
				name,
				regions: regions.sort((a, b) => a.name.localeCompare(b.name))
			});
		}

		return mergedList;
	};

	const supplier1 = transformDeliveryListFormat(rocheTerre, 'Roche Terre');
	const supplier2 = transformDeliveryListFormat(drift, 'Drift');
	const supplier3 = transformDeliveryListFormat(pickupMtaani, 'Pickup Mtaani');
	const supplier4 = transformDeliveryListFormat(cossim, 'Cossim');

	return mergeDeliveryList([
		supplier1,
		supplier2,
		supplier3,
		supplier4
	]);
};

const getShippingRate = (requestedRegion) => {
	const regions = getShippingRates();
	let rate = 0;
	for (const region of regions) {
		region.regions.map((s, j) => {
			if (s === requestedRegion) rate = region.rate;
		});
	}

	return rate;
};

const setRecentProducts = (item) => {
	let recent_products = JSON.parse(localStorage.getItem('recent_products'));
	if (!recent_products) {
		recent_products = [];
	}
	const filteredArray = recent_products.filter(function (filteredItem, pos) {
		return filteredItem.id === item.id;
	});
	if (filteredArray.length === 0) recent_products.push(item);
	localStorage.setItem('recent_products', JSON.stringify(recent_products.slice(-4)));
};

const getRecentProducts = () => {
	let recent_products = JSON.parse(localStorage.getItem('recent_products'));
	if (!recent_products) {
		recent_products = [];
	}
	return recent_products;
};

const orderStatus = (data) => {
	return {
		inprocess: 'In Process',
		awb_generated: 'AWB Number Generated',
		delivered: 'Delivered',
		cancelled: 'Cancelled',
		order_rejected: 'Order Rejected',
		lost_transit: 'Lost in Transit',
		order_accepted: 'Order Accepted',
		in_transit: 'In Transit',
		refund_closed: 'Refund Closed',
		refund_initiated: 'Refund Initiated',
		return_received: 'Return Received',
		return_initiated: 'Return Initiated',
		oup_payment_gateway: 'OUP Payment Gateway',
		ready_dispatch: 'Ready for Dispatch'
	};
};

const HelperService = {
	calDiscount,
	getLocalCart,
	setLocalCart,
	deleteLocalCart,
	emptyLocalCart,
	updateCartCount,
	getShippingRate,
	setRecentProducts,
	getRecentProducts,
	orderStatus
};

export default HelperService;
