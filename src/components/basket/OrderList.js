import { Component } from "@wearearchangel/handcrafted";
import { KES } from "../../helpers/formatting";

import placeholder from "../../assets/images/placeholder.png";

export class OrderList extends Component {
  constructor (props) {
    super(props);

    this.className = "order__list";
  }

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
      <>
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
                    {/*  {!disabled && ( */}
                    {/*    <button className={"btn --icon icon-minus"}> */}
                    {/*      <object data={require("./icons/minus.svg")} name={"Reduce quantity"}/> */}
                    {/*    </button> */}
                    {/*  )} */}
                    {disabled
                      ? (
                        <div className={"quantity"}>
                          <span
                            className={"text"}>{[item.quantity, disabled && "Items"].filter(Boolean).join(" ")}</span>
                        </div>
                      )
                      : (
                        <>
                          <div className={"input-field"}>
                            <input className={"input"} type={"number"} value={item.quantity} disabled={disabled}/>
                          </div>
                          {/* <button className={"btn --icon icon-remove"} onClick={() => removeFromCart(index)}>Remove</button> */}
                        </>
                      )}
                    {/*  {!disabled && ( */}
                    {/*    <button className={"btn --icon icon-plus"}> */}
                    {/*      <object data={require("./icons/plus.svg")} name={"Increase quantity"}/> */}
                    {/*    </button> */}
                    {/*  )} */}
                  </div>
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
      </>
    );
  }
}
