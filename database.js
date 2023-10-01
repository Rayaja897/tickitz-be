const postgres = require("postgres");

const sql = postgres({
    host : "localhost",
    user : "postgres",
    pass : "123",
    database : "tickitz",
    port : 5432,
})

module.exports = sql