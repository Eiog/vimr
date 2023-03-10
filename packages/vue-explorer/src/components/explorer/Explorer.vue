<script setup lang='ts'>
import { explorerProps } from './props'
const props = defineProps(explorerProps)
</script>

<template>
  <div class="vue-explorer-wrap">
    <div class="vue-explorer-header">
      header
    </div>
    <div class="vue-explorer-main">
      <slot name="side" />
      <div class="vue-explorer-body">
        <slot v-for="item in props.data" v-bind="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
