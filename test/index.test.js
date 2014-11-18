/*!
 * watch-files - test/index.test.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var Watcher = require('..');
var path = require('path');
var fs = require('fs');

var watcher = Watcher({
  interval: 100
});

var fixturePath = 'test/fixtures/file.txt';
var newFixturePath = 'test/fixtures/file.new';
var fixtureContent = fs.readFileSync(fixturePath);
var indexPath = 'index.js';

describe('file-watcher', function () {
  describe('add()', function () {
    it('should resolve', function () {
      watcher.add(fixturePath);
      Object.keys(watcher.files)[0].should.equal(path.resolve(fixturePath));
    });

    it('should repeat', function () {
      watcher.add(path.resolve(fixturePath));
      Object.keys(watcher.files).should.have.length(1);
    });
  });

  describe('remove()', function () {
    it('should remove work', function () {
      watcher.add(indexPath);
      Object.keys(watcher.files).should.have.length(2);
      watcher.remove(indexPath);
      Object.keys(watcher.files).should.have.length(1);
    });

    it('should remove not exist', function () {
      watcher.remove(indexPath);
      Object.keys(watcher.files).should.have.length(1);
    });
  });

  describe('_watch()', function () {
    it('should get change', function (done) {
      watcher.once('change', function (info) {
        info.file.should.equal(path.resolve(fixturePath));
        info.type.should.equal('change');
        done();
      });

      fs.writeFileSync(fixturePath, fixtureContent);
    });

    it('should get delete', function (done) {
      watcher.once('change', function (info) {
        info.file.should.equal(path.resolve(fixturePath));
        info.type.should.equal('remove');
        fs.writeFileSync(fixturePath, fixtureContent);
        watcher.once('change', function (info) {
          info.type.should.equal('change');
          done();
        });
      });

      fs.unlinkSync(fixturePath);
    });

    it('should add ok', function (done) {
      watcher.once('change', function (info) {
        info.file.should.equal(path.resolve(newFixturePath));
        info.type.should.equal('change');
        fs.unlinkSync(newFixturePath);
        done();
      });

      watcher.add(newFixturePath);
      fs.writeFileSync(newFixturePath, fixtureContent);
    });
  });

  describe('destroy()', function () {
    it('should destroy ok', function () {
      watcher.destroy();
      watcher.files.should.eql({});
      (watcher.timer === null).should.be.ok;
    });
  });
});
