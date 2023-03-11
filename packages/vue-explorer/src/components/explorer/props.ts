import type { ExtractPropTypes, PropType } from 'vue'
import type { ExplorerItem } from '../explorer-item/props'
export const explorerProps = {
  data: {
    type: Array as PropType<ExplorerItem[]>,
    default: undefined,
  },
  title: {
    type: String,
    default: 'Vue Explorer',
  },
}

export type ExplorerProps = ExtractPropTypes<typeof explorerProps>
