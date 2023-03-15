<script setup lang='ts'>
import { VIcon } from '../index'
import { itemProps } from './props'
const props = defineProps(itemProps)
</script>

<template>
  <div :style="{ width: `${props.width}px` }" class="v-item-wrap">
    <div class="v-item-checkbox">
      <span class="i-ri-more-fill v-item-checkbox-icon" />
    </div>
    <slot name="icon" v-bind="props.data">
      <VIcon :type="props.data?.type" :width="5" :height="5" />
    </slot>
    <slot>
      <div>
        {{ props.data?.label }}
      </div>
    </slot>
  </div>
</template>

<style scoped lang='less'>
.v-item-wrap{
  @apply p3 flex flex-col items-center gap3 rounded-md relative transition bg-transparent hover:bg-black/10 cursor-default select-none;
  .v-item-checkbox{
    @apply absolute right-2 top-2 w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-md transition invisible cursor-pointer;
    .v-item-checkbox-icon{
      @apply transition text-gray3;
    }
  }
  .v-item-checkbox:hover{
    .v-item-checkbox-icon{
      @apply text-gray6;
    }
  }
}
.v-item-wrap:hover{
  .v-item-checkbox{
    @apply visible;
  }
}
</style>
