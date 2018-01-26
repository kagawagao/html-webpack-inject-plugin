# html-webpack-inject-plugin

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
  new HtmlWebpackIncludeAssetsPlugin({
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

- `externals: Array<Tag>`: external [tags](#Tag) which you want to add

- `parent`: parent element will be added into, only can be `head` and `body`, default value is `head`

## Tag

- `tag`: tag name, such as `meta` `link` `script`
- `attrs`: [html attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
