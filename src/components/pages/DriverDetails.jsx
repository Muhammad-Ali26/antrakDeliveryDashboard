import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { FaArrowLeft } from "react-icons/fa";
import GetAPI from "../apis/GetAPI";
import { baseUrl } from "../../BaseUrl";
import { FiSend } from "react-icons/fi";
export default function DriverDetails() {
  const naviagte = useNavigate();
  const [navtabs, setNavtabs] = useState("driverDetails");
  const location = useLocation();

  const response = GetAPI(`driver/review/${location?.state?.id}`);

  console.log(
    "🚀 ~ file: DriverDetails.jsx:16 ~ DriverDetails ~ response:",
    response
  );
  const navigateToBack = () => {
    naviagte("/allDrivers");
  };
  return (
    <>
      <Navbar></Navbar>
      <TopBar></TopBar>
      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="tabs">
                <button
                  className="add-admin mb-3 d-flex align-items-center gap-2"
                  onClick={navigateToBack}
                >
                  <FaArrowLeft />
                  <span>Back</span>
                </button>
              </div>
              <div className="card">
                <div className="navtabs">
                  <ul className="nav nav-tabs">
                  <li class="nav-item">
                    <Link className= "nav-link"  onClick={() => setNavtabs("driverDetails")}>
                      Driver Details
                    </Link>
                    </li>
                    <li class="nav-item">
                    <Link className= "nav-link" onClick={() => setNavtabs("license")}>
                      License Information
                    </Link>
                    </li>
                    <li class="nav-item">
                    <Link className= "nav-link" onClick={() => setNavtabs("vehInfo")}>
                      Vehicle Information
                    </Link>
                    </li>
                    <li class="nav-item">
                    <Link className= "nav-link" onClick={() => setNavtabs("checkBalance")}>
                      Driver Bank and Balance
                    </Link>
                    </li>
                    <li class="nav-item">
                    <Link className= "nav-link" onClick={() => setNavtabs("ratings")}>
                      Ratings
                    </Link>
                    </li>
                    <li class="nav-item">
                    <Link className= "nav-link" onClick={() => setNavtabs("rides")}>
                      All Rides
                    </Link>
                    </li>
                  </ul>
                </div>
                <div className="details">
                  {navtabs === "driverDetails" ? (
                    <div className="container-fluid">
                      <div className="driver-details">
                        <div className="row">
                          <div className="col-lg-6">
                            <img
                              src={`${baseUrl}${response?.getData?.Response?.profilePicture}`}
                              alt="photo"
                            />
                          </div>
                          <div className="col-lg-6">
                            <div className="driver-content">
                              <h2>
                                Driver Name: {response?.getData?.Response?.name}
                              </h2>
                              <p>User ID: {response?.getData?.Response?.id} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row p-4">
                        <div className="col-lg-6">
                          <div className="info">
                            <h2>Full Name</h2>
                            <h2>Email Name</h2>
                            <h2>Phone</h2>
                            <h2>State</h2>
                            <h2>Vehicle Type</h2>
                            <div>
                              <NavLink to= "https://mail.google.com">
                              <button className="btn btn-primary d-flex align-items-center gap-1">
                                <FiSend />
                                <span>Send Mail</span>
                              </button>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="info">
                            <p>{response?.getData?.Response?.name}</p>
                            <p>{response?.getData?.Response?.email}</p>
                            <p>{response?.getData?.Response?.phoneNum}</p>
                            <p>{response?.getData?.Response?.SSN}</p>
                            <p>{response?.getData?.Response?.vehicleType}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : navtabs === "license" ? (
                    <div className="container-fluid">
                      <div className="row p-4">
                        <h1 className="info-heading">License Information</h1>
                        <div className="col-lg-6">
                          <div className="info">
                            <h2>Issue Date</h2>
                            <h2>Expiry Date</h2>
                            <h2>License No.</h2>
                            <h2>Issuing State</h2>
                            <h2>License Front Photo</h2>
                            <img
                              src={`${baseUrl}${response?.getData?.Response?.licenseData?.frontPhoto}`}
                              alt="frontPhoto"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="info">
                            <p>
                              {
                                response?.getData?.Response?.licenseData
                                  ?.issueDate
                              }
                            </p>
                            <p>
                              {
                                response?.getData?.Response?.licenseData
                                  ?.expiryDate
                              }
                            </p>
                            <p>
                              {
                                response?.getData?.Response?.licenseData
                                  ?.Licnumber
                              }
                            </p>
                            <p>
                              {
                                response?.getData?.Response?.licenseData
                                  ?.issueState
                              }
                            </p>
                            <h2>License Back Photo</h2>
                            <img
                              src={`${baseUrl}${response?.getData?.Response?.licenseData?.backPhoto}`}
                              alt="frontPhoto"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : navtabs === "vehInfo" ? (
                    <div className="container-fluid">
                      <div className="row p-4">
                        <h1 className="info-heading">Vehicle Information</h1>
                        <div className="col-lg-6">
                          <div className="info">
                            <h2>License Plate</h2>
                            <h2>Make</h2>
                            <h2>Model</h2>
                            <h2>Year</h2>
                            <h2>Color</h2>
                            <h2>Vehicle Documents</h2>
                            <img
                              src={`${baseUrl}${response?.getData?.Response?.licenseData?.frontPhoto}`}
                              alt="frontPhoto"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="info">
                            <p>
                              {
                                response?.getData?.Response?.VehicleData
                                  ?.plateNum
                              }
                            </p>
                            <p>
                              {response?.getData?.Response?.VehicleData?.make}
                            </p>
                            <p>
                              {response?.getData?.Response?.VehicleData?.model}
                            </p>
                            <p>
                              {response?.getData?.Response?.VehicleData?.year}
                            </p>
                            <p>
                              {response?.getData?.Response?.VehicleData?.color}
                            </p>
                            <h2>Vehicle Images</h2>
                            <img
                              src={`${baseUrl}${response?.getData?.Response?.licenseData?.backPhoto}`}
                              alt="frontPhoto"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : navtabs === "checkBalance" ? (
                    <div className="container-fluid">
                      <div className="row p-4">
                        <div className="col-lg-6">
                          <div className="check-balance">
                            {/* {alert(
                              `${baseUrl} says ${response?.getData?.Response?.id}`
                            )} */}
                            <h2>Balance :</h2>
                            <h2>Total Earnings :</h2>
                            <h2>Earning by rides :</h2>
                            <h2>Earning by Tips :</h2>
                            <h2>Paid :</h2>
                            <h2>Penalty for cancelling :</h2>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <h2>Payment Method :</h2>
                          <h2>Bank Name :</h2>
                          <h2>IBAN :</h2>
                          <h2>Routing Number :</h2>
                        </div>
                      </div>
                      <hr />
                      <table className="table table-bordered mt-3">
                        <thead>
                          <tr>
                            <th scope="col">Payment ID</th>
                            <th scope="col">Paid Amount</th>
                            <th scope="col">Transaction Time</th>
                            <th scope="col">Transaction ID</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  ) : navtabs === "ratings" ? (
                    <div className="container-fluid">
                      <div className="row p-4">
                        <div className="rating">
                          <h1>Average Rating =</h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="container-fluid">
                      <div className="row">
                        <div className="rides">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Serial No</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Sender Name</th>
                                <th scope="col">Sender Phone</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Receiver Name</th>
                                <th scope="col">Amount ($)</th>
                                <th scope="col">Distance (mi)</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
