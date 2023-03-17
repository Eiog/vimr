<script setup lang='ts'>
import { ref } from 'vue'
import type { UploadFileInfo } from './props'
import { uploadFileListProps } from './props'
const props = defineProps(uploadFileListProps)
const _fileList = ref<UploadFileInfo[]>(props.fileList ?? [])
</script>

<template>
  <div class="vimr-upload-file-list-wrap">
    <div v-for="item in _fileList" :key="item.id" class="vimr-upload-file-list-item">
      <div class="vimr-upload-file-list-thumbnail">
        <img :src="item.thumbnailUrl" alt="">
      </div>
      <div>{{ item.name }}</div>
      <div>{{ item.type }}</div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.vimr-upload-file-list-wrap{
  @apply relative flex flex-col items-center justify-center w-full h-full;
}
</style>
