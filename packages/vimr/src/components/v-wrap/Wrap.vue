<script setup lang='ts'>
import { ref } from 'vue'
import { useMouse } from '@vueuse/core'
import { VItem, VPopupMenu } from '../index'
import { wrapProps } from './props'
const props = defineProps(wrapProps)
const { x, y } = useMouse()
const showPopupMenu = ref(false)
</script>

<template>
  <div class="v-wrap">
    <div class="v-header">
      <div class="v-title">
        {{ props.title }}
      </div>
      <span class="line-x" />
      <div class="v-fast-access">
        <span>1</span>
      </div>
    </div>
    <div class="v-main">
      <slot name="side" />
      <div class="v-body">
        <slot v-for="item in props.data" v-bind="item">
          <VItem :data="item" />
        </slot>
      </div>
    </div>
    <VPopupMenu v-model:value="showPopupMenu" :x="x" :y="y" />
  </div>
</template>

<style scoped lang='less'>
.line-x{
  @apply wfull h-1px bg-gray1;
}
.v-wrap{
  @apply w-full h-full flex flex-col;
  .v-header{
    @apply h-22 wfull flex flex-col shadow;
    .v-title{
      @apply wfull h-12 flex items-center px5;
    }
    .v-fast-access{
      @apply w-full h-10 flex items-center gap3  px5;
    }
  }
  .v-main{
    @apply px5 py2 flex;
    .v-body{
      @apply flex flex-wrap gap1;
    }
  }

}
</style>
