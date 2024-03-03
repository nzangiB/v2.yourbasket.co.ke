import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const getPosition = {
  TOP_RIGHT: { gravity: "top", position: "right" },
  TOP_CENTER: { gravity: "top", position: "center" },
  TOP_LEFT: { gravity: "top", position: "left" },
  BOTTOM_RIGHT: { gravity: "bottom", position: "right" },
  BOTTOM_CENTER: { gravity: "bottom", position: "center" },
  BOTTOM_LEFT: { gravity: "bottom", position: "left" }
};

const getProps = ({ position, ...props }) => {
  let gravityPosition;
  if (typeof position === "string") {
    const [positionY, positionX] = position.split("-");
    gravityPosition = {
      gravity: positionY,
      position: positionX
    };
  } else if (typeof position === "object") {
    gravityPosition = getPosition[position];
  }

  return {
    ...gravityPosition,
    ...props
  };
};

const toast = props => Toastify(typeof props === "object"
  ? props
  : {
    text: props.toString()
  }).showToast();

toast.POSITION = getPosition;
toast.success = (message, props) => {
  Toastify({
    text: message,
    className: "success",
    style: {
      // backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
      backgroundColor: "green"
    },
    ...getProps(props)
  }).showToast();
};
toast.error = (message, props) => {
  Toastify({
    text: message,
    className: "error",
    style: {
      // backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
      backgroundColor: "red"
    },
    ...getProps(props)
  }).showToast();
};
toast.info = (message, props) => {
  Toastify({
    text: message,
    className: "info",
    style: {
      // backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
      backgroundColor: "blue"
    },
    ...getProps(props)
  }).showToast();
};
toast.warning = (message, props) => {
  Toastify({
    text: message,
    className: "warning",
    style: {
      // backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
      backgroundColor: "yellow"
    },
    ...getProps(props)
  }).showToast();
};

export { toast };

// import React, { useState, useRef } from "react";
// import { toast } from "react-toastify";
// import axios from "../../axios";
// import { useHistory } from "react-router-dom";
//
// const Toast = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const form = useRef();
//   const history = useHistory();
//
//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };
//
//   const navigateToNextPage = (e) => {
//     e.preventDefault();
//     setLoading(true);
//
//     if (otp.length === 4) {
//       axios.post("/verify-otp", { otp }).then(
//         (data) => {
//           setLoading(false);
//           history.push("/dashboard");
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.msg) ||
//             error.message ||
//             error.toString();
//
//           setLoading(false);
//           toast.error(resMessage, {
//             position: toast.POSITION.TOP_RIGHT,
//           });
//         }
//       );
//     } else {
//       setLoading(false);
//       toast.error("Please enter a valid OTP", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };
//
//   return (
//     <div>
//       <form ref={form} onSubmit={navigateToNextPage}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={handleOtpChange}
//         />
//         <button type="submit" disabled={loading}>
//           Verify OTP
//         </button>
//       </form>
//     </div>
//   );
// };
//
// export default Toast;
