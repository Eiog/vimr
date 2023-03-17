<script setup lang='ts'>
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { useDraggable, useEventListener } from '@vueuse/core'
import type { UploadFileInfo } from './props'
import { uploadTriggerProps } from './props'
const props = defineProps(uploadTriggerProps)
const emit = defineEmits<{
  (e: 'click'): void
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
  _fileList.value.push(...Object.values(_files).map((m) => {
    return {
      id: nanoid(12),
      name: m.name,
      status: 'pending',
      file: m,
    } as UploadFileInfo
  }))
  console.log(_fileList.value)
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
