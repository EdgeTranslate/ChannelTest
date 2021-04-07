const del = require("del");
const gulp = require("gulp");
const minimist = require("minimist");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");

/**
 * Build target browser.
 */
const BROWSER = minimist(process.argv.slice(2)).browser || "chrome";

/**
 * Constants.
 */
const OUTPUT_DIR = "build/";
const WEBPACK_CONFIG = require("./webpack.config.js");

/**
 * Webpack plugins.
 */
WEBPACK_CONFIG.plugins = WEBPACK_CONFIG.plugins || [];
WEBPACK_CONFIG.plugins.push(
  new webpack.DefinePlugin({ BROWSER_ENV: JSON.stringify(BROWSER) })
);

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
    .src("(src|example)/**/*.js", { base: "example" })
    .pipe(webpack_stream(WEBPACK_CONFIG, webpack))
    .pipe(gulp.dest(OUTPUT_DIR))
    .on("error", (error) => process.stderr.write(`${error}\n`));
}

/**
 * Copy static files.
 */
function static() {
  return gulp
    .src("example/**/!(*.js)", { base: "example" })
    .pipe(gulp.dest(OUTPUT_DIR));
}

/**
 * Watch changes of files.
 *
 * @param {Function} done execute done to inform gulp that the task is finished
 */
function watcher(done) {
  gulp.watch("(src|example)/**/*.js").on("change", gulp.series(js));
  gulp.watch("example/**/!(*.js)").on("change", gulp.series(static));
  done();
}
