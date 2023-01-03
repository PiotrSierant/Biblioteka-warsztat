## Serwis watchLogs

Podobną funkcjonalność tworzyłeś w zadaniu **chatroom**. Wówczas zajmowaliśmy się monitorowaniem zmian w pliku, do którego swoje wiadomości zapisywali użytkownicy czatu. Teraz będziemy monitorowali czytali logi z pliku.

Ważnym wymaganiem jest to, żeby odczytywać tylko **jeden** najnowszy log.

```javascript
const fs = require("fs");
const path = require("path");

/*
    Path module needs to be used here.
*/
const pathToLogs = path.resolve(path.join(__dirname, "../assets/logs"));

module.exports = () => {
  fs.watchFile(pathToLogs, async () => {
    /*
            Whenever there is a change in the file,
            read all the logs.

            To get the last log, first we need to create an array of logs.
            For that, method .split() should be used. It takes an argument
            called separator.

            So basically, we separate the logs on 'new line', which results in
            an array.
        */
    const logs = (await fs.readFileSync(pathToLogs)).toString().split("\n");

    // Once we got the array of logs,
    // we take the first element.
    console.log(logs.reverse()[0]);
  });
};
```

Pamiętaj o tym aby zaimportować tę funkcję w pliku **./admin-cli.js**, tak jak poniżej:

```javascript
#!/usr/bin/env node

const { program } = require('commander')
const watchLogs = require('./services/watchLogs')

program
    .version('1.0.0')
    .description('Library Admin Panel')

program
    .command('watch')
    .alias('-w')
    .description('Watches logs')
    .action(watchLogs)

program.parse(process.argv)
```
