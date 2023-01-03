## Repozytorium książek - findById()

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
    // if id is 'fancyId'
    findById: async (id) => {
        /* 
            get a collection of books:
            {
                fancyId: {
                    title: foo'
                },
                id2: {
                    title: bar'
                }
            }
        */
        const bookRecords = await getBookCollection()

        return bookRecords[id]

        /*
            returned:
            {
                title: foo'
            },
        */
    },
}
```