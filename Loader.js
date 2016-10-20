'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
  function Loader(containerElement) {
    var _this = this;

    _classCallCheck(this, Loader);

    this.containerElement = containerElement; //container element passed in as html element
    this.transclude = undefined; //no template transclusion supported yet;
    this.xmlHttp = new XMLHttpRequest();
    this.xmlHttp.onreadystatechange = function () {
      if (_this.xmlHttp.readyState == 4 && _this.xmlHttp.status == 200) {
        var template = _this.parseData(_this.xmlHttp.responseText);
        _this.setDom(template);
      }
    };
  }

  _createClass(Loader, [{
    key: 'load',
    value: function load(fileName, basePath) {
      var path = basePath || '/partials';
      var url = path + '/' + fileName;
      this.xmlHttp.open('GET', url, true); // true for asynchronous
      this.xmlHttp.send(null);
    }
  }, {
    key: 'parseData',
    value: function parseData(response) {
      return response;
      //response.replace(toBeTransclued, transclude)
    }
  }, {
    key: 'setDom',
    value: function setDom(htmlPartial) {
      this.containerElement.innerHTML = htmlPartial;
    }
  }]);

  return Loader;
}();
