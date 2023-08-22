// @ts-nocheck
import React from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { FaEdit, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import GetAPI from "../apis/GetAPI";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";
import { useState } from "react";
import PutApi from "../apis/PutApi";
import { error_toaster, success_toaster } from "../../Toaster";

export default function Charges() {
  const { getData, reFetch } = GetAPI("charges/get");

  const [editAmount, setEditAmount] = useState(1);
  const [editValue, setEditValue] = useState(1);
  const [changeAmount, setChangeAmount] = useState({
    id: "",
    amount: "",
  });
  const [changeValue, setChangeValue] = useState({
    id: "",
    value: "",
  });

  const handleAmountEvent = (id) => {
    setEditAmount(id);
  };

  const handleCancelButtonClick = () => {
    setEditAmount(null);
    setEditValue(null);
  };
  const handleValueEvent = (id) => {
    setEditValue(id);
  };

  // This function is used to change value
  const inputEvent = (e) => {
    setChangeAmount({ ...changeAmount, [e.target.name]: e.target.value });
  };
  const inputEventTwo = (e) => {
    setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
  };

  // This function is used to update value through Api
  const updateAmount = async () => {
    const res = await PutApi("charges/update", {
      id: changeAmount.id,
      amount: changeAmount.amount,
    });

    if (res?.data?.ResponseCode === "1") {
      success_toaster(res?.data?.ResponseMessage);
      setEditAmount(1);
      reFetch();
    } else {
      error_toaster(res?.data?.ResponseMessage);
    }
  };
  const updateValue = async () => {
    const res = await PutApi("charges/update_value", {
      id: changeValue.id,
      value: changeValue.value,
    });

    if (res?.data?.ResponseCode === "1") {
      success_toaster(res?.data?.ResponseMessage);
      setEditValue(1);
      reFetch();
    } else {
      error_toaster(res?.data?.ResponseMessage);
    }
  };

  const columns = [
    {
      name: "Serial #",
      selector: (row) => row.serialno,
    },

    {
      name: "Title",
      selector: (row) => row.title,
    },

    {
      name: "Amount $ (Cost Per Base Value)",
      selector: (row) => row.amount,
    },

    {
      name: "Base Value",
      selector: (row) => row.value,
    },
  ];

  const data = [];
  getData?.Response?.map((value, index) => {
    data.push({
      id: value.id,
      serialno: index + 1,
      title: value.title,
      amount:
        value.id === editAmount ? (
          <>
            <div className="amount d-flex gap-1">
              <input
                type="number"
                className="form-control"
                name="amount"
                value={changeAmount.amount}
                onChange={inputEvent}
              />
              <button
                className="cancel"
                onClick={() => handleCancelButtonClick()}
              >
                X
              </button>
              <button className="btn btn-primary" onClick={updateAmount}>
                Save
              </button>
            </div>
          </>
        ) : (
          <div className="amount">
            <div>{value.amount}</div>
            <button
              onClick={(e) => {
                handleAmountEvent(value.id);
                setChangeAmount({ id: value.id, amount: value.amount });
              }}
            >
              <FaEdit />
            </button>
          </div>
        ),
      value:
        value.id === editValue ? (
          <>
            <div className="amount d-flex gap-1">
              <input
                type="number"
                className="form-control"
                name="value"
                value={changeValue.value}
                onChange={inputEventTwo}
              />
              <button
                className="cancel"
                onClick={() => handleCancelButtonClick()}
              >
                X
              </button>
              <button className="btn btn-primary" onClick={updateValue}>Save</button>
            </div>
          </>
        ) : (
          <div className="amount">
            <div>{value.value}</div>
            <button
              onClick={(e) => {
                handleValueEvent(value.id);
                setChangeValue({ id: value.id, value: value.value });
              }}
            >
              <FaEdit />
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
                <h2>Charges (Click To Edit)</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Charges</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row px-4">
            <div className="user-data card p-3">
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bolder",
                  color: "black",
                  marginBottom: "10px",
                }}
              >
                Amount*
              </h2>
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "14px",
                  color: "black",
                }}
              >
                Cost Per Base Value
              </p>
              <hr />
              <DataTable columns={columns} data={data} pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
