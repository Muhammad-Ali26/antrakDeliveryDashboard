// @ts-nocheck
import React, { useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import moment from "moment";
import GetAPI from "../apis/GetAPI";
import { NavLink } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaEye, FaHome, FaRegEyeSlash } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import PostApi from "../apis/PostApi";
import { error_toaster, info_toaster, success_toaster } from "../../Toaster";
import Loader, { MiniLoader } from "../loader/Loader";
import PutApi from "../apis/PutApi";

export default function Admin() {
  const { getData, reFetch } = GetAPI("users/getall/Admin");
  console.log("🚀 ~ file: Admin.jsx:29 ~ Admin ~ getData:", getData)

  const [addModal, setAddModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [getInfo, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    password: "",
  });
  const closeAddModal = () => {
    setAddModal(false);
    setInfo({
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
      password: "",
    });
  };

  const inputEvent = (event) => {
    setInfo({ ...getInfo, [event.target.name]: event.target.value });
  };

  const addAdmin = async () => {
    const isValidEmail = validateEmail(data.email);
    if (getInfo.firstName === "") {
      info_toaster("Please Enter Your First Name");
    } else if (getInfo.lastName === "") {
      info_toaster("Please Enter Your Last Name");
    } else if (getInfo.email === "") {
      info_toaster("Please Enter Your Email");
    } else if (getInfo.phoneNum === "") {
      info_toaster("Please Enter Your Phone Number");
    } else if (getInfo.password === "") {
      info_toaster("Please Enter Your Password");
    } else {
      setLoader(true);
      let adminResponse = await PostApi("users/add", {
        firstName: getInfo.firstName,
        lastName: getInfo.lastName,
        email: getInfo.email,
        phoneNum: getInfo.phoneNum,
        password: getInfo.password,
        status: true,
      });
      if (!isValidEmail) {
        error_toaster("Please Enter a valid Email ");
        setLoader(false);
      } else if (adminResponse?.data?.ResponseCode === "1") {
        success_toaster(adminResponse?.data?.ResponseMessage);
        reFetch();
        setAddModal(false);
        setInfo({
          firstName: "",
          lastName: "",
          email: "",
          phoneNum: "",
          password: "",
        });
        setLoader(false);
      } else {
        error_toaster(adminResponse?.data?.ResponseMessage);
        setLoader(false);
      }
    }
  };

  // This Functions is Use to Change Status
  const activeStatus = async (id) => {
    let response = await PutApi(`users/updatestatus/${id}`, {
      status: true,
    });

    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  const blockStatus = async (id) => {
    let response = await PutApi(`users/updatestatus/${id}`, {
      status: false,
    });

    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.serialno,
    },

    {
      name: "Admin ID",
      selector: (row) => row.userId,
    },

    {
      name: "Name",
      selector: (row) => row.name,
      grow: 2,
    },

    {
      name: "Phone",
      selector: (row) => row.phone,
      grow: 2,
    },

    {
      name: "Email",
      selector: (row) => row.email,
      grow: 2,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },

    {
      name: "Action",
      selector: (row) => row.action,
    },

    {
      name: "Created At",
      selector: (row) => row.created,
      grow: 2,
    },
  ];

  // Search Function
  const [search, setSearch] = useState("");

  const getAdmin = () => {
    const filteredArray = getData?.filter(
      (user) =>
        search === "" ||
        (user?.name).toLowerCase().includes(search.toLowerCase()) ||
        (user?.phone).toString().includes(search) ||
        (user?.email).toLowerCase().includes(search.toLowerCase())
    );

    return filteredArray;
  };

  const data = [];
  getAdmin()?.map((value, index) =>
    data.push({
      serialno: index + 1,
      userId: value.id,
      name: value.name,
      phone: value.phone,
      email: value.email,
      created: moment(value.created_at).format("Do, MMMM YYYY, h:mm:ss a"),
      status: value.status ? "Active" : "Block",
      action: (
        <div>
          {value?.status === true ? (
            <button
              className="btn btn-danger px-3"
              onClick={(e) => {
                blockStatus(value?.id);
              }}
            >
              Block
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                activeStatus(value?.id);
              }}
            >
              Active
            </button>
          )}
        </div>
      ),
    })
  );

  // Email Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // Show and Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return getData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Navbar></Navbar>
      <TopBar></TopBar>
      <Modal isOpen={addModal} size={"xl"} onClose={closeAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Admin</ModalHeader>
          <ModalCloseButton />
          {loader ? (
            <div style={{ height: "242px" }}>
              <MiniLoader />
            </div>
          ) : (
            <ModalBody pb={6}>
              <div className="row" style={{ rowGap: "12px" }}>
                <div className="col-lg-6">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter First Name Here"
                      name="firstName"
                      onChange={inputEvent}
                      value={getData.firstName}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Last Name Here"
                      name="lastName"
                      onChange={inputEvent}
                      value={getData.lastName}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email Address Here"
                      name="email"
                      onChange={inputEvent}
                      value={getData.email}
                    />
                  </div>
                </div>

                <div className="col-lg-6 password-icon">
                  <div ClassName="mb-3 ">
                    <label ClassName="form-label">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter Password Here"
                      name="password"
                      onChange={inputEvent}
                      value={getData.password}
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
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Phone Number</label>
                    {/* <PhoneInput
                      country={"us"}
                      placeholder="Enter phone number"
                      onChange={(e) => {
                        setInfo({ ...getInfo, phoneNum: e });
                      }}
                    /> */}
                    <PhoneInput
                      country={"us"}
                      placeholder="XXX XXX XXXX"
                      inputStyle={{
                        display: "block",
                        width: "100%",
                        paddingTop: "14px",
                        paddingBottom: "14px",
                        background: "#fff",
                        color: "#888",
                      }}
                      onChange={(e) => {
                        setInfo({ ...getInfo, phoneNum: e });
                      }}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
          )}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeAddModal}>
              Close
            </Button>
            <button className="add-admin" onClick={addAdmin}>
              Add Admin
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>List of Admins</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Admins</li>
                  <li>
                    <span>/</span>
                    List of Admins
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <div className="user-data card p-4">
              <div className="card-content">
                <div className="mb-2">
                  <button
                    className="add-admin"
                    onClick={() => setAddModal(true)}
                  >
                    Add New Admin
                  </button>
                </div>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2 mb-2"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                </form>
              </div>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
