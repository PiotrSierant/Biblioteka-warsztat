## Zwrócenie wszystkich książek z repozytorium

Aby zwrócić wszystkie książki należy skorzystać z metody **findAll** repozytorium książek, tak jak jest to pokazane na przykładzie poniżej.

```javascript
const http = require('http')
const BookRepository = require('./repositories/book_repository')
const { NODE_PORT } = require('./config')

const getBooksUri = '/book'
const getBookUri = '/book?bookId='

const server = http.createServer(async (req, res) => {
    const { headers, url, method } = req

    /*
        If url is '/books'.
        Then we know that the client wants all books.
    */
    if (url === getBooksUri) {
        // return all the books from the repository
        const books = await BookRepository.findAll()
        // write Content-Type
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        /*
            Turn an array into a string.
            Send back to client.
        */
        res.end(JSON.stringify(books))
    }
})

server.listen(NODE_PORT, console.log('Library client-server listening'))
```