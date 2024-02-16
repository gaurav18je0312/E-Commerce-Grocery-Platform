import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryColumn from "../components/CategoryColumn";
import Footer from "../components/Footer";
import "./CategoryPage.css";
import axios from "axios";
import ProductView from "../components/ProductView";
import CartContext from "../context/CartContext";
import FilterMenu from "../components/FilterMenu";

function CategoryPage() {
  const { filter, category } = useParams();
  const { categoryPage } = useContext(CartContext);
  const [searchValue, setSearchValue] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ctg, setCtg] = useState(filter === "category" ? category : "None");
  const [brand, setBrand] = useState(filter === "brand" ? category : "None");
  const [sort, setSort] = useState("0");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("0");
  const [flag, setFlag] = useState(false);
  const [check, setCheck] = useState(0);
  const [filterwrap, setFilterwrap] = useState(false);
  // Predefined categories and brands
  const categories = [
    "Fresh+Fruits",
    "Snacks",
    "Beverages",
    "Skin+Care",
    "Bakery+&+Dairy",
    "Kitchen",
    "Fresh+Vegetables",
  ];
  const brands = ["Amul", "Bauli", "Dettol", "Coca-Cola", "Loreal"];
  // Function to toggle the filter menu visibility
  const FilterToggle = () => {
    console.log("Filter menu toggle.");
    setFilterwrap((prev) => !prev);
  };
  // Function to update product data based on selected filters
  const UpdateByCategory = () => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/category=${ctg}/brand=${brand}/price/min=${minPrice}/max=${maxPrice}/sort=${sort}/page=${page}`
      )
      .then((response) => {
        setProducts(response.data["products"]);
        setTotalPages(response.data["total_pages"]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Function to update product data based on search value
  const UpdateBySearch = (value) => {
    if (value != null) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/search/${value}/page=${page}`)
        .then((response) => {
          console.log(response.data);
          setProducts(response.data["products"]);
          setTotalPages(response.data["total_pages"]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  // Function to update the state based on URL parameters
  const updateState = () => {
    if (filter === "category") {
      for (let i = 0; i < 7; i++) {
        if (category === categories[i]) {
          setFlag(true);
          setCtg(category);
          setCheck(2);
          UpdateByCategory();
          break;
        }
      }
    } else if (filter === "brand") {
      for (let i = 0; i < 5; i++) {
        if (category === brands[i]) {
          setFlag(true);
          setCheck(2);
          setBrand(category);
          UpdateByCategory();
          break;
        }
      }
    } else if (filter === "search") {
      if (searchValue != null) {
        const encodesearchValue = searchValue.replace(/ /g, "+");
        console.log(encodesearchValue);
        UpdateBySearch(encodesearchValue);
        setCheck(1);
      }
      setFlag(true);
    }
  };
  // Initial setup based on URL parameters
  useEffect(() => {
    if (check === 0) {
      setPage(1);
      updateState();
    } else if (check === 1) {
      if (searchValue != null) {
        const encodesearchValue = searchValue.replace(/ /g, "+");
        console.log(encodesearchValue);
        UpdateBySearch(encodesearchValue);
      }
    } else {
      UpdateByCategory();
    }
  }, [ctg, brand, searchValue, page, sort, maxPrice, minPrice]);
  // Handle changes when categoryPage state changes
  useEffect(() => {
    setCheck(0);
    if (filter === "category") {
      setCtg(category);
    } else if (ctg !== "None") {
      setCtg("None");
    }
    if (filter === "brand") {
      setBrand(category);
    } else if (brand !== "None") {
      setBrand("None");
    }
    if (filter === "search") {
      setSearchValue(decodeURIComponent(category));
    }
    setMaxPrice(0);
    setMinPrice(0);
    setSort("0");
    setPage(1);
    setFilterwrap(false);
  }, [categoryPage]);
  return (
    <>
      {flag && (
        <div className="p-2 bg-white pb-0 d-flex flex-column min-vh-100">
          <Navbar />
          <CategoryColumn />
          <div className="container-xxl mt-2 mb-2 p-0">
            <div className="category-page-filter pt-5">
              <button
                type="button"
                className="btn btn-white px-2 bg-white ms-auto me-3 mb-2"
                onClick={FilterToggle}
              >
                <i className="fa-solid fa-filter"></i> Filter
              </button>
              <div
                className={`filter-menu-wrap ${
                  filterwrap ? "filter-open-menu" : ""
                }`}
              >
                <FilterMenu
                  setCheck={setCheck}
                  setCtg={setCtg}
                  setBrand={setBrand}
                  setMaxPrice={setMaxPrice}
                  setMinPrice={setMinPrice}
                  setPage={setPage}
                  setSort={setSort}
                  setTotalPages={setTotalPages}
                  setFilterwrap={setFilterwrap}
                />
              </div>
            </div>
            <ProductView
              products={products}
              totalpage={totalPages}
              page={page}
              setPage={setPage}
              UpdateByCategory={UpdateByCategory}
            />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default CategoryPage;
