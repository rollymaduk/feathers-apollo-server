// import errors from 'feathers-errors';
import makeDebug from 'debug';
import {makeExecutableSchema} from 'graphql-tools';
import {graphqlExpress,graphiqlExpress} from 'graphql-server-express';
const _assign = require('lodash/assign');

const debug = makeDebug('feathers-apollo-server');
class Service {
  constructor (options = {}, extraOpts = {},graphiqlOpts={}) {
    this.options = options;
    this.extraOpts = extraOpts;
    this.gOpts=graphiqlOpts
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
      return _assign(this.extraOpts, {schema});
    }));
    app.use(this.gOpts && this.gOpts.graphiqlUrl || `/graphiql`,graphiqlExpress(_assign(this.gOpts,{endpointURL: `/${path}`
    })))
  }

}
export default function init (options,extraOpts,graphiqlOpts) {
  debug('Initializing feathers-apollo-server plugin');
  return new Service(options,extraOpts,graphiqlOpts);
}
init.Service = Service;
