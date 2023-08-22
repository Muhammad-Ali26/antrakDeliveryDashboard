import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import GetAPI from "../apis/GetAPI";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";
export default function CancelBookings() {
  const response = GetAPI("booking/cancelled");
  console.log(
    "🚀 ~ file: AllBookings.jsx:11 ~ AllBookings ~ response:",
    response
  );

  const columns = [
    {
      name: "Serial #",
      selector: (row) => row.serialno,
    },

    {
      name: "Cancelled by",
      selector: (row) => row.cancelledBy,
      grow: 2,
    },

    {
      name: "Cancelled by(ID)",
      selector: (row) => row.cancelledByUserId,
      grow: 3,
    },

    {
      name: "Cancelled by(Name)",
      selector: (row) => row.cancelledByName,
      grow: 3,
    },

    {
      name: "Booked by",
      selector: (row) => row.bookedByName,
    },

    {
      name: "Amount ($)",
      selector: (row) => row.total,
      grow: 3,
    },

    {
      name: "Reason of Cancel",
      selector: (row) => row.reason,
    },

    {
      name: "Notes",
      selector: (row) => row.note,
    },

    {
      name: "Cancelled At",
      selector: (row) => row.cancelledAt,
      grow: 3,
    },
  ];

  const data = [];
  response?.getData?.Response?.map((value, index) => {
    data.push({
      serialno: index + 1,
      cancelledBy: value.cancelledBy,
      cancelledByUserId: value.cancelledByUserId,
      cancelledByName: value.cancelledByName,
      bookedByName: value.bookedByName,
      total: value.total,
      reason: value.reason,
      note: value.note,
      cancelledAt: value.cancelledAt,
    });
  });
  return response?.getData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <TopBar />
      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Cancel Bookings</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Cancel Bookings</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row px-4">
            <div className="user-data card p-3">
              <h2>All Bookings</h2>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
