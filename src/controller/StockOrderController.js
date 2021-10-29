const jwt = require('jsonwebtoken');
const StockOrders = require('../database/models/stockOrders');
const Stock = require('../database/models/stock');

module.exports = {

    async show(req, res) {
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];
        const { id: user_id } = jwt.decode(token);

        try {
            const stocksList = await StockOrders.findAll({
                where: {
                    user_id: id
                }
            });

            const result = await Promise.all(stocksList.map(async stock => {
                const findStock = await Stock.findOne({
                    where: {
                        id: stock.stock_id
                    }
                })
                const finalStockObj = {
                    ...stock.dataValues,
                    stock_name: findStock.dataValues.stock_name
                }

                return finalStockObj
            }));

            res.status(200).json(result)

        } catch (error) {
            res.status(400).json('No orders found')
        }
    },

    async createOrder(req, res) {


        const { id: stock_id } = req.params;
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];
        const {
            id: user_id,
            user_type
        } = jwt.decode(token);

        if (user_type !== 2) {
            return res
                .status(401)
                .json('Orders may only be sent by users')
        }

        const orderData = req.body;

        try {

            const orderDataMap = await Promise.all(orderData.map(async item => {

                const order = await StockOrders.create({
                    user_id,
                    stock_id: Number(stock_id),
                    stock_quantity: Number(item.orderQuantity),
                    stock_price: Number(item.orderPrice),
                });
            }))


            return res
                .status(201)
                .json('Order created')

        } catch (error) {
            return res
                .status(400)
                .json('Order failed$$$$$$$$$')
        }
    },

    async destroyOrder(req, res) {

        const { id } = req.params;
        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];
        const {
            user_type
        } = jwt.decode(token);

        if (user_type !== 2) {
            return res
                .status(401)
                .json('Deletion may only be done by users')
        }

        try {
            const order = await StockOrders.findOne({
                where: {
                    id: id,
                }
            })
            order.destroy();
            res.status(200).json('Order excluded')

        } catch (error) {

            res.status(400).json('Order could not be excluded')
        }
    }
}