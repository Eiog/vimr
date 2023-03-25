<script setup lang='ts'>
import { computed, toRaw } from 'vue'
import { VIcon } from '../index'
import type { VItemType } from '../index'
import { itemProps } from './props'
const props = defineProps(itemProps)
const emit = defineEmits<{
  (e: 'moreIconClick', v: VItemType): void
  (e: 'selectIconClick', v: VItemType): void
}>()
const extType: { [key: string]: string[] } = {
  'file': ['file'],
  'folder': ['folder'],
  'img': ['image/gif', 'image/x-icon', 'image/jpeg', 'image/jpeg', 'image/png', 'image/wbmp'],
  'jpg': ['image/jpeg'],
  'mp4': ['video/mpeg4'],
  'music': ['audio/mp3'],
  'pdf': ['text/pdf'],
  'ppt': ['text/ppt'],
  'txt': ['text/txt'],
  'word': ['text/word'],
  'xlsx': ['text/xlsx'],
  'zip-rar': ['zip-rar'],
  'unknown': ['unknown'],
}
const iconCom = computed(() => {
  let icon = 'unknown'
  for (const key in extType) {
    if (props.data && props.data.type) {
      if (extType[key].includes(props.data?.type))
        icon = key
    }
  }
  return icon
})
const onMoreIconClick = () => {
  if (props.data)
    emit('moreIconClick', toRaw(props.data))
}
const onSelectIconClick = () => {
  if (props.data)
    emit('selectIconClick', toRaw(props.data))
}
</script>

<template>
  <div :style="{ width: `${props.width}px` }" class="vimr-item-wrap" :class="props.selected ? 'selected' : ''">
    <div class="vimr-item-checkbox-wrap">
      <div class="vimr-item-checkbox" @click.prevent.stop="onSelectIconClick">
        <span class="i-ri-checkbox-blank-circle-fill vimr-item-checkbox-icon selected-icon" />
      </div>
      <div class="vimr-item-checkbox" @click.prevent.stop="onMoreIconClick">
        <span class="i-ri-more-fill vimr-item-checkbox-icon" />
      </div>
    </div>
    <slot name="icon" v-bind="props.data">
      <VIcon :type="iconCom" :width="5" :height="5" />
    </slot>
    <slot>
      <div class="vimr-item-text">
        {{ props.data?.label }}
      </div>
    </slot>
  </div>
</template>

<style scoped lang='less'>
.vimr-item-wrap{
  @apply p3 flex flex-col items-center gap3 rounded-md relative transition hover:bg-black/10 dark:(hover:bg-white/20) cursor-default select-none;
  .vimr-item-checkbox-wrap{
    @apply absolute left-0 top-0 right-0  px2 pt2 flex items-center justify-between;
    .vimr-item-checkbox{
    @apply w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-md transition invisible cursor-pointer;
    .vimr-item-checkbox-icon{
      @apply transition text-gray3;
    }
  }
  .vimr-item-checkbox:hover{
    .vimr-item-checkbox-icon{
      @apply text-gray6;
    }
  }
  }
  .vimr-item-text{
    @apply text-dark dark:text-white/20 text-sm;
  }
}
.vimr-item-wrap.selected{
  @apply bg-black/10;
  .vimr-item-checkbox{
    @apply visible;
    .selected-icon{
      @apply text-red5;
    }
  }
}
.vimr-item-wrap:hover{
  .vimr-item-checkbox{
    @apply visible;
  }
}
</style>
