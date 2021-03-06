'use strict';
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-add-view');

  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      },
      production: {
        src: ['ship/']
      },
      style:{
        src: ['build/css/']
      }
    },
    add_view: {
      prod:{
        src:  'app/views/**/*.html',
        dest: 'app/js/build/views.js'
      },
      dev:{
        src:  'app/views/**/*.html',
        dest: 'app/js/build/views.js'
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/**/*.css', 'img/**/*.*', 'webComponents/**/*.html'],
        dest: 'build/',
        filter: 'isFile'
      },
      cpBower:{
        expand: true,
        src: ['bower_components/**/*.*'],
        dest: 'build/',
        filter: 'isFile'
      },
      production: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/*.css', 'img/*.*', 'views/**/*.html'],
        dest: 'ship/',
        filter: 'isFile'
      },
      style:{
        expand: true,
        cwd: 'app/',
        src: ['css/*.css'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },

      production: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['app/js/**/*.js'],
        dest: 'ship/bundle.js'
      },

      angulartest: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['test/angular/**/*test.js'],
        dest: 'test/angular-testbundle.js'
      }
    },

    simplemocha: {
      all: {
        src: ['test/mocha/api/**/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.config.js'
      },
      continuous: {
        configFile: 'karma.config.js',
        singleRus: true,
        browsers: [ 'PhantomJS' ]
      }
    },

    express: {
      dev: {
        options: {
          options: 'server.js',
          background: true
        }
      },
      production: {
        options: {
          options: 'server.js',
          background: true
        }
      }
    },

    watch: {
      angulartest: {
        files: ['app/js/**/*.js', 'app/index.html', 'app/views/**/*.html', 'css/*.css', 'img/*.png'],
        tasks: ['browserify:angulartest', 'karma:unit'],
        options: {
          spawn: false
        }
      },
      express: {
        files: ['app/js/**/*.js', 'app/index.html', 'app/views/**/*.html', 'server.js', 'models/*.js', 'routes/*.js'],
        tasks: ['buildtest', 'express:dev'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.registerTask('build:dev', ['clean:dev','add_view:dev', 'browserify:dev', 'copy:dev', 'copy:cpBower']);
  grunt.registerTask('build:production', ['clean:production', 'browserify:production', 'copy:production']);
  grunt.registerTask('angulartest', ['browserify:angulartest', 'karma:unit']);
  grunt.registerTask('angulartestwatch', ['angulartest', 'watch:angulartest']);
  grunt.registerTask('test', ['angulartest', 'simplemocha']);
  grunt.registerTask('buildtest', ['test', 'build:dev']);
  grunt.registerTask('default', ['watch:express']);
  grunt.registerTask('copystyle',['clean:style', 'copy:style']);
  grunt.registerTask('apitest', 'simplemocha');
};
