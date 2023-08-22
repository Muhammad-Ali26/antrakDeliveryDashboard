import React, { useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import GetAPI from "../apis/GetAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Loader from "../loader/Loader";
import { error_toaster, success_toaster } from "../../Toaster";
import PutApi from "../apis/PutApi";

export default function AllDrivers() {
  const naviagte = useNavigate();
  const driverDetails = (id) => {
    naviagte("/driver-details", {
      state: {
        id,
      },
    });
  };
  const {getData, reFetch} = GetAPI("users/getall/Driver");
  console.log("🚀 ~ file: AllDrivers.jsx:16 ~ AllDrivers ~ getData:", getData);

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
      name: "ID",
      selector: (row) => row.serialno,
      sortable: true,
    },

    {
      name: "Driver ID",
      selector: (row) => row.id,
      sortable: true,
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },

    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      grow: 2,
    },

    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Action Status",
      selector: (row) => row.actionStatus,
      sortable: true,
      grow: 2,
    },

    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      grow: 2,
    },
  ];

  const data = [];
  getData?.map((value, index) => {
    data.push({
      serialno: index + 1,
      id: value?.id,
      name: value?.name,
      phone: value?.phone,
      email: value?.email,
      status: value?.status ? "Active" : "Block",
      actionStatus: (
        <div>
        {value?.status === true ? (
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
      action: (
        <div>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              driverDetails(value?.id);
            }}
          >
            Details
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

      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Drivers</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Drivers</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row px-4">
            <div className="user-data card p-3">
              <h2>All Drivers</h2>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
