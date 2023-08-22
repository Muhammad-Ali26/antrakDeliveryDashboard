// @ts-nocheck
import React, { useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import moment from "moment";
import GetAPI from "../apis/GetAPI";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { baseUrl } from "../../BaseUrl";
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
import PutApi from "../apis/PutApi";
import checkBoxData from "./CheckBoxData";
import { error_toaster, success_toaster } from "../../Toaster";
import PostAPI from "../apis/PostApi";
import Loader, { MiniLoader } from "../loader/Loader";
import axios from "axios";

export default function Roles() {
  let { getData, reFetch } = GetAPI(`users/all/roles`);
  const [addModal, setAddModal] = useState(false);
  console.log("🚀 ~ file: Roles.jsx:31 ~ Roles ~ getData:", getData)
  const [loader, setLoader] = useState(false);
  const [editAddModal, setEditAddModal] = useState(false);
  const [getCheckBoxData, setGetCheckBoxData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [addNewRole, setAddNewRole] = useState({
    name: "",
    DashBoard: "0",
    Users: "0",
    Admin: "0",
    Employees: "0",
    Drivers: "0",
    Coupons: "0",
    Charges: "0",
    Bookings: "0",
    Mails: "0",
    Categories: "0",
    Banners: "0",
    RestrictedItems: "0",
    Vehicles: "0",
    RequestHistory: "0",
    PendingRequests: "0",
    PaymentHistory: "0",
    Earnings: "0",
    FrontEndSettings: "0",
  });

  const [updateRole, setUpdateRole] = useState({
    id: "",
    updateDashBoard: "",
    updateUsers: "",
    updateAdmin: "",
    updateEmployees: "",
    updateDrivers: "",
    updateCoupons: "",
    updateCharges: "",
    updateBookings: "",
    updateMails: "",
    updateCategories: "",
    updateBanners: "",
    updateRestrictedItems: "",
    updateVehicles: "",
    updateRequestHistory: "",
    updatePendingRequests: "",
    updatePaymentHistory: "",
    updateEarnings: "",
    updateFrontEndSettings: "",
  });

  const onChange = (e) => {
    const { name } = e.target;
    setAddNewRole({
      ...addNewRole,
      [name]: addNewRole[name] === "1" ? "0" : "1",
    });
  };

  // const onUpdateChange = (e) => {
  //   const { name } = e.target;
  //   setUpdateRole({
  //     ...updateRole,
  //     [name]: updateRole[name] === "1" ? "0" : "1",
  //   });
  // };

  const openModal = () => {
    setAddModal(true);
    setGetCheckBoxData(checkBoxData);
  };

  const closeAddModal = () => {
    setAddModal(false);
    setAddNewRole({
      name: "",
      DashBoard: "0",
      Users: "0",
      Admin: "0",
      Employees: "0",
      Drivers: "0",
      Coupons: "0",
      Charges: "0",
      Bookings: "0",
      Mails: "0",
      Categories: "0",
      Banners: "0",
      RestrictedItems: "0",
      Vehicles: "0",
      RequestHistory: "0",
      PendingRequests: "0",
      PaymentHistory: "0",
      Earnings: "0",
      FrontEndSettings: "0",
    });
  };
  // const openEditModal = () => {
  //   setGetCheckBoxData(checkBoxData);
  // };

  const closeEditAddModal = () => {
    setEditAddModal(false);
  };

  const inputEvent = (e) => {
    setAddNewRole({ ...addNewRole, [e.target.name]: e.target.value });
  };

  const addRole = async () => {
    setLoader(true);
    let roleResponse = await PostAPI("users/add/role", {
      name: addNewRole.name,
      DashBoard: addNewRole.DashBoard,
      Users: addNewRole.Users,
      Admin: addNewRole.Admin,
      Employees: addNewRole.Employees,
      Drivers: addNewRole.Drivers,
      Coupons: addNewRole.Coupons,
      Charges: addNewRole.Charges,
      Bookings: addNewRole.Bookings,
      Mails: addNewRole.Mails,
      Categories: addNewRole.Categories,
      Banners: addNewRole.Banners,
      RestrictedItems: addNewRole.RestrictedItems,
      Vehicles: addNewRole.Vehicles,
      RequestHistory: addNewRole.RequestHistory,
      PendingRequests: addNewRole.PendingRequests,
      PaymentHistory: addNewRole.PaymentHistory,
      Earnings: addNewRole.Earnings,
      FrontEndSettings: addNewRole.FrontEndSettings,
    });
    if (roleResponse?.data?.ResponseCode === "1") {
      success_toaster(roleResponse?.data?.ResponseMessage);
      reFetch();
      setAddModal(false);
      setLoader(false);
      setAddNewRole({
        name: "",
        DashBoard: "0",
        Users: "0",
        Admin: "0",
        Employees: "0",
        Drivers: "0",
        Coupons: "0",
        Charges: "0",
        Bookings: "0",
        Mails: "0",
        Categories: "0",
        Banners: "0",
        RestrictedItems: "0",
        Vehicles: "0",
        RequestHistory: "0",
        PendingRequests: "0",
        PaymentHistory: "0",
        Earnings: "0",
        FrontEndSettings: "0",
      });
    } else {
      error_toaster(roleResponse?.data?.ResponseMessage);
    }
  };

  const activeStatus = async (id) => {
    let response = await PutApi(`users/update/role/${id}`, {
      status: true,
    });
    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  const inactiveStatus = async (id) => {
    let response = await PutApi(`users/update/role/${id}`, {
      status: false,
    });
    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  // Update Role Permissions
  const updateRolePermissions = async (id) => {
    await axios.get(`${baseUrl}users/permissions/${id}`).then((dat) => {
      setUpdateData(dat.data);

      if (updateData?.ResponseCode === "1") {
        setEditAddModal(true);
        setUpdateRole({
          ...updateRole,
          id: id,
          updateDashBoard: updateData?.Response?.DashBoard === true ? "1" : "0",
          updateUsers: updateData?.Response?.Users === true ? "1" : "0",
          updateAdmin: updateData?.Response?.Admin === true ? "1" : "0",
          updateEmployees: updateData?.Response?.Employees === true ? "1" : "0",
          updateDrivers: updateData?.Response?.Drivers === true ? "1" : "0",
          updateCoupons: updateData?.Response?.Coupons === true ? "1" : "0",
          updateCharges: updateData?.Response?.Charges === true ? "1" : "0",
          updateBookings: updateData?.Response?.Bookings === true ? "1" : "0",
          updateMails: updateData?.Response?.Mails === true ? "1" : "0",
          updateCategories:
            updateData?.Response?.Categories === true ? "1" : "0",
          updateBanners: updateData?.Response?.Banners === true ? "1" : "0",
          updateRestrictedItems:
            updateData?.Response?.RestrictedItems === true ? "1" : "0",
          updateVehicles: updateData?.Response?.Vehicles === true ? "1" : "0",
          updateRequestHistory:
            updateData?.Response?.RequestHistory === true ? "1" : "0",
          updatePendingRequests:
            updateData?.Response?.PendingRequests === true ? "1" : "0",
          updatePaymentHistory:
            updateData?.Response?.PaymentHistory === true ? "1" : "0",
          updateEarnings: updateData?.Response?.Earnings === true ? "1" : "0",
          updateFrontEndSettings:
            updateData?.Response?.FrontEndSettings === true ? "1" : "0",
        });
      }
    });
  };

  const roleUpdated = async () => {
    setLoader(true);
    let updateResponse = await PutApi(
      `users/update/permissions/${updateRole.id}`,
      {
        DashBoard: updateRole.updateDashBoard,
        Users: updateRole.updateUsers,
        Admin: updateRole.updateAdmin,
        Employees: updateRole.updateEmployees,
        Drivers: updateRole.updateDrivers,
        Coupons: updateRole.updateCoupons,
        Charges: updateRole.updateCharges,
        Bookings: updateRole.updateBookings,
        Mails: updateRole.updateMails,
        Categories: updateRole.updateCategories,
        Banners: updateRole.updateBanners,
        RestrictedItems: updateRole.updateRestrictedItems,
        Vehicles: updateRole.updateVehicles,
        RequestHistory: updateRole.updateRequestHistory,
        PendingRequests: updateRole.updatePendingRequests,
        PaymentHistory: updateRole.updatePaymentHistory,
        Earnings: updateRole.updateEarnings,
        FrontEndSettings: updateRole.updateFrontEndSettings,
      }
    );
    if (updateResponse?.data?.ResponseCode === "1") {
      success_toaster(updateResponse?.data?.ResponseMessage);
      reFetch();
      setAddModal(false);
      setLoader(false);
    } else {
      error_toaster(updateResponse?.data?.ResponseMessage);
    }
  };

  const columns = [
    {
      name: "Serial No",
      selector: (row) => row.id,
    },

    {
      name: "Role",
      selector: (row) => row.name,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },

    {
      name: "Created At",
      selector: (row) => row.createdAt,
      grow: 2,
    },

    {
      name: "Action",
      selector: (row) => row.action,
      grow: 2,
    },
  ];

  const data = [];
  getData?.Response?.map((value, index) => {
    data.push({
      id: value?.id,
      name: value?.name,
      status: value?.status,
      createdAt: moment(value.createdAt).format("Do, MMMM YYYY, h:mm:ss a"),
      status: value.status ? "Active" : "Block",
      action: (
        <>
          <div>
            <button
              className="btn btn-warning"
              onClick={(e) => {
                // openEditModal();
                updateRolePermissions(value.id);
              }}
            >
              Edit Permissions
            </button>
            {value?.status === true ? (
              <button
                className="btn btn-danger ms-2"
                onClick={(e) => {
                  inactiveStatus(value?.id);
                }}
              >
                Block
              </button>
            ) : (
              <button
                className="mx-1 btn btn-primary"
                onClick={(e) => {
                  activeStatus(value?.id);
                }}
              >
                Active
              </button>
            )}
          </div>
        </>
      ),
    });
  });

  return getData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Navbar></Navbar>
      <TopBar></TopBar>

      <Modal isOpen={addModal} size={"xl"} onClose={closeAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Role</ModalHeader>
          <ModalCloseButton />
          {loader ? (
            <div style={{ height: "280px" }}>
              <MiniLoader />
            </div>
          ) : (
            <ModalBody pb={6}>
              <div className="row">
                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={inputEvent}
                      value={addNewRole.name}
                    />
                  </div>
                </div>

                <div className="form mt-4">
                  <h2>Permissions</h2>
                  <div className="row g-3">
                    {getCheckBoxData.map((data) => (
                      <div className="col-lg-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={data.name}
                            // value={addNewRole[data.name]}
                            onChange={onChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            {data.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>
          )}

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeAddModal}>
              Close
            </Button>
            <button className="add-admin" onClick={addRole}>
              Add Role
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={editAddModal} size={"xl"} onClose={closeEditAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Permissions</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div className="row">
              <div className="form mt-4">
                <div className="row g-3">
                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Dashboard"
                        value={updateRole.updateDashBoard}
                        checked={
                          updateRole.updateDashBoard === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateDashBoard:
                              updateRole.updateDashBoard === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Dashboard
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Users"
                        value={updateRole.updateUsers}
                        checked={updateRole.updateUsers === "1" ? true : false}
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateUsers:
                              updateRole.updateUsers === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Users
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Admin"
                        value={updateRole.updateAdmin}
                        checked={updateRole.updateAdmin === "1" ? true : false}
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateAdmin:
                              updateRole.updateAdmin === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlhtmlFor="flexCheckDefault"
                      >
                        Admin
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Employees"
                        value={updateRole.updateEmployees}
                        checked={
                          updateRole.updateEmployees === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateEmployees:
                              updateRole.updateEmployees === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Employees
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Drivers"
                        value={updateRole.updateDrivers}
                        checked={
                          updateRole.updateDrivers === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateDrivers:
                              updateRole.updateDrivers === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Drivers
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Coupons"
                        value={updateRole.updateCoupons}
                        checked={
                          updateRole.updateCoupons === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateCoupons:
                              updateRole.updateCoupons === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Coupons
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Charges"
                        value={updateRole.updateCharges}
                        checked={
                          updateRole.updateCharges === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateCharges:
                              updateRole.updateCharges === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Charges
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Bookings"
                        value={updateRole.updateBookings}
                        checked={
                          updateRole.updateBookings === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateBookings:
                              updateRole.updateBookings === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Bookings
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Mails"
                        value={updateRole.updateMails}
                        checked={updateRole.updateMails === "1" ? true : false}
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateMails:
                              updateRole.updateMails === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Mails
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Categories"
                        value={updateRole.updateCategories}
                        checked={
                          updateRole.updateCategories === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateCategories:
                              updateRole.updateCategories === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Categories
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Banners"
                        value={updateRole.updateBanners}
                        checked={
                          updateRole.updateBanners === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateBanners:
                              updateRole.updateBanners === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Banners
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="RestrictedItems"
                        value={updateRole.updateRestrictedItems}
                        checked={
                          updateRole.updateRestrictedItems === "1"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateRestrictedItems:
                              updateRole.updateRestrictedItems === "1"
                                ? "0"
                                : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Restricted Items
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Vehicles"
                        value={updateRole.updateVehicles}
                        checked={
                          updateRole.updateVehicles === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateVehicles:
                              updateRole.updateVehicles === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Vehicles
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="RequestHistory"
                        value={updateRole.updateRequestHistory}
                        checked={
                          updateRole.updateRequestHistory === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateRequestHistory:
                              updateRole.updateRequestHistory === "1"
                                ? "0"
                                : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        RequestHistory
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="PaymentHistory"
                        value={updateRole.updatePaymentHistory}
                        checked={
                          updateRole.updatePaymentHistory === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updatePaymentHistory:
                              updateRole.updatePaymentHistory === "1"
                                ? "0"
                                : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        PaymentHistory
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Earnings"
                        value={updateRole.updateEarnings}
                        checked={
                          updateRole.updateEarnings === "1" ? true : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateEarnings:
                              updateRole.updateEarnings === "1" ? "0" : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Earnings
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="FrontEndSettings"
                        value={updateRole.updateFrontEndSettings}
                        checked={
                          updateRole.updateFrontEndSettings === "1"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          setUpdateRole({
                            ...updateRole,
                            updateFrontEndSettings:
                              updateRole.updateFrontEndSettings === "1"
                                ? "0"
                                : "1",
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        FrontEndSettings
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeEditAddModal}>
              Close
            </Button>
            <button className="add-admin" onClick={roleUpdated}>
              Update Role
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Roles</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Roles</li>
                  <li>
                    <span>/</span>
                    List of Roles
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <div className="user-data card p-4">
              <div>
                <button
                  className="add-admin"
                  onClick={() => {
                    openModal(true);
                  }}
                >
                  Add New Role
                </button>
              </div>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
