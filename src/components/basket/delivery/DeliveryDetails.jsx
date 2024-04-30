import "./DeliveryDetails.scss";
import { useEffect, useState } from "react";
import HelperService from "../../../services/helper.service";
import DataService from "../../../services/data.service";
import { toast } from "react-toastify";

// TODO: Delivery details form
import React from 'react';

function AddressForm({
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
          <div className={"footer"}>
            <button type="submit" className="btn --primary" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              Save Address
            </button>
          </div>
        </form>
      </div>
  );
}



// TODO: Delivery Details card

function DeliveryDetails () {
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

  const startEditing = (e, address) => {
    e.preventDefault();

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
        console.log("Addresses:", response.data.data);
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
      const rates = HelperService.getShippingRates();
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

    // Basic validation
    if (!firstName || !lastName || !phone || !address || !city || !regions) {
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
      regions
    };
    const action = editingAddress ? DataService.updateAddress : DataService.addAddress;

    action(data).then(() => {
      toast.success(`Address ${editingAddress ? "updated" : "added"} successfully!`, {
        position: toast.POSITION.TOP_RIGHT
      });
      setEditingAddress(null);
      setShowForm(false);
      setShowFormId(null);
      // Reload or update the addresses list
    }).catch((error) => {
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
    <div className={"payment__details"}>
      <header>
        <div className="title">Delivery Details</div>

        <button onClick={toggleForm} className="btn --primary">
          {showForm ? "Hide Form" : "Add New Address"}
        </button>
      </header>
      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-details">
            <div className={"input-field"}>
              <h3 className="title">Add New Address</h3>
            </div>
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
              <input type="text" placeholder="City" name="city" className="input" value={city} onChange={handleChange}/>
            </div>

            <div className={"input-field"}>
              <input type="text" placeholder="Landmark" name="landmark" className="input" value={landmark}
                onChange={handleChange}/>
            </div>
            <div className={"input-field"}>
              <select className={"input"} onChange={handleRegionChange} value={selectedRegion}>
                <option value="">Select a region</option>
                {zones.map(zone => (
                  <optgroup label={zone.name} key={zone.name} className={"title"}>
                    {zone.regions.map(region => (
                      <option key={`${region.name}-${region.provider}`} value={region.name} className={"input"}>
                        {`${region.name} - ${region.provider} (KES ${region.rate})`}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className={"footer"}>
              <button type="submit" className="btn --primary" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                Save Address
              </button>
            </div>
          </form>

        </div>
      )}
      <div>
        <form>
          {addresses.map(address => (
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
                  <button onClick={(e) => startEditing(e, address)} className="btn --secondary">Edit</button>
                  <button onClick={() => deleteAddress(address.id)} className="btn --danger">Delete</button>
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
          ))}
        </form>
        <section>
          {/*<div className="content">*/}
          {/*  <div className="title">Shipping Cost:</div>*/}
          {/*  <div className="text">*/}
          {/*    {shippingAmount === 0 ? `${shippingRate ? `KES ${shippingRate}` : "Free"}` : `KES ${shippingAmount.toFixed(2)}`}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </section>
      </div>
    </div>
  );
}

export default DeliveryDetails;
