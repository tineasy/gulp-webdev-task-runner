const { dest, src, watch } = require("gulp");

const css = require("gulp-dart-sass");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");


function do_css() {
  return src("css/*.{sass,scss}")
    .pipe(css({ outputStyle: "compressed" }))
    .pipe(rename(function(path) {
      path.extname = ".min.css";
    }))
    .pipe(dest("css/"));
}

function do_js() {
  return src(["js/*.js", "!js/*.min.js"])
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.extname = ".min.js";
    }))
    .pipe(dest("js/"));
}


exports.do_css = do_css;
exports.do_js = do_js;

exports.default = function() {
  watch("css/*.{sass,scss}", { ignoreInitial: false }, do_css);
  watch(["js/*.js", "!js/*.min.js"], { ignoreInitial: false }, do_js);
};
