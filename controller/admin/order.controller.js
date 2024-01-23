const express = require("express");
const Order = require("../../model/order.model");
const OrderServices = require("../../services/orderServices");
const orderServices = new OrderServices();
exports.getAllOrder = async (req, res) => {
  try {
    // Retrieve all orders
    const orders = await Order.find().populate('user');

    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    // Retrieve the order by ID
    const order = await orderServices.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const order = await orderServices.getOrderById(orderId);
    console.log(order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
