#!/usr/bin/env node

const { program } = require('commander')

const createBook = require('./services/createBook')
const watchLogs = require('./services/watchLogs')

program
    .version('1.0.0')
    .description('Library Admin Panel')

program
    .command('add')
    .alias('-a')
    .description('Adds a book')
    .action(createBook)

program
    .command('watch')
    .alias('-w')
    .description('Watches logs')
    .action(watchLogs)


program.parse(process.argv)