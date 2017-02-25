'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


gulp.task('hello',function(){
    console.log('hello world');
});

/*LIVE RELOAD*/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

/*Kompilacja plików scss do css*/
gulp.task('sass', function(){
   return gulp.src('app/scss/**/*.scss')
       .pipe(sass())
       .on('error', function (err) {
            console.log(err.toString());

            this.emit('end');
        })
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({
          stream: true
        }))
    
});


/*Przenoszenie plików html do dist*/
gulp.task('dist',function(){
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));
});

/*Przenoszenie plików css do dist i minifikacja*/
gulp.task('cssnano',function(){
    return gulp.src('app/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

/*Przenoszenie plików js do dist i minifikacja*/
gulp.task('uglify',function(){
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

/*Przenoszenie plików img do dist i minifikacja*/
gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

/*Przenoszenie plików font do dist*/
gulp.task('fonts',function(){
    return gulp.src('app/fonts/**')
        .pipe(gulp.dest('dist/fonts'));
});


gulp.task('build',['sass','dist','cssnano','uglify','images','fonts']);

/* Obserwacja zmian w plikach */
gulp.task('watch',['sass','browserSync'], function(){
   gulp.watch('app/scss/**/*.scss',['sass']);  
   gulp.watch('app/*.html', browserSync.reload); 
});

