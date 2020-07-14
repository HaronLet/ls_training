const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task('clean', () => {
  return src('./course_2/dist/**/*', { read: false })
    .pipe(rm());
});

task('copy:html', () => {
  return src('./course_2/src/*.html')
    .pipe(dest('./course_2/dist'))
    .pipe(reload({ stream: true }));
});

task('copy:fancybox', () => {
  return src('./course_2/src/fancybox-2.1.7/**/*')
    .pipe(dest('./course_2/dist/fancybox-2.1.7'))
    .pipe(reload({ stream: true }));
});

// task('copy:Owl', () => {
//   return src('./course_2/src/OwlCarousel2-2.3.4/**/*')
//     .pipe(dest('./course_2/dist/OwlCarousel2-2.3.4'))
//     .pipe(reload({ stream: true }));
// });

task('copy:img', () => {
  return src('./course_2/src/img/**/*')
    .pipe(dest('./course_2/dist/img'))
    .pipe(reload({ stream: true }));
});

task('copy:video', () => {
  return src('./course_2/src/video/**/*')
    .pipe(dest('./course_2/dist/video'))
    .pipe(reload({ stream: true }));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  './course_2/src/scss/main.scss'
];

task('styles', () => {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('./course_2/dist/css'))
    .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src('./course_2/src/js/main.js')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js'))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('./course_2/dist/js'))
    .pipe(reload({ stream: true }))
    && src('./course_2/src/js/tasks.js')
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(dest('./course_2/dist/js'))
    .pipe(reload({ stream: true }));
});

task('icons', () => {
  return src('./course_2/src/img/icons/**/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('./course_2/dist/img/icons/sprite'));
});

task('server', () => {
  browserSync.init({
    server: {
        baseDir: "./course_2/dist"
    },
    open: false
  });
});

task('watch', () => {
  watch('./course_2/src/scss/**/*.scss', series('styles'));
  watch('./course_2/src/*.html', series('copy:html'));
  watch('./course_2/src/js/*.js', series('scripts'));
  watch('./course_2/src/img/icons/*.svg', series('icons'));
});

task('default', 
  series('clean', 
    parallel(
      'copy:html',
      'copy:img',
      'copy:video', 
      'copy:fancybox',
      // 'copy:Owl',
      'styles', 
      'scripts',
      'icons'), 
    parallel('watch', 'server')
  )
);

task('build',
  series('clean', 
    parallel(
      'copy:html',
      'copy:img',
      'copy:video', 
      'copy:fancybox',
      // 'copy:Owl',
      'styles', 
      'scripts',
      'icons'
    )
  )
);