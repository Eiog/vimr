<script setup lang='ts'>
import SvgIcon from './SvgIcon.vue'
import { explorerIconProps } from './props'
const props = defineProps(explorerIconProps)
</script>

<template>
  <div class="explorer-icon">
    <SvgIcon :name="props.type" :width="5" :height="5" />
  </div>
</template>

<style scoped lang='less'>
.explorer-icon{
  @apply p1;
}
</style>
