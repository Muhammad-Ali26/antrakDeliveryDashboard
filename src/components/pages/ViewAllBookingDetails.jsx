// @ts-nocheck
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import GetAPI from "../apis/GetAPI";
import PostAPI from "../apis/PostApi";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function ViewAllBookingDetails() {
  const location = useLocation();
  const navigatePage = useNavigate();

  const [viewGetDetails, setViewGetDetails] = useState();

  const navigate = () => {
    navigatePage("/allbookings");
  };

  const bookingDetails = async () => {
    const response = await PostAPI(`booking/getby`, {
      bookId: location?.state?.orderNum,
    });
    setViewGetDetails(response);
  };
  useEffect(() => {
    bookingDetails();
  }, []);

  const columns = [
    {
      name: "#",
      selector: (row) => row.serialno,
      sortable: true,
      maxWidth: "10px",
    },

    {
      name: "Dimensions(cm3)",
      selector: (row) => row.dimensions,
      sortable: true,
      grow: 2,
    },

    {
      name: "Unit",
      selector: (row) => row.unit,
      sortable: true,
    },

    {
      name: "Weight(Ibs)",
      selector: (row) => row.weight,
      sortable: true,
      // minWidth: "100px"
    },

    {
      name: "Worth($)",
      selector: (row) => row.worth,
      sortable: true,
    },

    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },

    {
      name: "Total($)",
      selector: (row) => row.total,
      sortable: true,
    },

    {
      name: "Insurance",
      selector: (row) => row.insurance,
      sortable: true,
    },
  ];

  const columns_two = [
    {
      name: "#",
      selector: (row) => row.serialno,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },

    {
      name: "Time Stamp",
      selector: (row) => row.time,
      sortable: true,
    },
  ];

  const data = [];
  viewGetDetails?.data?.Response?.packages.map((value, index) => {
    data.push({
      serialno: index + 1,
      dimensions: value.dimensions,
      unit: value.unit,
      weight: value.weight,
      worth: value.worth,
      category: value.category,
      total: value.total,
      insurance: value.insurance,
    });
  });

  const data_two = []
  viewGetDetails?.data?.Response?.history.map((value, index) => {
    data_two.push({
      serialno: index + 1,
      status: value.status,
      time: value.time,
    });
  });
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
                      Details For Order No - ANT{location?.state?.orderNum}
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

          <div className="dashboard">
            <div className="row px-4">
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Sender Name
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.senderName}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Reciever Name
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.recieverName}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Sender Phone Number
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.senderPhoneNum}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Reciever Phone Number
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.recieverPhoneNum}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      PickUp Address
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {`${viewGetDetails?.data?.Response?.pickupBuiliding},${viewGetDetails?.data?.Response?.pickupAddress}${viewGetDetails?.data?.Response?.pickupCity},${viewGetDetails?.data?.Response?.pickupState},${viewGetDetails?.data?.Response?.pickupZip}`}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Dropoff Address
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {`${viewGetDetails?.data?.Response?.dropoffBuiliding},${viewGetDetails?.data?.Response?.dropoffAddress},${viewGetDetails?.data?.Response?.dropoffCity},${viewGetDetails?.data?.Response?.dropoffState},${viewGetDetails?.data?.Response?.dropoffZip}`}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Booking Status
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.bookingStatus}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Pickup Time
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.pickupTime}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Total Distance
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.distance} Miles
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Driver Earning
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      $ {viewGetDetails?.data?.Response?.estEarning}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Admin Earning
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      ${" "}
                      {viewGetDetails?.data?.Response?.amount -
                        viewGetDetails?.data?.Response?.estEarning}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Total Amount
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      $ {viewGetDetails?.data?.Response?.amount}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Tip
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      $ {viewGetDetails?.data?.Response?.tip}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      class="card-title"
                      style={{ color: "orange", textAlign: "center" }}
                    >
                      Rating
                    </h5>
                    <h4
                      class="card-text"
                      style={{
                        textAlign: "center",
                        fontSize: "19px",
                        fontWeight: "500",
                      }}
                    >
                      {viewGetDetails?.data?.Response?.ratingValue}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <div className="user-data card">
              <div className="card-content">
                <h2 className="p-3">Packages</h2>
              </div>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>

          <div className="row px-4 mt-5">
            <div className="user-data card">
              <div className="card-content">
                <h2 className="p-3">Time Stamp</h2>
              </div>
              <DataTable columns={columns_two} data={data_two} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
