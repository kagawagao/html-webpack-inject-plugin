
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
    (compiler.hooks
      ? compiler.hooks.compilation.tap.bind(compiler.hooks.compilation, 'HtmlWebpackInjectPlugin')
      : compiler.plugin.bind(compiler, 'compilation'))(compilation => {
        (compilation.hooks
        ? compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync.bind(compilation.hooks.htmlWebpackPluginAlterAssetTags, 'HtmlWebpackInjectPlugin')
        : compilation.plugin.bind(compilation, 'html-webpack-plugin-alter-asset-tags'))((htmlPluginData, cb) => {
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
