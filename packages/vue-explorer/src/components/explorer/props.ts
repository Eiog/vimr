import type { ExtractPropTypes, PropType } from 'vue'
import type { ExplorerItem } from '../explorer-item/props'
export const explorerProps = {
  data: {
    type: Array as PropType<ExplorerItem[]>,
    default: undefined,
  },
}

export type ExplorerProps = ExtractPropTypes<typeof explorerProps>
