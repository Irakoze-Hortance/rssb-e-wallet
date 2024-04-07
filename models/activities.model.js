const { DataTypes,Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql' 
  });
  
const Transaction = require('./transactions.model');
const Wallet = require('./wallet.model');

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  action: {
    type: DataTypes.ENUM('withdraw','deposit','transfer'),
    allowNull: false
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Transaction,
      key: 'id'
    }
  },
  walletId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Wallet,
      key: 'id'
    }
  },
  
},
{tableName: 'activity_logs',
timestamps: false
});

module.exports = ActivityLog;
