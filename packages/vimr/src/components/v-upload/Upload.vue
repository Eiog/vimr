<script setup lang='ts'>
import { ref, toRefs, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { uploadProps } from './props'
const props = defineProps(uploadProps)
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
onClickOutside(uploadRef, () => {
  onCloseClick()
})
</script>

<template>
  <Transition name="vimr">
    <div
      v-if="_value"
      ref="uploadRef"
      class="vimr-upload-wrap"
      :class="[blur ? 'backdrop-blur-2xl' : '']"
    >
      <div class="vimr-upload-close-icon" @click.prevent.stop="onCloseClick">
        <i class="i-ri-close-fill" />
      </div>
      <slot>
        <div class="vimr-upload-content" @click.prevent.stop="false" />
      </slot>
    </div>
  </Transition>
</template>

<style scoped lang='less'>
.vimr-upload-wrap{
  @apply absolute right-0 top-0 w-100 h-full flex items-center justify-center transition-all duration-300 border bg-white/100 shadow-2xl;
    .vimr-upload-close-icon{
    @apply absolute transition-all top-10 right-10 w-10 h-10 flex items-center justify-center text-2xl text-gray-5 bg-black/5 rounded-full cursor-pointer ;
      i{
        @apply transition-all hover:rotate-180;
      }
    }
    .vimr-upload-close-icon:hover{
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
