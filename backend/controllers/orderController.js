import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order from front-end
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId, 
      items: req.body.items, 
      amount: req.body.amount,
      address: req.body.address, 
    });
  
    // Save the new order in the database
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Return success response to the front-end
    res.json({ success: true, message: "Order placed successfully", orderId: newOrder._id });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// user orders for frontend
const userOrders = async(req, res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success: true, data: orders})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// Listing orders for Admin Panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success: true, data: orders})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// api for updating order status
const updateStatus = async(req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
    res.json({success: true, message: "Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { placeOrder, userOrders, listOrders, updateStatus };


