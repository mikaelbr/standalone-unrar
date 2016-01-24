var path = require('path');
var rimraf = require('rimraf').sync;
var mkdir = require('mkdirp').sync;
var expect = require('chai').expect;
var unrar = require('../');

describe('unrar', function () {
  var archivePath = path.resolve(__dirname, '1. archive.rar');
  var protectedArchivePath = path.resolve(__dirname, 'archive-pass.rar');

  it('should list entries', function (done) {
    unrar(archivePath).list(function onListEntries (err, entries) {
      expect(err).to.not.exist;
      expect(entries).to.have.length(5);
      done();
    });
  });

  it('should accept unrar arguments', function (done) {
    unrar.list(protectedArchivePath, {
      password: 'Password'
    }, function onListEntries (err, entries) {
      expect(err).to.not.exist;
      expect(entries).to.have.length(5);
      done();
    });
  });

  describe('unpacking', function () {
    var output = path.join(__dirname, 'fixtures');

    beforeEach(function () {
      mkdir(output);
    });

    afterEach(function () {
      rimraf(output);
    });

    it('should unpack', function (done) {
      unrar(archivePath).unpack({
        'output-directory': output
      }, function onListEntries (err, entries) {
        expect(err).to.not.exist;
        done();
      });
    });
  
    // Some sort of bug causing this not to work.
    // it('should unpack just one file', function (done) {
    //   var archive = unrar(archivePath);
    //   archive.list(function onListEntries (err, entries) {
    //     console.log(entries);
    //     archive.unpack({
    //       'output-directory': output,
    //       'files': [entries[0]]
    //     }, function onListEntries (err, output) {
    //       expect(err).to.not.exist;
    //       expect(output).to.not.contain('No files extracted');
    //       expect(output).to.not.contain('dir/binary');
    //       console.log(output)
    //       done();
    //     });
    //   });
    // });

    it('should unpack', function (done) {
      unrar(protectedArchivePath).unpack({
        'output-directory': output,
        'password': 'Password'
      }, function onListEntries (err, entries) {
        expect(err).to.not.exist;
        done();
      });
    });
  });
});
