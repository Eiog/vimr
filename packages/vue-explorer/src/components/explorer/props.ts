import type { ExtractPropTypes, PropType } from 'vue'
interface Data {
  key: string
  label: string
  icon: string
}
export const explorerProps = {
  data: {
    type: Array as PropType<Data[]> | undefined,
  },
}
export type ExplorerProps = ExtractPropTypes<typeof explorerProps>
