const { idParams } = require('../schemas/generalSchema');
const { cryptoSchema, cryptoOrderSchema } = require('../schemas/cryptoSchema');
const CryptoController = require('../controller/CryptoController');
const CryptoOrderController = require('../controller/CryptoOrderController');
const authenticate = require('../middlewares/authenticate');
const adminOnly = require('../middlewares/adminOnly');
const userOnly = require('../middlewares/userOnly');

module.exports = (routes) => {

    routes.get(
        '/cryptos',
        [authenticate],
        CryptoController.index
    );

    routes.get(
        '/cryptos/orders',
        [userOnly],
        CryptoOrderController.show
    );

    routes.post(
        '/cryptos/store',
        [adminOnly, cryptoSchema],
        CryptoController.store
    );

    routes.post(
        '/cryptos/:id/order',
        [userOnly, cryptoOrderSchema],
        CryptoOrderController.createOrder
    );

    routes.delete(
        '/user/orders/cryptos/:id/delete',
        [userOnly, idParams],
        CryptoOrderController.destroyOrder
    );
}