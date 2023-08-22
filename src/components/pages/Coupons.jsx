// @ts-nocheck
import React, { useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import GetAPI from "../apis/GetAPI";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import moment from "moment";
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
import PostAPI from "../apis/PostApi";
import { error_toaster, info_toaster, success_toaster } from "../../Toaster";
import Loader, { MiniLoader } from "../loader/Loader";
import PutApi from "../apis/PutApi";

export default function Coupons() {
  function convertDateTime(originalDateTime) {
    const dt = new Date(originalDateTime);
    const localDt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000); // Convert to local timezone
    const formattedDateTime = localDt.toISOString().slice(0, 16); // Format to "YYYY-MM-DDTHH:MM"
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in ISO 8601 format
    const finalDateTime = formattedDateTime.replace(
      formattedDateTime.slice(0, 10),
      currentDate
    ); // Replace date part
    return finalDateTime;
  }
  const { getData, reFetch } = GetAPI("coupons/getall");
  const [getInfo, setInfo] = useState({
    name: "",
    discount: "",
    from: "",
    to: "",
  });

  const [addModal, setAddModal] = useState(false);
  const [addUpdateModal, setAddUpdateModal] = useState(false);
  const [editCouponDetails, setEditCouponDetails] = useState({
    updateName: "",
    updateDiscount: "",
    updateFrom: "",
    updateTo: "",
    updateId: "",
  });

  const inputEvent = (e) => {
    setInfo({ ...getInfo, [e.target.name]: e.target.value });
  };

  const updateEvent = (e) => {
    setEditCouponDetails({
      ...editCouponDetails,
      [e.target.name]: e.target.value,
    });
  };

  const [loader, setLoader] = useState(false);
  const closeAddModal = () => {
    setAddModal(false);
    setInfo({ name: "", discount: "", from: "", to: "" });
  };
  const closeAddUpdateModal = () => {
    setAddUpdateModal(false);
    setEditCouponDetails({ name: "", discount: "", from: "", to: "" });
  };

  // This Functions is Use to Change Status
  const activeStatus = async (name) => {
    let response = await PutApi(`coupons/updatestatus`, {
      name: name,
      status: true,
    });

    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  const blockStatus = async (name) => {
    let response = await PutApi(`coupons/updatestatus`, {
      name: name,
      status: false,
    });

    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  const addCoupon = async () => {
    if (getInfo.name === "") {
      info_toaster("Please enter Name");
    } else if (getInfo.discount === "") {
      info_toaster("Please enter Discount");
    } else if (getInfo.from === "") {
      info_toaster("Please enter Start Date");
    } else if (getInfo.to === "") {
      info_toaster("Please enter End Date");
    } else {
      setLoader(true);
      let res = await PostAPI("coupons/add", {
        name: getInfo.name,
        discount: getInfo.discount,
        from: getInfo.from,
        to: getInfo.to,
        status: true,
      });
      if (res?.data?.ResponseCode === "1") {
        success_toaster(res?.data?.ResponseMessage);
        reFetch();
        setAddModal(false);
        setInfo({ name: "", discount: "", from: "", to: "" });
        setLoader(false);
      } else {
        error_toaster(res?.data?.ResponseMessage);
        setLoader(false);
      }
    }
  };

  // This Function is used To Update Coupon
  const updateCoupon = async () => {
    setLoader(true);
    let updateResponse = await PostAPI("coupons/update_coupon", {
      id: editCouponDetails.updateId,
      name: editCouponDetails.updateName,
      discount: editCouponDetails.updateDiscount,
      from: editCouponDetails.updateFrom,
      to: editCouponDetails.updateTo,
      status: true,
    });
    if (updateResponse?.data?.ResponseCode === "1") {
      success_toaster(updateResponse?.data?.ResponseMessage);
      reFetch();
      setAddUpdateModal(false);
      setEditCouponDetails({ name: "", discount: "", from: "", to: "" });
      setLoader(false);
    } else {
      error_toaster(updateResponse?.data?.ResponseMessage);
      setLoader(false);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },

    {
      name: "Name",
      selector: (row) => row.name,
    },

    {
      name: "Discount",
      selector: (row) => row.discount,
    },

    {
      name: "From",
      selector: (row) => row.from,
      grow: 2,
    },

    {
      name: "To",
      selector: (row) => row.to,
      grow: 2,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      grow: 3,
    },
  ];

  const data = [];
  getData?.Response?.map((value, index) => {
    data.push({
      id: value.id,
      name: value.name,
      discount: value.discount,
      from: moment(value.from).format("Do, MMMM YYYY, h:mm:ss a"),
      to: moment(value.to).format("Do, MMMM YYYY, h:mm:ss a"),
      status: value.status ? "Active" : "Block",
      action: (
        <>
          <div>
            {value?.status === true ? (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  blockStatus(value?.name);
                }}
              >
                Deactivate
              </button>
            ) : (
              <button
                className="btn btn-warning activate"
                onClick={(e) => {
                  activeStatus(value?.name);
                }}
              >
                Activate
              </button>
            )}
            <button
              className="btn btn-primary mx-2"
              onClick={(e) => {
                setAddUpdateModal(true);
                setEditCouponDetails({
                  updateName: value?.name,
                  updateDiscount: value?.discount,
                  updateFrom: convertDateTime(value?.from),
                  updateTo: convertDateTime(value?.to),
                  updateId: value?.id,
                });
              }}
            >
              Update
            </button>
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
          <ModalHeader>Add Coupon</ModalHeader>
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
                      value={getInfo.name}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      onChange={inputEvent}
                      value={getInfo.discount}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">From</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="from"
                      onChange={inputEvent}
                      value={getInfo.from}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">To</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="to"
                      onChange={inputEvent}
                      value={getInfo.to}
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
            <button className="add-admin" onClick={addCoupon}>
              Add Coupon
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={addUpdateModal} size={"xl"} onClose={closeAddUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Coupon {editCouponDetails.updateId}</ModalHeader>
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
                      name="updateName"
                      onChange={updateEvent}
                      value={editCouponDetails.updateName}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="updateDiscount"
                      onChange={updateEvent}
                      value={editCouponDetails.updateDiscount}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">From</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="updateFrom"
                      onChange={updateEvent}
                      value={editCouponDetails.updateFrom}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">To</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="updateTo"
                      onChange={updateEvent}
                      value={editCouponDetails.updateTo}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
          )}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeAddUpdateModal}>
              Close
            </Button>
            <button className="add-admin" onClick={updateCoupon}>
              Update Coupon
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Coupons</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Coupons</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row px-4">
            <div className="user-data card p-3">
              <div>
                <button className="add-admin" onClick={() => setAddModal(true)}>
                  Add Coupon
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
