const { validateDto } = require('../utils/handler');
const { body } = require('express-validator');

exports.stockSchema = validateDto([
    body('stock_name')
        .notEmpty()
        .withMessage('Insert stock name')
        .isString()
        .withMessage('Stock name must be a string'),
    body('status')
        .default(true)
        .isBoolean()
]);

exports.stockOrderSchema = validateDto([
    body()
        .isArray()
        .withMessage('Insert order data')
]);