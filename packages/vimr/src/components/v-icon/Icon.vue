<script setup lang='ts'>
import SvgIcon from './SvgIcon.vue'
import { iconProps } from './props'
const props = defineProps(iconProps)
</script>

<template>
  <div class="vimr-icon">
    <SvgIcon :name="props.type" :width="props.width" :height="props.height" />
  </div>
</template>

<style scoped lang='less'>
.vimr-icon{
  @apply p1;
}
</style>
