import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUser,
  FaEmpire,
  FaLock,
  FaEnvelope,
  FaCar,
  FaTicketAlt,
  FaBookmark,
  FaTh,
  FaRebel,
  FaBus,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { IoLogoUsd } from "react-icons/io";
import { info_toaster } from "../../Toaster";
export default function Navbar() {
  return (
    <>
      <section className="sidebar">
        <div className="logo">
          <NavLink to="/dashboard">
            <img src="/images/logo.webp" alt="logo" className="img-fluid" />
          </NavLink>
        </div>

        <nav className="navbar-menu">
          <ul>
            <li className="dashboard">
              <h2 className="navbar-heading">Dashboard</h2>
              <hr />
              <NavLink to="/dashboard">
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li className="user-management">
              <h2 className="navbar-heading">User Management</h2>
              <hr />
              <li>
                <NavLink to="/users">
                  <FaUsers />
                  <span>Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin">
                  <FaUser />
                  <span>Admin</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/employees">
                  <FaEmpire />
                  <span>Employees</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/roles">
                  <FaLock />
                  <span>Roles/Permissions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/allDrivers">
                  <FaCar />
                  <span>All Drivers</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/queDrivers">
                  <FaCar />
                  <span>Que Drivers</span>
                </NavLink>
              </li>
            </li>
            <li className="mails">
              <h2 className="navbar-heading">Mails</h2>
              <hr />
              <li>
                <NavLink to="/unreadMails">
                  <FaEnvelope />
                  <span>Unread Mails</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/allMails">
                  <FaEnvelope />
                  <span>All Mails</span>
                </NavLink>
              </li>
            </li>
            <li className="bookings">
              <h2 className="navbar-heading">Bookings Management</h2>
              <hr />
              <li>
                <NavLink to="/allbookings">
                  <FaBookmark />
                  <span>All Bookings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cancelbookings">
                  <FaBookmark />
                  <span>Cancel Bookings</span>
                </NavLink>
              </li>
            </li>
            <li className="earnings">
              <h2 className="navbar-heading">Earnings</h2>
              <hr />
              <li>
                <NavLink to="/admin_earnings">
                  <IoLogoUsd />
                  <span>Earnings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/payment">
                  <FaMoneyBill />
                  <span>Payment History</span>
                </NavLink>
              </li>
            </li>

            <li className="settings">
              <h2 className="navbar-heading">System Settings</h2>
              <hr />
              <li>
                <NavLink to="/coupons">
                  <FaTicketAlt />
                  <span>Coupons</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/charges">
                  <FaEnvelope />
                  <span>Charges</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/categories">
                  <FaTh />
                  <span>Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/banners">
                  <AiOutlinePicture />
                  <span>Banners</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/items">
                  <FaRebel />
                  <span>Restricted Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/vehicle">
                  <FaBus />
                  <span>Vehicle</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/settings">
                  <FaCog />
                  <span>Front End Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/change_password">
                  <FaCog />
                  <span>Change Password</span>
                </NavLink>
              </li>
            </li>
            <li className="logout">
              <h2 className="navbar-heading">Logout</h2>
              <hr />
              <NavLink
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  info_toaster("Logout Successfully");
                }}
                to="/"
              >
                <FaCog />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}
