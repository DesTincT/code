module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["src/**"],

    react: {
      production: {
        files: [
          {
            expand: true,
            cwd: 'src/jsx',
            src: ['**/*.jsx'],
            dest: 'dist/js',
            ext: '.js'
          }
        ]
      }
    },

    requirejs: {
      menu: {
        options: {
          baseUrl: "dist/js",
          name: "menu",
          out: "dist/js/menu.js",
          optimize: "none",
          skipModuleInsertion: true,
          onModuleBundleComplete: function (data) {
            var fs = require('fs'),
              amdclean = require('amdclean'),
              outputFile = data.path;

            fs.writeFileSync(outputFile, amdclean.clean({
              'filePath': outputFile,
              'aggressiveOptimizations': false,
            }));
          }
        }
      }
    },

    concat: {
      menu: {
        src: [
          'bower_components/react/react.js',
          'bower_components/react/react-with-addons.js',
          'bower_components/Sortable/Sortable.min.js',
          'bower_components/Sortable/react-sortable-mixin.js',
          'dist/js/menu.js'
        ],
        dest: 'main.js'
      },
    },

    less: {
      all: {
        files: {
          "main.css": "src/main.less"
        }
      }
    },

    replace: {
      fonts: {
        src: ['main.css'],
        overwrite: true,
        replacements: [{
          from: /..\/fonts/g,
          to: "bower_components/bootstrap/fonts"
        }]
      }
    },

    watch: {
      less: {
        files: 'src/**/*.less',
        tasks: ['less'],
        options: {
          interrupt: true,
        },
      },

      react: {
        files: 'src/**/*.jsx',
        tasks: ['react', 'requirejs', 'concat']
      }
    }
  });


  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-react');


  // Компиляция по умолчанию
  grunt.registerTask('default', [
    'npm-install', 'all'
  ]);

  grunt.registerTask('all', [
    'react', 'requirejs', 'concat', 'less', 'replace'
  ]);

};
