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
    console.log(updatedUser);
    const user = await userRepository.getUserByEmail(userEmail);
    await dashboardRepository.putFirstName(user.id, updatedUser);
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

// async function notifyUser(pEmail) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
  
//     auth: {
//       user: 'karslinusret86@gmail.com',
//       pass: "ujdvxyzzudzisldc"
//     },
//     tls: { rejectUnauthorized: false },
//     ignoreTLS: true,
//   });

//   const info = await transporter.sendMail({
//     from: 'karslinusret86@gmail.com',
//     to: pEmail,
//     subject: 'Notification',
//     html: 'your information has been successfully changed!!',
//     attachements: [],
//   });

//   console.log('Message sent: %s', info.messageId);
//   return info;
// }
 export default router