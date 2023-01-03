const fs = require('fs')
const BookRepository = require('../repositories/book_repository')
const logger = require('../utils/logger')

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

module.exports = async (id, accept) => {
    const book = await BookRepository.findById(id)

    logger(`BookId ${id} was requested in format: ${accept}`)
    
    if (!book) {
        return
    }

    switch(accept) {
        case 'application/pdf':
            return {
                accept,
                content: fs.createReadStream(book.path)
            }
        case 'application/json':
            return {
                accept,
                content: JSON.stringify(book)
            }
        case 'text/html':
            return {
                accept,
                content: descriptionToHtml(book)
            }
        default:
            break;
    }
}