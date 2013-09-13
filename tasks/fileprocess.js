/*
 * grunt-fileprocess
 * https://github.com/panrafal/grunt-fileprocess
 *
 * Copyright (c) 2013 Rafal Lindemann
 * Licensed under the MIT license.
 *
 * Shell execute code from grunt-shell by Sindre Sorhus (MIT license)
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var _ = grunt.util._,
    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    stripColors = require('stripcolorcodes')

  grunt.registerMultiTask('fileprocess', 'Process only modified files with functions or shell commands', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      stdout: false,
      stderr: false,
      failOnError: true,
      checkTimestamp: true
    });

    var self = this;


    function execute(cmd) {
      if (!_.isString(cmd)) {
        _.each(cmd, execute);
        return;
      }

      var cb = self.async();

      var cp = exec(cmd, options.execOptions, function (err, stdout, stderr) {
        if (_.isFunction(options.callback)) {
          options.callback.call(this, err, stdout, stderr, cb);
        } else {
          if (err && options.failOnError) {
            grunt.warn(err);
          }
          cb();
        }
      });

      var captureOutput = function (child, output) {
        if (grunt.option('color') === false) {
          child.on('data', function (data) {
            output.write(stripColors(data));
          });
        } else {
          child.pipe(output);
        }
      };

      grunt.verbose.writeln('Command:', cmd.yellow);
      grunt.verbose.writeflags(options, 'Options');

      if (options.stdout || grunt.option('verbose')) {
        captureOutput(cp.stdout, process.stdout);
      }

      if (options.stderr || grunt.option('verbose')) {
        captureOutput(cp.stderr, process.stderr);
      }

    }


    // Iterate over all specified file groups.
    this.files.forEach(function(file) {

      if (options.checkTimestamp) {
        var srcTime = _.max(_.map(file.src, function(f) {
          if (!fs.existsSync(f)) return 0;
          return fs.statSync(f).mtime.getTime();
        }));
        var dstTime = fs.existsSync(file.dest) ? fs.statSync(file.dest).mtime.getTime() : 0;

        if (srcTime <= dstTime) {
          grunt.verbose.writeln('Skipping "' + file.dest.green + '"');
          return;
        }
      }
      grunt.verbose.writeln('Processing "' + file.dest.yellow + '"');

      grunt.file.mkdir(path.dirname(file.dest));

      if (options.process) {
        options.process(file, execute);
      }
      if (options.command) {
        var command;
        if (_.isFunction(options.command)) {
          command = options.command(file);
        } else {
          command = _.map(_.isArray(options.command) ? options.command : [options.command], function(command) {
            return _.template(command, {src: '"' + file.src[0] + '"', dest: '"' + file.dest + '"', file: file, grunt: grunt}, {interpolate: /{{([\s\S]+?)}}/g});
          });          
        }
        // console.log(command);
        execute(command);
      }

      grunt.verbose.ok('  OK');

    });
  });

};
