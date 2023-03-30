<script setup lang='ts'>
import { ref, watch } from 'vue'
import { isFunction } from '../../utils'
import type { VPopupMenuItemType } from '../index'
import { navigationProps } from './props'

const props = defineProps(navigationProps)
const emit = defineEmits<{
  (e: 'update:value', v: typeof props.value): void
}>()
const _value = ref(props.value)
const onClick = (item: VPopupMenuItemType) => {
  _value.value = item.key
  emit('update:value', _value.value)
  if (item.onClick && isFunction(item.onClick))
    item.onClick(item)
}
watch(() => props.value, (v) => {
  _value.value = v
})
</script>

<template>
  <div class="vimr-navigation-wrap">
    <div
      v-for="(item, index) in props.options"
      :key="index"
      class="vimr-navigation-item"
      :class="item.key === _value ? 'bg-black/10' : ''"
      @click="onClick(item)"
    >
      <i v-if="item.icon" class="vimr-navigation-item-icon" :class="item.icon" />
      <span class="vimr-navigation-item-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped lang='less'>
.vimr-navigation-wrap {
  @apply w-full flex items-center gap-1 min-w-0;

  .vimr-navigation-item {
    @apply p-x-2 p-y-1 cursor-pointer transition rounded-md hover:(bg-black/10) flex items-center ;

    .vimr-navigation-item-icon {
      @apply text-base;
    }

    .vimr-navigation-item-label {
      @apply text-base;
    }
  }
}
</style>
