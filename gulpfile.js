/**
 * gulp相关配置
 * author:baixiaosheng
 * date:2016-8-122
 */

const
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  pump = require('pump'),
  config = require('./config.js');


/*js压缩*/
gulp.task('js', function(cb) {
  pump([
      gulp.src(config.js.src),
      uglify(),
      gulp.dest(config.js.dist)
    ],
    cb
  );
});

/*编译sass文件*/
gulp.task('sass', () => gulp
  .src(config.sass.src)
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(rename('global.css'))
  .pipe(gulp.dest(config.sass.dist))
);

/*拷贝css文件*/
gulp.task('css', ['sass'], () => gulp
  .src(config.css.src)
  .pipe(sourcemaps.init())
  .pipe(autoprefixer({ browsers: ['last 2 versions', 'not ie <= 7'], cascade: false }))
  .pipe(cleanCSS())
  .pipe(config.isPublic ? '' : sourcemaps.write(config.css.map))
  .pipe(connect.reload())
  .pipe(gulp.dest(config.css.dist))
);

/*拷贝html文件*/
gulp.task('html', () => gulp
  .src(config.html.src)
  .pipe(connect.reload())
  .pipe(gulp.dest(config.html.dist))
);
gulp.task('font', () => gulp
  .src(config.font.src)
  .pipe(connect.reload())
  .pipe(gulp.dest(config.font.dist))
);
/*拷贝静态资源文件*/
gulp.task('assets', () => gulp
  .src(Array.prototype.concat.call([], config.assets.src))
  .pipe(gulp.dest(config.dist))
);


/*监视js文件变化*/
gulp.task('js:watch', () => gulp
  .watch(config.js.src, ['js'])
);
/*监视sass文件变化*/
gulp.task('sass:watch', () => gulp
  .watch(config.sass.watch, ['css'])
);

/*监视html文件变化*/
gulp.task('html:watch', () => gulp
  .watch(config.html.src, ['html'])
);

gulp.task('build', ['js', 'css', 'html', 'font', 'assets']);
gulp.task('watch', ['sass:watch', 'html:watch', 'js:watch']);

/*清空生成目录*/
gulp.task('clean', () => gulp
  .src(config.dist)
  .pipe(clean())
);


gulp.task('server', ['build'], () => connect
  .server({
    root: './build/',
    fallback: './build/html/index.html',
    port: 8000,
    livereload: true
  })
);

gulp.task('default', ['server', 'watch']);
