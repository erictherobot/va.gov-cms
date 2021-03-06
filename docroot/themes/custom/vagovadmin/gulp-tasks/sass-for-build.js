/**
 * @file
 * Task: Compile: Sass.
 */

module.exports = function(gulp, options, plugins) {
  'use strict';

  gulp.task('sass-for-build', function() {
    return gulp.src([
        options.sass.sassFiles,
        options.sass.plFiles
      ])

      .pipe(plugins.sassglob())
      .pipe(plugins.sass({
        outputStyle: 'compressed', // compressed is the best option here but git diffs don't work well with it.
        includePaths: [
          'node_modules/breakpoint-sass/stylesheets',
          'node_modules/bourbon-neat/core'
        ]
      }).on('error', plugins.sass.logError))
      .pipe(plugins.prefix({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(plugins.postcss([
        plugins.mqpacker({ sort: true})
      ]))
      .pipe(plugins.concat('styles.css'))
      .pipe(gulp.dest(options.css.cssFiles));
  });

};
