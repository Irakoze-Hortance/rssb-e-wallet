const { DataTypes,Sequelize } = require('sequelize');

const sequelize = new Sequelize('tekana', 'root', 'Habumuremyi', {
  host: 'localhost',
  dialect: 'mysql' 
});

const Customer = require('./customer.model');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senderAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  receiverAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id'
    }
  },
}, {
  timestamps: false // Disable automatic timestamps
});

module.exports=Transaction;