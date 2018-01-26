'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlWebpackInjectPlugin = function HtmlWebpackInjectPlugin(config) {
  var _this = this;

  _classCallCheck(this, HtmlWebpackInjectPlugin);

  this.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, cb) {
        if (_this.parent === 'head') {
          htmlPluginData.head = htmlPluginData.head.concat(_this.assets);
        } else {
          htmlPluginData.body = _this.assets.concat(htmlPluginData.body);
        }
        return cb(null, htmlPluginData);
      });
    });
  };

  var _config$externals = config.externals,
      externals = _config$externals === undefined ? [] : _config$externals,
      _config$parent = config.parent,
      parent = _config$parent === undefined ? 'head' : _config$parent;


  this.assets = externals.map(function (_ref) {
    var _ref$tag = _ref.tag,
        tag = _ref$tag === undefined ? 'meta' : _ref$tag,
        _ref$attrs = _ref.attrs,
        attrs = _ref$attrs === undefined ? {} : _ref$attrs;

    return {
      tagName: tag,
      attributes: attrs,
      closeTag: true
    };
  });

  if (parent !== 'head' && parent !== 'body') {
    throw new TypeError('parent should be one of head and body');
  }
  this.parent = parent;
};

exports.default = HtmlWebpackInjectPlugin;
module.exports = exports['default'];