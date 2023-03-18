<script setup lang='ts'>
import { ref, watch } from 'vue'
import type { UploadFileInfo } from './props'
import { uploadFileListProps } from './props'
const props = defineProps(uploadFileListProps)
const _fileList = ref<UploadFileInfo[]>()
watch(() => props.fileList, (v) => {
  _fileList.value = v ?? []
  _fileList.value.forEach((f) => {
    if (!f.thumbnailUrl) {
      const reader = new FileReader()
      reader.onload = (e) => {
        _fileList.value!.find(f1 => f1.id === f.id)!.thumbnailUrl = e.target?.result as string
      }
      reader.readAsDataURL(f.file)
    }
  })
}, { immediate: true })
</script>

<template>
  <div class="vimr-upload-file-list-wrap">
    <div v-for="item in _fileList" :key="item.id" class="vimr-upload-file-list-item">
      <div class="vimr-upload-file-list-thumbnail">
        <img :src="item.thumbnailUrl" alt="">
      </div>
      <div class="vimr-upload-file-list-text">
        {{ item.name }}
      </div>
      <div class="vimr-upload-file-list-actions">
        <div class="vimr-upload-file-list-actions-tag">
          {{ item.type }}
        </div>
        <div class="vimr-upload-file-list-actions-btns">
          <div class="vimr-upload-file-list-actions-btns-btn">
            <i class="i-ri-close-fill" />
          </div>
          <div>
            <i class="i-ri-refresh-line&quot;" />
          </div>
          <div>
            <i class="i-ri-download-line&quot;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.vimr-upload-file-list-wrap{
  @apply relative flex flex-col gap-3 w-full h-full;
  .vimr-upload-file-list-item{
    @apply relative flex gap-3 items-center justify-between w-full h-16 transition-all hover:bg-black/5 rounded-md cursor-default px3;
    .vimr-upload-file-list-thumbnail{
      @apply relative w-12 h-12 overflow-hidden rounded-md bg-gray1;
      img{
        @apply absolute w-full h-full object-cover;
      }
    }
    .vimr-upload-file-list-text{
      @apply h-12 flex-1 text-sm text-gray-5 flex items-center;
    }
    .vimr-upload-file-list-actions{
      @apply h-12 flex flex-col text-xs text-gray-5;
      .vimr-upload-file-list-actions-tag{
        @apply flex items-center justify-center px-1 py-0.5 bg-black/10 rounded;
      }
      .vimr-upload-file-list-actions-btns{
        @apply flex flex-1 items-center gap-1;
        .vimr-upload-file-list-actions-btns-btn{
          @apply flex items-center justify-center w-6 h-6 rounded-md hover:bg-black/10 cursor-pointer;
          i{
            @apply text-xl;
          }
        }
      }
    }
  }
}
</style>
