const { validateDto } = require('../utils/handler')
const { body } = require('express-validator');

//array (cada item é um middleware) e injeta os erros
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
    body('cryptoQuantity')
        .notEmpty()
        .withMessage('Insert quantity'),
    body('cryptoPrice')
        .notEmpty()
        .withMessage('Insert price'),
])