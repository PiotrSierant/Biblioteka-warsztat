# Shebang, uprawnienia executable i link symboliczny (Linux i MacOS)

## shebang

Plik main.js
```javascript
// the first line must hold the shebang
// to inform where the interpreter of the executable is located
#!/usr/bin/env node

console.log('There\'s going to be a lot of code here')
```
---
## Link symboliczny
Zauważ, że w package.json znajduje się klucz **bin**. Jest on niezbędny do tego aby stworzyć link symboliczny pomiędzy Twoim kodem a wartością w systemie operacyjnym.

```javascipt
{
  "bin": {
    "admin-cli": "./src/admin-cli.js"
  }
}
```

Po wpisaniu swojej nazwy jako klucz w obiekcie **bin** i zmapowaniu jej do pliku javascript, aby zakończyć konfigurację musisz uruchomić komendę:

```bash
npm link
```

W linii polecenia powinieneś zobaczyć podobny output z **npm**

```bash
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN bootstrap@1.0.0 No description
npm WARN bootstrap@1.0.0 No repository field.

up to date in 0.959s
found 0 vulnerabilities

/home/kris/.nvm/versions/node/v12.14.1/bin/my_first_cli -> /home/kris/.nvm/versions/node/v12.14.1/lib/node_modules/bootstrap/cli.js
/home/kris/.nvm/versions/node/v12.14.1/lib/node_modules/bootstrap -> /home/kris/projects/Node_Presentations/subjects/Skrypt_w_systemie/dzien_1/exercises/01_zapisz_do_pliku/bootstrap
```
---
## Uprawnienia executable
Aby skrypt zadziałał, Twój użytkownik w systemie operacyjnym musi mieć uprawnienia typu **executable** do stworzonego przez Ciebie pliku.
Zrobisz to wpisując w linię polecenia:

```bash
chmod +x ./admin-cli.js
```
---
Zadanie można uznać za wykonane gdy program się uruchomi po wpisaniu:

```bash
admin-cli
```