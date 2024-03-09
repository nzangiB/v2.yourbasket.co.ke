import { Component } from "@wearearchangel/handcrafted";
import { KES } from "../../helpers/formatting";

export class OrderSummary extends Component {
  async data () {
    const { getCart } = this.props;
    const cart = await getCart();
    return { cart };
  }

  template () {
    const { cart } = this.state;

    const getSubtotal = () => cart.reduce((subTotal, item) => {
      const unitTotal = item.price * item.quantity;
      subTotal += unitTotal;
      return subTotal;
    }, 0);

    const getTotal = () => cart.reduce((total, item) => {
      const unitTotal = item.price * item.quantity;
      total += unitTotal;
      return total;
    }, 0);

    return (
      <section className="order__summary">
        <div className="summary__item">
          <span className="text">SubTotal</span>
          <span className="text">{KES.format(getSubtotal())}</span>
        </div>
        {/* <div className="summary__item"> */}
        {/*  <span className="text"> */}
        {/*    <span>Tax</span> */}
        {/*    <object data={require("./icons/information.svg")} name={"Read more"}/> */}
        {/*  </span> */}
        {/*  <span className="text">XXXXXXXXXX</span> */}
        {/* </div> */}
        <div className="summary__item">
          <span className="text">
            <span>Delivery Fees</span>
            <object data={require("./icons/information.svg")} name={"Read more"}/>
          </span>
          <span className="text">Based on delivery option</span>
        </div>
        <div className="summary__item">
          <span className="text">Coupon</span>
          <span className="text">XXXXXXXXXX</span>
        </div>
        <div className="summary__item">
          <span className="text">Total</span>
          <span className="text">{KES.format(getTotal())}</span>
        </div>
      </section>
    );
  }
}
