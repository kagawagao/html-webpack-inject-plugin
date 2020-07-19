# html-webpack-inject-plugin

[![node](https://img.shields.io/node/v/html-webpack-inject-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-plugin)
[![npm](https://img.shields.io/npm/v/html-webpack-inject-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-plugin)
[![license](https://img.shields.io/npm/l/html-webpack-inject-plugin.svg)](https://github.com/kagawagao/html-webpack-inject-plugin/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/kagawagao/html-webpack-inject-plugin.svg?branch=master)](https://travis-ci.org/kagawagao/html-webpack-inject-plugin)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

inject external tag to html

## Installation

You must be running webpack on node 6.x or higher

### `webpack v4.x`

```bash
npm install --save-dev html-webpack-inject-plugin
```

### `webpack v3.x` or lower

```bash
npm install --save-dev html-webpack-inject-plugin@1.x
```

## Usage

Require the plugin in your webpack config

```javascript
import HtmlWebpackInjectPlugin from 'html-webpack-inject-plugin'
// or
const HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin').default
```

Add the plugin to your webpack config as follows

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInjectPlugin({
    externals: [
      {
        tag: 'script',
        attrs: {
          src: 'your-script.js',
          type: 'text/javascript'
        }
      }
    ],
    parent: 'head', // default is head
    prepend: true // default is false
  })
]
```

## Options

- `externals: <HTMLTagObject>[]`: external [HTMLTagObject](#https://github.com/jantimon/html-webpack-plugin/blob/6e17a0cd7e99c08fdf6eb6e79b88f589af35c645/typings.d.ts#L238-L260) which you want to add

- `parent`: parent element will be added into, only can be `head` and `body`, default value is `head`

- `prepend`: insert before parent first child

## Tag

- `tag`: tag name, such as `meta` `link` `script`
- `attrs`: [html attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
