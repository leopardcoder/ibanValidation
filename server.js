import express from 'express'
import {ibanValidation} from "./routes/isValidIban.js"

const PORT = process.env.PORT || 3000
const app = express()

app.use('/ibanvalidation/', ibanValidation)
app.listen(PORT, console.log(`Server running on port ${PORT}`))
