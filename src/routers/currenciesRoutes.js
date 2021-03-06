
//YET TO BE IMPLEMENTED

const { idParams } = require('../schemas/generalSchema');
const { currencySchema, currencyOrderSchema } = require('../schemas/currencySchema');
const CurrencyController = require('../controller/CurrencyController');
const CurrencyOrderController = require('../controller/CurrencyOrderController');
const authenticate = require('../middlewares/authenticate');
const adminOnly = require('../middlewares/adminOnly');
const userOnly = require('../middlewares/userOnly');

module.exports = (routes) => {

    routes.get(
        '/currencies',
        [authenticate],
        CurrencyController.index
    );

    routes.post(
        '/currencies/store',
        [adminOnly, currencySchema],
        CurrencyController.store
    );

    routes.post(
        '/currencies/:id/order',
        [userOnly, currencyOrderSchema],
        CurrencyOrderController.createOrder
    );

    routes.delete(
        '/:user/orders/currencies/:id/delete',
        [userOnly, idParams],
        CurrencyOrderController.destroyOrder
    );
}