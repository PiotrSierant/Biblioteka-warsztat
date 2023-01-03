## Obsługa nieobsługiwanych endpointów

Mały _disclaimer_. Sposób rozwiązania przedstawiony poniżej jest dość mocno prymitywny. W kolejnym tygodniu dowiesz się jak to zrobić lepiej za pomocą modułu **Express**, którego jedną z głównych funkcjonalności jest parsowanie **querystringów**, czyli parametrów z URI.

```javascript
const http = require("http");
const BookRepository = require("./repositories/book_repository");
const { NODE_PORT } = require("./config");

const getBooksUri = "/book";
const getBookUri = "/book?bookId=";

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
    /*
        The logic is:
        endpoint is supported if method is GET
        and string '/book' can be found in the url.

        /book?bookId=a0bc6914-aa59-4912-962a-1ef2e2ad1a4.includes('/book') === true
        /book.includes('/book') === true 

        Bear in mind, that this approach is very naive.
        Nonetheless, it will suffice for the time being.
    */
  const endpointSupported = method == "GET" && url.includes(getBookUri);

  if (!endpointSupported) {
    /*
        If endpoint is not supported,
        set the status and send a message
        in the body.
    */
    res.writeHead(404);
    res.end("Route not found");

    // terminate
    return;
  }
});
// Notice that the server runs on port
// specified in ./env file
server.listen(NODE_PORT, console.log("Library client-server listening"));
```
