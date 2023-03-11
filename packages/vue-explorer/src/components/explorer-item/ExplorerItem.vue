<script setup lang='ts'>
import { explorerItemProps } from './props'
const props = defineProps(explorerItemProps)
</script>

<template>
  <div :style="{ width: `${props.width}px` }" class="explorer-item-wrap">
    <div class="explorer-item-checkbox">
      <span class="i-ri-more-fill explorer-item-checkbox-icon" />
    </div>
    <slot name="icon" v-bind="props.data" />
    <slot>
      <div>
        {{ props.data?.label }}
      </div>
    </slot>
  </div>
</template>

<style scoped lang='less'>
.explorer-item-wrap{
  @apply p3 flex flex-col items-center gap3 rounded-md relative transition bg-transparent hover:bg-black/10 cursor-default;
  .explorer-item-checkbox{
    @apply absolute right-2 top-2 w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-md transition invisible;
    .explorer-item-checkbox-icon{
      @apply transition text-gray3;
    }
  }
  .explorer-item-checkbox:hover{
    .explorer-item-checkbox-icon{
      @apply text-gray6;
    }
  }
}
.explorer-item-wrap:hover{
  .explorer-item-checkbox{
    @apply visible;
  }
}
</style>
