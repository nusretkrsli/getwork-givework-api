import User from "../model/user-model.js";

const getUpdateUser = async (pid, pupdatedUser) => {
  try {
    const updatedUser = await User.update(pupdatedUser,{
      where: {
        id: pid,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default { getUpdateUser };
