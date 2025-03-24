import React, { useEffect, useState } from "react";
import ApiService from "../Api/ApiService";
import { Subheader } from "../Header/Subheader";
import { ListProducts } from "../Products/ListProducts";

export const Content = () => {
  const [list, setList] = useState();
  const loadData = async () => {
    const res = await ApiService.ApiCategory();
    if (res.status === 200) {
      setList(res.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Subheader />
      {list?.map((item, index) =>
        item.name !== "Khác" ? (
          <ListProducts key={index} item={index + 1} name={item.name} />
        ) : (
          ""
        )
      )}
    </>
  );
};
