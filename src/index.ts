import HtmlWebpackPlugin, { HtmlTagObject } from 'html-webpack-plugin'
import { Compilation, Compiler } from 'webpack'

export interface ExternalItem extends Omit<HtmlTagObject, 'voidTag' | 'meta'> {
  tag?: 'script' | 'style' | 'meta'
  voidTag?: boolean
  attrs?: Record<string, string | boolean | null | undefined>
}

export interface HtmlWebpackInjectPluginConfig {
  externals?: ExternalItem[]
  prepend?: boolean
}

export default class HtmlWebpackInjectPlugin {
  assets: HtmlTagObject[]
  prepend: boolean
  constructor(config: HtmlWebpackInjectPluginConfig) {
    const { externals = [], prepend = false } = config

    this.assets = externals.map(
      ({
        tag = 'meta',
        tagName,
        attributes,
        attrs = {},
        innerHTML,
        voidTag = false
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

    this.prepend = prepend
  }

  apply = (compiler: Compiler) => {
    compiler.hooks.compilation.tap(
      'HtmlWebpackInjectPlugin',
      (compilation: Compilation) => {
        const hooks = HtmlWebpackPlugin.getHooks(compilation).alterAssetTags

        hooks.tapAsync('HtmlWebpackInjectPlugin', (htmlPluginData, cb) => {
          this.assets.forEach((asset) => {
            const tagName = (
              asset.tagName === 'meta' ? `${asset.tagName}s` : asset.tagName
            ) as keyof typeof htmlPluginData.assetTags
            const tags = htmlPluginData.assetTags[tagName]
            htmlPluginData.assetTags[tagName] = this.prepend
              ? [asset].concat(tags)
              : tags.concat(asset)
          })
          return cb(null, htmlPluginData)
        })
      }
    )
  }
}
