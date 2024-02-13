import "./HomePage.css";
import ProductView from "../components/ProductView";
import Navbar from "../components/Navbar";
import CategoryColumn from "../components/CategoryColumn";
import Footer from "../components/Footer";
import Advertisement from "../components/Advertisement";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import Toast from "react-bootstrap/Toast";

function HomePage() {
  const [products, setProduct] = useState(null);
  const [totalpage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { setCategoryPage } = useContext(CartContext);
  // Function to get the products details according the page number
  function getProducts(page) {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/getProducts/page=${page}`)
      .then((response) => {
        const data = response.data;
        setProduct(data["products"]);
        console.log(data.products);
        setTotalPage(data["total_pages"]);
      })
      .catch((error) => {
        setPage(1);
        console.log(error);
      });
  }
  // Function to navigate to the brand filter page
  const MoveToBrand = (url) => {
    setCategoryPage((prev) => !prev);
    navigate(url);
  };
  // UseEffect to get the products by page
  useEffect(() => {
    getProducts(page);
  }, [page]);
  return (
    <div className="p-2 bg-white pb-0">
      <Navbar />
      <CategoryColumn />
      <Advertisement />
      <div className="container-xxl mt-2 mb-2 p-0">
        <div className="mt-3 brand-store">
          <div className="fs-4 fw-bold ps-2 brand-store-header">
            Brand Store
          </div>
          <div className="d-flex m-2 brand-store-body">
            <div
              className="brand-btn d-flex justify-content-center"
              onClick={() => MoveToBrand("/brand/Amul")}
            >
              <img src="/category/amul.webp" alt="amul" height="100%" />
            </div>
            <div
              className="brand-btn d-flex justify-content-center p-4"
              onClick={() => MoveToBrand("/brand/Bauli")}
            >
              <img src="/category/bauli.webp" alt="bauli" height="100%" />
            </div>
            <div
              className="brand-btn d-flex justify-content-center"
              onClick={() => MoveToBrand("/brand/Dettol")}
            >
              <img src="/category/dettol.webp" alt="dettol" height="100%" />
            </div>
            <div
              className="d-flex justify-content-center brand-btn"
              onClick={() => MoveToBrand("/brand/Coca-Cola")}
            >
              <img
                src="/category/coca-cola.webp"
                alt="coca-cola"
                height="100%"
              />
            </div>
            <div
              className="d-flex justify-content-center p-4 brand-btn"
              onClick={() => MoveToBrand("/brand/Loreal")}
            >
              <img src="/category/loreal.webp" alt="loreal" height="100%" />
            </div>
          </div>
        </div>
        <ProductView
          products={products}
          totalpage={totalpage}
          page={page}
          setPage={setPage}
          getProducts={getProducts}
        />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
