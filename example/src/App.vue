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
      <template #preview>
        <VPreview v-model:show="previewShow" />
      </template>
      <template #uploadPanel>
        <VUploadPanel v-model:show="uploadPanelShow">
          <VUploadList v-model:file-list="_fileList" />
        </VUploadPanel>
      </template>
      <template #uploadTrigger>
        <VUploadTrigger v-model:file-list="_fileList" :custom-request="customRequest" @update:file-list="onUpdateFileList" />
      </template>
    </VWrap>
  </div>
</template>

<style scoped lang='less'>

</style>
