const Crypto = require('../database/models/crypto')
// const { validationResult } = require('express-validator')

module.exports = {
    async index(req, res) {
        const cryptos = await Crypto.findAll()

        return res.json(cryptos)
    },

    async store(req, res) {
        const data = req.body

        try {
            const create = await Crypto.create(data)
            return res.json(create)
        } catch (error) {
            console.log(error)
        }

    },

    async show(req, res) {
        const { id } = req.params

        //find by primary key
        const crypto = await Crypto.findByPk()
        console.log(crypto)
        if (!crypto) {
            res.status(400).json({ error: `Invalid param ${id}` })
        }
        return res.json(crypto)
    }
}