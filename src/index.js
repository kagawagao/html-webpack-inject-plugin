
export default class HtmlWebpackInjectPlugin {
  constructor (config) {
    const { externals = [], parent = 'head' } = config

    this.assets = externals.map(({tag = 'meta', attrs = {}}) => {
      return {
        tagName: tag,
        attributes: attrs,
        closeTag: true
      }
    })

    if (parent !== 'head' && parent !== 'body') {
      throw new TypeError('parent should be one of head and body')
    }
    this.parent = parent
  }

  apply = (compiler) => {
    compiler.hooks.compilation.tap('HtmlWebpackInjectPlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlWebpackInjectPlugin', (htmlPluginData, cb) => {
        if (this.parent === 'head') {
          htmlPluginData.head = htmlPluginData.head.concat(this.assets)
        } else {
          htmlPluginData.body = this.assets.concat(htmlPluginData.body)
        }
        return cb(null, htmlPluginData)
      })
    })
  }
}
