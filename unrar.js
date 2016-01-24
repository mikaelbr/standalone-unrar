var cmd = require('./lib/command');
var assign = require('lodash.assign');

/**
 * Completely standalone unrar library for node.
 * Is bundled with unrar and rar list tools, so there is no need
 * for external dependencies.
 *
 * Currently only works on Mac OS X.
 *
 * This is a convenience function for list and unpack to avoid
 * repeting the archive path.
 * This means `unrar(path).unpack(func)` is the same as
 * `unrar.unpack(path, func)`
 *
 * @example
 *
 * ```js
 * unrar('pathTo.rar').unpack(function (err, output) {
 *
 * });
 * unrar('pathTo.rar').list(function (err, entries) {
 *
 * });
 * unrar('pathTo.rar').list({
 *  // Arguments (same as unar and lsar):
 *  verbose: true,
 *  password: 'Password'
 * }, {
 *  // Options to execution
 *  cwd: 'someRoot'
 * }, function (err, entries) {
 *
 * });
 * ```
 *
 *
 * @param {String} archive - path to archive to operate on
 * @returns {Object} functions `unrar` and `list` that operate on `archive`
 * @see unpack
 * @see list
 **/
function unrar (archive) {
 return {
   unpack: unpack.bind(null, archive),
   list: list.bind(null, archive)
 };
};

module.exports = unrar;

/**
 * Function for unpacking an archived file.
 *
 * @example
 * ```js
 * unrar.unpack('pathTo.rar', function (err, output) {
 *
 * });
 * unrar.unpack('pathTo.rar', { password: 'pwd' }, function (err, output) {
 *
 * });
 * ```
 *
 * @param {String} archive - path to archive to operate on
 * @param {Object} arguments - Arguments passed to `unar` tool.
 * @param {Object} options - Options passed to execution of the `unar` tool.
 * @param {Function(error, output)} callback - Callback when data is unpacked
 * @returns {ChildProcess} Result from execution
 **/
module.exports.unpack = unpack;

/**
 * Function for unpacking an archived file.
 *
 * @example
 * ```js
 * unrar.list('pathTo.rar', function (err, entries) {
 *  // entries is a list of file names in the archive
 * });
 * unrar.list('pathTo.rar', { verbose: true }, function (err, output) {
 *  // entries is a complex object with details of all entries
 * });
 * ```
 *
 * @param {String} archive - path to archive to operate on
 * @param {Object} arguments - Arguments passed to `unar` tool.
 * @param {Object} options - Options passed to execution of the `unar` tool.
 * @param {Function(error, output)} callback - Callback when data is unpacked
 * @returns {ChildProcess} Result from execution
 **/
module.exports.list = list;

function unpack (archive, args, opts, cb) {
  return cmd.unar(archive, args, opts, cb);
}

function list (archive, args, opts, cb) {
  if (typeof args === 'function') {
    cb = args;
    args = {};
    opts = {};
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  args = assign({}, (opts || {}), { json: true });
  return cmd.lsar(archive, args, opts, function (err, stdout, stderror) {
    if (err) return cb(err);
    try {
      var data = JSON.parse(stdout.toString('utf-8'));
      if (args.verbose) {
        return cb(err, data);
      }
      cb(err, data.lsarContents.map(function (entry) {
        return entry.XADFileName;
      }));
    } catch (e) {
      cb(e);
    }
  });
}
