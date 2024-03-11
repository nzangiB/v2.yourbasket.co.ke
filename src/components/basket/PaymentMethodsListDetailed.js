import { Component } from "@wearearchangel/handcrafted";
import io from "socket.io-client";

import { toast } from "../../plugins/react-toastify";
import { API_URL } from "../../helpers/constants";
import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";

import Otp from "./Otp";
import PaymentMethodsIPayForm from "./PaymentMethodsIPayForm";

class PaymentMethodsListDetailed extends Component {
  constructor (props) {
    super(props);

    this._state.step = this.props.step;

    // this._state.buyNow = this.buyNow.bind(this);
    this._state.setBuyNow = this.setBuyNow.bind(this);

    // this._state.orderLoading = this.orderLoading.bind(this);
    this._state.setOrderLoading = this.setOrderLoading.bind(this);

    // this._state.paymentMethod = this.paymentMethod.bind(this);
    this._state.setPaymentMethod = this.setPaymentMethod.bind(this);

    this.navigate = this.navigate.bind(this);

    this._state.data = [];
    this._state.totalAmount = 0;

    this.className = "payment__methods-list--detailed";
  }

  get params () {
    return this.props.params;
  }

  get searchParams () {
    return new URLSearchParams(window.location.search);
  }

  get orderSent () {
    return this._state.orderSent || false;
  }

  set orderSent (value) {
    this._state.orderSent = value;
  }

  navigate (value) {
    if (!value) {
      location.reload();
    } else {
      if (value.startsWith("/")) {
        location.href = value;
      } else if (value.startsWith("checkout")) {
        this.setStep(value);
      } else {
        this.props.setStep(value);
      }
    }
  }

  step () {
    return this._state.step || "checkout";
  }

  setStep (value) {
    this._state.step = value;
    this.render();
  }

  buyNow () {
    return this._state.buyNow;
  }

  setBuyNow (value) {
    this._state.buyNow = value;
  }

  orderLoading () {
    return this._state.orderLoading;
  }

  setOrderLoading (value) {
    this._state.orderLoading = value;
  }

  paymentMethod () {
    return this._state.paymentMethod;
  }

  setPaymentMethod (value) {
    this._state.paymentMethod = value;
  }

  submitOtp = async () => {
    this.state.setOrderLoading(true);
    await DataService.sendOtp({ apikey: "yourbasket2023" }).then(() => {
      this.state.setOrderLoading(false);
      toast.success("OTP sent successfully!", { position: toast.POSITION.TOP_RIGHT });
      this.navigate("checkout/otp");
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
      this.state.setOrderLoading(false);
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  submitOrder = () => {
    if (this.state.paymentMethod === "Cash on delivery") {
      return this.submitOtp();
    } else {
      return this.submitOrderFinal();
    }
  };

  submitOrderFinal = () => {
    if (this.state.paymentMethod) {
      return this.submitOrderFinalNew(this.state.paymentMethod);
    } else {
      toast.error("Please select payment method", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  submitOrderFinalNew = async (paymentMethod, iPayData = []) => {
    this.state.setOrderLoading(true);
    const { totalAmount } = this.state;

    const shippingAmount = (localStorage.getItem("shippingAmount") ? JSON.parse(localStorage.getItem("shippingAmount")) : 0);
    const phoneNumber = (localStorage.getItem("phone") ? JSON.parse(localStorage.getItem("phone")) : 0);

    const data = {};
    data.payment_method = paymentMethod;
    // data.total_amount = totalAmount+((totalAmount*16)/100)+shippingAmount;
    data.total_amount = totalAmount + shippingAmount;
    data.item_amount = totalAmount;
    data.tax_amount = 0;// (totalAmount*16)/100;
    data.address_id = JSON.parse(localStorage.getItem("addressId"));
    data.billing_address_id = JSON.parse(localStorage.getItem("addressId2"));
    data.shipping_amount = shippingAmount;
    data.phone_number = phoneNumber;
    data.ipay_data = iPayData.join("~~");
    data.sale_type = this.state.buyNow ? "buynow" : "cart";

    await DataService.createOrder(data).then(async (response) => {
      if (response?.data?.data?.order_tracking_id) {
        window.location.href = response.data.data.redirect_url;
      } else if (response?.data?.data?.CheckoutRequestID) {
        // wait for socket listen
        toast.success("M-PESA request sent!", { position: toast.POSITION.TOP_RIGHT });
      } else if (response?.data?.data?.hash) {
        if (response?.data?.data?.formdata) {
          localStorage.setItem("ipay_oid", response?.data?.data?.formdata?.oid);
          const form1 = document.getElementById("ipay-payment-form");
          const entries = Object.entries(response?.data?.data?.formdata);
          await Promise.all(entries.map(([key, val]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = val;
            form1.appendChild(input);
          }));
          document.getElementById("ipay-payment-form").submit();
        }
      } else {
        localStorage.removeItem("addressId");
        localStorage.removeItem("addressId2");
        localStorage.removeItem("shippingAmount");
        this.state.setOrderLoading(false);
        this.navigate("receipt");
      }
    }).catch((error) => {
      this.state.setOrderLoading(false);
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  checkForGateway = async () => {
    if (this.params.gateway && this.params.gateway === "ipay") {
      if (!this.orderSent) {
        this.orderSent = true;

        const txncd = this.searchParams.get("txncd");
        const status = this.searchParams.get("status");
        const p1 = this.searchParams.get("p1");
        const id = this.searchParams.get("id");
        const iPayOid = localStorage.getItem("ipay_oid");
        localStorage.removeItem("ipay_oid");
        if (id === p1 && id === iPayOid) {
          if (status === "aei7p7yrx4ae34") {
            document.getElementById("inlineRadio1").checked = true;
            await this.submitOrderFinalNew("iPay", [id, txncd]);
          } else {
            toast.error("Payment Failed, Please try again!", { position: toast.POSITION.TOP_RIGHT });
            this.navigate("checkout");
          }
        } else {
          this.navigate("");
        }
      }
    }
  };

  async data () {
    let cartData, totalAmount;

    const getProduct = async () => {
      await DataService.getCart("cart").then((data) => {
        const response = data?.data?.data;
        cartData = data?.data?.data;

        let total = 0;
        response.forEach(value => {
          const price = value.price * value.quantity;
          total = total + price;
        });

        totalAmount = total;
        this.checkForGateway();
      }).catch((error) => {
        const resMessage = (error.response?.data?.msg) || error.message || error.toString();
        console.error(resMessage);
      });
    };

    const getTempProduct = async () => {
      await DataService.getTempCart().then((data) => {
        const response = data?.data?.data;
        cartData = data?.data?.data;

        let total = 0;
        response.forEach(value => {
          const price = value.price * value.quantity;
          total = total + price;
        });

        totalAmount = total;
        this.checkForGateway();
      }).catch((error) => {
        const resMessage = (error.response?.data?.msg) || error.message || error.toString();
        console.error(resMessage);
      });
    };

    const auth = AuthService.getCurrentUser();
    if (!auth) {
      this.navigate("/login?url=checkout");
    } else {
      if (this.searchParams.has("buynow")) {
        this.state.setBuyNow(true);
        await getTempProduct();
      } else {
        await getProduct();
      }
    }

    return { data: cartData, totalAmount };
  }

  async template () {
    const { step, paymentMethod } = this.state;

    // console.log("cart", cart);
    // console.log("data", this.state.data);
    // console.log("totalAmount", this.state.totalAmount);

    const otpVerifiedEvent = () => {
      this.submitOrderFinal();
    };

    const placeOrder = async (e) => {
      return this.submitOrder();
    };

    const changePaymentMethodEvent = (e) => {
      const paymentMethod = e.target.value;
      this.setPaymentMethod(paymentMethod);

      const button = e.target.closest("form").querySelector("button");
      button.disabled = !paymentMethod || paymentMethod === "";
    };

    const payNowEvent = async (e) => {
      e.preventDefault();

      const button = e.target;
      button.disabled = true;
      button.innerHTML = "Paying...";

      await placeOrder(e);

      button.disabled = false;
      button.innerHTML = "Pay Now";
    };

    const payLaterEvent = async (e) => {
      e.preventDefault();

      const button = e.target;
      button.disabled = true;
      button.innerHTML = "Paying...";

      this.setPaymentMethod("Aspira");
      await placeOrder(e);

      button.disabled = false;
      button.innerHTML = "Pay Later";
    };

    const payOnDeliveryEvent = async (e) => {
      e.preventDefault();

      const button = e.target;
      button.disabled = true;
      button.innerHTML = "Paying...";

      this.setPaymentMethod("Cash on delivery");
      await placeOrder(e);

      button.disabled = false;
      button.innerHTML = "Pay on Delivery";
    };

    // const changePaymentMethodEvent = (e) => {
    //   const value = e.target.value;
    //   setSelectedOption(value);
    //   // Reset phone number when changing options
    //   // setPhoneNumber("");
    //   // setPaymentMethod(value);
    //   console.log(value);
    //   if (value === "mpesa") {
    //     // paymentMethodChange('Mpesa');
    //   }
    // };

    if (step === "checkout/otp") {
      return (
        <div className={"list-item --selected"}>
          <div className={"list-item__title"}>
            <span>Pay on Delivery</span>
          </div>
          <Otp otpVerifiedEvent={otpVerifiedEvent}/>
        </div>
      );
    }

    return (
      <>
        <div className={"list-item --selected"}>
          <div className={"list-item__title"}>
            <span>Pay Now</span>
            {/* <object data={require("./icons/arrow-up.svg")} name={"Pay Now"}/> */}
          </div>
          <form className={"form details"}>
            <div className="input-field --has-label">
              <label className={"label"}>Choose a payment method</label>
              <select
                className={"input"}
                name="payNow"
                id="payNow"
                value={paymentMethod}
                onChange={changePaymentMethodEvent}
              >
                <option value="">Choose a payment method</option>
                <option value="Mpesa">M-Pesa</option>
                {/* <option value="Airtel Money">Airtel Money</option> */}
                <option value="iPay">iPay</option>
                <option value="Pesapal">PesaPal</option>
                {/* <option value="Pesalink">Pesalink</option> */}
                {/* <option value="Debit Credit Card">Debit/credit Card</option> */}
                {/* <option value="Amex">Amex</option> */}
              </select>
            </div>
            {/* {paymentMethod === "Mpesa" && ( */}
            {/* <> */}
            {/*  <div className="input-field"> */}
            {/*    <input className={"input"} type="tel" placeholder={"Phone Number"} value={data.phone}/> */}
            {/*  </div> */}
            <button
              type="submit"
              disabled={!this.state.paymentMethod || this.state.paymentMethod === ""}
              className={"btn --primary"}
              onClick={payNowEvent}
            >
              <span>Pay Now</span>
            </button>
            <PaymentMethodsIPayForm/>
            {/* </> */}
            {/* )} */}
          </form>
        </div>
        <div className={"list-item --selected"}>
          <div className={"list-item__title"}>
            <span>Pay Later with Aspira</span>
            {/* <object data={require("./icons/arrow-down.svg")} name={"Pay Later with Aspira"}/> */}
          </div>
          <div className={"list-item__content"}>
            <p className={"text"}>YourBasket is offering to give you flexibility in your spending. Simply
							checkout
							and our agents will
							contact you with more details on your order. Prices might change when paying with Aspira.</p>
            <button disabled={true} className={"btn --primary"} onClick={payLaterEvent}>Pay Later</button>
          </div>
        </div>
        <div className={"list-item --selected"}>
          <div className={"list-item__title"}>
            <span>Pay on Delivery</span>
            {/* <object data={require("./icons/arrow-down.svg")} name={"Pay on Delivery"}/> */}
          </div>
          <div className={"list-item__content"}>
            <p className={"text"}>YourBasket will send you an OTP to verify your order before it's
							expedited.</p>
            <button className={"btn --primary"} onClick={payOnDeliveryEvent}>Pay on Delivery</button>
          </div>
        </div>
      </>
    );
  }

  controller () {
    const newSocket = io(API_URL);
    newSocket.on("paymentstatus", (data) => {
      console.log(data, "data");
      const auth = AuthService.getCurrentUser();
      if (data.user_id === auth.id) {
        this.state.setOrderLoading(false);
        if (data?.data?.ResultCode === 0) {
          this.state.setStep("receipt");
          // return () => newSocket.close();
        } else {
          toast.error(data?.data?.ResultDesc, { position: toast.POSITION.TOP_RIGHT });
        }
      }
    });
    return () => newSocket.close();
  }
}

export default PaymentMethodsListDetailed;
