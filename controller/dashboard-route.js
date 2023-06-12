import express from "express";
import userRepository from "../repository/user-repository.js";
import dashboardRepository from "../repository/dashboard-repository.js";
//import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv' 
dotenv.config()

const router = express.Router();

router.put("/dashboard", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const updatedUser = req.body;
    console.log("controller", updatedUser);
    const user = await userRepository.getUserByEmail(userEmail);
    await dashboardRepository.getUpdateUser(user.id, updatedUser);
    return res.status(201).send(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid user input" });
    } else if (error.message === "User with this email already exists") {
      return next({ message: "A user with this email already exists" });
    } else {
      return next(error);
    }
  }
});

 export default router