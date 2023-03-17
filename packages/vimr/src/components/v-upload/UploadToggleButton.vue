<script setup lang='ts'>
const props = defineProps<{ right?: number }>()
</script>

<template>
  <div class="vimr-upload-toggle-button" :style="{ transform: `translate(${props.right ?? 0}px,-50%)` }">
    <i class="i-ri-more-2-fill" />
  </div>
</template>

<style scoped lang='less'>
.vimr-upload-toggle-button{
  @apply absolute top-1/2 right-0 w-5 h-20 bg-white border-l border-t border-b shadow flex items-center justify-center text-2xl rounded-l-md cursor-pointer transition-all duration-300 ;
}
</style>
