import type { ExtractPropTypes, PropType } from 'vue'
import type { VItemType } from '../index'

export const previewProps = {
  options: {
    type: Object as PropType<VItemType[]>,
    default: undefined,
  },
  value: {
    type: Boolean,
    default: false,
  },
  blur: {
    type: Boolean,
    default: true,
  },
}

export type VPreviewPropsType = ExtractPropTypes<typeof previewProps>