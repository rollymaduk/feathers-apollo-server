/**
 * Created by rolly_000 on 11/28/2016.
 */
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
