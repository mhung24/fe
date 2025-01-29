import React from "react";
import ApiService from "../Api/ApiService";

export const Home = () => {
  const loadData = async () => {
    const res = await ApiService.ApiProduct();
    console.log(res);
  };

  loadData();
};
