import Layout from "../pages/_layout";
import ForgotPassword from "../components-v1/ForgotPassword";
import ResetPassword from "../components-v1/ResetPassword";
import VerifyOTP from "../components-v1/VerifyOTP";

import { createRoot } from "react-dom/client";
import { Component } from "@wearearchangel/handcrafted";

import "./reset-password.scss";
import { NavHeader } from "../components/nav/navHeader";

function PageLayout (props, children) {
  return (
    <Layout {...props}>
      <NavHeader {...props}/>
      <div className="container">
        <main className="content">
          {children}
        </main>
      </div>
    </Layout>
  );
}

class PageForgotPassword extends Component {
  constructor (props) {
    super(props);
    this.root = null;
  }

  controller ({ component }) {
    this.root = createRoot(component);
    this.root.render(<ForgotPassword {...this.props}/>);
  }
}

class PageVerifyOTP extends Component {
  constructor (props) {
    super(props);
    this.root = null;
  }

  controller ({ component }) {
    this.root = createRoot(component);
    this.root.render(<VerifyOTP {...this.props}/>);
  }
}

class PageResetPassword extends Component {
  constructor (props) {
    super(props);
    this.root = null;
  }

  controller ({ component }) {
    this.root = createRoot(component);
    this.root.render(<ResetPassword {...this.props}/>);
  }
}

const routes = [
  {
    path: "/forgot",
    data: { page: { title: "Forgot Password" } },
    template (props) {
      return (
        <PageLayout>
          <PageForgotPassword {...props}/>
        </PageLayout>
      );
    }
  },
  {
    path: "/forgot",
    data: { page: { title: "Forgot Password" } },
    template (props) {
      return (
        <PageLayout>
          <PageVerifyOTP {...props}/>
        </PageLayout>
      );
    }
  },
  {
    path: "/reset-password/:token",
    data: { page: { title: "Reset Password" } },
    template (props) {
      return (
        <PageLayout>
          <PageResetPassword {...props}/>
        </PageLayout>
      );
    }
  }
];

export default routes;
