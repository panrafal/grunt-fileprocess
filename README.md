# grunt-fileprocess

> Process only modified files with functions or shell commands

This is totally under development! No tests are written at this time...

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fileprocess --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fileprocess');
```

## The "fileprocess" task

### Overview
In your project's Gruntfile, add a section named `fileprocess` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fileprocess: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### checkTimestamp
Default: `true`

Only process files that have older destination than sources.

#### command
Type: `String`|`Function`|`Array`

A string or array of strings with commands to execute for every file. 

Strings can use templates with `{{ }}` delimiters: `convert {{src}} {{dest}}`. Available variables are `src`, `dest`, `file` and `grunt`.

You can also provide a function that will return a `string` or `array of strings` with commands (not templates!).

#### process
Type: `Function`

Callback function called for every file. Parameters are: 

- `file` - grunt's file object
- `done` - function to call when processing is done

Callback has access to `this` with:
- `execute` - function to execute shell commands (according to tasks's options)

#### stdout

Default: `false`  
Type: `Boolean`

Show stdout in the Terminal.


#### stderr

Default: `false`  
Type: `Boolean`

Show stderr in the Terminal.


#### failOnError

Default: `true`  
Type: `Boolean`

Fail task if it encounters an error. Does not apply if you specify a `callback`.


#### callback(err, stdout, stderr, cb)

Default: `function () {}`  
Type: `Function`

Lets you override the default callback with your own.

**Make sure to call the `cb` method when you're done.**


#### execOptions

Default: `undefined`  
Accepts: Object

Specify some options to be passed to the [.exec()](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) method:

- `cwd` String *Current working directory of the child process*
- `env` Object *Environment key-value pairs*
- `setsid` Boolean
- `encoding` String *(Default: 'utf8')*
- `timeout` Number *(Default: 0)*
- `maxBuffer` Number *(Default: 200\*1024)*
- `killSignal` String *(Default: 'SIGTERM')*




### Usage Examples


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
