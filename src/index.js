export default class HtmlWebpackInjectPlugin {
  constructor (config) {
    const { externals = [], parent = 'head', prepend = false } = config

    this.assets = externals.map(({ tag = 'meta', attrs = {} }) => {
      return {
        tagName: tag,
        attributes: attrs,
        closeTag: true
      }
    })

    if (parent !== 'head' && parent !== 'body') {
      throw new TypeError('parent should be one of `head` or `body`')
    }

    this.parent = parent

    this.prepend = prepend
  }

  apply = compiler => {
    compiler.hooks.compilation.tap('HtmlWebpackInjectPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        'HtmlWebpackInjectPlugin',
        (htmlPluginData, cb) => {
          htmlPluginData[this.parent] = this.prepend
            ? this.assets.concat(htmlPluginData[this.parent])
            : htmlPluginData[this.parent].concat(this.assets)
          return cb(null, htmlPluginData)
        }
      )
    })
  }
}
