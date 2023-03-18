import type { ExtractPropTypes, PropType } from 'vue'
export interface UploadFileInfo {
  id: string
  name: string
  status: 'pending' | 'uploading' | 'error' | 'finished' | 'removed'
  file: File
  batchId?: string
  fullPath?: string
  percentage?: number
  thumbnailUrl?: string
  type?: string
  url?: string
}
export interface UploadCustomRequestOptions {
  file: UploadFileInfo
  data?: object
  headers?: object
  action?: string
  onFinish: () => void
  onError: () => void
  onProgress: ({ percent }: { percent: number }) => void
}
export const uploadPanelProps = {
  value: {
    type: Boolean,
    default: false,
  },
  blur: {
    type: Boolean,
    default: true,
  },
}
export const uploadFileListProps = {
  fileList: {
    type: Array as PropType<UploadFileInfo[]>,
    default: undefined,
  },
}
export const uploadTriggerProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: undefined,
  },
  max: {
    type: Number,
    default: 9,
  },
  multiple: {
    type: Boolean,
    default: true,
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
    type: Function as PropType<(options: UploadCustomRequestOptions) => void>,
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
export type VUploadFileListPropsType = ExtractPropTypes<typeof uploadFileListProps>
export type VUploadTriggerPropsType = ExtractPropTypes<typeof uploadTriggerProps>
