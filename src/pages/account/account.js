import Layout from "./_layout";

import "./account.scss";

const routes = [
  { path: "/account{/}?", template: "Account" },
  { path: "/account/address", template: "AddressPage" },
  { path: "/account/profile", template: "Profile" },
  { path: "/account/notifications", template: "Notifications" },
  { path: "/account/myorders", template: "Orders" }, // orders
  { path: "/account/track-order", template: "Orders" }, // orders/:id/track
  { path: "/account/deliveryaddress", template: "DeliveryAddress" },
  { path: "/account/checkout/:gateway?", template: "Checkout" },
  { path: "/account/order-details/:id", template: "OrderDetails" }, // orders/:id
  { path: "/account/invoice-details/:id", template: "InvoiceDetails" }, // orders/:id/invoice/:id
  { path: "/account/favorites", template: "My Favorites" }
];
//   .map((route) => {
//   // route.path = "/account" + route.path;
//   route.skeleton = (props) => (
//     <Layout>
//       {(typeof route.skeleton === "function" ? route.skeleton(props) : route.skeleton) || "Loading..."}
//     </Layout>
//   );
//   route.template = (props) => (
//     <Layout>
//       {typeof route.template === "function" ? route.template(props) : route.skeleton}
//     </Layout>
//   );
//   return route;
// });

export default routes;
