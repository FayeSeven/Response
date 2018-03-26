/**
 * Created by 熙冰
 * 2017/11/24  17:08
 */
var gulp = require('gulp');
var rev = require('gulp-rev');//加MD5后缀
var revReplace = require('gulp-rev-replace');//替换引用的加了md5后缀的文件名，修改过，用来加cdn前缀
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');//混淆js
var csso = require('gulp-csso');

gulp.task('default', function() {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true})
    var indexHtmlFilter = filter(['**/*','!**/index.html'], {restore: true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
