const http = require('http')
const BookRepository = require('./repositories/book_repository')
const { NODE_PORT } = require('./config')

const getBooksUri = '/book'
const getBookUri = '/book?bookId='

const getBook = require('./services/getBook')

const server = http.createServer(async (req, res) => {
    const { headers, url, method } = req
    const endpointSupported = method == 'GET' && url.includes(getBooksUri)

    if (!endpointSupported) {
        res.writeHead(404)
        res.end('Route not found')

        return
    }

    if (url === getBooksUri) {
        const books = await BookRepository.findAll()
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(books))
    }

    if (url.includes(getBookUri)) {
        const bookId = url.replace(getBookUri, '')
        const accept = headers.accept

        if (!bookId || !accept) {
            res.writeHead(400)
            res.end('BookId or Accept missing')
        }

        const fetchedBook = await getBook(bookId, accept)

        if (!fetchedBook) {
            res.writeHead(404)
            res.end('Book not found')
            return
        }

        res.writeHead(200, {
            'Content-Type': fetchedBook.accept
        })


        switch (fetchedBook.accept) {
            case 'application/pdf':
                fetchedBook.content.pipe(res)
                break;
            case 'application/json':
            case 'text/html':
                res.end(fetchedBook.content)
                break;
            default:
                break;
        }
    }
})

server.listen(NODE_PORT, console.log('Library client-server listening'))