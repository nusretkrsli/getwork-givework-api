import Contact from "../model/contact-model.js"
import User from "../model/user-model.js";

const getAllMassage = async (order = 'ASC') => {
    const message = await Contact.findAll({ order: [['createdAt', order]] });
    return message;
}

const getMessagesByUserId = async (userId, order) => {
    try {
        const messages = await Contact.findAll({ where: { userId: userId }, order: [['createdAt', order]] });
        return messages;
    } catch (error) {
        console.log(error);
    }
}

const createMessage = async (pMassage) => {
    try {
        const newMessage = await Contact.create(pMassage);
        return newMessage;
    } catch (err) {
        console.log(err);
    }
}

export default {
    getMessagesByUserId,//
    getAllMassage,//
    createMessage,//
  
}