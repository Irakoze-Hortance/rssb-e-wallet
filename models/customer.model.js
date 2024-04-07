const { DataTypes,Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql' 
  });

const Customer = sequelize.define('Customer', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type:DataTypes.ENUM('male','female','other'),
        allowNull: false
    }
}, {
    // Other model options go here
    tableName: 'customers',
    timestamps: false
});

Customer.associate = (models) => { 
    Customer.hasOne(models.Wallet, {
      foreignKey: 'customerId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    return Customer;
};

module.exports = Customer;
