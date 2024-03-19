import { Component } from "@wearearchangel/handcrafted";
import { KES } from "../../helpers/formatting";

import placeholder from "../../assets/images/placeholder.png";

import "./OrderList.scss";

class OrderList extends Component {
  constructor (props) {
    super(props);

    this.className = "order__list";
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
    const { cart, disabled, editable, setStep } = this.state;

    if (!cart.length) {
      return (
        <div className="message">
          <p className="text">Your cart is empty</p>
        </div>
      );
    }

    // const getProduct = async () => {
    //   await DataService.getCart("cart")
    //     .then((data) => {
    //       setLoading(false);
    //       const response = data?.data?.data;
    //       let total = 0;
    //       response.map((value) => {
    //         const price = value.price * value.quantity;
    //         total = total + price;
    //       });
    //       setTotal(total);
    //       setCartData(data?.data?.data);
    //     })
    //     .catch((error) => {
    //       const resMessage =
    // 				(error.response && error.response.data && error.response.data.msg) ||
    // 				error.message ||
    // 				error.toString();
    //       setLoading(false);
    //     });
    // };
    //
    // const getCartLocal = async () => {
    //   let total = 0;
    //   setLoading(false);
    //   const response = HelperService.getLocalCart();
    //   await Promise.all(
    //     response.map(async (value, i) => {
    //       const price = value.price * value.quantity;
    //       total = total + price;
    //       // get each product from db..
    //       await DataService.getProductDetail(value.product_id, "")
    //         .then((data) => {
    //           if (data?.data?.category) {
    //             response[i].Product = data?.data?.category;
    //           }
    //         })
    //         .catch((error) => {});
    //     })
    //   );
    //   setLoading(false);
    //   setTotal(total);
    //   setCartData(response);
    // };
    //
    // const initCart = () => {
    //   if (!auth) {
    //     getCartLocal();
    //   } else {
    //     getProduct();
    //   }
    // };

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

export default OrderList;
