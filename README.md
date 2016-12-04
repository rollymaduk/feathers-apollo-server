# feathers-apollo-server

[![Build Status](https://travis-ci.org/rollymaduk/feathers-apollo-server.png?branch=master)](https://travis-ci.org/rollymaduk/feathers-apollo-server)
[![Code Climate](https://codeclimate.com/github/rollymaduk/feathers-apollo-server/badges/gpa.svg)](https://codeclimate.com/github/rollymaduk/feathers-apollo-server)
[![Test Coverage](https://codeclimate.com/github/rollymaduk/feathers-apollo-server/badges/coverage.svg)](https://codeclimate.com/github/rollymaduk/feathers-apollo-server/coverage)
[![Dependency Status](https://img.shields.io/david/rollymaduk/feathers-apollo-server.svg?style=flat-square)](https://david-dm.org/rollymaduk/feathers-apollo-server)
[![Download Status](https://img.shields.io/npm/dm/feathers-apollo-server.svg?style=flat-square)](https://www.npmjs.com/package/feathers-apollo-server)

> A feathers-apollo-server  plugin for apollo graphql server integration with feathers  minimalist real-time framework 

## Installation

```
npm install feathers-apollo-server --save
```

## Documentation
```
graphqlServer({typeDefs,resolver,[opts]},[extraOpts],[graphiqlOpts])
```
```js
// setup

export const typeDefs = [`type Query{
  testString:String
}
schema{
  query:Query
}
`];
export const resolvers = {
  Query: {
    testString () {
      'use strict';
      return 'this is a test string';
    }
  }
};
const Opts={path:'/graphql',schema,resolvers} //makeExecutable schema options
const extraOpts={context:{key:"context_Value"}} // graphql server options: 

// Register the plugin, see below for an example
app.configure('/graphql', graphqlService(Opts,extraOpts));

// Use the service
const chai=require("chai")
const chai_http=require("chai-http")
chai.use(chai_http)
const feathers = require('feathers');
const service = require('feathers-apollo-server');
const apollo = service({typeDefs, resolvers});
const app = feathers();
const port = 3035;
const expect = chai.expect;
const body_parser=require('body_parser');

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure('/graphql', apollo);

app.listen(port).once('listening',()=>{
    chai.request(app)
          .post('/graphql')
          .set('Accept', 'application/json')
          .send({query: 'query {testString}'})
          .end((err, res) => {
            expect(res.body.data).to.have.property('testString');
            expect(res.body.data.testString).to.eqls('this is a test string');
            
          });
})

```
##Plugin Args
**Opts:** 
The same as makeExecutableSchema, path,typeDefs and resolvers are required while other arguments are optional,learn more [options](http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#makeExecutableSchema) from graphql-tools<br>

**extraOpts(Optional):** graphql express options, you can learn more [here](http://dev.apollodata.com/tools/graphql-server/setup.html#graphqlOptions)

**graphiqlOpts:** Same as [graphiql Options](http://dev.apollodata.com/tools/graphql-server/graphiql.html#graphiqlOptions) except for the grapiqlUrl property for specifying path to graphiql UI default is '/graphiql'

## Complete Example

Here's an example of a Feathers server that uses `feathers-apollo-server`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const plugin = require('feathers-apollo-server');

const Opts={path:'/plugin',schema,resolvers}  //makeExecutable schema options
const extraOpts={context:{key:"context_Value"}} // graphql server options: 

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(errorHandler())
  // Initialize your feathers plugin
  .configure(plugin(opts,extraOpts);
app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');
```
## Todo

- Add server request object to graphql context 
- Write more tests
- Improve readme documentation

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
