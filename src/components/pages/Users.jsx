// @ts-nocheck
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import GetAPI from "../apis/GetAPI";
import moment from "moment/moment";
import PutApi from "../apis/PutApi";
import { useNavigate } from "react-router-dom";
import { error_toaster, success_toaster } from "../../Toaster";
import Loader from "../loader/Loader";

export default function Users() {
  const navigate = useNavigate();

  const viewBookingDetails = (id) => {
    navigate("/view_bookings", {
      state: {
        id,
      },
    });
  };

  const { getData, reFetch } = GetAPI("users/getall/User");

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

  // Search Function
  const [search, setSearch] = useState("");

  const getUsers = () => {
    const filteredArray = getData?.filter((user) => search === "" || (user?.name).toLowerCase().includes(search.toLowerCase()) ||
        (user?.phone).toString().includes(search) ||
        (user?.email).toLowerCase().includes(search.toLowerCase())
    );

    return filteredArray;
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.serialno,
    },

    {
      name: "User ID",
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
      name: "Created At",
      selector: (row) => row.created,
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
      name: "Bookings",
      selector: (row) => row.bookings,
    },
  ];

  const data = [];
  getUsers()?.map((value, index) =>
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
      bookings: (
        <div>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              viewBookingDetails(value?.id);
            }}
          >
            View
          </button>
        </div>
      ),
    })
  );

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
                <h2>Users</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Users</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <div className="user-data card">
              <div className="card-content">
                <h2 className="p-3">Users</h2>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                </form>
              </div>
              <DataTable
                columns={columns}
                data={data}
                pagination
                className="my-datatable"
                headerClassName="header"
                rowClassName="row"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
