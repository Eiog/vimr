import type { ExtractPropTypes, PropType } from 'vue'
import type { VPopupMenuItemType } from '../index'

export const navigationProps = {
  options: {
    type: Object as PropType<VPopupMenuItemType[]>,
    default: undefined,
  },
  value: {
    type: String,
    default: undefined,
  },
}

export type VNavigationPropsType = ExtractPropTypes<typeof navigationProps>
