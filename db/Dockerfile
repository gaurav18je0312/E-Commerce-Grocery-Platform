FROM mysql:latest

COPY ./dummy_data.sql /docker-entrypoint-initdb.d/

ENV MYSQL_DATABASE=ecommerce
ENV MYSQL_ROOT_PASSWORD=root

