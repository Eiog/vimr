import type { ExtractPropTypes } from 'vue'

export const iconProps = {
  type: {
    type: String,
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
