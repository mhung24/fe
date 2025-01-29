import React, { useState } from "react";
import { Home } from "../Home/Home";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { RiProductHuntLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { TbReportAnalytics } from "react-icons/tb";

const listItem = [
  {
    title: "Tổng quan",
    icon: <TbListDetails />,
  },
  {
    title: "Đơn hàng",
    icon: <MdOutlineShoppingCart />,
  },
  {
    title: "Vận chuyển",
    icon: <TbTruckDelivery />,
  },
  {
    title: "Sản phẩm",
    icon: <RiProductHuntLine />,
  },
  {
    title: "Khách hàng",
    icon: <CiUser />,
  },
  {
    title: "Báo cáo",
    icon: <TbReportAnalytics />,
  },
];

export const Menu = (props) => {
  const { onChosenData } = props;

  const [bgList, setBgList] = useState(0);

  const setBgListItem = (index, name) => {
    setBgList(index);
    onChosenData(name);
  };
  return (
    <div className="wrap_list-menu">
      {listItem.map((item, index) => (
        <div
          key={index}
          className={bgList === index ? "list_menu bg_list-menu" : "list_menu"}
        >
          <button
            onClick={() => {
              setBgListItem(index, item.title);
            }}
          >
            <i>{item.icon}</i>
            <p>{item.title}</p>
          </button>
        </div>
      ))}
    </div>
  );
};
