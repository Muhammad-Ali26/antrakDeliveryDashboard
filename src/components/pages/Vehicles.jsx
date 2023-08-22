import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import moment from "moment";
import GetAPI from "../apis/GetAPI";
import { Form, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { baseUrl } from "../../BaseUrl";
import { error_toaster, info_toaster, success_toaster } from "../../Toaster";
import { useState } from "react";
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
import Loader, { MiniLoader } from "../loader/Loader";
import axios from "axios";
import PostAPI from "../apis/PostApi";

export default function Vehicles() {
  const { getData, reFetch } = GetAPI("vehicle/getall");
  const [addModal, setAddModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [addUpdateModal, setAddUpdateModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    image: "",
    baseRateVehicle: "",
    ratePerMile: "",
    volumeCapacity: "",
    weightCapacity: "",
  });

  const [updateVehicle, setUpdateVehicle] = useState({
    updateId: "",
    updateName: "",
    status: true,
    updateImage: "",
    updateBaseRateVehicle: "",
    updateRatePerMile: "",
    updateVolumeCapacity: "",
    updateWeightCapacity: "",
  });
  console.log(
    "🚀 ~ file: Vehicles.jsx:50 ~ Vehicles ~ updateVehicle:",
    updateVehicle
  );

  const inputEvent = (e) => {
    setNewVehicle({ ...newVehicle, [e.target.name]: e.target.value });
  };

  const updateEvent = (e) => {
    setUpdateVehicle({ ...updateVehicle, [e.target.name]: e.target.value });
  };

  // This is for Add New Vehicle
  const addNewVehicle = async () => {
    if (newVehicle.name === "") {
      info_toaster("Please Enter Name");
    } else if (newVehicle.baseRateVehicle === "") {
      info_toaster("Please Enter Base Rate");
    } else if (newVehicle.ratePerMile === "") {
      info_toaster("Please Enter Base Rate Per Mile");
    } else if (newVehicle.volumeCapacity === "") {
      info_toaster("Please Enter Volumn Capacity");
    } else if (newVehicle.weightCapacity === "") {
      info_toaster("Please Enter Weight Capacity");
    } else if (newVehicle.image === "") {
      info_toaster("Please Enter Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("name", newVehicle.name);
      formData.append("baseRateVehicle", newVehicle.baseRateVehicle);
      formData.append("ratePerMile", newVehicle.ratePerMile);
      formData.append("volumeCapacity", newVehicle.volumeCapacity);
      formData.append("weightCapacity", newVehicle.weightCapacity);
      formData.append("image", newVehicle.image);

      let res = await PostAPI("vehicle/add", formData);
      if (res?.data?.ResponseCode === "1") {
        success_toaster(res?.data?.ResponseMessage);
        reFetch();
        setAddModal(false);
        setNewVehicle({
          name: "",
          image: "",
          baseRateVehicle: "",
          ratePerMile: "",
          volumeCapacity: "",
          weightCapacity: "",
        });
        setLoader(false);
      } else {
        error_toaster(res?.data?.ResponseMessage);
        setLoader(false);
      }
    }
  };

  // This is for Update Vehicle
  const updateVehicleData = async () => {
    if (newVehicle.image === "") {
      info_toaster("Please Enter Image");
    }

    else{
      setLoader(true);
      const formData = new FormData();
      formData.append("name", updateVehicle.updateName);
      formData.append("baseRateVehicle", updateVehicle.updateBaseRateVehicle);
      formData.append("ratePerMile", updateVehicle.updateRatePerMile);
      formData.append("volumeCapacity", updateVehicle.updateVolumeCapacity);
      formData.append("weightCapacity", updateVehicle.updateWeightCapacity);
      formData.append("image", updateVehicle.updateImage);
      formData.append("status", updateVehicle.status);
      
      let updateResponse = await PostAPI(
        `vehicle/update/${updateVehicle.updateId}`,
        formData
      );
      if (updateResponse?.data?.ResponseCode === "1") {
        success_toaster(updateResponse?.data?.ResponseMessage);
        reFetch();
        setAddUpdateModal(false);
        setLoader(false);
      } else {
        error_toaster(updateResponse?.data?.ResponseMessage);
        setLoader(false);
      }
    }
    
  };

  const closeAddModal = () => {
    setAddModal(false);
  };

  const closeAddUpdateModal = () => {
    setAddUpdateModal(false);
  };

  // This is For delete Vehicles
  const deleteVehicle = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}vehicle/delete/${id}`);
      if (response?.data?.ResponseCode === "1") {
        success_toaster(response?.data?.ResponseMessage);
        reFetch();
      } else {
        error_toaster(response?.data?.ResponseMessage);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const columns = [
    {
      name: "Serial No",
      selector: (row) => row.serialNo,
    },

    {
      name: "ID",
      selector: (row) => row.id,
    },

    {
      name: "Name",
      selector: (row) => row.name,
    },

    {
      name: "Image",
      selector: (row) => row.image,
    },

    {
      name: "Base Rate($)",
      selector: (row) => row.baseRateVec,
    },

    {
      name: "Base Mile($)",
      selector: (row) => row.baseRateMile,
    },

    {
      name: "Volumn Capacity(cm3)",
      selector: (row) => row.VolumeCap,
    },

    {
      name: "Weight Capacity(Lbs)",
      selector: (row) => row.WeightCap,
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
      grow: 3,
    },
  ];

  const data = [];
  getData?.Response?.map((value, index) => {
    data.push({
      serialNo: index + 1,
      id: value.id,
      name: value.name,
      baseRateVec: value.baseRateVec,
      baseRateMile: value.baseRateMile,
      VolumeCap: value.VolumeCap,
      WeightCap: value.WeightCap,
      status: value.status ? "Active" : "Block",
      createdAt: moment(value.createdAt).format("Do, MMMM YYYY, h:mm:ss a"),
      image: (
        <img src={`${baseUrl}${value.image}`} style={{ width: "120px" }}></img>
      ),
      action: (
        <div>
          <button
            className="btn btn-warning"
            onClick={(e) => {
              setAddUpdateModal(true);
              setUpdateVehicle({
                updateId: value.id,
                updateName: value.name,
                updateBaseRateVehicle: value.baseRateVec,
                updateRatePerMile: value.baseRateMile,
                updateVolumeCapacity: value.VolumeCap,
                updateWeightCapacity: value.WeightCap,
                updateImage: value.image,
                status: true,
              });
            }}
          >
            Update
          </button>
          <button
            className="btn btn-primary ms-1"
            onClick={(e) => {
              deleteVehicle(value?.id);
            }}
          >
            Delete
          </button>
        </div>
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
          <ModalHeader>Add New Vehicle</ModalHeader>
          <ModalCloseButton />
          {loader ? (
            <div style={{ height: "280px" }}>
              <MiniLoader />
            </div>
          ) : (
            <ModalBody pb={6}>
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={inputEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Base Rate ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="baseRateVehicle"
                      onChange={inputEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Base Rate ($)/Mile ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="ratePerMile"
                      onChange={inputEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Volumn Capacity(cm3)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="volumeCapacity"
                      onChange={inputEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Weight Capacity(Lbs)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="weightCapacity"
                      onChange={inputEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <input
                      type="file"
                      class="dropify"
                      data-height="300"
                      name="image"
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          [e.target.name]: e.target.files[0],
                        })
                      }
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
            <button className="add-admin" onClick={addNewVehicle}>
              Add Vehicle
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={addUpdateModal} size={"xl"} onClose={closeAddUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Vehicle</ModalHeader>
          <ModalCloseButton />
          {loader ? (
            <div style={{ height: "280px" }}>
              <MiniLoader />
            </div>
          ) : (
            <ModalBody pb={6}>
              <div className="row">
                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="updateName"
                      value={updateVehicle.updateName}
                      onChange={updateEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Base Rate ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="updateBaseRateVehicle"
                      value={updateVehicle.updateBaseRateVehicle}
                      onChange={updateEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Base Rate ($)/Mile ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="updateRatePerMile"
                      value={updateVehicle.updateRatePerMile}
                      onChange={updateEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Volumn Capacity(cm3)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="updateVolumeCapacity"
                      value={updateVehicle.updateVolumeCapacity}
                      onChange={updateEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mb-2">
                  <div ClassName="mb-3">
                    <label ClassName="form-label">Weight Capacity(Lbs)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="updateWeightCapacity"
                      value={updateVehicle.updateWeightCapacity}
                      onChange={updateEvent}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    <input
                      type="file"
                      class="dropify"
                      data-height="300"
                      name="updateImage"
                      onChange={(e) =>
                        setUpdateVehicle({
                          ...updateVehicle,
                          [e.target.name]: e.target.files[0],
                        })
                      }
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
            <button
              className="add-admin"
              onClick={(e) => {
                updateVehicleData(updateVehicle.updateId);
              }}
            >
              Update Vehicle
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Vehicle</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Vehicle</li>
                  {/* <li>
                    <span>/</span>
                    List Admin
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <div className="user-data card p-4">
              <div>
                <button className="add-admin" onClick={() => setAddModal(true)}>
                  Add New Vehicle
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
