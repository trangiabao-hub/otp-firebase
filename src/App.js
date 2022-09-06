import logo from "./logo.svg";
import "./App.css";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  confirmationResult,
} from "./firebase/config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState();

  const [isShowVerify, setShowVerify] = useState(false);

  // window.recaptchaVerifier = new RecaptchaVerifier(
  //   "recaptcha-container",
  //   {},
  //   auth
  // );

  const sendOtp = () => {
    const appVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          Swal.fire(
            "Good job!",
            "Sent OTP Success, Please enter code! ",
            "success"
          );
        },
      },
      auth
    );
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setConfirmationResult(confirmationResult);
        console.log("success");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const verify = () => {
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        Swal.fire("Good job!", "Good OTP", "success");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bad OTP",
        });
      });
  };

  const reset = () => {
    setConfirmationResult();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {!confirmationResult ? (
        <div className="phone">
          <label htmlFor="phone">Phone: </label>
          <input
            type="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
          />
          <button style={{ marginLeft: "10px" }} onClick={sendOtp}>
            Sent OTP
          </button>
        </div>
      ) : (
        <div className="code" style={{ marginTop: "10px" }}>
          <label htmlFor="phone">Code: </label>
          <input
            type="number"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <button style={{ marginLeft: "10px" }} onClick={verify}>
            Verify
          </button>
          <button style={{ marginLeft: "10px" }} onClick={reset}>
            Reset
          </button>
        </div>
      )}

      <div id="sign-in-button" style={{ display: "none" }}></div>
    </div>
  );
}

export default App;
