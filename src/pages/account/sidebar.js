const Sidebar = () => {
  return (
    <div className="sidebar" style={{ backgroundColor: "whiteSmoke", width: "200px", height: "50vh", float: "left", marginLeft: "20px" }}>
      <h1>Settings</h1>
      <ul>
        <li>
          <a data-route="/account/userform">
            <a>My Profile</a>
          </a>
        </li>
        <li>
          <a data-route="/account/favorites">
            <a>My Favorites</a>
          </a>
        </li>
        <li>
          <a data-route="/account/notifications">
            <a>Notifications</a>
          </a>
        </li>
        <li>
          <a data-route="/account/orders">
            <a>My Orders</a>
          </a>
        </li>
        <li>
          <a data-route="/account/address">
            <a>My Addresses</a>
          </a>
        </li>
        <li>
          <a data-route="/account/support">
            <a>Support and Help</a>
          </a>
        </li>
        <li>
          <a href="/logout">
            <a>Logout</a>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
