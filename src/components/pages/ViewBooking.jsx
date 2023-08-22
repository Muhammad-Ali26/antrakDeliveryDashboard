// @ts-nocheck
import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import GetAPI from "../apis/GetAPI";
import DataTable from "react-data-table-component";
export default function ViewBooking() {
  const location = useLocation();
  console.log(location?.state?.id);

  const navigatePage = useNavigate();
  const navigate = () => {
    navigatePage("/users");
  };

  const response = GetAPI(`booking/getall/${location?.state?.id}`);

  console.log(
    "🚀 ~ file: ViewBooking.jsx:18 ~ ViewBooking ~ response:",
    response
  );

  const columns = [
    {
      name: "Serial No",
      selector: (row) => row.serialno,
      sortable: true,
      maxWidth: "10px",
    },

    {
      name: "Order No",
      selector: (row) => row.orderNumber,
      sortable: true,
    },

    {
      name: "Sender Phone Num",
      selector: (row) => row.senderPhoneNum,
      sortable: true,
      grow: 2,
    },

    {
      name: "Order Date",
      selector: (row) => row.orderDate,
      sortable: true,
      // minWidth: "100px"
      grow:2
    },

    {
      name: "Receiver Name",
      selector: (row) => row.receiverName,
      sortable: true,
      grow:2
    },

    {
      name: "Receiver Phone Num",
      selector: (row) => row.receiverPhoneNum,
      sortable: true,
      grow:2
    },

    // {
    //   name: "Action",
    //   selector: (row) => row.action,
    //   sortable: true,
    // },
  ];

  const data = [];
  response?.getData?.Response?.map((value, index) =>
    data.push({
      serialno: index + 1,
      orderNumber: value.orderNumber,
      senderPhoneNum: value.senderPhoneNum,
      orderDate: value.orderDate,
      receiverName: value.receiverName,
      receiverPhoneNum: value.receiverPhoneNum,
      // action: value.action,
    })
  );

  return (
    <>
      <Navbar />
      <TopBar />
      <section className="users-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <div>
                  <ul>
                    <li
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        marginBottom: "10px",
                      }}
                    >
                      All Orders By User ID-{location?.state?.id}
                    </li>
                  </ul>
                  <button
                    className="add-admin mb-3 d-flex align-items-center gap-2"
                    onClick={navigate}
                  >
                    <FaArrowLeft />
                    <span>Back</span>
                  </button>
                </div>
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
