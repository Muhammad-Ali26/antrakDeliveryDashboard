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

export default function Banners() {
  const { getData, reFetch } = GetAPI("appsettings/banners");
  const [addModal, setAddModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [newBanner, setNewBanner] = useState({
    value: "",
  });

  const closeAddModal = () => {
    setAddModal(false);
  };
  // For Add New Banner
  const addNewBanner = async () => {
    if (newBanner.value === "") {
      info_toaster("Please Enter Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("value", newBanner.value);

      let res = await PostAPI("appsettings/addbanner", formData);
      if (res?.data?.ResponseCode === "1") {
        success_toaster(res?.data?.ResponseMessage);
        reFetch();
        setAddModal(false);
        setNewBanner({ value: "" });
        setLoader(false);
      } else {
        error_toaster(res?.data?.ResponseMessage);
        setLoader(false);
      }
    }
  };

  // For Delete Items
  const deleteBanner = async (id) => {
    let response = await PutApi(`appsettings/delete_banner/${id}`);
    console.log(
      "🚀 ~ file: Banners.jsx:21 ~ deleteBanner ~ response:",
      response
    );

    if (response?.data?.ResponseCode === "1") {
      success_toaster(response?.data?.ResponseMessage);
      reFetch();
    } else {
      error_toaster(response?.data?.ResponseMessage);
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.serialNo,
    },

    {
      name: "Title",
      selector: (row) => row.title,
    },

    {
      name: "Image",
      selector: (row) => row.value,
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
      serialNo: index + 1,
      title: value.title,
      value: <img src={`${baseUrl}${value.value}`}></img>,
      createdAt: moment(value.createdAt).format("Do, MMMM YYYY, h:mm:ss a"),
      action: (
        <div>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              deleteBanner(value?.id);
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
          <ModalHeader>Add New Banner</ModalHeader>
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
                    {/* <label ClassName="form-label">Image (256x256)</label> */}
                    <input
                      type="file"
                      class="dropify"
                      data-height="300"
                      name="value"
                      onChange={(e) =>
                        setNewBanner({
                          ...newBanner,
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
            <button className="add-admin" onClick={addNewBanner}>
              Add Banner
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Banners</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Banners Image</li>
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
                  Add New Banner Items
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
