<script setup lang='ts'>
import { VWrap } from 'vimr'
import type { UploadCustomRequestOptions, UploadFileInfo, VItemType, VPopupMenuItemType } from 'vimr'
const preview = ref(false)
const data: VItemType[] = [
  {
    key: '测试',
    label: 'vimr',
    type: 'file',
  },
  {
    key: 'onu-ui',
    label: 'onu-ui',
    type: 'video/mpeg4',
  },
  {
    key: 'vue3-starter',
    label: 'vue3-starter',
    type: 'text/txt',
  },
  {
    key: 'tsup-starter',
    label: 'tsup-starter',
    type: 'text/ppt',
  },
  {
    key: 'chiyu-admin',
    label: 'chiyu-admin',
    type: 'image/jpeg',
  },
  {
    key: 'chiyu-server',
    label: 'chiyu-server',
    type: 'unknown',
  },
  {
    key: 'lfq-mp-wx-client',
    label: 'lfq-mp-wx-client',
    type: 'folder',
  },
]
const popupMenu: VPopupMenuItemType[] = [
  {
    label: '新建文件夹',
    key: 'look',
    onClick: (v, d) => {
      console.log(v, d)
    },
  },
  {
    label: '刷新',
    key: 'look',
    onClick: () => {
      console.log('查看')
    },
  },
]
const popupMenuItem: VPopupMenuItemType[] = [
  {
    label: '查看',
    key: 'look',
    onClick: (v) => {
      // console.log(v)
      preview.value = true
    },
  },
  {
    label: '编辑',
    key: 'look',
    onClick: () => {
      console.log('查看')
    },
  },
  {
    label: '删除',
    key: 'look',
    onClick: () => {
      console.log('查看')
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
const _fileList = ref<UploadFileInfo[]>()
const onUpdateFileList = (v) => {
  console.log(v)
}
</script>

<template>
  <div w-full h-100vh p10>
    <VWrap
      v-model:preview="preview"
      token-url="/token"
      :data="data"
      data-source="ali-oss"
      :popup-menu-options="popupMenu"
      :popup-menu-item-options="popupMenuItem"
      title="Vimr 文件管理"
      shadow-xl
      border rounded-xl
      @update:context-menu-item-click="oncCntextMenuItemClick"
      @update:select="onSelect"
    />
  </div>
</template>

<style scoped lang='less'>

</style>
