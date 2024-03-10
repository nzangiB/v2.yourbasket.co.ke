export function RegistrationFormVendor (props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    console.log("VendorRegistrationForm", form);
  };

  return (
    <form className={"form"} onSubmit={handleSubmit}>
			Vendor Registration Form
    </form>
  );
}
