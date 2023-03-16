import type { ExtractPropTypes, PropType } from 'vue'
export interface VItemType {
  key: string
  label: string
  type?: string
  icon?: string
}
export const itemProps = {
  data: {
    type: Object as PropType<VItemType>,
    default: undefined,
  },
  width: {
    type: Number,
    default: 140,
  },
  selected: {
    type: Boolean,
    default: undefined,
  },
}

export type VItemPropsType = ExtractPropTypes<typeof itemProps>
