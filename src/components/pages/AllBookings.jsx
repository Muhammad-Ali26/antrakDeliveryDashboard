import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import GetAPI from "../apis/GetAPI";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";
export default function AllBookings() {
  const response = GetAPI("booking/get/all");

  const navigate = useNavigate();
  const ViewAllBookingDetails = (orderNum) => {
    navigate("/view_all_booking_details", {
      state: {
        orderNum,
      },
    });
  };

  const columns = [
    {
      name: "Serial #",
      selector: (row) => row.serialno,
    },

    {
      name: "Order #",
      selector: (row) => row.orderNum,
    },

    {
      name: "Sender Name",
      selector: (row) => row.senderName,
    },

    {
      name: "Sender No",
      selector: (row) => row.senderPhoneNum,
    },

    {
      name: "Receiver Name",
      selector: (row) => row.recieverName,
    },

    {
      name: "Pickup Address",
      selector: (row) => row.pickupAddress,
      grow: 3,
    },

    {
      name: "Amount ($)",
      selector: (row) => row.amount,
    },

    {
      name: "Booking Status",
      selector: (row) => row.bookingStatus,
    },

    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const data = [];
  response?.getData?.Response?.map((value, index) => {
    data.push({
      serialno: index + 1,
      orderNum: <div>ANT{value.orderNum}</div>,
      senderName: value.senderName,
      senderPhoneNum: value.senderPhoneNum,
      recieverName: value.recieverName,
      pickupAddress: value.pickupAddress,
      amount: value.amount,
      bookingStatus: value.bookingStatus,
      action: (
        <div>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              ViewAllBookingDetails(value?.orderNum);
            }}
          >
            View
          </button>
        </div>
      ),
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
                <h2>All Bookings</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>All Bookings</li>
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
