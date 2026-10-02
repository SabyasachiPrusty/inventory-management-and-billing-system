CREATE DATABASE inventory_pro;

USE inventory_pro;

DROP TABLE users;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) UNIQUE,
password VARCHAR(255),
role ENUM('admin','employee')
);

INSERT INTO users(username,password,role)
VALUES
('admin','admin@123','admin'),
('employee','emp@123','employee');

-- PRODUCTS
DROP TABLE products2;
CREATE TABLE products(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150),
category VARCHAR(100),
price DECIMAL(10,2),
stock INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CUSTOMERS
DROP TABLE customers2;
CREATE TABLE customers(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150),
phone VARCHAR(20),
email VARCHAR(100)
);

-- SALES
DROP TABLE sales2;
CREATE TABLE sales(
id INT AUTO_INCREMENT PRIMARY KEY,
customer_id INT,
total DECIMAL(10,2),
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SALE ITEMS
DROP TABLE sale_items2;
CREATE TABLE sale_items(
id INT AUTO_INCREMENT PRIMARY KEY,
sale_id INT,
product_id INT,
price DECIMAL(10,2),
quantity INT,
subtotal DECIMAL(10,2)
);

DROP TABLE bills2;
CREATE TABLE bills (
id INT AUTO_INCREMENT PRIMARY KEY,
customer_name VARCHAR(100),
total DECIMAL(10,2),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE bill_items2;
CREATE TABLE bill_items (
id INT AUTO_INCREMENT PRIMARY KEY,
bill_id INT,
product_id INT,
quantity INT,
price DECIMAL(10,2)
);