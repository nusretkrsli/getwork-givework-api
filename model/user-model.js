import sequelize from '../config/connection.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
     defaultValue: "user"
  },
  profilImage: {
    type: DataTypes.STRING,
    allowNull:true,
    defaultValue: "https://hicoders-fp.fra1.digitaloceanspaces.com/getworkgivework_b4b0f4f5-1026-487c-9e46-6e4e50814b5f",
  },
}, {
  tableName: 'users',
  timestamps: false
});


export default User;