# 1 - Course Setup

## 1.1 - Tools

- [Node.js](https://nodejs.org/en/) - Version 24 or higher
- [Visual Studio Code](https://code.visualstudio.com/) - Code Editor

## 1.2 - VS Code Profile (just info and not mandatory, i didn't like it)

nodejsCourse.code-profile - VS Code Profile with extensions for the course

![](https://i.imgur.com/RC0ddhf.png)
![](https://i.imgur.com/j5MrDAD.png)

## 1.3 - Initial code

server.mjs

```js
console.log("Server is running!");
```

## 1.4 - Run the server

```sh
node server.mjs
```

To `watch for changes and restart the server automatically`, use:

```sh
node --watch server.mjs
```

The flag --no-warnings can be added to hide warnings, like this:

```sh
node --watch --no-warnings server.mjs
```

It's useful when using experimental stuff, like in some SQLlite features in feature lessons.

## 1.5 - Install dependencies

```sh
npm i -D @types/node
```

This will `install the Node.js type definitions for TypeScript` support in VS Code.
