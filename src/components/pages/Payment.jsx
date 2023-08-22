import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import moment from "moment";
import GetAPI from "../apis/GetAPI";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { baseUrl } from "../../BaseUrl";
import Loader from "../loader/Loader";

export default function Payment() {
  const response = GetAPI("payments/history");
  console.log("🚀 ~ file: Payment.jsx:14 ~ Payment ~ response:", response);

  const columns = [
    {
      name: "Serial No",
      selector: (row) => row.serialNo,
    },

    {
      name: "Transaction Id",
      selector: (row) => row.transactionId,
      grow: 2,
    },

    {
      name: "Driver ID",
      selector: (row) => row.driverId,
    },

    {
      name: "Driver Name",
      selector: (row) => row.requestedBy,
      grow: 2,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },

    {
      name: "Amount($)",
      selector: (row) => row.amount,
    },
    {
      name: "Created At",
      selector: (row) => row.at,
    },
  ];

  const data = [];
  response?.getData?.Response?.map((value, index) => {
    data.push({
      serialNo: index + 1,
      transactionId: value.transactionId,
      driverId: value.driverId,
      requestedBy: value.requestedBy,
      status: value.status,
      amount: value.amount,
      at: value.at,
    });
  });
  return response?.getData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Navbar></Navbar>
      <TopBar></TopBar>

      <section className="users-section">
        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Payemen</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Restricted Items</li>
                  <li>
                    <span>/</span>
                    List Admin
                  </li>
                </ul>
              </div>
            </div>
          </div> */}

          <div className="row px-4">
            <div className="user-data card p-4">
              <h2>Payment History</h2>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
