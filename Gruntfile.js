module.exports = function ( grunt ) {

  /**
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');

  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

  var rewriteRulesMiddlewareEnableFn = function (connect, options) {
    var middlewares = [];

    // RewriteRules support
    middlewares.push(rewriteRulesSnippet);

    if (!Array.isArray(options.base)) {
        options.base = [options.base];
    }

    var directory = options.directory || options.base[options.base.length - 1];
    options.base.forEach(function (base) {
        // Serve static files.
        middlewares.push(connect.static(base));
    });

    // Make directory browse-able.
    middlewares.push(connect.directory(directory));

    return middlewares;
  };

  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),


    /**
     * Connect is a http server provided by grunt.
     * server - http server started on watch
     * serversa - http server stand-alone
     * servercompilesa - http server stand-alone pointing to compile_dir
     * testserver - http server used for e2e testing
     */
    connect: {
      options: {
        port: 8000,
        base: 'app',
        hostname: 'localhost'
      },
      server: {
        options: {
          keepalive: false,
          middleware: rewriteRulesMiddlewareEnableFn
        }
      },
      serversa: {
        options: {
          keepalive: true,
          middleware: rewriteRulesMiddlewareEnableFn
        }
      },
      servercompilesa: {
        options: {
          base: 'app',
          keepalive: true,
          middleware: rewriteRulesMiddlewareEnableFn
        }
      },
      testserver: {
        options: {
          port: 8100,
          keepalive: false,
          middleware: rewriteRulesMiddlewareEnableFn
        }
      },
      rules: [
        {from: '^/ws/(.*)$', to: 'http://ec2-54-187-253-179.us-west-2.compute.amazonaws.com:8000/$1', redirect: 'permanent'}
      ]
    }



  };

  grunt.initConfig( grunt.util._.extend( taskConfig ) );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'configureRewriteRules','connect:serversa' ] );

};
