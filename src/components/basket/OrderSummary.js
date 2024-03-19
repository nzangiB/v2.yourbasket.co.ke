import { Component } from "@wearearchangel/handcrafted";
import { KES } from "../../helpers/formatting";

import "./OrderSummary.scss";

class OrderSummary extends Component {
  constructor (props) {
    super(props);

    this.className = "order__summary";
  }

  async data () {
    let cart, props;
    if (this.props.cart) {
      ({ cart, ...props } = this.props);
    } else {
      const { getCart, ..._props } = this.props;
      cart = await getCart();
      props = _props;
    }

    return { cart, ...props };
  }

  template () {
    const { cart } = this.state;

    const getSubTotal = () => cart.reduce((subTotal, item) => {
      const unitTotal = item.price * item.quantity;
      subTotal += unitTotal;
      return subTotal;
    }, 0);

    const getSubTotalTax = () => {
      // const subTotal = getSubTotal();
      // const taxRate = 0.16;
      // return subTotal * taxRate;
      return 0;
    };

    const getCoupon = () => {
      return 0;
    };

    const getDeliveryFees = () => {
      // let shippingAmount = localStorage.getItem("shippingAmount");
      // shippingAmount = shippingAmount ? JSON.parse(shippingAmount) : 0;
      // return shippingAmount;
      return 0;
    };

    const getTotal = () => {
      const subTotal = getSubTotal();
      const subTotalTax = getSubTotalTax();
      const coupon = getCoupon();
      const deliveryFees = getDeliveryFees();
      return subTotal + subTotalTax + deliveryFees - coupon;
    };

    return (
      <>
        <div className="summary__item">
          <span className="text">SubTotal</span>
          <span className="text">{KES.format(getSubTotal())}</span>
        </div>
        {/* <div className="summary__item"> */}
        {/*  <span className="text"> */}
        {/*    <span>Tax</span> */}
        {/*    <object data={require("./icons/information.svg")} name={"Read more"}/> */}
        {/*  </span> */}
        {/*  <span className="text">{KES.format(getSubTotalTax())}</span> */}
        {/* </div> */}
        {/* <div className="summary__item"> */}
        {/*  <span className="text"> */}
        {/*    <span>Delivery Fees</span> */}
        {/*    <object data={require("./icons/information.svg")} name={"Read more"}/> */}
        {/*  </span> */}
        {/*  <span className="text">Based on delivery option</span> */}
        {/* </div> */}
        {/* <div className="summary__item"> */}
        {/*  <span className="text">Coupon</span> */}
        {/*  <span className="text">{KES.format(getCoupon())}</span> */}
        {/* </div> */}
        <div className="summary__item">
          <span className="text">Total</span>
          <span className="text">{KES.format(getTotal())}</span>
        </div>
      </>
    );
  }
}

export default OrderSummary;
