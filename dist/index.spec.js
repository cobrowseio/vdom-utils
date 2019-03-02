"use strict";

var _index = require("./index");

describe('index', function () {
  it('should export classes', function (done) {
    if (!_index.depthFirst) throw new Error('expecting depthFirst');
    done();
  });
});