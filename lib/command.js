var execCmd = require('child_process').exec;
var path = require('path');

var unar = exec.bind(null, 'unar');
var lsar = exec.bind(null, 'lsar');

module.exports = unar;
module.exports.unar = unar;
module.exports.lsar = lsar;

function exec (cmd, archive, args, opts, cb) {
  if (typeof args === 'function') {
    cb = args;
    args = {};
    opts = {};
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  return execCmd(
    resolve(cmd) + ' ' + constructArguments(archive, args).join(' '),
    opts,
    cb
  );
}

function resolve (cmd) {
  return path.join(__dirname, '..', 'vendor', 'unar', cmd);
}

function constructArguments (archive, opts) {
  var archive = Array.isArray(archive) ? archive : [archive];
  var files = opts.files || [];
  delete opts.files;

  return Object.keys(opts).reduce(function (acc, key) {
    var isFlag = typeof opts[key] === 'boolean';
    return acc.concat(isFlag ?
      ['-' + key] :
      ['-' + key, escape(opts[key])]
    );
  }, [])
  .concat(archive.map(escape))
  .concat(files.map(escape));
};


function escape (cmd) {
  if (typeof cmd !== 'string') return cmd;
  return cmd.replace(/([ "\s'$`\\])/g,'\\$1');
}
