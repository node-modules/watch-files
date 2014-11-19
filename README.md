watch-files
---------------

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![Gittip][gittip-image]][gittip-url]

[npm-image]: https://img.shields.io/npm/v/watch-files.svg?style=flat-square
[npm-url]: https://npmjs.org/package/watch-files
[travis-image]: https://img.shields.io/travis/node-modules/watch-files.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/watch-files
[coveralls-image]: https://img.shields.io/coveralls/node-modules/watch-files.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/node-modules/watch-files?branch=master
[david-image]: https://img.shields.io/david/node-modules/watch-files.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/watch-files
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gittip-image]: https://img.shields.io/gittip/dead-horse.svg?style=flat-square
[gittip-url]: https://www.gittip.com/dead-horse/

watch files by polling

## Installation

```bash
$ npm install watch-files --save
```

## Usage

```js
var Watcher = require('watch-file');

var watcher = Watcher({
  interval: '1m'
});

watcher.add('file.txt');
watcher.add('file.json');

watcher.on('change', function (info) {
  // info.path => resolved file path
  // info.remove => false
  // info.stat (file stat)
});

watcher.on('remove', function (info) {
  // info.path => resolved file path
  // info.remove => true
});

watcher.on('all', function (info) {
  // info.path => resolved file path
  // info.remove => false | true
});

watcher.on('error', function (err) {
  // stat err
});
```

### License

MIT
