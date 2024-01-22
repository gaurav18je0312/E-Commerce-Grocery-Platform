import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "./ProductView.css";
import ProductHome from "./ProductHome";
import AddProductModal from "./AddProductModal";

const ProductView = ({
  products,
  totalpage,
  page,
  setPage,
  getProducts,
  UpdateByCategory,
}) => {
  const { data } = useContext(AuthContext);
  const user = data.user;
  const [isAuth, setIsAuth] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  // UseEffect to check if the user is authenticated and set 'isAuth' accordingly
  useEffect(() => {
    if (user) {
      setIsAuth(user["is_admin"]);
    }
  }, [user]);
  // Function to change the page state to next page
  const nextpage = () => {
    if (page < totalpage) {
      console.log("next page");
      setPage((prev) => prev + 1);
    }
  };
  // Function to change the page state to previous page
  const prevpage = () => {
    if (page > 1) {
      console.log("prev page");
      setPage((prev) => prev - 1);
    }
  };
  return (
    <div className="p-3 best-seller-div d-flex flex-column">
      {isAuth && (
        <div className="fs-5 fw-bold p-2 pb-3 home-add-product">
          <button
            className="btn btn-light m-2"
            type="button"
            onClick={() => setModalShow(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add Product
          </button>
        </div>
      )}
      <div className="d-flex product-view-home">
        {products &&
          products.map((product) => {
            return (
              <div className="p-0 mb-3 mx-2" key={product["id"]}>
                <ProductHome
                  key={product["id"]}
                  id={product["id"]}
                  details={product["product_details"]}
                  price={product["product_price"]}
                  brand={product["product_brand"]}
                  quantity={product["product_quantity"]}
                  image={product["product_imageurl"]}
                  getProducts={getProducts}
                  UpdateByCategory={UpdateByCategory}
                  page={page}
                />
              </div>
            );
          })}
      </div>
      <div className="home-btn mt-auto d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-light m-2"
          onClick={prevpage}
          disabled={page === 1}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          type="button"
          className="btn btn-light m-2"
          onClick={nextpage}
          disabled={page === totalpage}
        >
          <i className="fa-solid fa-arrow-left fa-rotate-180"></i>
        </button>
      </div>
      <AddProductModal
        show={modalShow}
        setShow={() => setModalShow(false)}
        getProducts={getProducts}
        page={page}
        UpdateByCategory={UpdateByCategory}
      />
    </div>
  );
};

export default ProductView;
