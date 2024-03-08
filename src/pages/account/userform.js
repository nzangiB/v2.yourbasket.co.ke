import Sidebar from "./sidebar";
import AuthService from "../../services/auth.service";

const UserForm = () => {
  const auth = AuthService.getCurrentUser();

  return (
    <div className="flex">
      <Sidebar />
      <div className="user-form">
        <h1>{auth.first_name}{auth.last_name}</h1>
        <h3>Update your Photo and personal detail</h3>
        <form method="get">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label> <br/>
            <input type="text" id="firstName" name="firstName" value={auth.first_name} />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label><br/>
            <input type="text" id="lastName" name="lastName" value={auth.last_name}/>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label><br/>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={auth.phone}/>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label><br/>
            <input type="email" id="email" name="email" value={auth.email}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
