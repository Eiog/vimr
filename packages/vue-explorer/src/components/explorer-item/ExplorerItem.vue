<script setup lang='ts'>
import { explorerItemProps } from './props'
const props = defineProps(explorerItemProps)
</script>

<template>
  <div>
    {{ props.data?.label }}
  </div>
</template>

<style scoped lang='less'>

</style>
