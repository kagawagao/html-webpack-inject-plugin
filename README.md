# html-webpack-inject-plugin

[![node](https://img.shields.io/node/v/html-webpack-inject-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-plugin)
[![npm](https://img.shields.io/npm/v/html-webpack-inject-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-plugin)
[![license](https://img.shields.io/npm/l/html-webpack-inject-plugin.svg)](https://github.com/kagawagao/html-webpack-inject-plugin/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/kagawagao/html-webpack-inject-plugin.svg?branch=master)](https://travis-ci.org/kagawagao/html-webpack-inject-plugin)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![bitHound Overall Score](https://www.bithound.io/github/kagawagao/html-webpack-inject-plugin/badges/score.svg)](https://www.bithound.io/github/kagawagao/html-webpack-inject-plugin)
[![bitHound Dependencies](https://www.bithound.io/github/kagawagao/html-webpack-inject-plugin/badges/dependencies.svg)](https://www.bithound.io/github/kagawagao/html-webpack-inject-plugin/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/kagawagao/html-webpack-inject-plugin/badges/devDependencies.svg)](https://www.bithound.io/github/kagawagao/html-webpack-inject-plugin/master/dependencies/npm)

inject external tag to html

## Installation

You must be running webpack on node 4.x or higher

```bash
npm install --save-dev html-webpack-inject-plugin
```

## Usage

Require the plugin in your webpack config

```javascript
import HtmlWebpackInjectPlugin from 'html-webpack-inject-plugin'
// or
var HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin')
```

Add the plugin to your webpack config as follows

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInjectPlugin({
    externals: [{
      tag: 'script',
      attrs: {
        src: 'your-script.js',
        type: 'text/javascript'
      }
    }],
    parent: 'head' // default is head
  })
]
```

## Options

- `externals: Array<Tag>`: external [tags](#tag) which you want to add

- `parent`: parent element will be added into, only can be `head` and `body`, default value is `head`

## Tag

- `tag`: tag name, such as `meta` `link` `script`
- `attrs`: [html attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
