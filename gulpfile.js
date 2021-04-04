const del = require("del");
const gulp = require("gulp");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");

/**
 * Constants.
 */
const OUTPUT_DIR = "build/";
const WEBPACK_CONFIG = require("./webpack.config.js");

/**
 * Build project.
 */
exports.build = gulp.series(clean, gulp.parallel(js, static), watcher);

/**
 * Clean old files before building new ones.
 */
function clean() {
  return del([OUTPUT_DIR]);
}

/**
 * Build js code.
 */
function js() {
  return gulp
    .src("./src/**/*.js", { base: "src" })
    .pipe(webpack_stream(WEBPACK_CONFIG, webpack))
    .pipe(gulp.dest(OUTPUT_DIR))
    .on("error", (error) => process.stderr.write(`${error}\n`));
}

/**
 * Copy static files.
 */
function static() {
  return gulp
    .src(["./src/**/!(*.js)"], { base: "src" })
    .pipe(gulp.dest(OUTPUT_DIR));
}

/**
 * Watch changes of files.
 *
 * @param {Function} done execute done to inform gulp that the task is finished
 */
function watcher(done) {
  gulp.watch("src/**/*.js").on("change", gulp.series(js));
  gulp.watch("src/**/!(*.js)").on("change", gulp.series(static));
  done();
}
