const { queries } = require("../config/queries");
const connection = require("../config/connection");

async function createOrder(productID, gallons, total, user_id) {
  try {
    // productID,gallons,total,user_id,status
    await connection(queries.ORDER_QUERIES.CREATE_ORDER, [
      productID,
      gallons,
      total,
      user_id,
      1,
    ]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getAllOrders() {
  try {
    const result = connection(queries.ORDER_QUERIES.GET_ALL_ORDERS);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getTotalSalesPerProduct() {
  try {
    const result = connection(queries.ORDER_QUERIES.GET_TOTAL_SALES);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function markOrderAsComplete(orderId) {
  try {
    await connection(queries.ORDER_QUERIES.MARK_AS_COMPLETE, [orderId]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function getAddressWithMostOrders() {
  try {
    const result = connection(
      queries.ORDER_QUERIES.GET_ADDRESSES_WITH_MOST_ORDERS
    );
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getTotalCustomers() {
  try {
    const result = await connection(queries.ORDER_QUERIES.GET_TOTAL_CUSTOMERS);
    return result[0];
  } catch (err) {
    console.log(err);
    return {
      total_customers: 0,
    };
  }
}
async function getTotalAndCompletedOrders() {
  try {
    const result = await connection(
      queries.ORDER_QUERIES.GET_TOTAl_AND_COMPLETED_ORDERS
    );
    return (
      result[0] ?? {
        total_orders: 0,
        completed_orders: 0,
      }
    );
  } catch (err) {
    console.log(err);
    return {
      total_orders: 0,
      completed_orders: 0,
    };
  }
}
module.exports = {
  createOrder,
  getAllOrders,
  getTotalSalesPerProduct,
  getAddressWithMostOrders,
  markOrderAsComplete,
  getTotalAndCompletedOrders,
  getTotalCustomers,
};
