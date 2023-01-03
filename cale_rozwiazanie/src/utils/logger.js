const fs = require('fs')
const path = require('path')
const pathToLogs = path.resolve(path.join(__dirname, '../assets/logs'))

module.exports = async (message) => {
    const log = `${new Date()} : ${message}`

    console.log(log)
    
    fs.appendFileSync(pathToLogs, `\n${log}`);
}