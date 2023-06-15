import User from "../model/user-model.js";

const getUpdateUser = async (pid, pupdatedUser) => {
  try {
    const updatedUser = await User.update(pupdatedUser,{
      where: {
        id: pid,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

const updateUserImage = async (pid, pupdatedUserImage) => {
  console.log(pupdatedUserImage);
  try {
    const updatedUser = await User.update({profilImage:pupdatedUserImage},{
      where: {
        id: pid,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

export default { getUpdateUser, updateUserImage };
