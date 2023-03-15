import type { ExtractPropTypes, PropType } from 'vue'
import type { VIconType } from '../index'
export interface VItemType {
  key: string
  label: string
  type: VIconType
  icon: string
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
}

export type VItemPropsType = ExtractPropTypes<typeof itemProps>
