var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
// var uglify = require('gulp-uglify');
var uglify = require('gulp-uglifyes');
var pump = require('pump');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect-php');

/* * * * 
// 
// if install is'nt work for permission try this:
//
// $ sudo npm install --unsafe-perm
//
* * * */

gulp.task('default', function() {
	console.log('Hola mundo!!');
})

gulp.task('serve', ['sassCompi'], function() {
	connect.server({}, function (){
		browserSync.init({
			proxy: '127.0.0.1:8000/app/',
			port: 8910
		});
	});
    gulp.watch("scss/**/*.scss", ['sassCompi']);
    console.log('\n'+'⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮'+'\n'+'👉  👉  👉  WATCHING SASS/CSS FILES 👀 . . .'+'\n');

    gulp.watch("js/**/*.js", ['jsCompress']);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    console.log('⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮'+'\n'+'👉  👉  👉  WATCHING JS FILES 👀 . . .'+'\n');

    gulp.watch("app/*.html").on('change', browserSync.reload);
    console.log('⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮'+'\n'+'👉  👉  👉  WATCH RELOAD HTML FILES 👀 . . .'+'\n');

    gulp.watch("app/*.php").on('change', browserSync.reload);
    console.log('⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮'+'\n'+'👉  👉  👉  WATCH RELOAD PHP FILES 👀 . . .'+'\n');
});

// sass compilation
gulp.task('sassCompi', function() {
	return gulp.src('scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(cssnano())
	.pipe(autoprefixer({
		browsers: ['last 10 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

// js minification
gulp.task('jsCompress', function(cb) {
	pump([
		gulp.src('js/**/*.js'),
		uglify(),
		gulp.dest('app/js/')
	], cb );
});




