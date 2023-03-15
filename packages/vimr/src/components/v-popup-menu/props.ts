import type { ExtractPropTypes, PropType } from 'vue'
export interface VPopupMenuType {
  key: string
  label: string
  icon: string
  onClick: () => void
}
export const popupMenuProps = {
  options: {
    type: Object as PropType<VPopupMenuType[]>,
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
