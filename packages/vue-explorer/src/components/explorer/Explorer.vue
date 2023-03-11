<script setup lang='ts'>
import { ref } from 'vue'
import { useMouse } from '@vueuse/core'
import ExplorerPopupMenu from '../explorer-popup-menu/ExplorerPopupMenu.vue'
import { explorerProps } from './props'
const props = defineProps(explorerProps)
const { x, y } = useMouse()
const showPopupMenu = ref(false)
</script>

<template>
  <div class="explorer-wrap">
    <div class="explorer-header">
      <div class="explorer-title">
        {{ props.title }}
      </div>
      <span class="line-x" />
      <div class="explorer-fast-access">
        <span>1</span>
      </div>
    </div>
    <div class="explorer-main">
      <slot name="side" />
      <div class="explorer-body">
        <slot v-for="item in props.data" v-bind="item" />
      </div>
    </div>
    <ExplorerPopupMenu v-model:value="showPopupMenu" :x="x" :y="y" />
  </div>
</template>

<style scoped lang='less'>
.line-x{
  @apply wfull h-1px bg-gray1;
}
.explorer-wrap{
  @apply w-full h-full flex flex-col;
  .explorer-header{
    @apply h-22 wfull flex flex-col shadow;
    .explorer-title{
      @apply wfull h-12 flex items-center px5;
    }
    .explorer-fast-access{
      @apply w-full h-10 flex items-center gap3  px5;
    }
  }
  .explorer-main{
    @apply px5 py2 flex;
    .explorer-body{
      @apply flex flex-wrap gap1;
    }
  }

}
</style>
