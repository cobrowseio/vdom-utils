"use strict";

require("should");

var _PropertyObserver = _interopRequireDefault(require("./PropertyObserver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('PropertyObserver', function () {
  it('should allow construction', function () {
    var observer = new _PropertyObserver["default"](function () {});
    observer.disconnect();
  });
  it('should allow observation of a property', function () {
    var observer = new _PropertyObserver["default"](function () {});
    observer.observe(HTMLInputElement, 'value');
    observer.disconnect();
  });
  it('should trigger on value setting', function (done) {
    document.body.innerHTML = '<input type="text" />';
    var observer = new _PropertyObserver["default"](function (el, property, value) {
      el.tagName.should.equal('INPUT');
      property.should.equal('value');
      value.should.equal('test');
      observer.disconnect();
      done();
    });
    observer.observe(HTMLInputElement, 'value');
    document.body.childNodes[0].value = 'test';
  });
  it('should trigger on value setting of non-overidden properties', function (done) {
    document.body.innerHTML = '<input type="text" />';
    var observer = new _PropertyObserver["default"](function (el, property, value) {
      el.tagName.should.equal('INPUT');
      property.should.equal('checked');
      value.should.equal('test');
      observer.disconnect();
      done();
    });
    observer.observe(HTMLInputElement, 'checked');
    document.body.childNodes[0].checked = 'test';
  });
  it('should support multiple observers', function (done) {
    document.body.innerHTML = '<input type="text" />';
    var observer1;
    var observer2;
    var count = 0;

    function onSet() {
      count += 1;

      if (count === 2) {
        observer1.disconnect();
        observer2.disconnect();
        done();
      }
    }

    observer1 = new _PropertyObserver["default"](onSet);
    observer1.observe(HTMLInputElement, 'value');
    observer2 = new _PropertyObserver["default"](onSet);
    observer2.observe(HTMLInputElement, 'value');
    document.body.childNodes[0].value = 'test';
  });
});