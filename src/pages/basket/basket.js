import Layout from "./_layout";
import MiniBasket from "../../components/basket/MiniBasket/MiniBasket";
import MiniBasketReceipt from "../../components/basket/MiniBasket/MiniBasketReceipt";

import "./basket.scss";

function Basket (props) {
  return (
    <Layout>
      {/* <MiniBasket/> */}
    </Layout>
  );
}

function Checkout (props) {
  return (
    <Layout>
      <h1>Checkout</h1>
    </Layout>
  );
}

function Receipt (props) {
  return (
    <Layout>
      <MiniBasketReceipt/>
    </Layout>
  );
}

const routes = [
  { path: "/basket{/}?", template: Basket },
  { path: "/basket/checkout", template: Checkout },
  { path: "/basket/receipt", template: Receipt }
];
//   .map((route) => {
//   // route.path = "/basket" + route.path;
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
