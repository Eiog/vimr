import type { ExtractPropTypes, PropType } from 'vue'
import type { VItemType, VPopupMenuItemType } from '../index'
import type { VUploadTriggerPropsType } from '../v-upload/props'
export interface TokenResult {
  SecurityToken: string
  AccessKeyId: string
  AccessKeySecret: string
  Expiration: string
  Bucket: string
  Region: string
}
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
  uploadProps: {
    type: Object as PropType<VUploadTriggerPropsType>,
    default: undefined,
  },
}

export type VWrapPropsType = ExtractPropTypes<typeof wrapProps>
