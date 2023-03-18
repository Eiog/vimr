<script setup lang='ts'>
import { ref, watch } from 'vue'
import { nanoid } from 'nanoid'
import { useDraggable, useEventListener } from '@vueuse/core'
import { isFunction } from '../../utils'
import type { UploadFileInfo } from './props'
import { uploadTriggerProps } from './props'
import { changeStatus, defaultUploadRequest } from './helps'
const props = defineProps(uploadTriggerProps)
const emit = defineEmits<{
  (e: 'click'): void
  (e: 'update:fileList', fileList: UploadFileInfo[]): void
  (e: 'finish'): void
  (e: 'error'): void
}>()
const uploadTriggerRef = ref<HTMLElement>()
const uploadFileRef = ref<HTMLInputElement>()
const dragged = ref(false)
const _old = ref<{ x: number; y: number }>({ x: 400, y: 400 })
const { style } = useDraggable(uploadTriggerRef, {
  initialValue: { x: 400, y: 400 },
  onEnd: ({ x, y }) => {
    if (_old.value.x === x && _old.value.y === y) {
      dragged.value = false
      return
    }
    _old.value = { x, y }
    dragged.value = true
  },
})

const _fileList = ref<UploadFileInfo[]>(props.defaultFileList ?? [])
watch(() => props.fileList, (v) => {
  _fileList.value = v ?? []
})
const onClick = () => {
  if (dragged.value)
    return
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
    if (!props.action)
      console.error('props.action is required')

    if (props.action) {
      uploadRequest = defaultUploadRequest
      uploadRequest({
        file: item,
        data: props.data,
        headers: props.headers,
        action: props.action,
        name: props.name,
        onFinish: () => {
          changeStatus(_fileList, item.id, 'finished')
          emit('finish')
          console.log('onFinish')
        },
        onError: () => {
          changeStatus(_fileList, item.id, 'error')
          emit('error')
          console.log('onError')
        },
        onProgress: (e) => {
          console.log('onProgress', e)
        },
      })
    }

    return item
  })
  _fileList.value.push(..._fileListMap)

  emit('update:fileList', _fileList.value)
})
</script>

<template>
  <div ref="uploadTriggerRef" class="vimr-upload-trigger" :style="[style]" @click="onClick">
    <input ref="uploadFileRef" :multiple="props.multiple" :max="props.max" :accept="props.accept" type="file" class="vimr-upload-file-input">
    <button>
      <i class="i-ri-add-line" />
    </button>
  </div>
</template>

<style scoped lang='less'>
.vimr-upload-trigger{
  @apply fixed w-12 h-12 rounded-full flex items-center justify-center shadow-xl ;
  background-image: linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  .vimr-upload-file-input{
    @apply hidden;
  }
  i{
    @apply text-2xl text-white;
  }
}
</style>
