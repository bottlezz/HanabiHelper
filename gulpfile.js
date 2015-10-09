var gulp = require('gulp');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var streamify = require('gulp-streamify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var babelify = require('babelify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: './',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/app.react.js'
};
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});


gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [babelify,reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .on('error', handleErrors)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){

  gulp.src('dist/src/build.js')
    .pipe(gulp.dest(path.DEST_BUILD+"/prodBuild"));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'prodBuild/build.js'
    }))
    .pipe(gulp.dest(path.DEST_BUILD));
});


gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['watch']);
