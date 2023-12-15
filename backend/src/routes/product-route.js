const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
} = require("../service/product-service");

router.post("/create", async (req, res) => {
  const { name, price } = req.body;
  console.log(req.body);
  const result = await createProduct(name, price);
  if (result) {
    res.status(201).json({ message: "Product created successfully" });
  } else {
    res.status(500).json({ message: "Error adding product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await getAllProducts();

  const productsWithNumberPrices = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: +product.price,
  }));

  res.json(productsWithNumberPrices);
});

// Get product by ID
router.get("/", async (req, res) => {
  const productId = req.query.id;

  try {
    const product = await getProductById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: error });
  }
});

// Update product
router.put("/update", async (req, res) => {
  const productId = req.query.id;
  const { name, price } = req.body;

  try {
    await updateProduct(productId, name, price);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error });
  }
});

// Delete product
router.delete("/delete", async (req, res) => {
  const productId = req.query.id;

  try {
    await deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
