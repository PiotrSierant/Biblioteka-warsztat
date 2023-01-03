## Repozytorium książek - findAll()

Tę funkcjonalność można zaimplementować w poniższy sposób:

```javascript
const fs = require('fs')
const path = require('path')

const pathToBooks = path.resolve(path.join(__dirname, '../assets/books'))
/*
    The ./assets/books file holds a JSON object:
    Let's see what is happening here

    The method fs.readFileSync(pathToBooks) returns a Buffer.
    Then, we turn this buffer to a string encoded in utf-8, like so:
    
    fs.readFileSync(pathToBooks).toString()

    We know that this string is a JSON, so we can make a Javascript object literal
    by calling JSON.parse().
*/
const getBookCollection = () => JSON.parse(fs.readFileSync(pathToBooks).toString())

module.exports = {
    findAll: async () => { 
        /* 
            get a collection of books:
            {
                id1: {
                    title: foo'
                },
                id2: {
                    title: bar'
                }
            }
        */
        const bookRecords = await getBookCollection()
        const values = Object.values(bookRecords)
        /*
            [{ title: 'foo' }, { title: 'bar' }]
        */
        return values
    }
}
```