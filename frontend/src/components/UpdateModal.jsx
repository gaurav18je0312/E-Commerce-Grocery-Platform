import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UpdateModal.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Toast from "react-bootstrap/Toast";
import "./Alert.css";

function UpdateModal({
  id,
  show,
  setShow,
  getProducts,
  page,
  updateProduct,
  UpdateByCategory,
}) {
  const [product, setProduct] = useState(null);
  const { AccessToken } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const [alert, setAlert] = useState(false);
  // Function to change the state according input fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  // Function to handle the form submission and send the update product request
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AccessToken}`,
    };
    // Send the PUT request to update the product
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/updateProduct/${id}`, product, {
        headers: headers,
      })
      .then((response) => {
        // Change product list after the update the product
        if (getProducts) {
          getProducts(page);
        }
        if (updateProduct) {
          updateProduct();
        }
        if (UpdateByCategory) {
          UpdateByCategory();
        }
        console.log(response);
        // Call the success alert
        setAlert(true);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // UseEffect to get the product details
  useEffect(() => {
    // Send the GET to get the product details
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/products/getProduct/${id}/`, null)
      .then((response) => {
        const data = response.data;
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      {product && (
        <>
          <Toast
            onClose={() => setAlert(false)}
            show={alert}
            delay={3000}
            position="bottom-center"
            autohide
          >
            <Toast.Body className="toast-success">
              <i className="fa-solid fa-circle-check fa-xl"></i> Product updated
              successfully
            </Toast.Body>
          </Toast>
          <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="update-form">
                <form onSubmit={onSubmitHandler}>
                  <div className="form-group">
                    <label htmlFor="details" className="mt-2">
                      Details
                    </label>
                    <input
                      type="text"
                      name="product_details"
                      className="form-control mt-1"
                      id="details"
                      defaultValue={product["product_details"]}
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
                      defaultValue={product["product_description"]}
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
                      type="text"
                      name="product_price"
                      className="form-control mt-1"
                      id="price"
                      pattern="[0-9]+"
                      title="Enter the positive number"
                      defaultValue={product["product_price"]}
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
                      type="text"
                      name="product_quantity"
                      className="form-control mt-1"
                      id="quantity"
                      pattern="[0-9]+"
                      title="Enter the positive number"
                      defaultValue={product["product_quantity"]}
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
                      autoComplete="off"
                      onChange={onChangeHandler}
                      value={product["product_brand"]}
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
                      value={product["product_category"]}
                      id="category"
                      autoComplete="off"
                      onChange={onChangeHandler}
                      required
                    >
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
                      defaultValue={product["product_imageurl"]}
                      autoComplete="off"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="d-flex align-items-end pt-2 mt-2">
                    <button type="submit" className="btn btn-danger ms-auto">
                      Save Changes
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
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}
export default UpdateModal;
