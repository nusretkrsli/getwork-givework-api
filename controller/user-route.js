import express from 'express';
import nodemailer from 'nodemailer'
import userRepository from '../repository/user-repository.js';
import * as dotenv from 'dotenv' 
dotenv.config()

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userRepository.getUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: 'Error fetching users' });
  }
});


// Get profile by mail
router.get("/profile/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await userRepository.getUserByEmail(userEmail);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching users" });
  }
});



// Create a new user
router.post('/', async (req, res, next) => {
  try {
    const { email, firstName, lastName, birthday, phoneNumber, role  } = req.body;
    const newUser = { firstName, email, lastName, birthday, phoneNumber, role};
    const user = await userRepository.createUser(newUser);
    await notifyUser(user.email);
    return res.status(201).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Invalid user input' });
    } else if (error.message === 'User with this email already exists') {
      return next({ message: 'A user with this email already exists' });
    } else {
      return next(error);
    }
  }
});

// Delete a users by id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userRepository.deleteUserById(id);
    if (!user) {
      return next({ status: 404, message: 'User' + id + ' does not exist' });
    }
    res.send(`user with the id ${id} deleted`)
  } catch (err) {
    console.error(err);
    next({ status: 404, message: `failed to delete user ${id}` });
  }
});;

router.put('/', async (req, res, next) => {
  try {
    const updatedUsers = await userRepository.updatedUsers(req.body)
    res.json(updatedUsers);
  } catch (error) {
    console.log(error);
    next(error);
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
    ignoreTLS: true,
  });

  const info = await transporter.sendMail({
    from: 'karslinusret86@gmail.com',
    to: pEmail,
    subject: 'Notification',
    html: 'welcome to Getworkgivework!!',
    attachements: [],
  });

  console.log('Message sent: %s', info.messageId);
  return info;
}
export default router;