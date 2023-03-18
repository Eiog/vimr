import type { ExtractPropTypes, PropType } from 'vue'
import type { VItemType, VPopupMenuItemType } from '../index'
export const wrapProps = {
  data: {
    type: Array as PropType<VItemType[]>,
    default: undefined,
  },
  popupMenuOptions: {
    type: Array as PropType<VPopupMenuItemType[]>,
    default: undefined,
  },
  popupMenuItemOptions: {
    type: Array as PropType<VPopupMenuItemType[]>,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  preview: {
    type: Boolean,
    default: undefined,
  },
  upload: {
    type: Boolean,
    default: undefined,
  },
}

export type VWrapPropsType = ExtractPropTypes<typeof wrapProps>
