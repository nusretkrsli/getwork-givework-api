import express from "express";
import userRepository from "../repository/user-repository.js";
import dashboardRepository from "../repository/dashboard-repository.js";
import { v4 as uuidv4 } from "uuid";
import * as s3Service from "../service/s3-service.js";
import multer from "multer";
import * as dotenv from "dotenv";
dotenv.config();
const upload = multer();
const router = express.Router();

router.put("/dashboard", async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const updatedUser = req.body;
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

router.put("/image", upload.single("profileImage"), async (req, res, next) => {
  try {
    const userEmail = req.query.email;
    const profileImage = req.file;
    const user = await userRepository.getUserByEmail(userEmail);
    const fileName = `getworkgivework_${uuidv4()}`;
    console.log(fileName);
    console.log(profileImage);
    const profileImagePath = await s3Service.uploadFile(
      profileImage.buffer,
      fileName,
      process.env.AWS_BUCKET_NAME
    );

    const updatedImage = await dashboardRepository.updateUserImage(
      user.id,
      profileImagePath.Location
    );
    return res.status(201).send(updatedImage);
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

router.get("/image", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const user = await userRepository.getUserByEmail(userEmail);

    if (!user || !user.profilImage) {
      return res
        .status(404)
        .send({ message: "User or profile image not found" });
    }

    const fileKey = user.profilImage.split("/").pop();
    const fileStream = await s3Service.downloadFile(
      fileKey,
      process.env.AWS_BUCKET_NAME
    );

    res.setHeader("Content-Disposition", `inline; filename="${fileKey}"`);
    res.setHeader("Content-Type", "image/png"); // Değiştirilmesi gereken MIME türüne göre ayarlayın

    fileStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

export default router;
