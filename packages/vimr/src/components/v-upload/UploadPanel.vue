<script setup lang='ts'>
import { ref, toRefs, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { uploadPanelProps } from './props'
const props = defineProps(uploadPanelProps)
const emit = defineEmits<{
  (e: 'update:value', v: boolean): void
}>()
const { blur, value } = toRefs(props)
const _value = ref(value.value)
watch(() => value.value, (v) => {
  _value.value = v
})
const onCloseClick = () => {
  _value.value = false
  emit('update:value', _value.value)
}
const uploadRef = ref<HTMLElement>()
onClickOutside(uploadRef, (e: any) => {
  if (e.target!.className === 'i-ri-more-2-fill' || e.target!.className === 'vimr-upload-panel-toggle-button')
    return
  onCloseClick()
})
</script>

<template>
  <Transition name="vimr">
    <div
      v-if="_value"
      ref="uploadRef"
      class="vimr-upload-panel-wrap"
      :class="[blur ? 'backdrop-blur-2xl' : '']"
    >
      <div class="vimr-upload-panel-close-icon" @click.prevent.stop="onCloseClick">
        <i class="i-ri-close-fill" />
      </div>
      <div class="vimr-upload-panel-content" @click.prevent.stop="false">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang='less'>
.vimr-upload-panel-wrap{
  @apply absolute right-0 top-0 w-100 h-full flex transition-all duration-300 border bg-white/100 shadow-2xl;
    .vimr-upload-panel-close-icon{
      @apply absolute transition-all top-5 right-5 w-10 h-10 flex items-center justify-center text-2xl text-gray-5 bg-black/5 rounded-full cursor-pointer ;
      i{
        @apply transition-all hover:rotate-180;
      }
    }
    .vimr-upload-panel-content{
      @apply mt-20 flex flex-1 p5 min-w-0;
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
