import Layout from "./_layout";

import "./account.scss";

const routes = [
  {
    path: "/account",
    data: { page: { title: "Account" } },
    template: (props) => {
      const profile = routes.find((route) => route.path === "/account/profile");
      return profile.template(props);
    }
  },
  {
    path: "/account/profile",
    data: { page: { title: "My Profile" } },
    template: (props) => (
      <Layout {...props}>
				My Profile
      </Layout>
    )
  },
  {
    path: "/account/favorites",
    data: { page: { title: "My Favorites" } },
    template: (props) => (
      <Layout {...props}>
				My Favorites
      </Layout>
    )
  },
  {
    path: "/account/notifications",
    data: { page: { title: "Notifications" } },
    template: (props) => (
      <Layout {...props}>
				Notifications
      </Layout>
    )
  },
  {
    path: "/account/orders",
    data: { page: { title: "My Orders" } },
    template: (props) => (
      <Layout {...props}>
				My Orders
      </Layout>
    )
  },
  {
    path: "/account/address",
    data: { page: { title: "My Addresses" } },
    template: (props) => (
      <Layout {...props}>
				My Addresses
      </Layout>
    )
  }
];

export default routes;
