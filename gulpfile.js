const gulp = require('gulp');
const bump = require('gulp-bump');
const argv = require('yargs').argv;
// `fs` is used instead of require to prevent caching in watch (require caches)
const fs = require('fs');
const semver = require('semver');

let getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};
// Basic usage:
// Will patch the version
gulp.task('bump', () => {
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});
// Defined method of updating:
// Semantic
gulp.task('bump:minor', () => {
  gulp.src('./package.json')
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});
// Defined method of updating:
// Semantic major
gulp.task('bump:major', () => {
  gulp.src('./package.json')
    .pipe(bump({type:'major'}))
    .pipe(gulp.dest('./'));
});
// Defined method of updating:
// Set a specific version
gulp.task('bump:version', () =>{
  gulp.src('./package.json')
    .pipe(bump({version: '1.2.3'}))
    .pipe(gulp.dest('./'));
});
// Update bower, component, npm at once:
gulp.task('bump', () => {
  gulp.src(['./bower.json', './component.json', './package.json'])
    .pipe(bump({type:'major'}))
    .pipe(gulp.dest('./'));
});
// Define the key for versioning off
gulp.task('bump', () => {
  gulp.src('./package.json')
    .pipe(bump({key: "version"}))
    .pipe(gulp.dest('./'));
});
/*
// bump versions on package/bower/manifest
gulp.task('bump',() => {
  // reget package
  let pkg = getPackageJson();
  // increment version
  let newVer = semver.inc(pkg.version, 'patch');

  // uses gulp-filter
  let manifestFilter = tasks.filter(['manifest.json']);
  let regularJsons = tasks.filter(['!manifest.json']);

  return gulp.src(['./bower.json', './package.json', './src/manifest.json'])
    .pipe(tasks.bump({
      version: newVer
    }))
    .pipe(manifestFilter)
    .pipe(gulp.dest('./src'))
    .pipe(manifestFilter.restore())
    .pipe(regularJsons)
    .pipe(gulp.dest('./'));
});

// Run the gulp tasks
gulp.task('default', function(){
  gulp.run('bump');
});
*/