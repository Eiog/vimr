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
}

export type ExplorerItemProps = ExtractPropTypes<typeof explorerItemProps>
