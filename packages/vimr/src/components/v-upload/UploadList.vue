<script setup lang='ts'>
import { ref, watch } from 'vue'
import type { UploadFileInfo } from './props'
import { uploadFileListProps } from './props'
import { isImage } from './helps'
const props = defineProps(uploadFileListProps)
const _fileList = ref<UploadFileInfo[]>()
watch(() => props.fileList, (v) => {
  _fileList.value = v ?? []
  _fileList.value.forEach((f) => {
    if (!isImage(f.file))
      return
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
      <div class="vimr-upload-file-list-item-thumbnail">
        <img :src="item.thumbnailUrl" alt="">
      </div>
      <div class="vimr-upload-file-list-item-content">
        <div class="vimr-upload-file-list-item-content-header">
          <div class="vimr-upload-file-list-item-tag">
            {{ item.type }}
          </div>
        </div>
        <div class="vimr-upload-file-list-item-content-body">
          <div class="vimr-upload-file-list-item-text-wrap">
            <div class="vimr-upload-file-list-item-text">
              {{ item.name }}
            </div>
          </div>
          <div class="vimr-upload-file-list-item-actions">
            <div class="vimr-upload-file-list-item-actions-btns">
              <div v-if="item.status === 'uploading'" class="vimr-upload-file-list-item-actions-btns-btn">
                <i class="i-ri-close-fill" />
              </div>
              <div v-if="item.status === 'error'" class="vimr-upload-file-list-item-actions-btns-btn">
                <i class="i-ri-refresh-line" />
              </div>
            </div>
          </div>
        </div>
        <div class="vimr-upload-file-list-item-content-footer">
          <div class="vimr-upload-file-list-item-content-footer-progress" :style="{ width: `${item.status === 'finished' || item.status === 'error' ? 100 : item.percentage ?? 0}%`, backgroundColor: `${item.status === 'finished' ? '#10b981' : item.status === 'error' ? '#ef4444' : ''}` }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.vimr-upload-file-list-wrap{
  @apply relative flex flex-col gap-3 w-full h-full overflow-y-auto;
  .vimr-upload-file-list-item{
    @apply relative flex gap-2 items-center justify-between w-full h-16 transition-all hover:bg-black/5 rounded-md cursor-default px3;
    .vimr-upload-file-list-item-thumbnail{
      @apply relative w-12 h-12 overflow-hidden rounded-md bg-gray1;
      img{
        @apply absolute w-full h-full object-cover;
      }
    }
    .vimr-upload-file-list-item-content{
      @apply h-12 flex flex-1 min-w-0 flex-col;
      .vimr-upload-file-list-item-content-header{
        @apply flex justify-end;
        .vimr-upload-file-list-item-tag{
          @apply text-xs px-1 py-0.5 bg-black/10 text-gray-5 rounded;
        }
      }
      .vimr-upload-file-list-item-content-body{
          @apply flex items-center gap3 flex-1;
          .vimr-upload-file-list-item-text-wrap{
            @apply flex-1 min-w-0 text-sm text-gray-5;
            .vimr-upload-file-list-item-text{
              @apply flex-1 min-w-0 truncate;
            }

          }
          .vimr-upload-file-list-item-actions{
            @apply flex flex-col text-xs text-gray-5;
          .vimr-upload-file-list-item-actions-btns{
            @apply flex flex-1 items-center justify-end gap-1;
            .vimr-upload-file-list-item-actions-btns-btn{
              @apply flex items-center justify-center w-5 h-5 rounded-md hover:bg-black/10 cursor-pointer;
              i{
                @apply text-sm;
              }
            }
          }
        }
      }
      .vimr-upload-file-list-item-content-footer{
        @apply w-full h-1 flex items-center bg-black/10 rounded-full;
        .vimr-upload-file-list-item-content-footer-progress{
          @apply h-1 bg-blue-5 rounded-full transition-all;
        }
      }
    }
  }
}
</style>
