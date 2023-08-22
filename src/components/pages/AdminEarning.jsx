import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import GetAPI from "../apis/GetAPI";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";

export default function AdminEarning() {
  const { getData, reFetch } = GetAPI("booking/earnings");
  console.log(
    "🚀 ~ file: AdminEarning.jsx:9 ~ AdminEarning ~ getData:",
    getData
  );

  const response = GetAPI("booking/details/earnings");
  console.log(
    "🚀 ~ file: AdminEarning.jsx:14 ~ AdminEarning ~ response:",
    response
  );

  const columns = [
    {
      name: "Id",
      selector: (row) => row.serialNo,
      sortable: true,
      maxWidth: "10px",
    },

    {
      name: "Booking Id",
      selector: (row) => row.bookingId,
      sortable: true,
      grow: 2,
    },

    {
      name: "Booking Total($)",
      selector: (row) => row.bookingTotal,
      sortable: true,
    },

    {
      name: "Driver Earning($)",
      selector: (row) => row.driverEarning,
      sortable: true,
      // minWidth: "100px"
    },

    {
      name: "Admin Commission($)",
      selector: (row) => row.adminCommission,
      sortable: true,
    },

    {
      name: "Tip Amount($)",
      selector: (row) => row.tipAmount,
      sortable: true,
    },

    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable: true,
    },

    {
      name: "Driver Name",
      selector: (row) => row.driverName,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const data = [];
  response?.getData?.Response?.details.map((value, index) => {
    data.push({
      serialNo: index + 1,
      bookingId: value.bookingId,
      bookingTotal: value.bookingTotal,
      driverEarning: value.driverEarning,
      adminCommission: value.adminCommission,
      tipAmount: value.tipAmount,
      customerName: value.customerName,
      driverName: value.driverName,
      status: value.status,
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
                      Admin Earnings
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="earning">
            <div className="row px-4">
              <div className="card-heading">
                <h2>Overall Earnings</h2>
              </div>
            </div>
            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Total Earnings</h4>
                    <div class="card-text">
                      <img src="/images/7163404.png" alt="image" />
                      <span>$ {getData?.Response?.totalEarnings}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Earnings</h4>
                    <div class="card-text">
                      <img src="/images/6009132.png" alt="image" />
                      <span>$ {getData?.Response?.totaldriverEarnings}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Admin Commision</h4>
                    <div class="card-text">
                      <img src="/images/3142062.png" alt="image" />
                      <span>$ {getData?.Response?.totalAdminCommission}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">No. of Deliveries</h4>
                    <div class="card-text">
                      <img src="/images/3063822.png" alt="image" />
                      <span>$ {getData?.Response?.totalBookings}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Cancel Earnings</h4>
                    <div class="card-text">
                      <img src="/images/1819863.png" alt="image" />
                      <span>$ {getData?.Response?.adminEarnbyCancelTotal}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Penalties</h4>
                    <div class="card-text">
                      <img src="/images/6744366.png" alt="image" />
                      <span>$ {getData?.Response?.driverPenaltyTotal}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="earning">
            <div className="row px-4">
              <div className="card-heading">
                <h2>Monthly Earnings</h2>
              </div>
            </div>
            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Total Earnings</h4>
                    <div class="card-text">
                      <img src="/images/7163404.png" alt="image" />
                      <span>$ {getData?.Response?.monthlyTotal}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Earnings</h4>
                    <div class="card-text">
                      <img src="/images/6009132.png" alt="image" />
                      <span>$ {getData?.Response?.monthlyDriver}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Admin Commision</h4>
                    <div class="card-text">
                      <img src="/images/3142062.png" alt="image" />
                      <span>$ {getData?.Response?.monthlyAdminCommission}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">No. of Deliveries</h4>
                    <div class="card-text">
                      <img src="/images/3063822.png" alt="image" />
                      <span>$ {getData?.Response?.monthlyBookings}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Cancel Earnings</h4>
                    <div class="card-text">
                      <img src="/images/1819863.png" alt="image" />
                      <span>$ {getData?.Response?.cancelEarningsMonthly}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Penalties</h4>
                    <div class="card-text">
                      <img src="/images/6744366.png" alt="image" />
                      <span>$ {getData?.Response?.driverPenaltyMonthly}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="earning">
            <div className="row px-4">
              <div className="card-heading">
                <h2>Weekly Earnings</h2>
              </div>
            </div>
            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Total Earnings</h4>
                    <div class="card-text">
                      <img src="/images/7163404.png" alt="image" />
                      <span>$ {getData?.Response?.weeklyTotal}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Earnings</h4>
                    <div class="card-text">
                      <img src="/images/6009132.png" alt="image" />
                      <span>$ {getData?.Response?.weeklyDriver}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Admin Commision</h4>
                    <div class="card-text">
                      <img src="/images/3142062.png" alt="image" />
                      <span>$ {getData?.Response?.weeklyAdminCommission}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">No. of Deliveries</h4>
                    <div class="card-text">
                      <img src="/images/3063822.png" alt="image" />
                      <span>$ {getData?.Response?.weeklyBookings}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Cancel Earnings</h4>
                    <div class="card-text">
                      <img src="/images/1819863.png" alt="image" />
                      <span>$ {getData?.Response?.cancelEarningsWeekly}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Penalties</h4>
                    <div class="card-text">
                      <img src="/images/6744366.png" alt="image" />
                      <span>$ {getData?.Response?.driverPenaltyWeekly}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="earning">
            <div className="row px-4">
              <div className="card-heading">
                <h2>Today Earnings</h2>
              </div>
            </div>
            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Total Earnings</h4>
                    <div class="card-text">
                      <img src="/images/7163404.png" alt="image" />
                      <span>$ {getData?.Response?.todaysTotal}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Earnings</h4>
                    <div class="card-text">
                      <img src="/images/6009132.png" alt="image" />
                      <span>$ {getData?.Response?.todaysDriver}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Admin Commision</h4>
                    <div class="card-text">
                      <img src="/images/3142062.png" alt="image" />
                      <span>$ {getData?.Response?.todaysAdminCommission}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row px-4">
              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">No. of Deliveries</h4>
                    <div class="card-text">
                      <img src="/images/3063822.png" alt="image" />
                      <span>$ {getData?.Response?.todaysBookings}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Cancel Earnings</h4>
                    <div class="card-text">
                      <img src="/images/1819863.png" alt="image" />
                      <span>$ {getData?.Response?.cancelEarningsToday}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h4 class="card-title">Driver Penalties</h4>
                    <div class="card-text">
                      <img src="/images/6744366.png" alt="image" />
                      <span>$ {getData?.Response?.driverPenaltyToday}</span>
                      <h4></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row px-4">
            <div className="user-data card">
              <div className="card-content">
                <h2 className="p-3">Booking Details</h2>
              </div>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
