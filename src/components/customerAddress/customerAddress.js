import Check from "../../assets/images/productpage/icons/check.svg"
import './CustomerAddress.scss';

export function customerAddress (props) {
    return `
    <div class="customerAddress__container">

        <div class="orderCard__container">
            <div class="orderCard__item">
                <div class="orderCard__text">
                    <img src="${Check}" alt="check icon">
                    <h3>1. Customer Address</h3>
                </div>

                <div class="orderCard__details">
                    <h3>Add Address</h3>
                    <div class="orderCard__form">
                        <form>

                            <div class="form__details">
                                <div class="form__item">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number" required>
                                </div>

                                <div class="form__item">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number" required>
                                </div>

                                <div class="form__item">
                                    <label for="alternatePhoneNumber">Alternate</label>
                                    <input type="tel" id="alternatePhoneNumber" name="alternatePhoneNumber" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number">
                                </div>
                            </div>

                            <div class="form__address form__details">
                                <div class="address__item">
                                    <label for="firstName">Full Name(First and Last Name)</label>
                                    <input  id="firstName" name="firstName" required>
                                </div>

                                <div class="address__item">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number" required>
                                </div>
                            </div>

                            <div class="form__address form__details">
                                <div class="address__item">
                                    <label for="firstName">Full Name(First and Last Name)</label>
                                    <input  id="firstName" name="firstName" required>
                                </div>

                                <div class="address__item">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number" required>
                                </div>
                            </div>

                            <div class="form__buttons">
                                <button>SAVE</button>
                                <button>CANCEL</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>

        <div class="orderCard__container">
            <div class="orderCard__item">
                <div class="orderCard__text">
                    <img src="${Check}" alt="check icon">
                    <h3>2. Delivery Details</h3>
                </div>
                <p>Choose whether to get a home delivery or choose to pick from one of our stations.</p>
            </div>
        </div>

        <div class="orderCard__container">
            <div class="orderCard__item">
                <div class="orderCard__text">
                    <img src="${Check}" alt="check icon">
                    <h3>3. Payment Option</h3>
                </div>
                <p>Pay Fast and securely with Mpesa, Bank Cards, Partial Payment and Aspira</p>
            </div>
        </div>

            
    </div>
    
    `;
}

