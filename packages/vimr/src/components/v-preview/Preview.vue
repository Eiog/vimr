<script setup lang='ts'>
import { previewProps } from './props'
const props = defineProps(previewProps)
const emit = defineEmits<{
  (e: 'update:show', v: boolean): void
}>()
</script>

<template>
  <Transition name="vimr">
    <div
      v-if="props.show"
      class="vimr-preview-wrap"
      :class="[props.blur ? 'backdrop-blur-2xl' : '']"
    >
      <div class="vimr-preview-close-icon" @click.prevent.stop="emit('update:show', false)">
        <i class="i-ri-close-fill" />
      </div>
      <slot>
        <div class="vimr-preview-content" @click.prevent.stop="false" />
      </slot>
    </div>
  </Transition>
</template>

<style scoped lang='less'>
.vimr-preview-wrap{
  @apply absolute left-0 top-0 w-full h-full flex items-center justify-center transition-all bg-white/10  ;
  .vimr-preview-close-icon{
    @apply absolute transition-all top-10 right-10 w-10 h-10 flex items-center justify-center text-2xl text-gray-5 bg-black/5 rounded-full cursor-pointer ;
    i{
      @apply transition-all hover:rotate-180;
    }
  }
  .vimr-preview-close-icon:hover{
    @apply bg-black/10;
  }
  .vimr-preview-content{
    @apply w-100 h-50 bg-white shadow-xl rounded-xl border;
  }
}

.vimr-enter-active,
.vimr-leave-active {
  transition: all 0.3s ease;
}

.vimr-enter-from,
.vimr-leave-to {
  opacity: 0;
}
</style>
