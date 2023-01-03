## Konfiguracja modułu commander

Commander pojawiał się w tym kursie już wiele razy. Dlatego już wiesz, że pozwala na dogodne deklarowanie aplikacji CLI. Korzystając z niego, nie trzeba się zastanawiać jak wyświetlać wersję programu, ani parsować argumenty podawane podczas uruchomienia. Sam moduł jest bardzo złożony. Aby poznać go dogłębniej, zajrzyj do [dokumentacji](https://www.npmjs.com/package/commander).

1. Plik **./src/admin-cli.js**
```javascript
#!/usr/bin/env node

const { program } = require('commander')

program
    .version('1.0.0')
    .description('Library Admin Panel')

program
    // declare a coomand
    .command('add')
    // give it an alias
    .alias('-a')
    .description('Adds a book')
    .action(() => {
        console.log('Adding a book will be here soon')
    })

program
    .command('watch')
    .alias('-w')
    .description('Watches logs')
    .action(() => {
        console.log('Watching logs will be here soon')
    })

// This line is very important. It gives commander access to process.argv
// which hold arguments that the user typed whilst running the program
program.parse(process.argv)
```