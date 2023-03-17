import type { ExtractPropTypes, PropType } from 'vue'
import type { VItemType } from '../index'
import type { UploadFileInfo } from './props'
export interface UploadFileInfo {
  id: string
  name: string
  status: 'pending' | 'uploading' | 'error' | 'finished' | 'removed'
  file?: File
  fullPath?: string
  percentage?: number
  thumbnailUrl?: string
  type?: string
  url?: string
}
export const uploadPanelProps = {
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
export const uploadTriggerProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  uploadType: {
    type: String as PropType<'default' | 'ali-oss' | 'qiniu'>,
    default: 'default',
  },
  accept: {
    type: String,
    default: undefined,
  },
  max: {
    type: Number,
    default: undefined,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: 'file',
  },
  action: {
    type: String,
    default: undefined,
  },
  headers: {
    type: Object,
    default: undefined,
  },
  customRequest: {
    type: Function,
    default: undefined,
  },
  data: {
    type: Object,
    default: undefined,
  },
  defaultFileList: {
    type: Array as PropType<UploadFileInfo[]>,
    default: undefined,
  },
  fileList: {
    type: Array as PropType<UploadFileInfo[]>,
    default: undefined,
  },

}
export type VUploadPanelPropsType = ExtractPropTypes<typeof uploadPanelProps>
export type VUploadTriggerPropsType = ExtractPropTypes<typeof uploadTriggerProps>
