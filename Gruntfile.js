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

    // var ngrok = require('ngrok');
    // var localtunnel = require('localtunnel');
    var target = grunt.option('target') || 'test';

    // Configurable paths
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,

        srcDir: 'theme/src',
        testDir: 'theme/test',
        distDir: 'theme/dist',
        
        timberSass: [
            '/base/variables',
            '/base/mixins',
            '/base/normalise',
            '/base/grid',
            '/base/stage',
            '/base/helpers',
            '/base/typography',
            '/components/rich-text-editor',
            '/components/links-and-buttons',
            '/components/lists',
            '/components/tables',
            '/components/media-object',
            '/components/images-and-iframes',
            '/components/forms',
            '/components/icons',
            '/components/pagination',
            '/components/header',
            '/components/footer',
            '/components/product-grid',
            '/components/collection-filters',
            '/components/breadcrumbs',
            '/pages/product-page',
            '/pages/blog-and-comments',
            '/pages/notes-and-feedback',
            '/pages/cart'
        ]
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
            scss: {
                files: ['assets/timber.scss.liquid'],
                tasks: ['copy:liquidsass', 'liquid', 'sass', 'autoprefixer:src']
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
                files [
                    {
                        expand: true, 
                        flatten: true,
                        src: ['<%= config.srcDir %>/scripts/**', '<%= config.srcDir %>/images/**', '<%= config.srcDir %>/fonts/**'],
                        dest: '<%= config.testDir %>/assets'
                    },
                    {
                        expand: true, 
                        flatten: true,
                        src: ['<%= config.srcDir %>/config/**'],
                        dest: '<%= config.testDir %>/config'
                    },
                    {
                        expand: true, 
                        flatten: true,
                        src: ['<%= config.srcDir %>/layout/**'],
                        dest: '<%= config.testDir %>/layout'
                    },
                    {
                        expand: true, 
                        flatten: true,
                        src: ['<%= config.srcDir %>/snippets/**'],
                        dest: '<%= config.testDir %>/snippets'
                    },
                    {
                        expand: true, 
                        flatten: false,
                        src: ['<%= config.srcDir %>/templates/**'],
                        dest: '<%= config.testDir %>/templates'
                    },
                ]
            }
        },

        liquid: {
            options: {
                includes: 'test/fixtures/inc',
                settings: {
                  "ajax_cart_enable": true,
                  "ajax_cart_method": "Drawer",
                  "cart_notes_enable": true,
                  "color_body_bg": "#fff",
                  "color_body_text": "#333333",
                  "color_borders": "#e5e5e5",
                  "color_footer_bg": "#f2f2f2",
                  "color_footer_social_link": "#bbbbbb",
                  "color_footer_text": "#636363",
                  "color_primary": "#747474",
                  "color_secondary": "#464646",
                  "customer_layout": "theme",
                  "favicon_enable": false,
                  "footer_newsletter_enable": true,
                  "footer_quicklinks_enable": true,
                  "footer_quicklinks_linklist": "footer",
                  "footer_social_enable": true,
                  "logo_max_width": "450",
                  "logo_use_image": false
                },
                filters: {
                  asset_url: function(asset) {
                    return "./assets/" + asset
                  }
                }
            },
            pages: {
              files: [
                {
                    src: './styleguide/public/timber.scss',
                    dest: './styleguide/public/timber.scss'
                }
              ]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 3 version']
            },
            src: {
                files: [{
                    expand: true,
                    cwd: 'styleguide/public/styles',
                    src: '{,*/}*.css',
                    dest: 'styleguide/public/styles'
                }]
            }
        },

        // Compile Scss
        sass: {
            src: {
                options: {
                    style: 'expanded',
                    bundleExec: true
                },
                files: [{
                    src: ['styleguide/public/timber.scss'],
                    dest: 'styleguide/public/styles/screen.css'
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {}
    });
    
    grunt.registerTask('test', [
        'copy:liquidsass', 
        'liquid', 
        'sass', 
        'autoprefixer:src'
    ]);

    grunt.registerTask('build', [
        'copy:liquidsass', 
        'liquid', 
        'sass', 
        'autoprefixer:src']
    );
};
