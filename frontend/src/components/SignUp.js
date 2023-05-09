import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const url = "http://127.0.0.1:2001/api/adduser";

  const navigate = useNavigate();

  const signUpButton = (e) => {
    e.preventDefault();

    // Validation Checks

    // Password length should be greater than 4
    if (password.length < 4) {
      toast.warn("Password should be 4 or more characters");
    }

    // If Passwords do not match
    if (password !== confirm_password) {
      toast.warn("Please make sure your passwords match!");
    }

    //  If all conditions are met, then add the new user
    else {
      try {
        axios
          .post(url, {
            fullname: fullname,
            email: email,
            password: password,
          })
          .then((response) => {
            console.log(response.data);
            toast.success("Successfully registered");
            navigate("/");
          })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              Object.keys(error.response.data).map((keyName, i) =>
                toast.error(JSON.stringify(error.response.data[keyName]))
              );
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // MAIN RETURN FUNCTION

  return (
    <div className="container grid place-items-center">
      <div className=" bg-purple-400  min-w-md  w-2/5 mt-10 px-16 py-4 ">
        <h3 className="text-black text-center text-3xl font-semibold mb-3">
          Register Here
        </h3>
        <form className="" id="add-user-form">
          <div className=" grid grid-cols-2">
            <div className=" flex flex-col text-black text-lg mb-2">
              <label htmlFor="full_name" className=" mb-2">
                Full Name
              </label>
              <label htmlFor="email" className=" mb-2">
                Email
              </label>
              <label htmlFor="password" className=" mb-2">
                Password
              </label>
              <label htmlFor="password" className=" mb-2">
                Confirm Password
              </label>
            </div>
            <div className=" flex flex-col text-black text-lg mb-2">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                className="mb-2 px-1"
                onChange={(e) => setFullName(e.target.value)}
                value={fullname}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="mb-2 px-1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="mb-2 px-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="mb-2 px-1"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirm_password}
              />
            </div>
          </div>
          <div className="grid place-content-center mb-3">
            <button
              type="submit"
              className=" bg-purple-700 rounded-full py-3 px-8 mt-2 text-white text-xl uppercase font-semibold hover:bg-purple-900"
              onClick={signUpButton}
            >
              Sign Up
            </button>
          </div>
          <p className=" text-center">
            Already have an account?{" "}
            <Link to={"/"} className="text-blue-700 underline font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );

  //END OF MAIN RETURN FUNCTION
};

export default SignUp;
