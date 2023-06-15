import express from 'express';
import multer from 'multer';
import *as customerService from '../service/customer-service.js';

const router = express.Router();

const upload = multer();

router.post('/', upload.single('profileImage'), async (req, res)=>{
    try {
        const {firstName, lastName, email} =req.body;
        const profileImage =req.file;
        const user = await customerService.createUser(firstName, lastName, email, profileImage);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.get('/:userId/image', async (req, res) => {
    try {
      const user = await getUserById(req.params.userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const fileKey = user.image.split('/').pop();
  
      const fileStream = downloadFile(fileKey, process.env.AWS_BUCKET_NAME);
  
      res.setHeader('Content-Disposition', 'inline; filename=' + fileKey);
      fileStream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });