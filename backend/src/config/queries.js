const queries = {
  USER_QUERIES: {
    INSERT_USER: `
      INSERT INTO users
        (fullname, email, address, password, mobile_number, gender, age)
      VALUES 
        (?, ?, ?, ?, ?, ?, ?);
    `,
    DELETE_USER: `
      DELETE FROM users
      WHERE id = ?;
    `,
    UPDATE_USER: `
      UPDATE users
      SET email = ?, address = ?, password = ?, mobile_number = ?, gender = ?, age = ?
      WHERE id = ?;
    `,
    GET_ALL_USERS: `
      SELECT * FROM users;
    `,
    GET_USER_BY_ID: `
      SELECT * FROM users
      WHERE id = ?;
    `,
    GET_USER_BY_EMAIL: `
      SELECT * FROM users
      WHERE email = ?;
    `,
  },
  PRODUCT_QUERIES: {
    INSERT_PRODUCT: `
      INSERT INTO product
        (name, price)
      VALUES 
        (?, ?);
    `,
    DELETE_PRODUCT: `
      DELETE FROM product
      WHERE id = ?;
    `,
    UPDATE_PRODUCT: `
      UPDATE product
      SET name = ?, price = ?
      WHERE id = ?;
    `,
    GET_ALL_PRODUCTS: `
      SELECT * FROM product;
    `,
    GET_PRODUCT_BY_ID: `
      SELECT * FROM product
      WHERE id = ?;
    `,
  },
  ORDER_QUERIES: {
    CREATE_ORDER: `
      INSERT INTO orders 
        (productID, gallons, total, user_id, status) 
      VALUES (?, ?, ?, ?, ?);
    `,
    GET_ALL_ORDERS: `
      SELECT
        o.id,
        u.fullname,
        u.address,
        p.name,
        o.gallons AS gallons,
        u.mobile_number,
        o.total,
        os.name AS status
      FROM
        orders o
        JOIN users u ON o.user_id = u.id
        JOIN product p ON o.productID = p.id
        JOIN order_status os ON o.status = os.id;
    `,
    GET_TOTAL_SALES: `
    SELECT
      p.id AS product_id,
      p.name AS product_name,
      COALESCE(SUM(o.total), 0) AS total_sales
    FROM
      product p
      LEFT JOIN orders o ON p.id = o.productID
    GROUP BY
      p.id, p.name;
  `,
    GET_ADDRESSES_WITH_MOST_ORDERS: `
    SELECT
      u.address,
      ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM orders), 2) AS order_percentage
    FROM
      orders o
    JOIN
      users u ON o.user_id = u.id
    GROUP BY
      u.address
    ORDER BY
      order_percentage DESC;
    `,
    GET_TOTAL_CUSTOMERS: `
      SELECT COUNT(*) AS total_customers FROM users;
    `,
    GET_TOTAL_ORDERS: `
      SELECT COUNT(*) AS total_orders FROM orders;
    `,
    GET_COMPLETED_ORDERS: `
      SELECT COUNT(*) AS completed_orders FROM orders WHERE status = 2;
    `,
    GET_TOTAl_AND_COMPLETED_ORDERS: `
      SELECT
        (SELECT COUNT(*) FROM orders) AS total_orders,
        (SELECT COUNT(*) FROM orders WHERE status = 2) AS completed_orders;
    `,
    MARK_AS_COMPLETE: `
    UPDATE orders
      SET status = 2 
      WHERE id = ?;
    `,
  },
};

module.exports = { queries };
