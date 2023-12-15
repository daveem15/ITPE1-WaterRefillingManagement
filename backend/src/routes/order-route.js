const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getTotalSalesPerProduct,
  getAddressWithMostOrders,
  getTotalAndCompletedOrders,
  markOrderAsComplete,
  getTotalCustomers,
} = require("../service/order-service");

router.post("/create", async (req, res) => {
  const { productID, gallons, total, user_id } = req.body;

  try {
    console.log(req.body);
    const success = await createOrder(productID, gallons, total, user_id);

    if (success) {
      return res.status(201).json({ message: "Order created successfully." });
    } else {
      return res.status(500).json({ message: "Failed to create order." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

router.get("/", async (req, res) => {
  const result = await getAllOrders();
  res.status(200).send(result);
});

router.get("/sales", async (req, res) => {
  const result = await getTotalSalesPerProduct();
  const formattedResult = result.map((item) => ({
    product_id: item.product_id,
    product_name: item.product_name,
    total_sales: parseFloat(item.total_sales),
  }));
  res.status(200).send(formattedResult);
});

router.put("/update-order", async (req, res) => {
  try {
    const orderId = req.query.id;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    const success = await markOrderAsComplete(orderId);

    if (success) {
      return res
        .status(200)
        .json({ message: "Order marked as complete successfully." });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to mark order as complete." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

router.get("/most-orders", async (req, res) => {
  const result = await getAddressWithMostOrders();
  res.status(200).send(result);
});

router.get("/customers", async (req, res) => {
  const result = await getTotalCustomers();
  res.status(200).send(result);
});

router.get("/total-orders", async (req, res) => {
  const result = await getTotalAndCompletedOrders();
  res.status(200).send(result);
});

module.exports = router;
