'use strict';

var gutil = require('gulp-util');
var exec = require('child_process').exec;

module.exports = function(opt, cb) {
    if (!cb && typeof opt === 'function') {
        // optional options
        cb = opt;
        opt = {};
    }
    if (!cb || typeof cb !== 'function') cb = function() {
    };

    if (!opt) opt = {};
    if (!opt.cwd) opt.cwd = process.cwd();
    opt.args = !opt.args ? '' : ' ' + opt.args;

    var cmd = 'hg pull' + opt.args;
    return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr) {
        if (err) {
            return cb(err);
        }
        gutil.log(stdout, stderr);
        cb(err, stdout);
    });
};
