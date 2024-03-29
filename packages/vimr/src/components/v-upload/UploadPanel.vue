<script setup lang='ts'>
import { ref, toRaw, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { uploadPanelProps } from './props'
import type { UploadFileInfo } from './props'
import UploadTrigger from './UploadTrigger.vue'
import UploadList from './UploadList.vue'
const props = defineProps(uploadPanelProps)
const emit = defineEmits<{
  (e: 'update:show', v: boolean): void
  (e: 'update:fileList', fileList: UploadFileInfo[]): void
  (e: 'finish', v: UploadFileInfo): void
  (e: 'error', v: UploadFileInfo): void
  (e: 'change', v: UploadFileInfo[]): void
}>()
const uploadRef = ref<HTMLElement>()
onClickOutside(uploadRef, (e: any) => {
  if (e.target!.className === 'i-ri-more-2-fill' || e.target!.className === 'vimr-upload-panel-toggle-button')
    return
  emit('update:show', false)
})
const _fileList = ref(props.defaultFileList ?? [])
watch(() => props.fileList, (v) => {
  _fileList.value = v ?? []
  emit('update:fileList', v ?? [])
})
const onUpdateFileList = (fileList: UploadFileInfo[]) => {
  _fileList.value = fileList
  emit('update:fileList', toRaw(fileList))
}
</script>

<template>
  <Transition name="vimr">
    <div
      v-show="props.show"
      ref="uploadRef"
      class="vimr-upload-panel-wrap"
      :class="[blur ? 'backdrop-blur-2xl' : '']"
    >
      <div class="vimr-upload-panel-close-icon" @click.prevent.stop="emit('update:show', false)">
        <i class="i-ri-close-fill" />
      </div>
      <div class="vimr-upload-panel-content" @click.prevent.stop="false">
        <UploadList :file-list="_fileList" />
      </div>
      <div class="vimr-upload-trigger-wrap">
        <UploadTrigger
          :file-list="_fileList"
          v-bind="props"
          @update:file-list="onUpdateFileList"
          @finish="v => { emit('finish', toRaw(v)) }"
          @error="v => { emit('error', toRaw(v)) }"
          @change="v => emit('change', toRaw(v))"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang='less'>
.vimr-upload-panel-wrap{
  @apply absolute right-0 top-0 w-100 h-full flex flex-col transition-all duration-300 border dark:border-white/20 bg-white/80 dark:bg-black/20 backdrop-blur-md shadow-2xl;
    .vimr-upload-panel-close-icon{
      @apply absolute transition-all top-5 right-5 w-10 h-10 flex items-center justify-center text-2xl text-gray-5 bg-black/5 rounded-full cursor-pointer ;
      i{
        @apply transition-all hover:rotate-180;
      }
    }
    .vimr-upload-panel-content{
      @apply mt-20 flex flex-1 p5 min-w-0;
    }
    .vimr-upload-trigger-wrap{
      @apply w-full h-20 p-x-5 flex items-center justify-end;
    }
    .vimr-upload-panel-close-icon:hover{
      @apply bg-black/10;
    }
}
.vimr-enter-active,
.vimr-leave-active {
  transition:all 0.3s ease;
}

.vimr-enter-from,
.vimr-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
