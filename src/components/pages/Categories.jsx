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
import { error_toaster, info_toaster, success_toaster } from "../../Toaster";
import Loader, { MiniLoader } from "../loader/Loader";
import PutApi from "../apis/PutApi";
import { baseUrl } from "../../BaseUrl";
import PostApi from "../apis/PostApi";

export default function Categories() {
  const { getData, reFetch } = GetAPI("category/getallcat");
  const [addModal, setAddModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [newCategory, setNewCategory] = useState({
    image: "",
    adult_18plus: "",
    name: "",
    status: true,
  });

  const inputEvent = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };
  const closeAddModal = () => {
    setAddModal(false);
  };

  const addNewCategory = async () => {
    if (newCategory.name === "") {
      info_toaster("Please enter Name");
    } else if (newCategory.adult_18plus === "") {
      info_toaster("Please Select Adult 18 plus");
    } else if (newCategory.image === "") {
      info_toaster("Please enter Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("adult_18plus", newCategory.adult_18plus);
      formData.append("image", newCategory.image);
      formData.append("status", newCategory.status);
      let res = await PostApi("category/add", formData);

      if (res?.data?.ResponseCode === "1") {
        success_toaster(res?.data?.ResponseMessage);
        reFetch();
        setAddModal(false);
        setNewCategory({ name: "", adult_18plus: "", image: "" });
        setLoader(false);
      } else {
        error_toaster(res?.data?.ResponseMessage);
        setLoader(false);
      }
    }
  };

  const activeStatus = async (id) => {
    const activeResponse = await PutApi(`category/updatestatus/${id}`, {
      status: true,
    });

    if (activeResponse?.data?.ResponseCode === "1") {
      success_toaster(activeResponse?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(activeResponse?.data?.ResponseMessage);
    }
  };

  const blockStatus = async (id) => {
    let blockResponse = await PutApi(`category/updatestatus/${id}`, {
      status: false,
    });

    if (blockResponse?.data?.ResponseCode === "1") {
      success_toaster(blockResponse?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(blockResponse?.data?.ResponseMessage);
    }
  };

  const columns = [
    {
      name: "Serial #",
      selector: (row) => row.serialno,
    },

    {
      name: "Id",
      selector: (row) => row.id,
    },

    {
      name: "Name",
      selector: (row) => row.name,
      grow: 2,
    },

    {
      name: "Image",
      selector: (row) => row.Image,
    },

    {
      name: "18 +",
      selector: (row) => row.adult,
    },

    {
      name: "Created At",
      selector: (row) => row.createdAt,
      grow: 3,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },

    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const data = [];
  getData?.Response?.categories?.map((value, index) => {
    data.push({
      serialno: index + 1,
      id: value.id,
      name: value.name,
      Image: <img src={`${baseUrl}${value.Image}`} style={{ width: "80px" }} />,
      adult: value.adult_18plus ? "Yes" : "No",
      createdAt: moment(value.createdAt).format("Do, MMMM YYYY, h:mm:ss a"),
      status: value.status ? "Active" : "Block",
      action: (
        <div>
          {value.status === true ? (
            <button
              className="btn btn-danger"
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
    });
  });

  return getData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <TopBar />

      <Modal isOpen={addModal} size={"xl"} onClose={closeAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Category</ModalHeader>
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
                    <label ClassName="form-label">Category</label>
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
                    <label ClassName="form-label">Adult 18+</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="adult_18plus"
                      onChange={inputEvent}
                    >
                      <option selected>Please add 18+</option>
                      <option value="1">No</option>
                      <option value="2">Yes</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div ClassName="mb-3">
                    {/* <label ClassName="form-label">Image (256x256)</label> */}
                    <input
                      type="file"
                      className="dropify"
                      data-height="300"
                      name="image"
                      onChange={(e) =>
                        setNewCategory({
                          ...newCategory,
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
            <button className="add-admin" onClick={addNewCategory}>
              Add Category
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Categories (What are you sending)</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Categories</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row px-4">
            <div className="user-data card p-3">
              <div>
                <button className="add-admin" onClick={() => setAddModal(true)}>
                  Add New Category
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
