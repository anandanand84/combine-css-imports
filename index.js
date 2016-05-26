/**
 * Created by AAravindan on 5/25/16.
 */
var cheerio = require('cheerio');
var path    = require('path');
var gulp    = require('gulp');
var fs      = require('fs');

var through = require('through2');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'Combine CSS Imports'

module.exports = function (options) {

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    if (file.isNull()) {
      return cb(null, file);
    }

    var cssImports = function(file) {
      var $ = cheerio.load(file.contents);
      var filePaths = [];
      ($("link[rel=stylesheet]").each(function() {
        filePaths.push(path.resolve(path.dirname(file.path), this.attribs.href));
      }));
      var res = filePaths.reduce(function(concat, path) {
        return concat +"\n" + fs.readFileSync(path).toString();
      }, '');
      file.contents = new Buffer(res);
      return file;
    };

    return cb(null, cssImports(file));
  });
}
