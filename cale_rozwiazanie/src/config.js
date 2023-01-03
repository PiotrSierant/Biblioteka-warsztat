require("dotenv").config({ path: __dirname + '/.env' })

const { NODE_PORT, ACCEPTED_GENRES } = process.env

if (!NODE_PORT || !ACCEPTED_GENRES) {
    throw new Error("Missing required config key")
}

module.exports = {
    NODE_PORT,
    ACCEPTED_GENRES
}