import express from "express";
import contactRepository from "../repository/contact-repository.js";
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
    const newMessage = await contactRepository.createMessage(body);
    return res.send(newMessage);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
});

export default router;
