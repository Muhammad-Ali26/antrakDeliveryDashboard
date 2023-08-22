import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import JoditEditor from "jodit-react";
import GetAPI from "../apis/GetAPI";
import Loader from "../loader/Loader";
export default function Setting() {
  const editor = useRef(null);

  const getData = GetAPI("appsettings/get/web");
  console.log("🚀 ~ file: Setting.jsx:13 ~ Setting ~ getData:", getData);

  return getData?.getData.length === 0 ? (
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
                <h2>Settings</h2>
                <ul className="d-flex align-items-center justify-content-center">
                  <li>
                    <NavLink to="/dashboard">
                      <FaHome />
                    </NavLink>
                    <span>/</span>
                  </li>
                  <li>Front End Settings</li>
                  {/* <li>
                    <span>/</span>
                    List Admin
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className="navtabs">
            <ul className="nav nav-tabs">
              <li class="nav-item">
                <Link className= "nav-link">
                  Website Setting
                </Link>
              </li>
            </ul>
          </div>

          {getData?.getData?.Response?.map((data) => (
            <div className="summernote">
              <div className="card p-4">
                <div className="start">
                  <h2>{data.title}</h2>
                  <JoditEditor ref={editor} value={data.value} tabIndex={1} />
                </div>
              </div>
              {/* <div className="change mt-2">
                <button type="submit" class="btn btn-primary">
                  Save
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
