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

        srcDir: '',
        buildDir: target,

        appDir: '',
        templateDir: '',
        publicDir: '',
        themeDir: '',

        imageDir: 'images',
        scriptDir: 'scripts',
        fontDir: 'fonts',
        stylesDir: 'styles',
        scssDir: 'scss',

        appSrcDir: '', // '<%= config.srcDir %>/<%= config.appDir %>',
        templateSrcDir: '', // '<%= config.appSrcDir %>/<%= config.templateDir %>',
        publicSrcDir: '', // '<%= config.srcDir %>/<%= config.publicDir %>',
        themeSrcDir: '', //'<%= config.publicSrcDir %>/<%= config.themeDir %>',

        appBuildDir: '<%= config.buildDir %>/<%= config.appDir %>',
        templateBuildDir: '<%= config.appBuildDir %>/<%= config.templateDir %>',
        publicBuildDir: '<%= config.buildDir %>/<%= config.publicDir %>',
        themeBuildDir: '<%= config.publicBuildDir %>/<%= config.themeDir %>',

        localtunnel: {
            port: 80,
            local_host: 'local.craft-template'
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
            scss: {
                files: ['assets/timber.scss.liquid'],
                tasks: ['copy:liquidsass', 'liquid', 'sass', 'autoprefixer:src']
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
                products: [
                    {
                      name: "Wonderflonium",
                      price: "$9.99",
                      description: "Great for building freeze rays!"
                    }
                ],
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

        copy: {
            liquidsass: {
                dest: './styleguide/public/timber.scss',
                src: './assets/timber.scss.liquid'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {}
    });

    grunt.registerTask('build', ['copy:liquidsass', 'liquid', 'sass', 'autoprefixer:src']);

};
