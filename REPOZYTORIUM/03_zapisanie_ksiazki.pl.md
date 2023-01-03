## Repozytorium książek - save()

Tę funkcjonalność można zaimplementować w poniższy sposób:

```javascript
const fs = require("fs");
const path = require("path");

const pathToBooks = path.resolve(path.join(__dirname, "../assets/books"));
/*
    The ./assets/books file holds a JSON object:
    Let's see what is happening here

    The method fs.readFileSync(pathToBooks) returns a Buffer.
    Then, we turn this buffer to a string encoded in utf-8, like so:
    
    fs.readFileSync(pathToBooks).toString()

    We know that this string is a JSON, so we can make a Javascript object literal
    by calling JSON.parse().
*/
const getBookCollection = () =>
  JSON.parse(fs.readFileSync(pathToBooks).toString());

module.exports = {
  /*
        Let's assume that the book to save is:

        {
            id: '47867108-10e8-4507-ae57-277f2c1cbbc2',
            title: 'another title',
            author: 'another author',
            genre: 'science-fiction',
            path: 'another/path/file.pdf'
        }
    */

  save: async book => {
    const bookRecords = await getBookCollection();
    /* 
        bookRecords:
        {
            fancyId: {
                title: foo'
            },
            id2: {
                title: bar'
            }
        }
    */

    // we create a new record where the key is the book id
    const newBookRecord = {
      [`${book.id}`]: book
    };
    /* 
        newBookRecord:
        {
            "47867108-10e8-4507-ae57-277f2c1cbbc2": {
                id: '47867108-10e8-4507-ae57-277f2c1cbbc2',
                title: 'another title',
                author: 'another author',
                genre: 'science-fiction',
                path: 'another/path/file.pdf'
            }
        }
    */

    const newCollection = Object.assign(bookRecords, newBookRecord)

    /* 
        newCollection:
        {
            fancyId: {
                title: foo'
            },
            id2: {
                title: bar'
            },
            "47867108-10e8-4507-ae57-277f2c1cbbc2": {
                id: '47867108-10e8-4507-ae57-277f2c1cbbc2',
                title: 'another title',
                author: 'another author',
                genre: 'science-fiction',
                path: 'another/path/file.pdf'
            },
        }

        Once the new collection is created, we make a string out of it,
        and write it to the file.
    */
    await fs.writeFileSync(pathToBooks, JSON.stringify(newCollection))
  }
};
```
