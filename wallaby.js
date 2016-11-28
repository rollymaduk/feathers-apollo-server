/**
 * Created by rolly_000 on 11/26/2016.
 */
// Wallaby.js configuration

/*var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({
    // webpack options, such as
    // module: {
    //   loaders: [...]
    // },
    // externals: { jquery: "jQuery" }
  }
);*/

module.exports = function (wallaby) {
  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      {pattern: 'src/**/*.js', load: true},
      {pattern: 'lib/**/*.js', load: true}
    ],


    tests: [
      {pattern: 'test/**/*test.js', load: true}
    ],
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    workers:{
      recycle:true
    },

    env:{
      type:"node"
    },

    testFramework:"mocha"

   /* postprocessor: wallabyPostprocessor,

    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    }*/
  };
};
