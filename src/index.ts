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
  constructor(config: HtmlWebpackInjectPluginConfig = {}) {
    const { externals = [], prepend = false } = config

    this.assets = this.mapping(externals)

    this.prepend = prepend
  }

  mapping = (externals: ExternalItem[] = []) => {
    return externals.map(
      ({
        tag = 'meta',
        tagName = tag,
        attrs = {},
        attributes = attrs,
        innerHTML,
        voidTag = false
      }) => {
        return {
          tagName,
          attributes,
          innerHTML,
          voidTag,
          meta: {
            plugin: 'HtmlWebpackInjectPlugin'
          }
        }
      }
    )
  }

  apply = (compiler: Compiler) => {
    compiler.hooks.compilation.tap(
      'HtmlWebpackInjectPlugin',
      (compilation: Compilation) => {
        const hooks = HtmlWebpackPlugin.getHooks(compilation).alterAssetTags

        hooks.tapAsync('HtmlWebpackInjectPlugin', (htmlPluginData, cb) => {
          const {
            // eslint-disable-next-line no-empty-pattern
            externals = []
          } = htmlPluginData.plugin.userOptions

          const tagsInInstance = [...this.mapping(externals), ...this.assets]

          tagsInInstance.forEach((asset) => {
            const tagName = (
              asset.tagName !== 'meta' ? `${asset.tagName}s` : asset.tagName
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
