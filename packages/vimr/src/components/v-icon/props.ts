import type { ExtractPropTypes, PropType } from 'vue'
type DocType = 'txt' | 'doc'
type ImageType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp'
type AudioType = 'mp3' | 'wav' | 'flap'
type VideoType = 'mp4' | 'flv'
type FileType = 'unknown' | 'folder'
export type VIconType = DocType | ImageType | AudioType | VideoType | FileType
export const iconProps = {
  type: {
    type: String as PropType<VIconType>,
    default: 'unknown',
  },
  width: {
    type: Number,
    default: 5,
  },
  height: {
    type: Number,
    default: 5,
  },
}

export type VIconPropsType = ExtractPropTypes<typeof iconProps>
