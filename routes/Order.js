const express = require("express");
const {
  createOrders,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
} = require("../controller/Order");
const router = express.Router();

// /orders is already added in base path
router
  .post("/", createOrders)
  .get("/", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder);
exports.router = router;
