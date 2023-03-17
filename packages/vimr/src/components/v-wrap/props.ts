import type { ExtractPropTypes, PropType } from 'vue'
import type { VItemType, VPopupMenuItemType } from '../index'
import { uploadTriggerProps } from '../v-upload/props'
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
  ...uploadTriggerProps,
}

export type VWrapPropsType = ExtractPropTypes<typeof wrapProps>
