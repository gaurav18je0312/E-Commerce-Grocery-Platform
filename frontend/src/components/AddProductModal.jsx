import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import "./Alert.css";

function AddProductModal({
  show,
  setShow,
  getProducts,
  page,
  UpdateByCategory,
}) {
  // State variables for managing alerts and product data
  const handleClose = () => setShow();
  const [alert, setAlert] = useState(false);
  const [product, setProduct] = useState({
    product_details: "",
    product_description: "",
    product_price: null,
    product_quantity: null,
    product_category: "",
    product_brand: "",
    product_imageurl: "",
  });
  const { AccessToken } = useContext(AuthContext);
  // Function to handle changes in input fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  // Function to handle form submission
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccessToken}`,
    };
    // Send a POST request to add a new product
    axios
      .post("http://127.0.0.1:8000/products/addProduct/", product, {
        headers: headers,
      })
      .then((response) => {
        // Close the modal and show a success alert
        handleClose();
        setAlert(true);
        console.log(response.data);
        // Call the appropriate function to update the product list
        if (getProducts) {
          getProducts(page);
        } else {
          UpdateByCategory();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Toast
        onClose={() => setAlert(false)}
        show={alert}
        delay={3000}
        position="bottom-center"
        autohide
      >
        <Toast.Body className="toast-success">
          <i className="fa-solid fa-circle-check fa-xl"></i> Product added
          successfully
        </Toast.Body>
      </Toast>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmitHandler}>
            <div className="update-form">
              <div className="form-group">
                <label htmlFor="details" className="mt-2">
                  Details
                </label>
                <input
                  type="text"
                  name="product_details"
                  className="form-control mt-1"
                  id="details"
                  placeholder=""
                  autoComplete="off"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="mt-2">
                  Description
                </label>
                <textarea
                  name="product_description"
                  className="form-control mt-1"
                  id="description"
                  placeholder=""
                  autoComplete="off"
                  onChange={onChangeHandler}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price" className="mt-2">
                  Price
                </label>
                <input
                  type="number"
                  name="product_price"
                  className="form-control mt-1"
                  id="price"
                  min="0"
                  title="Enter the positive number"
                  placeholder=""
                  autoComplete="off"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity" className="mt-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="product_quantity"
                  className="form-control mt-1"
                  id="quantity"
                  min="0"
                  title="Enter the positive number"
                  placeholder=""
                  autoComplete="off"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="brand" className="mt-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="product_brand"
                  className="form-control mt-1"
                  id="brand"
                  placeholder=""
                  autoComplete="off"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="mt-2">
                  Category
                </label>
                <select
                  name="product_category"
                  className="form-control mt-1"
                  id="category"
                  autoComplete="off"
                  defaultValue=""
                  onChange={onChangeHandler}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Fresh Fruits">Fresh Fruits</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Skin Care">Skin Care</option>
                  <option value="Bakery & Dairy">Bakery & Dairy</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Fresh Vegetables">Fresh Vegetables</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="images" className="mt-2">
                  Image (url)
                </label>
                <input
                  type="text"
                  name="product_imageurl"
                  className="form-control mt-1"
                  id="image"
                  placeholder=""
                  autoComplete="off"
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="d-flex align-items-end pt-2 mt-2">
              <button type="submit" className="btn btn-danger ms-auto">
                Save
              </button>
              <Button
                className="ms-2"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddProductModal;
