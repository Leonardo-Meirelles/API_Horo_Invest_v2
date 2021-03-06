
//YET TO BE IMPLEMENTED

const { Model, DataTypes } = require('sequelize');

class CurrencyOrders extends Model {

    static init(sequelize) {

        super.init(
            {
                // email: DataTypes.TEXT,
                // currency_name: DataTypes.STRING,
                currency_quantity: DataTypes.DECIMAL(10, 2),
                currency_price: DataTypes.DECIMAL(10, 2)
            },
            {
                sequelize,
                tableName: 'orders-currencies',
                updatedAt: 'updated_at',
                createdAt: 'created_at'
            }
        )
    }

    static associate(models) {
        this.belongsToMany(models.Users, {
            foreignKey: 'stock_id',
            through: 'orders-currencies',
            as: 'users'
        })
    }
}

module.exports = CurrencyOrders