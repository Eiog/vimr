<script setup lang='ts'>
import { ref, watch } from 'vue'
import { nanoid } from 'nanoid'
import { useEventListener } from '@vueuse/core'
import { isFunction } from '../../utils'
import type { UploadFileInfo } from './props'
import { uploadTriggerProps } from './props'
import { changePercentage, changeStatus, defaultUploadRequest } from './helps'
const props = defineProps(uploadTriggerProps)
const emit = defineEmits<{
  (e: 'click'): void
  (e: 'update:fileList', fileList: UploadFileInfo[]): void
  (e: 'finish', v: UploadFileInfo): void
  (e: 'error', v: UploadFileInfo): void
  (e: 'change', v: UploadFileInfo[]): void
}>()
const uploadTriggerRef = ref<HTMLElement>()
const uploadFileRef = ref<HTMLInputElement>()
const _fileList = ref<UploadFileInfo[]>(props.defaultFileList ?? [])
watch(() => props.fileList, (v) => {
  _fileList.value = v ?? []
})
const onClick = () => {
  emit('click')
  uploadFileRef.value!.click()
}
useEventListener(uploadFileRef, 'change', (e: Event) => {
  const _files = uploadFileRef.value ? uploadFileRef.value.files : undefined
  if (!_files)
    return
  const batchId = nanoid(6)
  const _fileListMap = Object.values(_files).map((m) => {
    const item = {
      id: nanoid(12),
      name: m.name,
      status: 'pending',
      batchId,
      file: m,
      fullPath: URL.createObjectURL(m),
      percentage: 0,
      type: m.type,
    } as UploadFileInfo
    let uploadRequest = null
    if (props.customRequest && isFunction(props.customRequest))
      uploadRequest = props.customRequest
    else if (!props.action)
      console.error('props.action is required')
    else
      uploadRequest = defaultUploadRequest
    uploadRequest && uploadRequest({
      file: item,
      data: props.data,
      headers: props.headers,
      action: props.action,
      name: props.name,
      onFinish: () => {
        changeStatus(_fileList, item.id, 'finished')
        emit('finish', item)
      },
      onError: () => {
        changeStatus(_fileList, item.id, 'error')
        emit('error', item)
      },
      onProgress: (e) => {
        changePercentage(_fileList, item.id, e.percent)
      },
    })

    return item
  })
  _fileList.value.push(..._fileListMap)

  emit('update:fileList', _fileList.value)
  emit('change', _fileListMap)
})
</script>

<template>
  <div ref="uploadTriggerRef" class="vimr-upload-trigger" @click="onClick">
    <input ref="uploadFileRef" :multiple="props.multiple" :max="props.max" :accept="props.accept" type="file" class="vimr-upload-file-input">
    <button>
      <i class="i-ri-add-line" />
    </button>
  </div>
</template>

<style scoped lang='less'>
.vimr-upload-trigger{
  @apply fixed w-12 h-12 rounded-full flex items-center justify-center shadow-xl ;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  .vimr-upload-file-input{
    @apply hidden;
  }
  i{
    @apply text-2xl text-white transition eas-out duration-500 hover:(rotate-270 scale-110);
  }
}
</style>
