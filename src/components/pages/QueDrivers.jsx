// @ts-nocheck
import React, { useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import moment from "moment";
import GetAPI from "../apis/GetAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Loader from "../loader/Loader";
import { error_toaster, success_toaster } from "../../Toaster";
import PutApi from "../apis/PutApi";

export default function QueDrivers() {
  const navigatePage = useNavigate();

  const navigate = () => {
    navigatePage("/allDrivers");
  };

  const naviagte = useNavigate();
  const queDriverDetails = (id) => {
    naviagte("/que-driver-details", {
      state: {
        id,
      },
    });
  };

  let { getData, reFetch } = GetAPI("driver/waitapproval");
  console.log("🚀 ~ file: QueDrivers.jsx:26 ~ QueDrivers ~ getData:", getData);

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
      name: "Serial No",
      selector: (row) => row.serialno,
      sortable: true,
    },

    {
      name: "Id",
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
      selector: (row) => row.phoneNum,
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
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      grow: 2,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      grow: 2,
    },
  ];

  const data = [];
  getData?.Response?.map((value, index) => {
    data.push({
      serialno: index + 1,
      id: value?.id,
      name: value?.name,
      phoneNum: value?.phoneNum,
      email: value?.email,
      createdAt: moment(value.createdAt).format("Do, MMMM YYYY, h:mm:ss a"),
      status: (
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
              queDriverDetails(value?.id);
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
                <h2>Driver Waiting Approval</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Drivers</li>
                  <li>
                    <span>/</span>
                    Que Drivers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <div className="user-data card p-3">
              <div>
                <button
                  className="add-admin mb-3 d-flex align-items-center gap-2"
                  onClick={navigate}
                >
                  <FaArrowLeft />
                  <span>Back</span>
                </button>
              </div>
              <h2>Que Drivers</h2>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
