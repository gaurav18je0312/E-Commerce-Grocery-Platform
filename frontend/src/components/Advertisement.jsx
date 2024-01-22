import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";

function Advertisement() {
  return (
    <div className="container-xxl mt-3 mb-3 p-0">
      <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="/advertisement/advertise1.webp"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="/advertisement/advertise2.webp"
            alt="Image Two"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="/advertisement/advertise3.webp"
            alt="Image One"
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="/advertisement/advertise4.webp"
            alt="Image Two"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Advertisement;
