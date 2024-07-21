# E-commerce Grocery Website

This project is a fully functional e-commerce grocery website. It uses React.js for the frontend, Django for the backend, and MySQL for the database. Bootstrap is used for the frontend design, and Docker is utilized for containerization and deployment.

## Features

- User authentication and authorization
- Product listing with categories
- Shopping cart functionality
- Order placement and history
- Admin panel for managing products, categories, and orders
- Responsive design using Bootstrap
- Private Routes for Admin

## Technologies Used

- **Frontend:** React.js, Bootstrap
- **Backend:** Django
- **Database:** MySQL
- **Containerization:** Docker, Docker Compose

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/gaurav18je0312/ecommerce-grocery-website.git
    cd ecommerce-grocery-website
    ```

2. Build and run the Docker containers:

    ```bash
    docker compose up --build
    ```

3. Access the application:

    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:8000`
    - Database: `localhost:3306`

## Project Structure

- **frontend/**: Contains the React.js frontend code
- **backend/**: Contains the Django backend code
- **db/**: Contains the MySQL database setup
- **docker-compose.yml**: Docker Compose file to run the application

## Usage

### Frontend

The frontend is built using React.js and Bootstrap for a responsive design. It includes components for product listing, shopping cart, user authentication, and order placement.

### Backend

The backend is built using Django and provides RESTful APIs for the frontend. It includes models for users, products, orders, and categories. The admin panel allows for managing the products, categories, and orders.

### Database

The MySQL database stores all the data related to users, products, orders, and categories. The database setup is included in the Docker configuration.

## Docker

The project is containerized using Docker, making it easy to set up and run the application. The `docker-compose.yml` file defines the services for the frontend, backend, and database.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Django](https://www.djangoproject.com/)
- [MySQL](https://www.mysql.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Docker](https://www.docker.com/)
