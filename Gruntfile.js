'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,

        srcDir: 'theme/src',
        testDir: 'theme/test',
        distDir: 'theme/dist',
        
        timberSass: [
            'base/_variables.scss',
            'base/_mixins.scss',
            'base/_typography.scss',
            'base/_normalise.scss',
            'base/_grid.scss',
            'base/_stage.scss',
            'base/_helpers.scss',
            'components/_rich-text-editor.scss',
            'components/_links-and-buttons.scss',
            'components/_lists.scss',
            'components/_tables.scss',
            'components/_media-object.scss',
            'components/_images-and-iframes.scss',
            'components/_forms.scss',
            'components/_icons.scss',
            'components/_pagination.scss',
            'components/_header.scss',
            'components/_footer.scss',
            'components/_product-grid.scss',
            'components/_collection-filters.scss',
            'components/_breadcrumbs.scss',
            'components/_notes-and-form-feedback.scss',
            'pages/_product-page.scss',
            'pages/_blog-and-comments.scss',
            'pages/_cart.scss'
        ],

        liquidSettings : {
            'ajax_cart_enable': true,
            'ajax_cart_method': 'Drawer',
            'cart_notes_enable': true,
            'color_body_bg': '#fff',
            'color_body_text': '#333333',
            'color_borders': '#e5e5e5',
            'color_footer_bg': '#f2f2f2',
            'color_footer_social_link': '#bbbbbb',
            'color_footer_text': '#636363',
            'color_primary': '#747474',
            'color_secondary': '#464646',
            'customer_layout': 'theme',
            'favicon_enable': false,
            'footer_newsletter_enable': true,
            'footer_quicklinks_enable': true,
            'footer_quicklinks_linklist': 'footer',
            'footer_social_enable': true,
            'logo_max_width': '450',
            'logo_use_image': false
        },

        liquidFilters: {
            'asset_url': function(asset) {
                return '../assets/' + asset
            }
        }
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            // bower: {
            //     files: ['bower.json'],
            //     tasks: ['wiredep']
            // },
            sass: {
                files: ['<%= config.srcDir %>/sass/**/*'],
                tasks: [
                    'liquid',
                    'concat:testTimberSass',
                    'sass:test',
                    'autoprefixer:test'
                ]
            }
        },

        clean: {
            test: {
                dot: true,
                src: [
                '<%= config.testDir %>/**/*',
                ]
            },
            dist: {
                dot: true,
                src: [
                '<%= config.distDir %>/**/*',
                ]
            }
        },

        copy: {
            srcToTest: {
                files: [
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/',
                    src: ['scripts/**/*','images/**/*', 'fonts/**/*'],
                    dest: '<%= config.testDir %>/assets'
                },
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/config/',
                    src: ['**/*'],
                    dest: '<%= config.testDir %>/config'
                },
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/layout/',
                    src: ['**/*'],
                    dest: '<%= config.testDir %>/layout'
                },
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/snippets/',
                    src: ['**/*'],
                    dest: '<%= config.testDir %>/snippets'
                },
                {
                    expand: true, 
                    flatten: false,
                    cwd: '<%= config.srcDir %>/templates/',
                    src: ['**/*'],
                    dest: '<%= config.testDir %>/templates/'
                },
                ]
            },
            srcToDist: {
                files: [
                {
                    expand: true, 
                    flatten: false,
                    cwd: '<%= config.srcDir %>/sass/',
                    src: ['**/*'],
                    dest: '<%= config.distDir %>/sass/'
                },
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/',
                    src: ['scripts/**/*','images/**/*', 'fonts/**/*'],
                    dest: '<%= config.distDir %>/assets'
                },
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/config/',
                    src: ['**/*'],
                    dest: '<%= config.distDir %>/config'
                },
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/layout/',
                    src: ['**/*'],
                    dest: '<%= config.distDir %>/layout'
                },
                {
                    expand: true, 
                    flatten: true,
                    cwd: '<%= config.srcDir %>/snippets/',
                    src: ['**/*'],
                    dest: '<%= config.distDir %>/snippets'
                },
                {
                    expand: true, 
                    flatten: false,
                    cwd: '<%= config.srcDir %>/templates/',
                    src: ['**/*'],
                    dest: '<%= config.distDir %>/templates/'
                },
                ]
            }
        },

        liquid: {
            options: {
                includes: 'test/fixtures/inc',
                settings: config.liquidSettings,
                filters: config.liquidFilters,
            },
            pages: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= config.srcDir %>/sass/',
                        src: ['**/*.liquid'],
                        dest: '<%= config.testDir %>/sass/',
                        ext: '.scss'
                    }
                ]
            }
        },

        concat: {
            testTimberSass: {
                files: [
                     {   
                        expand: true,
                        cwd:  '<%= config.testDir %>/sass/timber/',
                        src: config.timberSass,
                        dest: '<%= config.testDir %>/sass/timber.scss',
                        rename: function (dest, src) {
                            return dest;
                        }
                    }
                ]
            },
            distTimberSass: {
                files: [
                     {   
                        expand: true,
                        cwd:  '<%= config.distDir %>/sass/timber/',
                        src: config.timberSass,
                        dest: '<%= config.distDir %>/sass/timber.scss',
                        rename: function (dest, src) {
                            return dest;
                        }
                    }
                ]
            },
        },

        // Compile Scss
        sass: {
            test: {
                options: {
                    style: 'expanded',
                    bundleExec: true
                },
                files: [
                    {   
                        expand: true,
                        cwd:  '<%= config.testDir %>/sass/',
                        src: ['*.scss'],
                        dest: '<%= config.testDir %>/styles/',
                        ext: '.css'
                    }
                ]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 3 version']
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '<%= config.testDir %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.testDir %>/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.distDir %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.distDir %>/styles/'
                }]
            }
        },


        // Run some tasks in parallel to speed up build process
        concurrent: {}
    });

    grunt.registerTask('test', [
        'clean:test',
        'copy:srcToTest',
        'liquid',
        'concat:testTimberSass',
        'sass:test',
        'autoprefixer:test'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'copy:srcToDist', 
        'concat:distTimberSass',
        'autoprefixer:dist'
    ]);

};