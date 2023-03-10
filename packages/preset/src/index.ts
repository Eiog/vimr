import type { Preset } from 'unocss'

export function presetExplorer(): Preset {
  return {
    name: '@vue-alioss-component/preset',
    shortcuts: {
      'vue-explorer-wrap': 'w-full flex flex-col',
    },
  }
}
