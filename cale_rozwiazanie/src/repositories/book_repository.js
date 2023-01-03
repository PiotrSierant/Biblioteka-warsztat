const fs = require('fs')
const path = require('path')

const pathToBooks = path.resolve(path.join(__dirname, '../assets/books'))
const getBookCollection = () => JSON.parse(fs.readFileSync(pathToBooks).toString())

module.exports = {
    findById: async (id) => {
        const bookRecords = await getBookCollection()

        return bookRecords[id]
    },
    save: async (book) => {
        const bookRecords = await getBookCollection()
        const newBookRecord = {
            [`${book.id}`]: book
        }

        await fs.writeFileSync(pathToBooks, JSON.stringify(Object.assign(bookRecords, newBookRecord)))
    },
    findAll: async () => { 
        const bookRecords = await getBookCollection()

        return Object.values(bookRecords)
    }
}