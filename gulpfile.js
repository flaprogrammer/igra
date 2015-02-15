// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');


var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// include plug-ins
var autoprefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var server = require('gulp-server-livereload');




// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});



gulp.task('imagemin', function() {
  var imgSrc = './src/img/photos/*',
      imgDst = './build/img';
 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});
 

 
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/js/lib/*.js','./src/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.html',
      htmlDst = './build';
 
  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    //.pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});


gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
      .pipe(sass({errLogToConsole:true}))
      .pipe(autoprefix('last 2 versions'))
      .pipe(gulp.dest('./build/css'));
});


/*gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html'
    }));
});*/

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      //locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build/'))
});


 
// CSS concat, auto-prefix and minify
/*gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
});*/


gulp.task('default', ['imagemin', 'scripts', 'sass', 'jade'], function() {
  // watch for HTML changes
  /*gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });*/
  gulp.watch('./src/img/**/*', function() {
    gulp.run('imagemin');
  });
 
  gulp.watch('./src/jade/*.jade', function() {
    gulp.run('jade');
  });
 
  // watch for JS changes
  gulp.watch('./src/js/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
 
  // watch for CSS changes
 /* gulp.watch('./src/css/*.css', function() {
    gulp.run('styles');
  });*/
  gulp.watch('./src/scss/*.scss', function() {
    gulp.run('sass');
  });

});