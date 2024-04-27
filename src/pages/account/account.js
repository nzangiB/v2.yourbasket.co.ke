import Layout from "./_layout";

import "./account.scss";
import OrderDetails from "../../components/basket/orders/OrderDetails";
import MyOrders from "../../components/basket/orders/MyOrders";

const routes = [
  {
    path: "/account{/}?",
    template: Account,
    data: { page: { title: "Account" } }
  },
  { path: "/account/address", template: "AddressPage" },
  { path: "/account/profile", template: "Profile" },
  { path: "/account/notifications", template: "Notifications" },
  { path: "/account/myorders", template: MyOrders }, // receipt
  { path: "/account/track-order", template: "Orders" }, // receipt/:id/track
  { path: "/account/deliveryaddress", template: "DeliveryAddress" },
  { path: "/account/checkout/:gateway?", template: "Checkout" },
  { path: "/account/order-details/:id", template: OrderDetails }, // receipt/:id
  { path: "/account/invoice-details/:id", template: "InvoiceDetails" }, // receipt/:id/invoice/:id
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

function Account () {
  return (
    <Layout>
      <h1>Account</h1>
    </Layout>
  );
}
