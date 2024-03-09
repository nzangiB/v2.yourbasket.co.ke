import { Component } from "@wearearchangel/handcrafted";

import placeholder from "../../assets/images/placeholder.png";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";
import HelperService from "../../services/helper.service";

import "./basket.scss";

const KES = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0
});

class OrderList extends Component {
  async data () {
    const { getCart, ...props } = this.props;

    const cart = await getCart();
    return { cart, ...props };
  }

  template () {
    const { cart, disabled, editable, setStep } = this.state;

    if (!cart.length) {
      return (
        <p>Your cart is empty</p>
      );
    }

    const getCartSize = () => cart.reduce((subTotal, item) => {
      subTotal += parseInt(item.quantity);
      return subTotal;
    }, 0);

    const editCartEvent = () => {
      setStep("edit");
    };

    let itemsToShow, itemsNotShown;
    const itemsToShowLimit = 3;
    if (editable && cart.length > itemsToShowLimit) {
      itemsToShow = itemsToShowLimit;
      itemsNotShown = cart.length - itemsToShowLimit;
    } else {
      itemsToShow = cart.length;
      itemsNotShown = 0;
    }

    return (
      <section className={"order__list"}>
        {disabled
          ? (
            <header className="header">
              <div className="title">Order ({getCartSize()} items)</div>
              {editable && (
                <button className="btn --link" onClick={editCartEvent}>
                  <span>Edit</span>
                </button>
              )}
            </header>
          )
          : (
            <header className="tabs">
              <div className="tab">
                <div className={"icon delete"}>
                  <object data={require("./icons/delete.svg")} name={"Icon Delete"}/>
                </div>
                <div className={"text"}>All</div>
              </div>
            </header>
          )
        }

        <ul className={`order__list-${editable ? "editable" : disabled ? "disabled" : "items"}`}>
          {cart.slice(0, itemsToShow).map((item, index) => {
            item.image = item?.Product?.file_path
              ? `https://api.yourbasket.co.ke/${item?.Product.file_path}`
              : placeholder;

            let title;
            const titleLimit = (editable || disabled) ? 30 : 60;
            if (item.product_title.split("").length > titleLimit) {
              title = item.product_title.split("").slice(0, titleLimit).join("") + "...";
            } else {
              title = item.product_title;
            }

            return (
              <li className={"order__list-item"} key={index}>
                {!disabled && (
                  <div className={"list-item__actions"}>
                    <div className={"checkbox"}></div>
                  </div>
                )}
                <div className={"list-item__image"}>
                  <img src={item.image} alt={item.product_title}/>
                </div>
                <div className={"list-item__details"}>
                  <div className={"list-item__name"}>
                    <span className={"title"} title={item.product_title}>{title}</span>
                  </div>
                  {!disabled && (
                    <div className={"list-item__price"}>
                      <span>{KES.format(item.price)}</span>
                      {/* <span>Variant: {item.variant}</span> */}
                    </div>
                  )}
                  <div className={"list-item__quantity"}>
                    {!disabled && (
                      <button className={"btn --icon icon-minus"}>
                        <object data={require("./icons/minus.svg")} name={"Reduce quantity"}/>
                      </button>
                    )}
                    <div className={"quantity"}>
                      <span className={"text"}>{[item.quantity, disabled && "Items"].filter(Boolean).join(" ")}</span>
                    </div>
                    {!disabled && (
                      <button className={"btn --icon icon-plus"}>
                        <object data={require("./icons/plus.svg")} name={"Increase quantity"}/>
                      </button>
                    )}
                  </div>
                  {/* <p>Total: </p> */}
                  {/* <button onClick={() => removeFromCart(index)}>Remove</button> */}
                </div>
              </li>
            );
          })}
          {(editable && itemsNotShown) && (
            <li className={"order__list-item"}>
              <div className={"list-item__others"}>
								+ {itemsNotShown} more products
              </div>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

class OrderSummary extends Component {
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

class PaymentMethods extends Component {
  template () {
    return (
      <section className="payment__methods">
        <div className="payment__methods-title">
          <div className="title">Accepted Payment Methods</div>
        </div>
        <div className="payment__methods-list">
          <div className={"list-item"}>
            <object data={require("./icons/mastercard.svg")} name={"Mastercard"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/mpesa.svg")} name={"M-Pesa"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/amex.svg")} name={"AMEX"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/visa.svg")} name={"Visa"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/union-pay.svg")} name={"Union Pay"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/american-express.svg")} name={"American Express"}/>
          </div>
        </div>
      </section>
    );
  }
}

function MiniBasketEdit ({ getCart, setStep }) {
  const checkoutNowEvent = (e) => {
    setStep("checkout");
  };

  const checkoutLaterEvent = (e) => {
    setStep("checkout-later");
  };

  return (
    <section className="mini-basket__review">
      <OrderList getCart={getCart} disabled={false}/>

      <section className="payment">
        <PaymentMethods/>
        <OrderSummary getCart={getCart}/>
      </section>

      <section className="btn-group">
        <button className="btn --primary" onClick={checkoutNowEvent}>
          <span>Checkout Now</span>
        </button>
        <div className="text">
          <span>or</span>
        </div>
        <button className="btn --secondary" onClick={checkoutLaterEvent}>
          <object data={require("./icons/calendar.svg")} name={"Checkout Later"}/>
          <span>Checkout Later</span>
        </button>
      </section>
    </section>
  );
}

function MiniBasketCheckout ({ getCart, setStep }) {
  const payNowEvent = (e) => {
    e.preventDefault();

    setStep("receipt");
  };

  return (
    <section className="mini-basket__checkout">
      <div className={"order"}>
        <OrderList getCart={getCart} disabled={true} editable={true} setStep={setStep}/>
        <OrderSummary getCart={getCart}/>
      </div>

      <div className={"payment"}>
        <div className="payment__methods">
          <div className="payment__methods-title">
            <div className="title">Payment</div>
          </div>
          <div className="payment__methods-list--detailed">
            <div className={"list-item --selected"}>
              <div className={"title"}>
                <span>Pay Now</span>
                <object data={require("./icons/arrow-up.svg")} name={"Pay Now"}/>
              </div>
              <form className={"form details"}>
                <div className="input-field --has-label">
                  <label className={"label"}>Choose a payment method</label>
                  <select className={"input"} name="payNow" id="payNow">
                    <option value="mpesa">M-Pesa</option>
                    <option value=""></option>
                  </select>
                </div>
                <div className="input-field">
                  <input className={"input"} type="tel" placeholder={"Phone Number"}/>
                </div>
                <button className={"btn --primary"} type="submit" onClick={payNowEvent}>Pay Now</button>
              </form>
            </div>
            <div className={"list-item"}>
              <div className={"title"}>
                <span>Pay Later with Aspira</span>
                <object data={require("./icons/arrow-down.svg")} name={"Pay Later with Aspira"}/>
              </div>
            </div>
            <div className={"list-item"}>
              <div className={"title"}>
                <span>Pay on Delivery</span>
                <object data={require("./icons/arrow-down.svg")} name={"Pay on Delivery"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniBasketReceipt ({ getCart, setStep }) {
  const continueShoppingEvent = (e) => {
    setStep("");
  };

  const cancelOrderEvent = (e) => {

  };

  const printReceiptEvent = (e) => {

  };

  return (
    <section className="mini-basket__receipt">
      <header className={"header"}>
        <button className={"btn --primary --size-sm"} onClick={continueShoppingEvent}>
          <span>Continue Shopping</span>
        </button>
        <div className="btn-group">
          <button className={"btn --link --size-sm"} onClick={cancelOrderEvent}>
            <span>Cancel Order</span>
          </button>
          <button className={"btn --secondary --size-sm"} onClick={printReceiptEvent}>
            {/* <object data={require("./icons/print.svg")} name={"Print Receipt"}/> */}
            <span>Print Receipt</span>
          </button>
        </div>
      </header>

      <section>
        <div>
          <div>
            <section>Order Details</section>
            <section>Delivery Details</section>
          </div>

          <div className={"order"}>
            <OrderList getCart={getCart} disabled={true}/>
          </div>
        </div>

        <div>
          <div className={"payment"}>
            <section className="payment__methods">
              <div className="payment__methods-title">
                <div className="title">Payment Details</div>
              </div>
            </section>
            <OrderSummary getCart={getCart}/>
          </div>

          <div>Tracking</div>
        </div>
      </section>
    </section>
  );
}

export class Basket extends Component {
  constructor (props) {
    super(props);

    this.id = "basket";

    this._state.step = this.getStep();
    this._state.setStep = this.setStep.bind(this);
    this._state.getCart = this.getCart.bind(this);
  }

  getStep () {
    const component = document.getElementById("basket");
    return component?.dataset?.step;
  }

  setStep (step) {
    const component = document.getElementById("basket");
    const existingStep = component.dataset.step;

    // if (step !== existingStep) {
    component.dataset.step = step;
    // this.render();
    // }
  }

  async getCart () {
    const auth = AuthService.getCurrentUser();

    let cart;
    if (auth) {
      await DataService.getCart("cart").then((data) => {
        cart = data?.data?.data;
      }).catch((error) => {
        console.error(error);
        cart = [];
      });
    } else {
      cart = HelperService.getLocalCart();
    }

    return cart;
  }

  data () {
    const step = this.getStep();
    return { step };
  }

  async template () {
    const { getCart, step, setStep } = this.state;
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const openModalEvent = () => {
      // setIsModalOpen(true);
    };

    const closeModalEvent = () => {
      // setIsModalOpen(false);
    };

    let title, content;
    if (step === "edit") {
      title = "Your Basket";
      content = (
        <MiniBasketEdit setStep={setStep} getCart={getCart}/>
      );
    } else if (step === "checkout") {
      title = "Your Basket";
      content = (
        <MiniBasketCheckout setStep={setStep} getCart={getCart}/>
      );
    } else if (step === "receipt") {
      title = "Your Receipt";
      content = (
        <MiniBasketReceipt setStep={setStep} getCart={getCart}/>
      );
    } else {
      title = "Your Basket";
      content = (
        <div>{step}</div>
      );
    }

    const closeSidebarEvent = (e) => {
      e.preventDefault();

      const basket = document.getElementById("basket");
      const miniBasket = basket.querySelector(".mini-basket");
      miniBasket.classList.replace("--visible", "--invisible");
    };

    return (
      <div className={["mini-basket", step && "--visible"].filter(Boolean).join(" ")}>
        <header className="mini-basket__header">
          <button className={"btn --icon icon-back"} onClick={closeSidebarEvent}>
            <object data={require("./icons/caret-left.svg")} name={"Back"}/>
          </button>
          <div className={"title"}>{title}</div>
          {/* <button className={"btn --icon icon-close"} onClick={openModalEvent}> */}
          {/*  <object data={require("./icons/maximize.svg")} name={"Back"}/> */}
          {/* </button> */}
          {/* <button className={"btn --icon icon-minimize"} onClick={openModalEvent}> */}
          {/*  <object data={require("./icons/minimize.svg")} name={"Back"}/> */}
          {/* </button> */}
          <button className={"btn --icon icon-maximize"} onClick={openModalEvent}>
            <object data={require("./icons/maximize.svg")} name={"Back"}/>
          </button>
        </header>
        {content}
      </div>
    );
  }

  controller () {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-step") {
          const oldStep = mutation.oldValue;
          const step = mutation.target.dataset.step;
          if (oldStep !== step) this.render();
          observer.disconnect();
        }
      }
    });

    observer.observe(document.getElementById("basket"), {
      attributes: true
    });
  }
}
