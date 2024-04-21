import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DataService from "../../../services/data.service";
import HelperService from "../../../services/helper.service";
import AuthService from "../../../services/auth.service";
import { KES } from "../../../helpers/formatting";

import "./OrderList.scss";

import placeholder from "../../../assets/images/placeholder.png";

function OrderList ({ cart, setCart, getCart, disabled, editable, setStep }) {
  const [loading, setLoading] = useState(true);
  const [cartSize, setCartSize] = useState(0);
  const [cartToShow, setCartToShow] = useState([]);
  const [itemsNotShown, setItemsNotShown] = useState(0);
  const [quantities, setQuantities] = useState([]);

  const deleteItemFromCart = async ({ item }) => {
    setLoading(true);

    try {
      const auth = AuthService.getCurrentUser();
      if (auth) {
        await DataService.deleteCart(item.id);
      } else {
        await HelperService.deleteLocalCart(item.product_id);
        toast.success("Product deleted from your basket!", { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error(error);
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      HelperService.updateCartCount();
      getCart();
    }

    setLoading(false);
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
        await HelperService.setLocalCart(item, parseInt(quantity));
      } else {
        const data = {};
        data.quantity = parseInt(quantity);
        // console.log("updateCartItem", data, item.id);
        await DataService.updateCart(data, item.id);
      }
    } catch (error) {
      console.error(error);
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      HelperService.updateCartCount();
      getCart();
    }

    setLoading(false);
  };

  const updateCart = async (data, item, wishlist = false) => {
    return DataService.updateCart(data, item.id).then(() => {
      getCart();
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  const updateQuantity = async (quantity, item) => {
    setLoading(true);

    try {
      const auth = AuthService.getCurrentUser();
      if (!auth) {
        await HelperService.setLocalCart(item, parseInt(quantity));
      } else {
        const data = {};
        data.quantity = parseInt(quantity);
        // await updateCart(data, item);
        await DataService.updateCart(data, item.id);
      }
    } catch (error) {
      console.error(error);
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      HelperService.updateCartCount();
      getCart();
    }

    setLoading(false);
  };

  const editCartEvent = (e) => {
    setStep("edit");
  };

  const decreaseQuantityEvent = async (index) => {
    setLoading(true);

    const item = cart[index];
    const quantity = parseInt(item.quantity) > 0 ? parseInt(item.quantity) - 1 : 0;

    // update quantity
    // const newQuantities = [...quantities];
    // newQuantities[index] = quantity;
    // setQuantities(newQuantities);

    // update item
    // let _cart;
    // console.log("decreaseQuantityEvent", quantity);
    // if (quantity === 0) {
    //   _cart = cart.filter((item, i) => {
    //     return index !== i;
    //   });
    // } else {
    //   _cart = cart.map((item, i) => {
    //     return index === i
    //       ? { ...item, quantity }
    //       : item;
    //   });
    // }
    // setCart(_cart);
    if (quantity <= 0) return deleteItemFromCart({ item });
    await updateQuantity(quantity, item);
    // try {
    // 	const item = cart[index];
    // 	const quantity = item.quantity - 1;
    // 	if (quantity <= 0) await deleteItemFromCart({ item });
    // 	await updateCartItem({ item, index, quantity });
    // } catch (error) {
    // 	console.error(error);
    // }

    setLoading(false);
  };

  const increaseQuantityEvent = async (index) => {
    setLoading(true);

    const item = cart[index];
    const quantity = parseInt(item.quantity) + 1;

    // update quantity
    // const newQuantities = [...quantities];
    // newQuantities[index] += 1;
    // setQuantities(newQuantities);

    // update item
    // console.log("increaseQuantityEvent", quantity);
    // const _cart = await Promise.all(
    //   cart.map((item, i) => {
    //     return index === i
    //       ? { ...item, quantity }
    //       : item;
    //   })
    // );
    // setCart(_cart);
    await updateQuantity(quantity, item);
    // try {
    //   const item = cart[index];
    //   const quantity = item.quantity + 1;
    //   await updateCartItem({ item, index, quantity });
    // } catch (error) {
    //   console.error(error);
    // }

    setLoading(false);
  };

  const removeFromCartEvent = async (index) => {
    setLoading(true);

    const item = cart[index];
    await deleteItemFromCart({ item });

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    let itemsToShow;
    const itemsToShowLimit = 3;
    if (editable && cart.length > itemsToShowLimit) {
      itemsToShow = itemsToShowLimit;
      setItemsNotShown(cart.length - itemsToShowLimit);
    } else {
      itemsToShow = cart.length;
      setItemsNotShown(0);
    }

    const cts = cart.slice(0, parseInt(itemsToShow));
    setCartToShow(cts);
    setLoading(false);
  }, [cart]);

  useEffect(() => {
    let newCartSize = 0;
    const newQuantities = cartToShow.map(item => {
      const quantity = parseInt(item.quantity, 10) || 0; // Safely parse and handle possibly undefined or non-numeric quantities
      newCartSize += quantity;
      return quantity;
    });

    setCartSize(newCartSize);
    setQuantities(newQuantities);
  }, [cartToShow]);

  return (
    <div className="order__list">
      {loading && (
        <section className="order__list">
          <div className="message">
            <p className="text">Loading...</p>
          </div>
        </section>
      )}
      {!loading && disabled
        ? (
          <header className="header">
            <div className="title">Order ({cartSize} items)</div>
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
      {!loading && cartToShow.length === 0 && (
        <div className="message">
          <p className="text">Your basket is empty</p>
        </div>
      )}
      {!loading && cartToShow.length > 0 && (
        <div className={`order__list-${editable ? "editable" : disabled ? "disabled" : "items"}`}>
          {cartToShow.map((item, index) => {
            // TODO: Loops to many times
            // console.log("index", index);
            // console.log("quantities", quantities[index]);
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
                    data-price={String(item.price * quantities[index])}
                    data-quantity={String(quantities[index])}
                  >
                    <div className={"btn-group"}>
                      {!disabled && (
                        <button
                          className={"btn --primary --icon icon-minus"}
                          onClick={() => decreaseQuantityEvent(index)}
                          disabled={loading || quantities[index] <= 0}
                        >
                          <span>-</span>
                        </button>
                      )}
                      <div className={"quantity"}>
                        <span className={"text"}>
                          {!loading && disabled ? [quantities[index], disabled && "Items"].filter(Boolean).join(" ") : quantities[index]}
                        </span>
                      </div>
                      {!disabled && (
                        <button
                          className={"btn --primary --icon icon-plus"}
                          onClick={() => increaseQuantityEvent(index)}
                          disabled={loading}
                          // disabled={quantities[index] >= 10}
                        >
                          <span>+</span>
                        </button>
                      )}
                    </div>
                    <div className={"btn-group"}>
                      {!disabled && (
                        <button
                          // className={"btn --icon icon-remove"}
                          className={"btn --size-sm"}
                          onClick={() => removeFromCartEvent(index)}
                          disabled={loading}
                        >
                          {/* <object */}
                          {/*  data={require('../icons/delete.svg')} */}
                          {/*  name={'Remove from Cart'} */}
                          {/* /> */}
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
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
      )}
    </div>
  );
}

export default OrderList;
