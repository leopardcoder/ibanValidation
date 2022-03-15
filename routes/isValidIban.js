import express from "express";
import {runValidation} from '../src/validation.js'

export const ibanValidation = express.Router()

ibanValidation.get('/:ibanArray', (req, res) => {
    const ibanArray = req.params.ibanArray

    async function getResults() {
        const results = await runValidation(ibanArray)
        res.send(results)
    }

    getResults()

})
