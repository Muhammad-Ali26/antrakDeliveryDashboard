// @ts-nocheck
import React from "react";
import {
  FaCar,
  FaDropbox,
  FaGift,
  FaHome,
  FaShoppingCart,
  FaTaxi,
  FaUserNurse,
  FaUsers,
} from "react-icons/fa";
import {TiCancel} from "react-icons/ti"
import { NavLink } from "react-router-dom";
import GetAPI from "../apis/GetAPI";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Loader from "../loader/Loader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { getData } = GetAPI("booking/dashboard");

  const graphData = GetAPI("booking/graphsdata");
  console.log(
    "🚀 ~ file: Dashboard.jsx:39 ~ Dashboard ~ graphData:",
    graphData
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const labels = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  const item = [];
  const result = graphData?.getData?.Response?.data[0].forEach((element) => {
    item.push(element[1]);
  });

  const finalData = item.slice(1);
  const data = {
    labels,
    datasets: [
      {
        label: graphData?.getData?.Response?.titles[0],
        data: finalData,
        // data: graphData?.getData?.Response?.data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return getData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Navbar></Navbar>
      <TopBar></TopBar>

      <section className="dashboard-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="dashboard-heading">
                <h2>Dashboard</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          <section className="dashboard">
            <div className="row px-4">
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Earnings</h5>
                    <h4 className="card-text">
                      $ {getData?.Response?.totalEarnings}
                    </h4>
                    <FaShoppingCart />
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Admin Commision</h5>
                    <h4 className="card-text">
                      $ {getData?.Response?.totalAdminCommission}
                    </h4>
                    <FaGift />
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Driver Earnings</h5>
                    <h4 className="card-text">
                      $ {getData?.Response?.totaldriverEarnings}
                    </h4>
                    <FaDropbox />
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">No. of Orders</h5>
                    <h4 className="card-text">
                      {getData?.Response?.totalBookings}
                    </h4>
                    <FaCar />
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">No. of Users</h5>
                    <h4 className="card-text">
                      {getData?.Response?.totalUsers}
                    </h4>
                    <FaUsers />
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">No. of Drivers</h5>
                    <h4 className="card-text">
                      {getData?.Response?.approvedDrivers}
                    </h4>
                    <FaUserNurse />
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Ongoing Orders</h5>
                    <h4 className="card-text">
                      {getData?.Response?.scheduled}
                    </h4>
                    <FaTaxi />
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Cancelled Orders</h5>
                    <h4 className="card-text">
                      {getData?.Response?.totalcancelledBookings}
                    </h4>
                    <TiCancel />
                  </div>
                </div>
              </div>
              {/* {graphData?.getData?.Response?.data?.map((val, ind) => ( */}
              <Bar options={options} data={data} style={{width:"500px"}}/>
              {/* ))}  */}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
