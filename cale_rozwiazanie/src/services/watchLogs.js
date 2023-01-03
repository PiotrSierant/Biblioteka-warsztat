const fs = require('fs')
const path = require('path')

const pathToLogs = path.resolve(path.join(__dirname, '../assets/logs'))

module.exports = () => {
    fs.watchFile(pathToLogs, async () => {
        const logs = (await fs.readFileSync(pathToLogs)).toString().split('\n')
        console.log(logs.reverse()[0])
    })
}