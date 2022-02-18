import HtmlWebpackPlugin, { HtmlTagObject } from 'html-webpack-plugin'
import { Compilation, Compiler } from 'webpack'

export type IncludeFilter = string[] | ((outputName: string) => boolean)

export interface ExternalItem extends Omit<HtmlTagObject, 'voidTag' | 'meta'> {
  tag?: 'script' | 'style' | 'meta'
  voidTag?: boolean
  attrs?: Record<string, string | boolean | null | undefined>
  include?: IncludeFilter
}

export interface HtmlAssetItem extends HtmlTagObject {
  include?: IncludeFilter
}

export interface HtmlWebpackInjectPluginConfig {
  externals?: ExternalItem[]
  prepend?: boolean
}

export default class HtmlWebpackInjectPlugin {
  assets: HtmlAssetItem[]
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
        voidTag = false,
        include
      }) => {
        return {
          tagName: tagName || tag,
          attributes: attributes || attrs,
          innerHTML,
          voidTag,
          meta: {
            plugin: 'HtmlWebpackInjectPlugin'
          },
          include
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
          this.assets
            .filter(({ include }) => {
              if (include) {
                if (Array.isArray(include)) {
                  return include.includes(htmlPluginData.outputName)
                } else {
                  return include(htmlPluginData.outputName)
                }
              } else {
                return true
              }
            })
            .forEach((asset) => {
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
