# shortify
A convenient URL shortener API

### Inspiration
How to code a URL shortener?](https://stackoverflow.com/q/742013/2898754) with some further reading:

- [How does a URL Shortener work?](https://stackoverflow.com/q/4572734/2898754)
- [How do short URLs services work?](https://stackoverflow.com/q/1562367/2898754)
- [Wiki](https://en.wikipedia.org/wiki/URL_shortening)

### Implementation
A simple NodeJS API that shortens a URL and stores original, or returns original URL. It does not redirect when requesting actual URL (for now). 

It uses MongoDB for storage with an auto-incremental ID as explained [here](https://docs.mongodb.com/v3.0/tutorial/create-an-auto-incrementing-field/), implemented with Mongoose API.

### Installation
- Run `npm install` to install dependencies
  - Run `npm run dev` to run the server with nodemon (listens for file changes) or,
  - Run `npm start` to start the server

### Todo
- Add analytics
- Add option to redirect (or make it default) when requesting original URL

### Licence
MIT
