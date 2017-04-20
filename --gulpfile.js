// Include gulp
var gulp = require('gulp');
 // Define base folders
var src = 'app/';
var dest = 'dist/';
 // Include plugins
var rename = require('gulp-rename');
var rubySass = require('gulp-ruby-sass');
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
var browserSync = require('browser-sync');
var reload = browserSync.reload;


 // Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(src + 'scripts/*.js')
      .pipe(plugins.concat('main.js'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'js'));
});
 // Compile CSS from Sass files
gulp.task('styles', function() {
    return gulp.src(src + 'styles/main.scss')
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.rubySass({style: 'compressed'}))
        .pipe(gulp.dest(dest + 'css'));
});

//html
gulp.task('html', function () {
  var assets = plugins.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(plugins.fileInclude())
    .pipe(assets)
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(assets.restore())
    .pipe(plugins.useref())
    // .pipe(plugins.if('*.html', plugins.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});


//fonts
gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

//images
 gulp.task('images', function() {
  return gulp.src(src + 'img/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dest + 'img'));
});

//fileinclude
gulp.task('fileinclude', function () {
    return gulp.src('app/*.html')
        .pipe(plugins.fileInclude())
        .pipe(plugins.size())
        .pipe(gulp.dest('.tmp'));
});

//jshint
gulp.task('jshint', function () {
  return gulp.src('app/!scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});


//browersync
gulp.task('serve', ['styles', 'fileinclude', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

 // watch for changes
  gulp.watch([
    'app/*.html',
    'app/**/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch(['app/*.html', 'app/**/*.html'], ['fileinclude']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

 // Default Task
gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'fileinclude'], function () {
  return gulp.src('dist/**/*').pipe(plugins.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});