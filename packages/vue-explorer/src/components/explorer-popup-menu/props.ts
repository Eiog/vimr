import type { ExtractPropTypes, PropType } from 'vue'
export interface ExplorerPopupMenu {
  key: string
  label: string
  icon: string
  onClick: () => void
}
export const explorerPopupMenuProps = {
  options: {
    type: Object as PropType<ExplorerPopupMenu[]>,
    default: undefined,
  },
  value: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 140,
  },
}

export type ExplorerPopupMenuProps = ExtractPropTypes<typeof explorerPopupMenuProps>
