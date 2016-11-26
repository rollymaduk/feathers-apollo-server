# feathers-apollo-server

[![Build Status](https://travis-ci.org/rollymaduk/feathers-apollo-server.png?branch=master)](https://travis-ci.org/rollymaduk/feathers-apollo-server)
[![Code Climate](https://codeclimate.com/github/rollymaduk/feathers-apollo-server/badges/gpa.svg)](https://codeclimate.com/github/rollymaduk/feathers-apollo-server)
[![Test Coverage](https://codeclimate.com/github/rollymaduk/feathers-apollo-server/badges/coverage.svg)](https://codeclimate.com/github/rollymaduk/feathers-apollo-server/coverage)
[![Dependency Status](https://img.shields.io/david/rollymaduk/feathers-apollo-server.svg?style=flat-square)](https://david-dm.org/rollymaduk/feathers-apollo-server)
[![Download Status](https://img.shields.io/npm/dm/feathers-apollo-server.svg?style=flat-square)](https://www.npmjs.com/package/feathers-apollo-server)

> A feathers-apollo-server service plugin for for feathers  minimalist real-time framework 

## Installation

```
npm install feathers-apollo-server --save
```

## Documentation

Please refer to the [feathers-apollo-server documentation](http://docs.feathersjs.com/) for more details.

## Complete Example

Here's an example of a Feathers server that uses `feathers-apollo-server`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const plugin = require('feathers-apollo-server');

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Initialize your feathers plugin
  .use('/plugin', plugin())
  .use(errorHandler());

app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');
```

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
