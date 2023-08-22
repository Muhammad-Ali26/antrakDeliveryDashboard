// @ts-nocheck
import React from "react";
import { FaPowerOff, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { info_toaster } from "../../Toaster";
export default function TopBar() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    info_toaster("Logout Successfully");
  };
  return (
    <div className="topbar">
      <div className="arrow">
        {/* <FaArrowLeft /> */}
      </div>
      <div className="power" onClick={logout}>
        <FaPowerOff />
      </div>
    </div>
  );
}
