import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { NavLink } from "react-router-dom";
import ApiService from "../Api/ApiService";
import axios from "axios";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NextListProduct } from "./NextListProduct";

export const ListProduct = () => {
  const url = "http://localhost:3000";
  const query = "http://localhost:5173";
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [listCategory, setListCategory] = useState([]);
  const [listSupplier, setListSupplier] = useState([]);
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState({
    limit: 1,
    total: 0,
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [arrangeActive, setArrangeActive] = useState(0);
  const [filterItem, setFilterItem] = useState({
    manufacturer: "",
    category: "",
    price: "",
  });

  const loadData = async () => {
    const res = await ApiService.ApiCategory();
    setListCategory(res.data);

    const res1 = await ApiService.ApiSupplier();
    setListSupplier(res1.data);
  };

  const listPrice = [
    { title: "Tất cả", min: 0, max: 999999999 },
    { title: "Dưới 1 triệu", min: 0, max: 1000000 },
    { title: "Từ 1 triệu đến 3 triệu", min: 1000000, max: 3000000 },
    { title: "Từ 3 triệu đến 5 triệu", min: 3000000, max: 5000000 },
    { title: "Từ 5 triệu đến 7 triệu", min: 5000000, max: 7000000 },
    { title: "Từ 7 triệu đến 10 triệu", min: 7000000, max: 10000000 },
    { title: "Trên 10 triệu", min: 10000000, max: 999999999 },
  ];

  const [selectedPriceRange, setSelectedPriceRange] = useState(listPrice[0]);

  const listArrange = [
    {
      title: "Tên từ A - Z",
    },

    {
      title: "Tên từ Z - A",
    },

    {
      title: "Giá tăng dần",
    },

    {
      title: "Giá giảm dần",
    },
  ];

  const handleClick = (i) => {
    setArrangeActive(i);
    if (arrangeActive === 0) {
      setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (arrangeActive === 1) {
      setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));
    } else if (arrangeActive === 1) {
      setProducts([...products].sort((a, b) => a.price - b.price));
    } else {
      setProducts([...products].sort((a, b) => b.price - a.price));
    }
  };

  useEffect(() => {
    fetchProducts(selectedPriceRange, selectedBrand, selectedCategory);
  }, [selectedPriceRange, selectedBrand, selectedCategory]);

  // const setSkip = (i) => {
  //   console.log(i);
  // };

  const fetchProducts = async (priceRange, brand, category, skip) => {
    try {
      const response = await axios.get(`${url}/products/getall?skip=${skip}`, {
        params: {
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          brand: brand !== "Tất cả" ? brand : undefined,
          category: category !== "Tất cả" ? category : undefined,
        },
      });

      if (response.status === 200) {
        const { product, limit, skip, total } = response.data;
        setProducts(product);
        setNextPage({
          limit,
          skip,
          total,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
    scrollToTop();
  }, []);
  return (
    <>
      <div className="mt-4 mb-4 text-sm">
        <NavLink to={"/"}>Trang chủ</NavLink>{" "}
        <span className="about_title">/ Tất cả sản phẩm /</span>
      </div>
      <div className="wrap_list-all">
        <div className="flex justify-between">
          <div className="wrap_listall-arrange">
            <p>Sắp xếp:</p>
            <ul>
              {listArrange.map((item, index) => (
                <li
                  onClick={() => {
                    handleClick(index);
                  }}
                  className={
                    arrangeActive === index ? "wrap_listall-arrange-active" : ""
                  }
                  key={index}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="wrap_listall-filter">
            <p>Bộ lọc: </p>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {listSupplier.map((brand, index) => (
                <option key={index} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className=""
            >
              {listCategory.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              name="price"
              id=""
              value={selectedPriceRange.title}
              onChange={(e) => {
                const range = listPrice.find((p) => p.title === e.target.value);
                setSelectedPriceRange(range);
              }}
            >
              {listPrice.map((price) => (
                <option key={price.title} value={price.title}>
                  {price.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="wrap_listall_product">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="list_products">
                <div className="text-center ">
                  <a href={`${query}/products/${item.product_id}`}>
                    <img
                      src={
                        item.image
                          ? `${url}/products/image/${item.image}`
                          : `${url}/products/image/1741338590275_no_img.jpg`
                      }
                      alt=""
                      className="list_product-images"
                    />
                  </a>
                </div>
                <p className="list_product-name">
                  <a href={`${query}/products/${item.product_id}`}>
                    {item.name}
                  </a>
                </p>
                <div className="flex ml-2">
                  <p
                    className={
                      item.compare_price === item.cost_price
                        ? "none"
                        : "list_product-compare_price"
                    }
                  >
                    {Intl.NumberFormat("en-US").format(item.compare_price)}₫
                  </p>
                  <p
                    className={
                      item.cost_price - item.compare_price !== 0
                        ? "list_product-percent"
                        : "none"
                    }
                  >
                    ( Tiết kiệm:{" "}
                    {100 -
                      Math.round((item.cost_price / item.compare_price) * 100)}
                    %)
                  </p>
                </div>
                <p className="list_product-price">
                  {Intl.NumberFormat("en-US").format(item.cost_price)}₫
                </p>
                <div className="flex mr-2 ml-2 justify-end mb-3">
                  <div className="list_product-add_cart">
                    {/* <button
                      onClick={() => {
                        handleClick(item);
                      }}
                    >
                      <MdOutlineShoppingCart size={20} />
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no_products">
              <p>Không có sản phẩm nào tương ứng</p>
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <NextListProduct data={fetchProducts} dataNext={nextPage} />
        </div>
      </div>
    </>
  );
};
