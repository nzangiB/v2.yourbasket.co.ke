import { useState } from "react";
import { toast } from "react-toastify";

import DataService from "../../../services/data.service";
import HelperService from "../../../services/helper.service";
import AuthService from "../../../services/auth.service";
import { KES } from "../../../helpers/formatting";

import "./OrderList.scss";

import placeholder from "../../../assets/images/placeholder.png";

function OrderList ({ cart, setCart, getCart, disabled, editable, setStep }) {
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState(cart.map(item => item.quantity));

  const getCartSize = () => {
    return cart.reduce((subTotal, item) => {
      subTotal += parseInt(item.quantity);
      return subTotal;
    }, 0);
  };

  const deleteItemFromCart = async ({ item }) => {
    setLoading(true);

    try {
      const auth = AuthService.getCurrentUser();
      if (!auth) {
        HelperService.deleteLocalCart(item.product_id);
        toast.success("Product deleted from cart!", { position: toast.POSITION.TOP_RIGHT });
      } else {
        DataService.deleteCart(item.id);
      }
    } catch (error) {
      console.error(error);
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    }

    setLoading(false);
    getCart();
  };

  const updateCartItem = async ({ item, index, quantity }) => {
    setLoading(true);

    try {
      // update local cart
      const _cart = cart.map((item, i) => index === i
        ? { ...item, quantity }
        : item);
      setCart(_cart);

      // update global cart
      const auth = AuthService.getCurrentUser();
      if (!auth) {
        HelperService.setLocalCart(item, quantity);
      } else {
        const data = {};
        data.quantity = quantity;
        DataService.updateCart(data, item.id);
      }
    } catch (error) {
      console.error(error);
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    }

    setLoading(false);
    getCart();
  };

  const updateCart = (data, item, wishlist = false) => {
    DataService.updateCart(data, item.id).then(
      async () => {
        setLoading(false);
        getCart();
      },
      (error) => {
        const resMessage =
					(error.response && error.response.data && error.response.data.msg) ||
					error.message ||
					error.toString();

        setLoading(false);
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    );
  };

  const editCartEvent = () => { setStep("edit"); };

  const updateQuantity = (e, item) => {
    if (e <= 0) {
      e = 1;
    }

    const auth = AuthService.getCurrentUser();
    if (!auth) {
      HelperService.setLocalCart(item, e);
      getCart();
    } else {
      const data = {};
      data.quantity = e;
      updateCart(data, item);
    }
  };

  const decreaseQuantityEvent = async (index) => {
    const item = cart[index];
    const quantity = item.quantity > 0 ? item.quantity - 1 : 0;
    if (quantity <= 0) await deleteItemFromCart({ item });

    // update quantity
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);

    // update item
    let _cart;
    if (quantity === 0) {
      _cart = cart.filter((item, i) => {
        return index !== i;
      });
    } else {
      _cart = cart.map((item, i) => {
        return index === i
          ? { ...item, quantity }
          : item;
      });
    }
    setCart(_cart);
    updateQuantity(quantity, item);
    // try {
    // 	const item = cart[index];
    // 	const quantity = item.quantity - 1;
    // 	if (quantity <= 0) await deleteItemFromCart({ item });
    // 	await updateCartItem({ item, index, quantity });
    // } catch (error) {
    // 	console.error(error);
    // }
  };

  const increaseQuantityEvent = async (index) => {
    const item = cart[index];
    const quantity = item.quantity + 1;

    // update quantity
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);

    // update item
    const _cart = await Promise.all(
      cart.map((item, i) => {
        return index === i
          ? { ...item, quantity }
          : item;
      })
    );
    setCart(_cart);
    updateQuantity(quantity, item);
    // try {
    //   const item = cart[index];
    //   const quantity = item.quantity + 1;
    //   await updateCartItem({ item, index, quantity });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const removeFromCartEvent = async (index) => {
    setLoading(true);

    try {
      const item = cart[index];
      await deleteItemFromCart({ item });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    getCart();
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
  const cartToShow = cart.slice(0, parseInt(itemsToShow));

  // if (loading) {
  //   return (
  //     <section className="order__list">
  // 			Loading...
  //     </section>
  //   );
  // }

  if (cartToShow.length === 0) {
    return (
      <section className="order__list">
        <div className="message">
          <p className="text">Your cart is empty</p>
        </div>
      </section>
    );
  }

  return (
    <div className="order__list">
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
            {/* <div className="tab"> */}
            {/*  <div className={"icon delete"}> */}
            {/*    <object data={require("../icons/delete.svg")} name={"Icon Delete"}/> */}
            {/*  </div> */}
            {/*  <div className={"text"}>All</div> */}
            {/* </div> */}
          </header>
        )
      }

      <div className={`order__list-${editable ? "editable" : disabled ? "disabled" : "items"}`}>
        {cartToShow.map((item, index) => {
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
            <div key={index} className={"order__list-item"}>
              {/* {!disabled && ( */}
              {/*  <div className={"list-item__actions"}> */}
              {/*    <div className={"checkbox"}></div> */}
              {/*  </div> */}
              {/* )} */}
              <div className={"list-item__image"}>
                <img src={item.image} alt={item.product_title}/>
              </div>
              <div className={"list-item__details"}>
                {/* <div className={'list-item__name'}> */}
                {/*  <span className={'title'} title={item.product_title}>{title}</span> */}
                {/* </div> */}
                {item?.Product?.Brand?.name && (
                  <div className={"list-item__brand"}>
                    <span className={"title"} title={item?.Product?.Brand?.name}>
                      {item?.Product?.Brand?.name}
                    </span>
                  </div>
                )}
                {item?.Product?.name && (
                  <div className={"list-item__name"}>
                    <span className={"title"} title={item?.Product?.name}>
                      {item?.Product?.name}
                    </span>
                  </div>
                )}
                {item?.variant && (
                  <div className={"list-item__variant"}>
                    <span className={"title"} title={item?.variant}>
                      {item?.variant}
                    </span>
                  </div>
                )}
                {!disabled && (
                  <div className={"list-item__price"}>
                    <span>{KES.format(item.price)}</span>
                  </div>
                )}
                <div
                  className={"list-item__quantity"}
                  data-price={item.price * quantities[index]}
                  data-quantity={quantities[index]}
                >
                  {!disabled && (
                    <button
                      className={"btn --icon icon-minus"}
                      onClick={() => decreaseQuantityEvent(index)}>
                      <span>-</span>
                    </button>
                  )}
                  <div className={"quantity"}>
                    <span className={"text"}>
                      {[quantities[index], disabled && "Items"].filter(Boolean).join(" ")}
                    </span>
                  </div>
                  {!disabled && (
                    <button className={"btn --icon icon-plus"} onClick={() => increaseQuantityEvent(index)}>
                      <span>+</span>
                    </button>
                  )}
                </div>
                {/* <div className={"list-item__actions"}> */}
                {/*  {!disabled && ( */}
                {/*    <button className={"btn --icon icon-remove"} onClick={() => removeFromCartEvent(index)}> */}
                {/*      <span>Remove</span> */}
                {/*    </button> */}
                {/*  )} */}
                {/* </div> */}
              </div>
            </div>
          );
        })}
        {editable && itemsNotShown > 0 && (
          <div className={"order__list-item"}>
            <div className={"list-item__others"}>
							+ {itemsNotShown} more products
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderList;
