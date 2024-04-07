const { DataTypes,Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql' 
});

const Customer = require('./customer.model');

const Wallet = sequelize.define('wallet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      accNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      walletActivityLogs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },

      wallet_type: {
        type: DataTypes.ENUM('savings','crypto','credit','standard'),
        allowNull: false
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Customer,
          key: 'id'
        }
      }
}, {
    tableName: 'wallets',
    timestamps: false
  },  
);

    //add associations
    Wallet.associate = (models) => {
      Wallet.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }

module.exports = Wallet;