import React, { useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PutApi from "../apis/PutApi";
import { error_toaster, info_toaster, success_toaster } from "../../Toaster";
export default function ChangePassword() {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const inputEvent = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (password.oldPassword === "") {
      info_toaster("Please Enter Your Old Password");
    } else if (password.newPassword === "") {
      info_toaster("Please Enter Your New Password");
    } else {
      let response = await PutApi("users/updatepassword", {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      });
      if(response?.data?.ResponseCode === "1"){
        success_toaster(response.data.ResponseMessage);
        setPassword({oldPassword:"", newPassword:""})
      }
      else {
        error_toaster(response.data.errors);
      }
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <TopBar></TopBar>

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Change Password</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Change Password</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="password card">
            <form className="row p-3">
              <div class="col-lg-6 mb-3">
                <label htmlFor="inputPassword4" class="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Old Password Here"
                  name="oldPassword"
                  value={password.oldPassword}
                  onChange={inputEvent}
                />
              </div>
              <div class="col-lg-6 mb-3">
                <label htmlFor="inputPassword4" class="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password Here"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={inputEvent}
                />
              </div>
              <div className="change">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={changePassword}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
