import Contact from "../model/contact-model.js";


const getAllMessages = async () => {
  try {
    const messages = await Contact.findAll();
    return messages;
  } catch (error) {
    throw new Error("error while getting users");
  }
};
const getMessagesByUserId = async (userId, order) => {
  try {
    const messages = await Contact.findAll({
      where: { userId: userId },
      order: [["createdAt", order]],
    });
    return messages;
  } catch (error) {
    console.log(error);
  }
};

const createMessage = async (pMessage) => {
  try {
    const newMessage = await Contact.create(pMessage);
    return newMessage;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getMessagesByUserId, //
  getAllMessages, //
  createMessage, //
};
