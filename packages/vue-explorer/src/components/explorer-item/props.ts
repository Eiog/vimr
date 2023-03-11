import type { ExtractPropTypes, PropType } from 'vue'
export interface ExplorerItem {
  key: string
  label: string
  icon: string
}
export const explorerItemProps = {
  data: {
    type: Object as PropType<ExplorerItem>,
    default: undefined,
  },
  width: {
    type: Number,
    default: 140,
  },
}

export type ExplorerItemProps = ExtractPropTypes<typeof explorerItemProps>
