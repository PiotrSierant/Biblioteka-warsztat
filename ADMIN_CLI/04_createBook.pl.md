## Serwis createBook

Podobną funkcjonalność wykorzystującą moduł **inquirer** już tworzyłeś/łaś. Ten moduł różni się jedynie tym, że korzysta z repozytorium aby stworzoną książkę utrwalić na twardym dysku. Przyjrzyjmy się rozwiązaniu:

```javascript
const uuid = require("uuid");
const { prompt } = require("inquirer");

const BookRepository = require("../repositories/book_repository");
const { ACCEPTED_GENRES } = require("../config");

module.exports = async () => {
  /*
        First an array of questions has to be created.
        Please notice, that the type of the last question is 'list'.
        It is needed to make the client choose from a list.

        Also notice that the choices come from .env file, 
        which looks somewhat like this:

        ACCEPTED_GENRES=novel,science-fiction,comedy

        For that reason we need to split this string into an array
        ['novel', 'science-fiction', 'comedy']
    */
  const questions = [
    {
      name: "title",
      message: "What is the title?"
    },
    {
      name: "author",
      message: "What is the author?"
    },
    {
      name: "path",
      message: "Where is it stored on your hard drive? Absolute path."
    },
    {
      type: "list",
      name: "genre",
      message: "What is the genre?",
      choices: ACCEPTED_GENRES.split(",")
    }
  ];

  /*
        The return type of prompt is a Promise which
        resolves to an  object:
        {
            title: 'The Road',
            author: 'Cormac McCarthy',
            ...
        }
        so we can destructure it in the following way.
    */
  const { title, author, genre, path } = await prompt(questions);

  /*
        The book needs a uuid,
        we make one with uuid.v4() method
    */

  const book = {
    id: uuid.v4(),
    title,
    author,
    genre,
    path
  };

  /*
        Once we have a book,
        we use the BookRepository to save it to hard drive.
    */

  await BookRepository.save(book);
};
```

Pamiętaj o tym aby zaimportować tę funkcję w pliku **./admin-cli.js**, tak jak poniżej:

```javascript
#!/usr/bin/env node

const { program } = require("commander");
const createBook = require("./services/createBook");

program.version("1.0.0").description("Library Admin Panel");

program
  .command("add")
  .alias("-a")
  .description("Adds a book")
  .action(createBook);

program.parse(process.argv);
```
