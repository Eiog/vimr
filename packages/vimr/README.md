# Vimr VUE 文件管理组件

## 安装
```
pnpm add vimr
```
## 使用

### 引入样式文件
```ts
// main.ts
import 'vimr/dist/style.css'
```
### 引入组件
```ts
// App.vue
<script setup lang='ts'>
import { VPreview, VUploadList, VUploadPanel, VUploadTrigger, VWrap } from 'vimr'
import type { UploadCustomRequestOptions, UploadFileInfo, VItemType, VPopupMenuItemType } from 'vimr'
const _fileList = ref<UploadFileInfo[]>()
const previewShow = ref(false)
const uploadPanelShow = ref(false)
const onUpdateFileList = (v) => {
  uploadPanelShow.value = true
  console.log(v)
}
const data: VItemType[] = Array.from({ length: 99 }, (_, i) => ({
  key: `key-${i}`,
  label: `文件夹-${i}`,
  type: 'folder',
}))
const popupMenu: VPopupMenuItemType[] = [
  {
    label: '新建文件夹',
    key: 'new',
    onClick: (v, d) => {
      console.log(v, d)
    },
  },
]
const popupMenuItem: VPopupMenuItemType[] = [
  {
    label: '查看',
    key: 'look',
    onClick: (v) => {
      console.log(v)
      previewShow.value = true
    },
  },
]
const oncCntextMenuItemClick = (data) => {
  console.log(data)
}
const onSelect = (v) => {
  console.log(v)
}
const customRequest = (options: UploadCustomRequestOptions) => {
  console.log(options)
  setTimeout(() => {
    Math.random() > 0.5
      ? options.onFinish()
      : options.onError()
  }, 3000)
}
</script>
```

```html
<template>
  <div w-full h-100vh p10>
    <VWrap
      v-model:upload-panel-show="uploadPanelShow"
      :data="data"
      :popup-menu-options="popupMenu"
      :popup-menu-item-options="popupMenuItem"
      title="Vimr 文件管理"
      shadow-xl
      border rounded-xl
      @update:context-menu-item-click="oncCntextMenuItemClick"
      @update:select="onSelect"
    >
      <template #navigation>
        <VNavigation v-model:value="navigationValue" :options="navigationOptions" />
      </template>
      <template #preview>
        <VPreview v-model:show="previewShow" />
      </template>
      <template #uploadPanel>
        <VUploadPanel v-model:show="uploadPanelShow" v-model:file-list="_fileList" :custom-request="customRequest" @update:file-list="onUpdateFileList" />
      </template>
    </VWrap>
  </div>
</template>
```

### Props & Emits

```ts
// wrap-props
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
  previewShow: {
    type: Boolean,
    default: undefined,
  },
  uploadPanelShow: {
    type: Boolean,
    default: undefined,
  },
}
//wrap-emits
  (e: 'update:contextMenuItemClick', v: { menu: VPopupMenuItemType; data?: VItemType }): void
  (e: 'update:select', v: { key?: number | string; selectKeys: (number | string)[] }): void
  (e: 'update:uploadPanelShow', v: boolean): void


// upload-props
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
  show: {
    type: Boolean,
    default: undefined,
  },
  blur: {
    type: Boolean,
    default: true,
  },
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

//upload-emits
  (e: 'click'): void
  (e: 'update:fileList', fileList: UploadFileInfo[]): void
  (e: 'finish'): void
  (e: 'error'): void
  (e: 'change'): void

//preview-props
export const previewProps = {
  options: {
    type: Object as PropType<VItemType[]>,
    default: undefined,
  },
  show: {
    type: Boolean,
    default: undefined,
  },
  blur: {
    type: Boolean,
    default: true,
  },
}
//preview-emits
  (e: 'update:show', v: boolean): void

//navigation-props
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
//navigation-emits
const emit = defineEmits<{
  (e: 'update:value', v: typeof props.value): void
}>()

// popup-menu-props
export interface VPopupMenuItemType {
  key: string
  label: string
  icon?: string
  onClick?: (item: VPopupMenuItemType, data?: VItemType) => void
}
export const popupMenuProps = {
  options: {
    type: Object as PropType<VPopupMenuItemType[]>,
    default: undefined,
  },
  value: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 140,
  },
}
//popup-menu-emits 
  (e: 'update:value', v: boolean): void
  (e: 'update:menuItemClick', v: VPopupMenuItemType): void


// item-props
export interface VItemType {
  key: string
  label: string
  type?: string
  icon?: string
}
export const itemProps = {
  data: {
    type: Object as PropType<VItemType>,
    default: undefined,
  },
  width: {
    type: Number,
    default: 140,
  },
  selected: {
    type: Boolean,
    default: undefined,
  },
}
//item-emits
  (e: 'moreIconClick', v: VItemType): void
  (e: 'selectIconClick', v: VItemType): void


// icon
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
```
