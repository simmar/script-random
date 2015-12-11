module.exports = function (grunt) {

    // Load plugins
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-sass');

    // Ressources path
    var imagePath = './img/';
    var jsPath = './js/';
    var cssPath = './css/';
    var scssPath = './css/';

    //All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        // Concat javascript files
        concat: {
            vendors: {
                src: [
                    jsPath + 'vendor/jquery.js'
                ],
                dest: jsPath + 'build/vendors.js'
            },
            main: {
                src: [
                    jsPath + 'libs/console.js',
                    jsPath + 'libs/cnilkies.js',
                    jsPath + 'libs/scrollto.js',
                    jsPath + 'libs/socialsharing.js',
                    jsPath + 'base.js'
                ],
                dest: jsPath + 'build/main.js'
            }
        },

        // Uglify javascript files
        uglify: {
            libs: {
                src: jsPath + 'build/vendors.js',
                dest: jsPath + 'build/vendors.min.js'
            },
            main: {
                src: jsPath + 'build/main.js',
                dest: jsPath + 'build/main.min.js'
            }
        },

        // Compile sass files
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    noCache: true,
                    sourcemap: 'none'
                },
                expand: true,
                cwd: scssPath,
                src: ['all.scss'],
                dest: cssPath,
                ext: '.css'
            },
            dev: {
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    lineNumbers: false,
                    update: true // improve compile speed
                },
                expand: true,
                cwd: scssPath,
                src: ['all.scss'],
                dest: cssPath,
                ext: '.css'
            }
        },

        // PostCSS for autoprefixer
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['> 1%']})
                ],
                map: true
            },
            multiple_files: {
                expand: true,
                cwd: cssPath,
                src: '{,*/}*.css',
                dest: cssPath
            }
        },

        // JS hint
        jshint: {
            files: [jsPath+'/**/*.js', '!'+jsPath+'/vendor/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Make a zipfile of static files
        compress: {
            main: {
                options: {
                    archive: 'archive.zip'
                },
                files: [
                    {
                        src: [
                            // add html files if needed
                            cssPath + 'all.css',
                            jsPath + '{,*/}*.js',
                            imagePath + '{,*/}*'
                        ],
                        dest: '/',
                        filter: 'isFile'}
                ]
            }
        },

        // Compress PNG : Free for 500 images per month (https://tinypng.com/developers)
        tinypng: {
            options: {
                apiKey: "1mIlF58_aSuMWsXBkkcAAQ_-Ey7wZ7ci",
                    checkSigs: false,
                    sigFile: 'file_sigs.json',
                    summarize: true,
                    showProgress: true,
                    stopOnImageError: true
            },
            compress: {
                expand: true,
                    src:  imagePath + '**/*.png',
                    ext: '.png'
            }
        },

        // Watch changes
        watch: {
            options: {
                livereload: true // http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
            },
            configFiles: {
                files: ['Gruntfile.js']
            },
            markup: {
                files: ['**/*.php'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: [jsPath + '**/*.js'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: [scssPath + '**/*.scss'],
                tasks: ['sass:dev','postcss'],
                options: {
                    spawn: false
                }
            }
        },

        // Browser Synch
        browserSync: {
            bsFiles: {
                src : [
                    '**/*.php',
                    cssPath + '**/*.css',
                    jsPath + '**/*.js'
                ]
            },
            options: {
                watchTask: true,
                proxy: 'localhost'
            }
        }

    });

    // Tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('css', ['sass:dev','postcss']);
    grunt.registerTask('synch', ['browserSync', 'watch']);
    grunt.registerTask('build', ['concat', 'uglify', 'sass:dist','postcss']);
    grunt.registerTask('zip', ['compress']);
    grunt.registerTask('js', ['jshint']);
    grunt.registerTask('png', ['tinypng']);

};
