// @ts-nocheck
import React, { useState } from "react";
import PostAPI from "../apis/PostApi";
import { useNavigate } from "react-router-dom";
import { error_toaster, success_toaster, info_toaster } from "../../Toaster";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
export default function Login() {
  // This state is used to get User email or password
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleUserData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  // Email Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formSubmite = async (ele) => {
    ele.preventDefault();

    const isValidEmail = validateEmail(data.email);
    if (data.email === "") {
      info_toaster("Please Enter Your Email");
    } else if (data.password === "") {
      info_toaster("Please Enter Your Password");
    } else {
      let res = await PostAPI("users/alogin", {
        email: data.email,
        password: data.password,
      });
      if (!isValidEmail) {
        error_toaster("Please Enter a Valid Email ");
      } else if (res?.data?.ResponseCode === "1") {
        success_toaster(res.data.ResponseMessage);
        navigate("/dashboard");
        localStorage.setItem("accessToken", res?.data?.Response?.accessToken);
      } else {
        error_toaster(res.data.errors);
      }
    }
  };

  // Show and hide Password Function
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className="login-page">
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bar"></div>
            </div>

            <div className="col-lg-8">
              <div className="login-content">
                <h1>Login to your account</h1>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="login-form my-4">
                <h2>Login to your account</h2>
                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      name="email"
                      onChange={handleUserData}
                      value={data.email}
                    />
                  </div>
                  <div className="mb-3 password-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={handleUserData}
                      value={data.password}
                    />
                    {showPassword ? (
                      <FaRegEyeSlash
                        className="icon"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="icon"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  <button
                    onClick={formSubmite}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
