import express from "express";
import contactRepository from "../repository/contact-repository.js";
import nodemailer from 'nodemailer'
import User from "../model/user-model.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId; // /?userId=something
    const order = req.query.order; // Get order from query parameter
    let messages;
    if (userId) {
      messages = await contactRepository.getMessagesByUserId(userId, order);
    } else {
      messages = await contactRepository.getAllMassage(order);
    }
    return res.status(200).send(messages);
  } catch (error) {
    return next({ status: 404, message: error });
  }
});

// Create a new post
router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const userId = body.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newMessage = {
      title: body.title,
      content: body.content,
      UserId: userId
    };

    const createdMessage = await contactRepository.createMessage(newMessage);
    await notifyUser(user.email);
    return res.send(createdMessage);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

async function notifyUser(pEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
  
    auth: {
      user: 'karslinusret86@gmail.com',
      pass: "ujdvxyzzudzisldc"
    },
    tls: { rejectUnauthorized: false },
    secure: false
  });

  const info = await transporter.sendMail({
    from: 'karslinusret86@gmail.com',
    to: pEmail,
    subject: 'Information',
    html: 'your message has been received. you will be informed again about the process..!! GetWorkGiveWork Team',
    attachments: [],
  });

  console.log('Message sent: %s', info.messageId);
  return info;
}

export default router;
