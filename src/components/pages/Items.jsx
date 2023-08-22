import React, { useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import moment from "moment";
import GetAPI from "../apis/GetAPI";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { baseUrl } from "../../BaseUrl";
import PutApi from "../apis/PutApi";
import { error_toaster, info_toaster, success_toaster } from "../../Toaster";
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
import PostAPI from "../apis/PostApi";

export default function Items() {
  const { getData, reFetch } = GetAPI("restricted/getall/admin");
  const [addModal, setAddModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    image: "",
  });

  const closeAddModal = () => {
    setAddModal(false);
  };

  const inputEvent = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  // For DeleteItems
  const deleteItem = async (id) => {
    const response = await PutApi(`restricted/block/${id}`);
    console.log("🚀 ~ file: Items.jsx:19 ~ deleteItem ~ response:", response);
    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  // For Add New Items
  const addNewItem = async () => {
    if (newItem.name === "") {
      info_toaster("Please Enter Title");
    } else if (newItem.image === "") {
      info_toaster("Please Enter Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("image", newItem.image);

      let res = await PostAPI("restricted/add", formData);
      if (res?.data?.ResponseCode === "1") {
        success_toaster(res?.data?.ResponseMessage);
        reFetch();
        setAddModal(false);
        setNewItem({ name: "", image: "" });
        setLoader(false);
      } else {
        error_toaster(res?.data?.ResponseMessage);
        setLoader(false);
      }
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.serialNo,
    },

    {
      name: "Title",
      selector: (row) => row.name,
    },

    {
      name: "Image",
      selector: (row) => row.image,
    },

    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const data = [];
  getData?.Response?.map((value, index) => {
    data.push({
      serialNo: index + 1,
      name: value.name,
      image: (
        <img
          src={`${baseUrl}${value.image}`}
          style={{ width: "120px" }}
          alt="image"
        ></img>
      ),
      action: (
        <div>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              deleteItem(value?.id);
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
          <ModalHeader>Add New Items</ModalHeader>
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
                    <label ClassName="form-label">Title :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
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
                        setNewItem({
                          ...newItem,
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
            <button className="add-admin" onClick={addNewItem}>
              Add Item
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Restricted Items</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Restricted Items</li>
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
                <button
                  className="add-admin"
                  onClick={() => {
                    setAddModal(true);
                  }}
                >
                  Add New Restricted Items
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
