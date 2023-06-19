import sequelize from './connection.js';
import Contact from "../model/contact-model.js";
import User from "../model/user-model.js";

User.hasMany(Contact);
Contact.belongsTo(User);


const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectToDatabase();  