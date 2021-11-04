/* jshint node: true*/

'use strict';

module.exports = function( grunt ) {
  
  // Project configuration.
  grunt.initConfig({
    // This line makes your node configurations available for use
    pkg: grunt.file.readJSON('package.json'),

    'http-server': {
        // the server root directory
        root: 'app/index.html',

        host: 'localhost',
        port: 8082,

        cache: 1,
        showDir : true,
        autoIndex: true,
        defaultExt: "html",

        // run in parallel with other tasks
        runInBackground: false
    },

    jshint: {
      src: 'app/js/aggregated.js',
      options: {  // For information on the options, check http://jshint.com/docs/options/
        // Enforcing JSHint's options
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: 'nofunc',
        newcap: false,  // temp because of Caman
        noarg: true,
        noempty: true,
        nonew: true,
        quotmark: 'single',
        undef: true,
        unused: 'vars',
        devel: true,
        browser: true,
        predef: ['angular', 'Headroom']
      }
    },
    concat: {
      dist: {
        src: ['app/*.js', 'app/assets/**/*.js', 'app/states/**/*js'],
        dest: 'app/js/aggregated.js'
      }
    },
    uglify: { // Begin JS Uglify Plugin
      build: {
        src: ['app/js/aggregated.js'],
        dest: 'app/js/aggregated.min.js'
      }
    },

    sass: {
      dist: {
        files: {
          'app/css/main.css': 'app/css-sources/main.scss'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/css',
          src: ['*.css', '!*.min.css'],
          dest: 'app/css',
          ext: '.min.css'
        }]
      }
    },

    svgstore: {  // for the svg to sprite sheet plugin
      options: {
        prefix: 'icon-', // This will prefix each ID
        cleanup: ['fill', 'style'],
        svg: {
          xmlns: 'http://www.w3.org/2000/svg',
          style: 'display: none;'
        }
      },
      default: {
        files: {
          'app/img/dest.svg': ['app/img/svgs/*.svg'],
        },
      }
    },

    watch: {
      js: {
        files: ['app/*.js', 'app/js/*.js', 'app/assets/**/*.js', 'app/states/**/*js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      svg: {
        files: ['app/img/svgs/*.svg'],
        tasks: ['svgstore'],
        options: {
          spawn: false
        }
      },
      css: {
        files: 'app/**/*.scss',
        tasks: ['sass', 'cssmin'],
        options: {
          spawn: false
        }
      }
    }

  });

  // Each plugin must be loaded following this pattern
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', 'http-server' );
  grunt.registerTask('dev', ['concat', 'uglify', 'sass', 'cssmin', 'watch'] );
};