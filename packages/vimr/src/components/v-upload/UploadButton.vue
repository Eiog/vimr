<script setup lang='ts'>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
const emit = defineEmits<{
  (e: 'click'): void
}>()
const uploadButtonRef = ref<HTMLElement>()
const dragged = ref(false)
const _old = ref<{ x: number; y: number }>({ x: 400, y: 400 })
const { style } = useDraggable(uploadButtonRef, {
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

const onClick = () => {
  if (dragged.value)
    return
  emit('click')
}
</script>

<template>
  <div ref="uploadButtonRef" class="vimr-upload-button" :style="[style]" @click="onClick">
    <button>
      <i class="i-ri-add-line" />
    </button>
  </div>
</template>

<style scoped lang='less'>
.vimr-upload-button{
  @apply fixed w-12 h-12 rounded-full flex items-center justify-center shadow-xl ;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  i{
    @apply text-2xl text-white;
  }
}
</style>
