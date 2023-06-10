import User from "../model/user-model.js";

const putFirstName = async (pid, pupdatedUser) => {
  try {
    const selectedUser = await User.findOne({
      where: {
        id: pid,
      },
    });
    console.log(selectedUser.dataValues);
    if (selectedUser) {
      // Kullanıcı bulundu, güncelleme yapılıyor
      selectedUser.dataValues.firstName = pupdatedUser.firstName;
      selectedUser.dataValues.lastName = pupdatedUser.lastName;
      selectedUser.dataValues.birthday = pupdatedUser.birthday;
      selectedUser.dataValues.email = pupdatedUser.email;
      selectedUser.dataValues.phoneNumber = pupdatedUser.phoneNumber;
      selectedUser.dataValues.role = pupdatedUser.role;

      await selectedUser.save();

      return selectedUser;
    } else {
      // Kullanıcı bulunamadı
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
export default { putFirstName };
