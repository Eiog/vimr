import type { ExtractPropTypes, PropType } from 'vue'
type DocType = 'txt' | 'doc'
type ImageType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp'
type AudioType = 'mp3' | 'wav' | 'flap'
type VideoType = 'mp4' | 'flv'
type FileType = 'unknown' | 'folder'
export const explorerIconProps = {
  type: {
    type: String as PropType<DocType | ImageType | AudioType | VideoType | FileType>,
    default: 'unknown',
  },
}

export type ExplorerIconProps = ExtractPropTypes<typeof explorerIconProps>
