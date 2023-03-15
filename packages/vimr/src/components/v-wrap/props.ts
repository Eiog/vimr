import type { ExtractPropTypes, PropType } from 'vue'
import type { VItemType } from '../v-item/props'
export const wrapProps = {
  data: {
    type: Array as PropType<VItemType[]>,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
}

export type VWrapPropsType = ExtractPropTypes<typeof wrapProps>
