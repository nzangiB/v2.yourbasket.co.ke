import "./DeliveryDetails.scss";
import React, { useEffect, useState } from "react";
import HelperService from "../../../services/helper.service";
import DataService from "../../../services/data.service";
import { toast } from "react-toastify";

// TODO: Delivery details form
function AddressForm ({
  showFormId,
  formData,
  handleFormChange,
  handleSubmit,
  zones,
  setSelectedRegion,
  selectedRegion,
  loading
}) {
  if (!showFormId) return null;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-details">
        <section>
          <div className={"input-field"}>
            <h3 className="title">{formData.id ? "Edit Address" : "Add New Address"}</h3>
          </div>
          <div className={"input-field"}>
            <select className="input" name="addresstype" value={formData.addresstype} onChange={handleFormChange}>
              <option value="">Select Address Type</option>
              <option value="home">Home</option>
              <option value="office">Office</option>
            </select>
          </div>
          {/* More input fields here */}
        </section>
        <footer className={"footer"}>
          <button type="submit" className="btn --primary" disabled={loading}>
            {loading && <span className="spinner-border spinner-border-sm"></span>}
						Save Address
          </button>
        </footer>
      </form>
    </div>
  );
}

// TODO: Delivery Details card
export function DeliveryCard ({
  address,
  handleAddressChange,
  selectedAddressId,
  startEditing,
  deleteAddress
}) {
  return (
    <div key={address.id} className="payment__details__card">
      <div className={"card__header"}>
        <div>
          <input
            type="radio"
            id={`address-${address.id}`}
            name="address"
            value={address.id}
            checked={parseInt(selectedAddressId) === address.id}
            onChange={handleAddressChange}
          />
          <label htmlFor={`address-${address.id}`} className={"title"}>
            {`${address.first_name} ${address.last_name}`}
          </label>
        </div>
        <div className={"action__btns"}>
          <button onClick={(e) => startEditing(e, address)} className="btn --secondary">
            <object data={require("../../../assets/icons/edit.svg")} name={"Edit"}/>
          </button>
          <button onClick={() => deleteAddress(address.id)} className="btn --secondary">
            <object data={require("../../../assets/icons/trash.svg")} name={"Delete"}/>
          </button>
        </div>
      </div>
      <div className="content">
        <div className="address__badge">{address.type === "office" ? "Office" : "Home"}</div>
        <div className="text">
          <div className="d-flex">
            <div className="phone">{address.phone}</div>
          </div>
          <div className="address">
            {`${address.address}, ${address.city}, ${address.region}`}
            <br/>
            {address.landmark}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryDetails ({ disabled, editable }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [shippingAmount, setShippingAmount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresstype, setAddresstype] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatephone, setAlternatephone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [regions, setRegions] = useState([]);
  const [gender, setGender] = useState("");
  const [zones, setZones] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [shippingRate, setShippingRate] = useState(0);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showFormId, setShowFormId] = useState(null);
  const [billingAddressId, setBillingAddressId] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(Boolean(editable));
  const [showAddressDetails, setShowAddressDetails] = useState(false);

  const startEditing = (e, address) => {
    e.preventDefault();

    console.log(address);
    setShowFormId(address.id);

    setEditingAddress(address);
    setShowForm(true);
    // Populate form data
    setAddresstype(address.type);
    setFirstName(address.first_name);
    setLastName(address.last_name);
    setAddress(address.address);
    setCity(address.city);
    setPhone(address.phone);
    setAlternatephone(address.alternate_phone || "");
    setSelectedRegion(address.region);
    setGender(address.gender || "");
    setLandmark(address.landmark || "");
    setRegions(address.region);
  };

  const deleteAddress = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        setLoading(true);
        await DataService.deleteAddress(id);
        setAddresses(addresses.filter(address => address.id !== id));
        toast.success("Address deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        toast.error("Failed to delete address.", {
          position: toast.POSITION.TOP_RIGHT
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await DataService.getAddress();
        setAddresses(response.data.data);
        // console.log("Addresses:", response.data.data);
        if (response.data.data.length > 0) {
          setSelectedAddressId(response.data.data[0].id); // Set default address if available
          updateShippingAmount(response.data.data[0].region);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const loadShippingRates = async () => {
      const rates = await HelperService.getShippingRates();
      console.log(rates);
      setZones(rates);
    };

    loadShippingRates();
  }, []);

  const handleAddressChange = (event) => {
    const newAddressId = event.target.value;
    setSelectedAddressId(newAddressId);
    const selectedAddress = addresses.find(addr => addr.id === parseInt(newAddressId));
    if (selectedAddress) {
      updateShippingAmount(selectedAddress.region);
    }
  };

  const handleRegionChange = (event) => {
    const { value } = event.target;
    console.log("Selected region:", value);
    setSelectedRegion(value);
    const foundRate = zones.flatMap(zone => zone.regions).find(region => region.name === value)?.rate;
    setShippingRate(foundRate || 0);
  };

  const updateShippingAmount = (region) => {
    const newShippingAmount = HelperService.getShippingRate(region);
    setShippingAmount(newShippingAmount);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "addresstype":
        setAddresstype(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "alternatephone":
        setAlternatephone(value);
        break;
      case "city":
        setCity(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "landmark":
        setLandmark(value);
        break;
      case "region":
        setRegions(value);
        break;
      case "gender":
        setGender(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedAddressId) {
      toast.error("Please select a shipping address.", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    // Basic validation
    if (!firstName || !lastName || !phone || !address || !city || !selectedRegion) {
      toast.error("Please fill in all required fields.", {
        position: toast.POSITION.TOP_RIGHT
      });
      setLoading(false);
      return;
    }

    const data = {
      type: addresstype,
      first_name: firstName,
      last_name: lastName,
      phone,
      phone_alt: alternatephone,
      city,
      address,
      landmark,
      gender,
      region: selectedRegion
    };

    const action = editingAddress ? () => DataService.updateAddress(data, editingAddress.id) : DataService.addAddress;

    action(data).then((response) => {
      const updatedAddress = response.data;

      if (editingAddress) {
        const updatedAddresses = addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr);
        setAddresses(updatedAddresses);
      } else {
        setAddresses([...addresses, updatedAddress]); // Append the new address to the list
      }
      toast.success(`Address ${editingAddress ? "updated" : "added"} successfully!`, {
        position: toast.POSITION.TOP_RIGHT
      });
      setEditingAddress(null);
      setShowForm(false);
      setShowFormId(null);
      // Reload or update the addresses list
    }).catch(() => {
      toast.error(`Failed to ${editingAddress ? "update" : "add"} address.`, {
        position: toast.POSITION.TOP_RIGHT
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={"delivery__details"}>
      <header className={"delivery__details-header"}>
        <div className="title">Delivery Details</div>
      </header>

      <section className={"delivery__details-shipping"}>
        {editable && (showForm
          ? (
            <div className="form">
              <form onSubmit={handleSubmit} className="form-container">
                <header>
                  <h3 className="title">Add New Address</h3>
                </header>

                <section>
                  <div className={"input-field"}>
                    <select className="input" name="addresstype" value={addresstype} onChange={handleChange}>
                      <option value="">Select Address Type</option>
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                  <div className={"input-field"}>
                    <input type="text" name="firstName" placeholder="First Name" className="input" value={firstName}
										       onChange={handleChange}/>
                    <input type="text" name="lastName" placeholder="Last Name" className="input" value={lastName}
										       onChange={handleChange}/>
                  </div>
                  <div className={"input-field"}>
                    <input type="text" placeholder="Address" name="address" className="input" value={address}
										       onChange={handleChange}/>
                    <select className="input" value={gender} name="gender" onChange={handleChange}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className={"input-field"}>
                    <input type="text" placeholder="Phone" name="phone" className="input" value={phone}
										       onChange={handleChange}/>
                    <input type="text" placeholder="Alternate Phone" name="alternatephone" className="input"
										       value={alternatephone}
										       onChange={handleChange}/>
                    <input type="text" placeholder="City" name="city" className="input" value={city}
										       onChange={handleChange}/>
                  </div>

                  <div className={"input-field"}>
                    <input type="text" placeholder="Landmark" name="landmark" className="input" value={landmark}
										       onChange={handleChange}/>
                  </div>
                  <div className={"input-field"}>
                    <select className="input" onChange={handleRegionChange} value={selectedRegion}>
                      <option value="">Select a region</option>
                      {zones.map(zone => (
                        <optgroup label={zone.name} key={zone.id}>
                          {zone.regions.map(region => (
                            <option key={`${region.name}-${region.provider}`} value={region.name}>
                              {`${region.name} - ${region.provider} (KES ${region.rate})`}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </section>

                <footer>
                  <div className="btn-group">
                    <button type="submit" className="btn --primary" disabled={loading}>
                      {loading && <span className="spinner-border spinner-border-sm"></span>}
											Save Address
                    </button>
                    <button onClick={toggleForm} className="btn --secondary">
											Cancel
                    </button>
                  </div>
                </footer>
              </form>
            </div>
          )
          : (
            <div className="card">
              <div className="content">
                <button onClick={toggleForm} className="btn --primary">
                  <object
                    className="icon"
                    data={require("../icons/plus.svg")}
                    name={"Add New Address"}
                  />
                  <span>Add New Address</span>
                </button>
              </div>
            </div>
          ))}

        {selectedAddressId && (
          <form className="content">
            {addresses.map(address => (
              <DeliveryCard
                key={address.id}
                address={address}
                selectedAddressId={selectedAddressId}
                startEditing={startEditing}
                handleAddressChange={handleAddressChange}/>
            ))}
          </form>
        )}
      </section>

      <section className={"delivery__details-billing"}>
        {editable && (
          <section className="card">
            <div className="content">
              <label htmlFor={"sameAsShippingCheckbox"} className="input-field">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  id={"sameAsShippingCheckbox"}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className={"checkbox"}
                />
                <span className="label">Billing address same as shipping address</span>
              </label>
            </div>
          </section>
        )}

        {/* TODO: Mixed component / should account for editable=false */}
        {!sameAsShipping && (
          <section className="form">
            <form className="form-container">
              <header>
                <h3 className="title">Select Billing Address</h3>
              </header>
              <section>
                {addresses.map((address) => (
                  <DeliveryCard
                    key={address.id}
                    address={address}
                    selectedAddressId={billingAddressId}
                    startEditing={startEditing}
                    handleAddressChange={handleAddressChange}
                  />
                ))}
              </section>
            </form>
          </section>
        )}
      </section>
    </div>
  );
}

export default DeliveryDetails;
