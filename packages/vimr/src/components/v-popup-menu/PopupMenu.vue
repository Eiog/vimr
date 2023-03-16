<script setup lang='ts'>
import { ref, toRaw, watch } from 'vue'
import type { VPopupMenuItemType } from './props'
import { popupMenuProps } from './props'
const props = defineProps(popupMenuProps)
const emit = defineEmits<{
  (e: 'update:value', v: boolean): void
  (e: 'update:menuItemClick', v: VPopupMenuItemType): void
}>()
const _x = ref(props.x)
const _y = ref(props.y)
const _value = ref(props.value)
const _options = ref(props.options)
watch(() => props.value, (v) => {
  _value.value = v
  if (v) {
    _x.value = props.x
    _y.value = props.y
  }
})
watch(() => props.options, (o) => {
  _options.value = o
})
const onClick = (item: VPopupMenuItemType) => {
  _value.value = false
  emit('update:value', _value.value)
  emit('update:menuItemClick', toRaw(item))
}
</script>

<template>
  <div class="vimr-popup-menu-wrap" :style="{ transform: `translate(${_x}px,${_y}px)`, pointerEvents: _value ? 'auto' : 'none' }">
    <slot>
      <div class="vimr-popup-menu" :style="[{ width: `${props.width}px` }, _value ? { visibility: 'visible', opacity: 100, transform: 'translateY(0)' } : { visibility: 'hidden', opacity: 0, transform: 'translateY(-10PX)' }]">
        <div v-for="(item, index) in props.options" :key="index" @click="onClick(item)" @contextmenu.prevent="false">
          <div class="vimr-popup-menu-item">
            <span>{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped lang='less'>
.vimr-popup-menu-wrap{
    @apply fixed left-0 top-0;
    .vimr-popup-menu{
      @apply transition-all bg-white py3 px2 rounded-md shadow-md border flex flex-col gap1;
      .vimr-popup-menu-item{
        @apply cursor-pointer flex items-cente px3 py1 rounded-md hover:(bg-black/10);
      }
    }
  }
</style>
