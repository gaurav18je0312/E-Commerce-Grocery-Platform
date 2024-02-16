import React, { useContext } from "react";
import "./CategoryColumn.css";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

function CategoryColumn() {
  const navigate = useNavigate();
  const { setCategoryPage } = useContext(CartContext);
  // Function to move to a specific category page and update the category state
  const MoveToCategory = (url) => {
    setCategoryPage((prev) => !prev);
    navigate(url);
  };

  return (
    <div className="container-xxl ctg-header">
      <div className="row">
        <button
          type="button"
          className="btn btn-success col"
          onClick={() => MoveToCategory("/category/Fresh+Fruits/")}
        >
          <i className="fa-solid fa-apple-whole"></i>{" "}
          <span className="ctg-btn">Fresh Fruits</span>
        </button>
        <button
          type="button"
          className="btn btn-success col"
          onClick={() => MoveToCategory("/category/Snacks/")}
        >
          <i className="fa-solid fa-cookie"></i>{" "}
          <span className="ctg-btn">Snacks</span>
        </button>
        <button
          type="button"
          className="btn btn-success col"
          onClick={() => MoveToCategory("/category/Beverages")}
        >
          <i className="fa-solid fa-bottle-water"></i>{" "}
          <span className="ctg-btn">Beverages</span>
        </button>
        <button
          type="button"
          className="btn btn-success col"
          onClick={() => MoveToCategory("/category/Skin+Care")}
        >
          <i className="fa-solid fa-house-medical"></i>{" "}
          <span className="ctg-btn">Skin Care</span>
        </button>
        <button
          type="button"
          className="btn btn-success col"
          onClick={() => MoveToCategory("/category/Bakery+&+Dairy")}
        >
          <i className="fa-solid fa-glass-water"></i>{" "}
          <span className="ctg-btn">Bakery & Dairy</span>
        </button>
        <button
          type="button"
          className="btn btn-success col"
          onClick={() => MoveToCategory("/category/Kitchen")}
        >
          <i className="fa-solid fa-kitchen-set"></i>{" "}
          <span className="ctg-btn">Kitchen</span>
        </button>
        <button
          type="button"
          className="btn btn-success col"
          onClick={() => MoveToCategory("/category/Fresh+Vegetables")}
        >
          <i className="fa-solid fa-seedling"></i>{" "}
          <span className="ctg-btn">Fresh Vegetables</span>
        </button>
      </div>
    </div>
  );
}

export default CategoryColumn;
