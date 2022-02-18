# html-webpack-inject-plugin

[![node](https://img.shields.io/node/v/html-webpack-inject-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-plugin)
[![npm](https://img.shields.io/npm/v/html-webpack-inject-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-plugin)
[![license](https://img.shields.io/npm/l/html-webpack-inject-plugin.svg)](https://github.com/kagawagao/html-webpack-inject-plugin/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/kagawagao/html-webpack-inject-plugin.svg?branch=master)](https://travis-ci.org/kagawagao/html-webpack-inject-plugin)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

inject external tag to html

## Installation

```bash
npm install --save-dev html-webpack-inject-plugin
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
  new HtmlWebpackPlugin({
    filename: 'index.html'
  }),
  new HtmlWebpackPlugin({
    filename: 'other.html'
  }),
  new HtmlWebpackInjectPlugin({
    externals: [
      {
        tagName: 'script',
        attributes: {
          src: 'common-script.js',
          type: 'text/javascript'
        }
      },
      {
        tagName: 'script',
        attributes: {
          src: 'only-inject-to-other-script.js',
          type: 'text/javascript'
        },
        include: ['other.html']
      }
    ],
    prepend: true // default is false
  })
]
```

## Options

- `externals: <HtmlAssetItem>[]`: external HTMLTagObject which you want to add
- `prepend`: insert before parent first child
