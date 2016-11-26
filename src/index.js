// import errors from 'feathers-errors';
import makeDebug from 'debug';

const debug = makeDebug('feathers-apollo-server');

export default function init () {
  debug('Initializing feathers-apollo-server plugin');
  return 'feathers-apollo-server';
}
