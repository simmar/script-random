module.exports = function (grunt) {


    // 1. Chargement des packages
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-php2html');
    grunt.loadNpmTasks('grunt-contrib-copy');


    // 2. Chemins
    var cssPath = './css/';
    var scssPath = './css/';
    var imagePath = './img/';
    var jsPath = './js/';
    var buildPath = './build_html/';

    // 3. Configuration des taches Grunt
    grunt.initConfig({

        // Compile SASS to CSS
        sass: {
            // Pour le dev
            dev: {
                options: {
                    outputStyle: 'expanded',
                    indentType: 'space',
                    indentWidth: 4,
                    debugInfo: true,
                    lineNumbers: false,
                    sourceMap: true,
                    outFile: null
                },
                files: [{
                    expand: true,
                    cwd: scssPath,          // dossier source
                    src: ['**/*.scss'],     // extension source
                    dest: cssPath,          // dossier destination
                    ext: '.css'             // extansion destination
                }]
            },
            // Pour la prod
            prod: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true,
                    outFile: null
                },
                files: [{
                    expand: true,
                    cwd: scssPath,
                    src: ['**/*.scss'],
                    dest: cssPath,
                    ext: '.css'
                }]
            }
        },

        // PostCSS for autoprefixer
        postcss :{
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['> 1%']})
                ]
            },
            multiple_files: {
                expand: true,
                cwd: cssPath,
                src: '{,*/}*.css',
                dest: cssPath
            }
        },

        // watch changes
        watch: {
            options: {
                livereload: true // http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
            },
            configFiles: {
                files: ['Gruntfile.js']
            },
            markup:             {// Pour les fichiers php
                files: ['**/*.php'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: [jsPath + '/**/*.js', '!' + jsPath + 'build/**/*.js'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: [scssPath + '**/*.scss'],
                tasks: ['sass:dev', 'postcss'], // sur le watch, on relance la complile sass:dev et le postcss pour autoprefixer
                options: {
                    spawn: false
                }
            }
        },

        // make a zipfile of static files
        compress: {
            main: {
                options: {
                    archive: 'archive.zip'
                },
                files: [
                    {
                        src: [buildPath + '**/*'],
                        dest: '/'
                    }
                ]
            }
        },

        // convert php to html
        php2html: {
            options: {
                // Task-specific options go here.
                processLinks: true,
                htmlhint:{
                    'tagname-lowercase': false,
                    'attr-lowercase': false,
                    'attr-value-double-quotes': false,
                    'doctype-first': false,
                    'tag-pair': false,
                    'spec-char-escape': false,
                    'id-unique': false,
                    'src-not-empty': false
                }
            },
            dist:{
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['*.php'],
                        dest: buildPath,
                        ext: '.html'
                    }
                ]
            }
        },

        // Copy all static files to build
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: [cssPath + 'all.css'], dest: buildPath, filter: 'isFile'},
                    {expand: true, src: [jsPath + '{,*/}*'], dest: buildPath, filter: 'isFile'},
                    {expand: true, src: [imagePath + '{,*/}*'], dest: buildPath, filter: 'isFile'}
                ]
            }
        }

    });

    // 4. Définition des tâches Grunt
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('synch', ['browserSync', 'watch']);
    grunt.registerTask('build', ['sass:prod','postcss' ]);
    grunt.registerTask('zip', ['compress']);
    grunt.registerTask('html', ['php2html:dist']);
    grunt.registerTask('copi', ['copy']);

};