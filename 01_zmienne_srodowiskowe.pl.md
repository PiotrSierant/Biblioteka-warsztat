# Zmienne środowiskowe

Najprościej jest skorzystać z modułu **dotenv**, który był już poruszany w tym tygodniu. Rozwiązanie mogłoby wyglądać tak jak poniżej:

```javascript
require("dotenv").config({ path: __dirname + '/.env' })

// take the variables from process.env
const { NODE_PORT, ACCEPTED_GENRES } = process.env
// validate their existance
if (!NODE_PORT || !ACCEPTED_GENRES) {
    throw new Error("Missing required config key")
}
// export them
module.exports = {
    NODE_PORT,
    ACCEPTED_GENRES
}
```