import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import DataTable from "react-data-table-component";
import GetAPI from "../apis/GetAPI";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import Loader from "../loader/Loader";

export default function AllMails() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let response = GetAPI("appsettings/getrepliedmessages");
  console.log("🚀 ~ file: AllMails.jsx:13 ~ AllMails ~ response:", response);

  const columns = [
    {
      name: "Serial No",
      selector: (row) => row.serialno,
      sortable: true,
    },

    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },

    {
      name: "Last Name",
      selector: (row) => row.lastName,
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
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      grow: 2,
    },
  ];

  const data = [];
  response?.getData?.Response?.map((value, index) => {
    data.push({
      serialno: value.id,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      message: value.message,
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
                <h2>All Mails</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Mails</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row px-4">
            <div className="user-data card p-3">
              <h2>All Mails</h2>
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
