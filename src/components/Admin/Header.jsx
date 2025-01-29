import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import no_avatar from "../../assets/images/no_avatar.png";
import { LiaCommentSolid } from "react-icons/lia";
import { CiViewList } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import "./Admin.css";
import { Menu } from "./Menu";

export const Header = () => {
  const [text, setText11] = useState("Tổng quan");
  const test = (i) => {
    setText11(i);
  };

  return (
    <>
      <div className="wrap_header">
        <div className="admin_logo">
          <img src={logo} alt="" />
        </div>

        <div className="wrap_admin-header-content">
          <p>{text}</p>
        </div>

        <div className="wrap_admin_icon">
          <i>
            <LiaCommentSolid size={18} />
          </i>
          <i>
            <CiViewList size={18} />
          </i>
          <i>
            <FaRegBell size={18} />
          </i>
          <div className="wrap_admin-infor">
            <p>mhung</p>
            <img src={no_avatar} alt="" />
          </div>
        </div>
      </div>

      <div className="wrap_admin-content">
        <Menu onChosenData={test} />
      </div>
    </>
  );
};
