const jwt = require('jsonwebtoken');
const CryptoOrders = require('../database/models/CryptoOrders');
const Crypto = require('../database/models/crypto');

module.exports = {

    async show(req, res) {

        const { authorization } = req.headers;

        const token = authorization.split(' ')[1];
        const { id } = jwt.decode(token);

        try {
            const cryptosList = await CryptoOrders.findAll({
                where: {
                    user_id: id,
                }
            })

            const result = await Promise.all(cryptosList.map(async crypto => {
                const findCrypto = await Crypto.findOne({
                    where: {
                        id: crypto.crypto_id
                    }
                })
                const finalCryptoObj = {
                    ...crypto.dataValues,
                    crypto_name: findCrypto.dataValues.crypto_name
                }

                return finalCryptoObj
            }));

            res.status(200).json(result)

        } catch (error) {
            res.status(400).json('No orders found')
        }
    },

    async createOrder(req, res) {

        const { id: crypto_id } = req.params;
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

                const order = await CryptoOrders.create({
                    user_id,
                    crypto_id: Number(crypto_id),
                    crypto_quantity: Number(item.orderQuantity),
                    crypto_price: Number(item.orderPrice),
                })
                
            }))

                return res
                    .status(201)
                    .json('Order created')

            } catch (error) {
                return res
                    .status(400)
                    .json('Order failed')
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
                const order = await CryptoOrders.findOne({
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