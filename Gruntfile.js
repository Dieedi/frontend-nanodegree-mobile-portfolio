module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            options: {
            // Task-specific options go here.
                diff: true,
            },
            multiple_files: {
            // Target-specific file lists and/or options go here.
                expand: true,
                flatten: true,
                files: {
                    '.tmp/css/print.css': ['project/css/print.css'],
                    '.tmp/css/style.css': ['project/css/style.css'],
                    '.tmp/views/styles/style.css': ['project/views/styles/style.css']
                }
            },
        },

        concat: {
            js: {
                files: {
                    '.tmp/js/main.js': ['project/js/perfmatters.js'],
                    '.tmp/views/scripts/main.js': ['project/views/scripts/main.js']
                }
            },

            css: {
                //  Source is .tmp, autoprefixer will run before concat for CSS files
                files: {
                    '.tmp/css/styles.css': ['.tmp/css/print.css', '.tmp/css/style.css']
                }
            },
        },

        cssmin: {
            target: {
                files: {
                    'dist/css/styles.css': ['.tmp/css/styles.css'],
                    'dist/views/styles/style.css': ['.tmp/views/styles/style.css'],
                    'dist/views/styles/bootstrap-grid.css': ['project/views/styles/bootstrap-grid.css']
                }
            }
        },

        jshint: {
            files: ['project/js/*.js'],

            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/main.js': ['.tmp/js/main.js'],
                    'dist/views/scripts/main.js': ['.tmp/views/scripts/main.js']
                }
            }
        },

        processhtml: {
            dist: {
                files: {
                    '.tmp/index.html': ['project/index.html'],
                    '.tmp/views/pizza.html': ['project/views/pizza.html'],
                    '.tmp/project-2048.html': ['project/project-2048.html'],
                    '.tmp/project-mobile.html': ['project/project-mobile.html'],
                    '.tmp/project-webperf.html': ['project/project-webperf.html']
                }
            }
        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },

              files: {                                   // Dictionary of files
                'dist/index.html': ['.tmp/index.html'],
                'dist/views/pizza.html': ['.tmp/views/pizza.html'],
                'dist/project-2048.html': ['.tmp/project-2048.html'],
                'dist/project-mobile.html': ['.tmp/project-mobile.html'],
                'dist/project-webperf.html': ['.tmp/project-webperf.html']
              }
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,

                        cwd: 'project/img/',
                        src: ['**/*.png'],

                        dest: 'dist/img/',
                        ext: '.png'
                    }]
            },

            pngpiz: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,

                        cwd: 'project/views/images/',
                        src: ['**/*.png'],

                        dest: 'dist/views/images/',
                        ext: '.png'
                    }]
            },

            jpg: {
                options: {
                    progressive: true,
                    optimizationLevel: 7
                },

                files: [
                    {
                        expand: true,

                        cwd: 'project/img/',
                        src: ['**/*.jpg'],

                        dest: 'dist/img/',
                        ext: '.jpg'
                    }]
            },

            jpgpiz: {
                 options: {
                    progressive: true,
                    optimizationLevel: 7
                },

                files: [
                    {
                        expand: true,

                        cwd: 'project/views/images/',
                        src: ['**/*.jpg'],

                        dest: 'dist/views/images/',
                        ext: '.jpg'
                    }]
            }
        },

        image_resize: {
            no_overwrite: {
                options: {
                    width: 100,
                },
                files: {
                    'project/views/images/pizzeriamini.jpg': 'project/views/images/pizzeria.jpg'
                }
            }
        },

        /*copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['project/project*.html'],
                        dest: 'dist/',
                        filter: 'isFile',
                        flatten: true
                    }
                ],
            },
        },
*/
        connect: {
            dist: { // give your task a name
                options: {
                    hostname: '127.0.0.1',
                    port: 3000, // configure your port here
                    base: './dist', // configure your site distribution path here
                    keepalive: true
                }
            },
            project: {
                options: {
                    hostname: '127.0.0.1',
                    port: 3000, // configure your port here
                    base: './project', // configure your site distribution path here
                    keepalive: true
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            css: {
                files: ['project/css/**/*.css'],
                tasks: ['autoprefixer', 'concat', 'cssmin']
            },

            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'concat', 'uglify']
            }
        },
    });

    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //  Task setup
    grunt.registerTask('build', [
                                    'jshint',
                                    'autoprefixer',
                                    'concat',
                                    'cssmin',
                                    'uglify',
                                    'processhtml',
                                    'htmlmin',
                                    'imagemin',
                                    /*'copy'*/]);

    grunt.registerTask('default', [ //  List of tasks to execute.
                                    'jshint',
                                    'autoprefixer',
                                    'concat',
                                    'cssmin',
                                    'uglify',
                                    'processhtml',
                                    'htmlmin',
                                    'imagemin',
                                    'watch']);
};