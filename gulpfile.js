/**
 * gulp�������
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


/*jsѹ��*/
gulp.task('js', function(cb) {
  pump([
      gulp.src(config.js.src),
      uglify(),
      gulp.dest(config.js.dist)
    ],
    cb
  );
});

/*����sass�ļ�*/
gulp.task('sass', () => gulp
  .src(config.sass.src)
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(rename('global.css'))
  .pipe(gulp.dest(config.sass.dist))
);

/*����css�ļ�*/
gulp.task('css', ['sass'], () => gulp
  .src(config.css.src)
  .pipe(sourcemaps.init())
  .pipe(autoprefixer({ browsers: ['last 2 versions', 'not ie <= 7'], cascade: false }))
  .pipe(cleanCSS())
  .pipe(config.isPublic ? '' : sourcemaps.write(config.css.map))
  .pipe(connect.reload())
  .pipe(gulp.dest(config.css.dist))
);

/*����html�ļ�*/
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
/*������̬��Դ�ļ�*/
gulp.task('assets', () => gulp
  .src(Array.prototype.concat.call([], config.assets.src))
  .pipe(gulp.dest(config.dist))
);


/*����js�ļ��仯*/
gulp.task('js:watch', () => gulp
  .watch(config.js.src, ['js'])
);
/*����sass�ļ��仯*/
gulp.task('sass:watch', () => gulp
  .watch(config.sass.watch, ['css'])
);

/*����html�ļ��仯*/
gulp.task('html:watch', () => gulp
  .watch(config.html.src, ['html'])
);

gulp.task('build', ['js', 'css', 'html', 'font', 'assets']);
gulp.task('watch', ['sass:watch', 'html:watch', 'js:watch']);

/*�������Ŀ¼*/
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
