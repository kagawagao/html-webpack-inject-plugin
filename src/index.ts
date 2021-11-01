import HtmlWebpackPlugin, { HtmlTagObject } from 'html-webpack-plugin'
import { Compilation, Compiler } from 'webpack'

type Parent = 'head' | 'body'

export interface ExternalItem extends HtmlTagObject {
  tag?: string
  attrs?: Record<string, string | boolean | null | undefined>
}

export interface HtmlWebpackInjectPluginConfig {
  externals?: ExternalItem[]
  parent?: Parent
  prepend?: boolean
}

export default class HtmlWebpackInjectPlugin {
  assets: HtmlTagObject[]
  parent: Parent
  prepend: boolean
  constructor(config: HtmlWebpackInjectPluginConfig) {
    const { externals = [], parent = 'head', prepend = false } = config

    this.assets = externals.map(
      ({
        tag = 'meta',
        tagName,
        attributes = {},
        attrs = {},
        innerHTML,
        voidTag
      }) => {
        return {
          tagName: tagName || tag,
          attributes: attributes || attrs,
          innerHTML,
          voidTag,
          meta: {
            plugin: 'HtmlWebpackInjectPlugin'
          }
        }
      }
    )

    if (parent !== 'head' && parent !== 'body') {
      throw new TypeError('parent should be one of `head` or `body`')
    }

    this.parent = parent

    this.prepend = prepend
  }

  apply = (compiler: Compiler) => {
    compiler.hooks.compilation.tap(
      'HtmlWebpackInjectPlugin',
      (compilation: Compilation) => {
        const hooks =
          HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups

        hooks.tapAsync('HtmlWebpackInjectPlugin', (htmlPluginData, cb) => {
          const propertyName = `${this.parent}Tags` as 'headTags' | 'bodyTags'
          const tags = htmlPluginData[propertyName]
          htmlPluginData[propertyName] = this.prepend
            ? this.assets.concat(tags)
            : tags.concat(this.assets)
          return cb(null, htmlPluginData)
        })
      }
    )
  }
}
