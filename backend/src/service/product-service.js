const { queries } = require("../config/queries");
const connection = require("../config/connection");

async function createProduct(name, price) {
  try {
    await connection(queries.PRODUCT_QUERIES.INSERT_PRODUCT, [name, price]);
    return true;
  } catch (error) {
    console.error("Error creating product:", error);
    return false;
  }
}

async function deleteProduct(productId) {
  try {
    const result = await connection(queries.PRODUCT_QUERIES.DELETE_PRODUCT, [
      productId,
    ]);
    return result;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

async function updateProduct(productId, name, price) {
  try {
    const result = await connection(queries.PRODUCT_QUERIES.UPDATE_PRODUCT, [
      name,
      price,
      productId,
    ]);
    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const result = await connection(queries.PRODUCT_QUERIES.GET_ALL_PRODUCTS);
    return result;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

async function getProductById(productId) {
  try {
    const result = await connection(queries.PRODUCT_QUERIES.GET_PRODUCT_BY_ID, [
      productId,
    ]);
    return result[0]; // Assuming you expect a single product with the given ID
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
};
