## Zwrócenie pojedynczej książki przez serwer

```javascript
const http = require('http')
const BookRepository = require('./repositories/book_repository')
const { NODE_PORT } = require('./config')

const getBooksUri = '/book'
const getBookUri = '/book?bookId='

const getBook = require('./services/getBook')

const server = http.createServer(async (req, res) => {
    const { headers, url, method } = req

    /*
        We must first know when the client wants to get a single book
        In such case, we assert that
        the url has '/book?bookId=' in itself, for exmple:

        '/book?bookId=a0bc6914'.includes('/book?bookId=') === true
    */
    if (url.includes(getBookUri)) {
        /*
            Then we need to know two parameters and assert
            they are present:
            
            bookId
            ----------------------------------
            It's possible to get the header by removing '/book?bookId'
            from url.

            '/book?bookId=a0bc6914' minus '/book?bookId=' = 'a0bc6914'

            This can be done by .replace() method.

            header Accept
            ----------------------------------
            The header can be taken directly from req.headers
        */

        const bookId = url.replace(getBookUri, '')
        const accept = headers.accept

        if (!bookId || !accept) {
            /*
                If any of bookId or accept are missing,
                a 400 response is sent, and the function is terminated.
            */
            res.writeHead(400)
            res.end('BookId or Accept missing')

            return
        }

        /*
            It the request is valid, i.e there is a bookId and Accept header,
            the getBook service is called.
        */
        const fetchedBook = await getBook(bookId, accept)

        if (!fetchedBook) {
            /*
                If the getBook service returned undefined,
                which means that the book was not found,
                a 404 response is sent, with the appropriate body.
            */

            res.writeHead(404)
            res.end('Book not found')

            // function is terminated
            return
        }

        /*
            If book was found we can append a header onto the response.
            The getBook service returned an object in the following format:

            {
                accept: 'application/json',
                content: "{}"
            }
        */

        res.writeHead(200, {
            'Content-Type': fetchedBook.accept
        })

        switch (fetchedBook.accept) {
            /*
                Depending on the returned accept key
            */
            case 'application/pdf':
                /*
                    We know that the content is a Readable Stream.
                    That being the case, we can pipe it into the response,
                    which is a Writable Stream.
                */
                fetchedBook.content.pipe(res)
                break;
            case 'application/json':
            case 'text/html':
                /*
                    If the accept is: 'application/json' or 'text/html',
                    the content must be a string.

                    Therefore, we can safely send it to client,
                    by invoking res.end(/string/)
                */
                res.end(fetchedBook.content)
                break;
            default:
                break;
        }
    }
})

server.listen(NODE_PORT, console.log('Library client-server listening'))

```
