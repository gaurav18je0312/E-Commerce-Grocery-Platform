import React, { useState, useRef, useContext, useEffect } from "react";
import "./FilterMenu.css";
import CartContext from "../context/CartContext";

function FilterMenu({
  setCheck,
  setCtg,
  setBrand,
  setMaxPrice,
  setMinPrice,
  setPage,
  setSort,
  setTotalPages,
  setFilterwrap,
}) {
  const [filter, setFilter] = useState({
    category: "None",
    brand: "None",
    sort: "0",
    max: "0",
    min: "0",
  });
  const { categoryPage } = useContext(CartContext);
  const formRef = useRef(null);
  // Function to reset the form
  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  // reset the filter state after categoryPage change
  useEffect(() => {
    resetForm();
    setFilter({
      category: "None",
      brand: "None",
      sort: "0",
      max: "0",
      min: "0",
    });
  }, [categoryPage]);
  // Function to handle the changes in input fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFilter({ ...filter, [name]: value });
  };
  // Function to set the state after form submission
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(filter)
    setFilterwrap(false);
    setBrand(filter.brand);
    setCtg(filter.category);
    setBrand(filter.brand);
    setMaxPrice(filter.max?filter.max:0);
    setMinPrice(filter.min?filter.min:0);
    setSort(filter.sort);
    setCheck(2);
    setPage(1);
  };
  return (
    <div className="filter-menu-div">
      <form onSubmit={onSubmitHandler} ref={formRef}>
        <div className="filter-menu-header">
          <i className="fa-solid fa-filter"></i> Filter
        </div>
        <hr className="m-0" />
        <div className="p-2 pt-0 pb-0 filter-menu-category">
          <div className="filter-menu-category-header">Category</div>
          <div className="filter-menu-category-input">
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category1"
              autoComplete="off"
              value="None"
              onChange={onChangeHandler}
              defaultChecked
            />
            <label
              className="btn btn-outline-danger btn-sm px-3 category-btn"
              htmlFor="category1"
            >
              All
            </label>
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category2"
              autoComplete="off"
              value="Fresh+Fruits"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="category2"
            >
              Fresh Fruits
            </label>
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category3"
              autoComplete="off"
              value="Snacks"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="category3"
            >
              Snacks
            </label>
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category4"
              autoComplete="off"
              value="Beverages"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="category4"
            >
              Beverages
            </label>
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category5"
              autoComplete="off"
              value="Skin+Care"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="category5"
            >
              Skin & Care
            </label>
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category6"
              autoComplete="off"
              value="Bakery+&+Dairy"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="category6"
            >
              Bakery & Dairy
            </label>
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category7"
              autoComplete="off"
              value="Kitchen"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="category7"
            >
              Kitchen
            </label>
            <input
              type="radio"
              className="btn-check"
              name="category"
              id="category8"
              autoComplete="off"
              onChange={onChangeHandler}
              value="Fresh+Vegetables"
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="category8"
            >
              Fresh Vegetables
            </label>
          </div>
        </div>
        <hr className="m-0" />
        <div className="p-2 pt-0 pb-0 filter-menu-category">
          <div className="filter-menu-category-header">Brand</div>
          <div className="filter-menu-category-input">
            <input
              type="radio"
              className="btn-check"
              name="brand"
              id="brand1"
              autoComplete="off"
              value="None"
              onChange={onChangeHandler}
              defaultChecked
            />
            <label
              className="btn btn-outline-danger btn-sm px-3 category-btn"
              htmlFor="brand1"
            >
              All
            </label>
            <input
              type="radio"
              className="btn-check"
              name="brand"
              id="brand2"
              autoComplete="off"
              value="Amul"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="brand2"
            >
              Amul
            </label>
            <input
              type="radio"
              className="btn-check"
              name="brand"
              id="brand3"
              autoComplete="off"
              value="Bauli"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="brand3"
            >
              Bauli
            </label>
            <input
              type="radio"
              className="btn-check"
              name="brand"
              id="brand4"
              autoComplete="off"
              value="Dettol"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="brand4"
            >
              Dettol
            </label>
            <input
              type="radio"
              className="btn-check"
              name="brand"
              id="brand5"
              autoComplete="off"
              value="Coca-Cola"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="brand5"
            >
              Coca-Cola
            </label>
            <input
              type="radio"
              className="btn-check"
              name="brand"
              id="brand6"
              autoComplete="off"
              value="Loreal"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="brand6"
            >
              L'OREAL
            </label>
          </div>
        </div>
        <hr className="m-0" />
        <div className="p-2 pt-0 pb-0 filter-menu-category">
          <div className="filter-menu-category-header">Sort</div>
          <div className="filter-menu-category-input">
          <input
              type="radio"
              className="btn-check"
              name="sort"
              id="sort0"
              autoComplete="off"
              value="0"
              onChange={onChangeHandler}
              defaultChecked
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="sort0"
            >
              Relevance
            </label>
            <input
              type="radio"
              className="btn-check"
              name="sort"
              id="sort1"
              autoComplete="off"
              value="1"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="sort1"
            >
              Price: Low to High
            </label>
            <input
              type="radio"
              className="btn-check"
              name="sort"
              id="sort2"
              autoComplete="off"
              value="2"
              onChange={onChangeHandler}
            />
            <label
              className="btn btn-outline-danger btn-sm category-btn"
              htmlFor="sort2"
            >
              Price: High to Low
            </label>
          </div>
        </div>
        <hr className="m-0" />
        <div className="p-2 pt-0 pb-0 filter-menu-category">
          <div className="filter-menu-category-header">Price Range</div>
          <div className="filter-menu-category-input d-flex">
            <input
              type="number"
              name="max"
              className="category-btn px-2 price-field"
              placeholder="Max"
              autoComplete="off"
              min="1"
              onChange={onChangeHandler}
            />
            <input
              type="number"
              name="min"
              className="category-btn px-2 price-field"
              placeholder="Min"
              autoComplete="off"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <hr className="m-0" />
        <div className="px-3 pt-2 pb-0 filter-menu-category d-flex align-items-end">
          <button className="btn btn-danger ms-auto" type="submit">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterMenu;
