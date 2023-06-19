import {v4 as uuidv4} from 'uuid';
import * as customerRepository from '../repository/customer-repo.js';
import * as s3Service from './s3-service.js';
import dashboardRepository from '../repository/dashboard-repository.js';


export const createUser = async (pId, profileImage) => {
    const fileName = `getworkgivework_${uuidv4()}`;
    const profileImagePath = await s3Service.uploadFile(profileImage.buffer, fileName, process.env.AWS_BUCKET_NAME);
  
    const userImage = {
      profileImagePath: profileImagePath.Location
    };
    return dashboardRepository.updateUserImage(pId, userImage);
  };
