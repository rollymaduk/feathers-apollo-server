// import errors from 'feathers-errors';
import makeDebug from 'debug';
import {makeExecutableSchema} from 'graphql-tools';
import {graphqlExpress,graphiqlExpress} from 'graphql-server-express';
const _assign = require('lodash/assign');
const _omit = require('lodash/omit');

const debug = makeDebug('feathers-apollo-server');

export default function init (options,extraOpts,graphiqlOpts) {
  debug('Initializing feathers-apollo-server plugin');
  return function(){
    "use strict";
    const app=this
    if(!options.path){
      throw new Error('apolloServer path needs to be provided!')
    }

    if (!options.typeDefs) {
      throw new Error('apolloServer typeDefs needs to be provided!');
    }

    if (!options.resolvers) {
      throw new Error('apolloServer resolvers needs to be provided!');
    }

    const schema=makeExecutableSchema(_omit(options,['path']))
    app.use(`${options.path}`, graphqlExpress((req) => {
      return _assign(this.extraOpts, {schema});
    }));

    app.use(this.gOpts && this.gOpts.graphiqlUrl || `/graphiql`
      ,graphiqlExpress(_assign(_omit(this.gOpts,['graphiqlUrl']),{endpointURL: `${options.path}`
      })))
  }

}

