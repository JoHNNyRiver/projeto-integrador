// Chamando todas as Tasks
let gulp         = require('gulp');
let jshint 		 = require('gulp-jshint');
let cleanCSS     = require('gulp-clean-css');
let runSequence  = require('run-sequence');
let clean 		 = require('gulp-clean');
let concat       = require('gulp-concat');
let jsmin 		 = require('gulp-jsmin');
let autoprefixer = require('gulp-autoprefixer');
let connect 	 = require('gulp-connect');
let imagemin 	 = require('gulp-imagemin');
let watch        = require('gulp-watch');

// =========== | INICIANDO AS TASK's | ============== // 

// task clean
gulp.task('clean', () =>{
	gulp.src('build/')
	.pipe(clean());
}); 

// JS Hint
gulp.task('jshint', () =>{
	return gulp.src('public/javascript/*.js')
	.pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('default'));
}); 

// Css minifier
gulp.task('mincss', () =>{
    return gulp.src('public/*/*.css')    
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({
    	browsers: ['last 2 versions'],
    	cascade: true
    }))
    .pipe(concat('all-css.min.css'))
    .pipe(gulp.dest('build/css'));
}); 

// Prefixer Css && Sass
gulp.task('prefixer', () => {
  return gulp.src('public/**/*.css')
});

// Minificando o js com MinJs
gulp.task('uglify', () => {
	return gulp.src('public/javascript/*.js')
    .pipe(jsmin())
    .pipe(concat('all-scripts.min.js'))
    .pipe(gulp.dest('build/js'));
});

// Minificando as imagens
gulp.task('imagemin', () =>{
    return gulp.src('public/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images/'));
});

// Servidor Front apenas para teste
gulp.task('connect', () => {
    return connect.server({
    name: 'App',
    root: './',
    port: 7070,
    livereload: true
  });

});
// Gulp watch
gulp.task('watch', () =>{
    return gulp.watch(['public/javascript/*.js', 'public/css/*.css', 'public/images/*'], 
                      ['uglify', 'mincss', 'prefixer', 'imagemin']);
});

// Gerando por sequencia (Primeiro rodar um gulp clean depois só gulp)
gulp.task('default', (cb) => {
	 runSequence(['imagemin','jshint', 'mincss', 'uglify', 'prefixer', 'watch'], cb);
});