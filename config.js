/**
 * 配置文件
 * author:baixiaosheng
 * date:2016/7/28
 */
const
  path = require('path');

module.exports = {
  assets: {
    src: ['./src/**/js/**/*.min.js', './src/**/img/**/*.*', './src/**/testimg/**/*.*', './src/**/font/**/*.*'],
    dist: './build/'
  },
  font: {
    src: './src/**/fonts/**/*.*',
    dist: './build/fonts/'
  },
  html: {
    src: './src/html/**/*.html',
    dist: './build/html/'
  },
  css: {
    src: './src/css/global.css',
    dist: './build/css/',
    map: './map/'
  },
  sass: {
    watch: './src/sass/**/*.scss',
    src: './src/sass/global.scss',
    dist: './src/css/'
  },
  js: {
    src: ['./src/js/**/*.js'],
    dist: './build/js/'
  },
  dist: './build/',
  isPublic: false
};
