## Logger

Logger loguje do konsoli i zapisuje dane do pliku **./assets/logs**.

```javascript
const fs = require('fs')
const path = require('path')
const pathToLogs = path.resolve(path.join(__dirname, '../assets/logs'))

// The logger takes one argument: message
module.exports = async (message) => {
    // First it constructs a log by string interpolation.
    const log = `${new Date()} : ${message}`

    // Then it logs it to the console.
    console.log(log)
    
    /*
        Finally, it appends it to the file.

        Notice that it adds a new line in front of every log.
        This is needed by the admin cli to split the logs into an array.
    */
    fs.appendFileSync(pathToLogs, `\n${log}`);
}
```