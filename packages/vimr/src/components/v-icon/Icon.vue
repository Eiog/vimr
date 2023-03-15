<script setup lang='ts'>
import SvgIcon from './SvgIcon.vue'
import { iconProps } from './'
const props = defineProps(iconProps)
</script>

<template>
  <div class="v-icon">
    <SvgIcon :name="props.type" :width="props.width" :height="props.height" />
  </div>
</template>

<style scoped lang='less'>
.v-icon{
  @apply p1;
}
</style>
