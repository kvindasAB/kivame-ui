module.exports = function ( grunt ) {

  /**
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-connect-proxy');

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
      proxies: [
            {
                context:'/ws/',
                host: 'ec2-54-187-253-179.us-west-2.compute.amazonaws.com',
                port: 8000,
                changeOrigin: true,
                rewrite: {
                   '^/ws/': 'http://ec2-54-187-253-179.us-west-2.compute.amazonaws.com:8000/'
                 }
            }
        ],
      options: {
        port: 8000,
        base: 'app',
        hostname: 'localhost'
      },
      server: {
        options: {
          keepalive: false
        }
      },
      serversa: {
        options: {
          keepalive: true,
          middleware: function (connect, options) {
             var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
             return [
                proxy,
                // Serve static files.
                connect.static(options.base),
                // Make empty directories browsable.
                connect.directory(options.base)
             ];
          }
        }
      },
      servercompilesa: {
        options: {
          base: 'app',
          keepalive: true
        }
      },
      testserver: {
        options: {
          port: 8100,
          keepalive: false
        }
      }
    }



  };

  grunt.initConfig( grunt.util._.extend( taskConfig ) );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'configureProxies', 'connect:serversa' ] );

};
