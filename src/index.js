// import errors from 'feathers-errors';
import makeDebug from 'debug';
import {makeExecutableSchema} from 'graphql-tools';
import {graphqlExpress} from 'graphql-server-express';
const _assign = require('lodash/assign');

const debug = makeDebug('feathers-apollo-server');
class Service {
  constructor (options = {}, gOpts = {}) {
    this.options = options;
    this.gOpts = gOpts;
    if (!options.typeDefs) {
      throw new Error('apolloServer typeDefs needs to be provided!');
    }

    if (!options.resolvers) {
      throw new Error('apolloServer resolvers needs to be provided!');
    }
  }
  setup (app, path) {
    const schema = makeExecutableSchema(this.options);
    app.use(`/${path}`, graphqlExpress((req) => {
      return _assign(this.gOpts, {schema});
    }));
  }

}
export default function init (options, gOpts) {
  debug('Initializing feathers-apollo-server plugin');
  return new Service(options, gOpts);
}
init.Service = Service;
