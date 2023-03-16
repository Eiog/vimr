import type { ExtractPropTypes, PropType } from 'vue'
import type { VItemType } from '../index'
export interface VPopupMenuItemType {
  key: string
  label: string
  icon?: string
  onClick?: (item: VPopupMenuItemType, data?: VItemType) => void
}
export const popupMenuProps = {
  options: {
    type: Object as PropType<VPopupMenuItemType[]>,
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

export type VPopupMenuPropsType = ExtractPropTypes<typeof popupMenuProps>
