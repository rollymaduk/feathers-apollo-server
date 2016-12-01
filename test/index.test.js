import {resolvers, typeDefs} from '../src/sampleSchema';
const chai = require('chai');
const chaiHttp = require('chai-http');
import service from '../src';
const assert = require('assert');
const feathers = require('feathers');
const apollo = service({path:"/graphql",typeDefs, resolvers});
const app = feathers();
const port = 3035;
const expect = chai.expect;
const bodyParser = require('body-parser');

chai.use(chaiHttp);
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(apollo);

// import gql from "graphql-tag"

// app.use('/apolloServer',service())
// app.configure(service())

describe('feathers-apollo-server', () => {
  before(function (done) {
    this.server = app.listen(port);
    this.server.once('listening', () => {
      done();
    });
  });

  after(function (done) {
    this.server.close(() => {
      done();
    });
  });

  it('should throw error when schema argument is empty', function () {
    'use strict';
    expect(service({})).to.throw('apolloServer path needs to be provided!');
  });
  it('should throw error when schema argument is empty', function () {
    'use strict';
    expect(service({path:"/path"})).to.throw('apolloServer typeDefs needs to be provided!');
  });
  it('should throw error when resolver argument is empty', function () {
    'use strict';
    expect(service({path:"path",typeDefs: ['typeDefs']})).to.throw('apolloServer resolvers needs to be provided!');
  });

  it('is CommonJS compatible', () => {
    expect(typeof require('../lib')).to.equal('function');
  });

  it('basic functionality', function (done) {
    chai.request(app)
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({query: 'query {testString}'})
      .end((err, res) => {
        expect(res.body.data).to.have.property('testString');
        expect(res.body.data.testString).to.eqls('this is a test string');
        if (err) {

        }
        done();
      });
  });
  it('basic functionality for graphiql', function (done) {
    chai.request(app)
      .get('/graphiql')
      .end((err, res) => {
        expect(res.statusCode).to.eqls(200)
        if (err) {

        }
        done();
      });
  });
});
