DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Chair", "Furniture", 49.99, 20),
    ("Desk", "Furniture", 149.99, 12),
    ("Laptop", "Electronics", 699.00, 24),
    ("Monitor", "Electronics", 120.00, 15),
    ("Desktop", "Electronics", 1200.00, 8),
    ("Stapler", "Office Supplies", 9.99, 25),
    ("Pencils", "Office Supplies", 2.00, 50),
    ("Pens", "Office Supplies", 4.99, 50),
    ("Highlighters", "Office Supplies", 7.99, 45),
    ("Flash Drive", "Computer Accesories", 19.99, 60),
    ("Printer", "Electronics", 89.00, 8);