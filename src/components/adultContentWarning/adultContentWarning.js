import { Component } from "@wearearchangel/handcrafted";

import "./adultContentWarning.scss";

class AdultContentWarning extends Component {
  constructor (...props) {
    super(props);
  }

  template () {
    const [, children] = this.props;

    const handleConfirmAge = () => {
      localStorage.setItem("adultContentWarning", "true");
      this.render();
    };

    const adultContentWarning = localStorage.getItem("adultContentWarning");
    if (adultContentWarning) {
      return children;
    } else {
      return (
        <div className="adult-content-warning-message">
          <h1 className={"adult-content-warning__title"}>Adult Content Warning</h1>
          <p className={"adult-content-warning__description"}>This page contains adult content. Please confirm that you
						are 18 years or older by clicking "Yes".</p>
          <button onClick={handleConfirmAge} className={"btn --primary"}>
            <span>Yes, I am</span>
          </button>
        </div>
      );
    }
  }
}

export default AdultContentWarning;
