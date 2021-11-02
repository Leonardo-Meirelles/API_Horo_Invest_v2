const { validateDto } = require('../utils/handler')
const { body } = require('express-validator');

exports.cryptoSchema = validateDto([
    body('crypto_name')
        .notEmpty()
        .withMessage('Insert crypto name')
        .isString()
        .withMessage('Crypto name must be a string'),
    body('status')
        .default(true)
        .isBoolean()
]);

exports.cryptoOrderSchema = validateDto([
    body()
        .isArray()
        .withMessage('Insert order data')
]);