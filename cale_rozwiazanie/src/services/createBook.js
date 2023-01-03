const uuid = require('uuid')
const { prompt } = require('inquirer')

const BookRepository = require('../repositories/book_repository')
const { ACCEPTED_GENRES } = require('../config')

module.exports = async () => {
    const questions = [
        { 
            name: 'title',
            message: 'What is the title?'
        },
        { 
            name: 'author',
            message: 'What is the author?'
        },
        { 
            name: 'path',
            message: 'Where is it stored on your hard drive? Absolute path.'
        },
        { 
            type: 'list', 
            name: 'genre', 
            message: 'What is the genre?',
            choices: ACCEPTED_GENRES.split(',')
        }
    ]

    const { title, author, genre, path } = await prompt(questions)
    const book = {
        id: uuid.v4(),
        title,
        author,
        genre,
        path
    }

    await BookRepository.save(book)
}