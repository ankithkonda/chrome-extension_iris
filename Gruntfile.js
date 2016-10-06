module.exports = function(grunt){

    grunt.initConfig({
        concurrent:{
            app:["browserify:run", "watch"],
            options: {
                logConcurrentOutput: true
            }
        },
        browserify: {
            init:{
                files: {
                  'app/build/js/popup.js': ['www/js/popup.js'],
                  'app/build/js/background.js': ['www/js/background.js']
                }
            },
            run: {
                files: {
                  'app/build/js/app.js': ['www/js/app.js'],
                  'app/build/js/background.js': ['www/js/background.js']
                },
                options:{
                    watch: true,
                    keepAlive: true
                }
            }
        },
        watch:{
            
            scss_bundle:{
                files:["www/sass/**/*.scss"],
                tasks:["sass"]
            },
            popupjs_ugly:{
                files:["app/build/js/popup.js"],
                tasks:["uglify:popupjs"]
            },
            backjs_ugly:{
                files:["app/build/js/background.js"],
                tasks:["uglify:backjs"]
            }
        },
        uglify: {
            popupjs: {
              files: {
                'app/build/js/popup.min.js': ['app/build/js/popup.js']
              }
            },
            backjs: {
              files: {
                'app/build/js/background.min.js': ['app/build/js/background.js']

              }
            }

        },
        sass: {
            options:{
                outputStyle:"compressed"
            },
            dist: {
                files: {
                    'app/build/css/popup.min.css': 'www/sass/main.scss',
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('run', ["browserify:init","sass:dist","concurrent:app"]);
    grunt.registerTask('build', ["browserify:init","sass:dist","uglify"]);

}