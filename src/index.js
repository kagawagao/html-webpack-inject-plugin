const HtmlWebpackPlugin = require('html-webpack-plugin')

export default class HtmlWebpackInjectPlugin {
  constructor(config) {
    const { externals = [], parent = 'head', prepend = false } = config

    this.assets = externals.map(
      ({ tag = 'meta', attrs = {}, innerHTML, voidTag }) => {
        return {
          tagName: tag,
          attributes: attrs,
          innerHTML,
          voidTag
        }
      }
    )

    if (parent !== 'head' && parent !== 'body') {
      throw new TypeError('parent should be one of `head` or `body`')
    }

    this.parent = parent

    this.prepend = prepend
  }

  apply = (compiler) => {
    compiler.hooks.compilation.tap('HtmlWebpackInjectPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups

      hooks.tapAsync('HtmlWebpackInjectPlugin', (htmlPluginData, cb) => {
        const tags = htmlPluginData[`${this.parent}Tags`]
        htmlPluginData[`${this.parent}Tags`] = this.prepend
          ? this.assets.concat(tags)
          : tags.concat(this.assets)
        return cb(null, htmlPluginData)
      })
    })
  }
}
