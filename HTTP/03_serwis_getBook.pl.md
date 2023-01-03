## Serwis do zwracania książek

Wymaganiami tego serwisu są:

- zwrócenie książki o podanym przez klienta identyfikatorze
- zwrócenie jej wraz z informacją w jakim formacie są załączone dane
- zalogowanie informacji o takim zapytaniu korzystając z dedykowanego loggera

Przyjrzyjmy się poniższemu fragmentowi kodu:

```javascript
const fs = require("fs");
const BookRepository = require("../repositories/book_repository");
const logger = require("../utils/logger");

const descriptionToHtml = (book) => (
    `
        <html>
            <header>${book.title}</header>
            <body>
                <p>Author: <b>${book.author}</b></p>
                <p>Path: <b>${book.path}</b></p>
                <p>Genre: <b>${book.genre}</b></p>
            </body>
        </html>
    `
)

/*
    The service takes two arguments:
    1. bookId
    2. accept, which can be any of 'application/json', 'application/pdf' or 'text/html'
*/
module.exports = async (id, accept) => {
  // first the book is returned from the repository
  const book = await BookRepository.findById(id)
  // a message is logged
  logger(`BookId ${id} was requested in format: ${accept}`)

  // if there is no book, the service returns undefined
  if (!book) {
    return
  }

  switch (accept) {
    // if the requested type is application/pdf
    case "application/pdf":
        /*
            The returned object is
            {
                accept: 'application/pdf',
                content: a Readable Stream
            }
        */
      return {
        accept,
        /*
            Each book has a 'path' property which resolves to
            a location on your hard drive.

            Therefore, we can create a Readable Stream,
            which will be used in client-server.js.

            The Readable Stream is going to be piped directly
            into the response.
        */
        content: fs.createReadStream(book.path)
      }
    case "application/json":
        /*
            Basically the book is returned as is.
            With the only difference that is turned
            from object to a string.

            {
                accept: 'application/json',
                content: "{
                    "id": "47867108-10e8-4507-ae57-277f2c1cbbc2",
                    "title": "another title",
                    "author": "another author",
                    "genre": "science-fiction",
                    "path": "another/path/file.pdf"
                }"
            }
        */
      return {
        accept,
        content: JSON.stringify(book)
      }
    case "text/html":
        /*
          Here, what is needed is a function that will turn the book
            into a string with HTML.
            You have already made an identical thing in this course.

            The returned object is:
            {
                accept: 'text/html',
                content: '<html><header>aa</header><body><p>Author: <b>a</b></p><p>Path: <b>a</b></p><p>Genre: <b>novel</b></p</bod</html>'
            }
        */
      return {
        accept,
        content: descriptionToHtml(book)
      }
    default:
      break
  }
}
```
