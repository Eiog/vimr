<script setup lang='ts'>
import { nextTick, ref, toRaw } from 'vue'
import { useElementBounding, useMouse } from '@vueuse/core'
import type { VItemType, VPopupMenuItemType } from '../index'
import { VItem, VNavigation, VPopupMenu } from '../index'
import UploadToggleButton from '../v-upload/UploadToggleButton.vue'
import { isFunction } from '../../utils'
import { wrapProps } from './props'
const props = defineProps(wrapProps)
const emit = defineEmits<{
  (e: 'update:contextMenuItemClick', v: { menu: VPopupMenuItemType; data?: VItemType }): void
  (e: 'update:select', v: { key?: number | string; selectKeys: (number | string)[] }): void
  (e: 'update:uploadPanelShow', v: boolean): void
}>()
const vimrMainRef = ref<HTMLElement | undefined>()
const popupRef = ref<HTMLElement | undefined>()
const { right, bottom } = useElementBounding(vimrMainRef)
const { width, height } = useElementBounding(popupRef)

const toggleUploadPanel = () => {
  emit('update:uploadPanelShow', !props.uploadPanelShow)
}

// 右键菜单
const { x, y } = useMouse()
const _x = ref(x.value)
const _y = ref(y.value)
const _popupMenu = ref(false)
const _popupMenuOptions = ref(props.popupMenuOptions)
const handleShowPopupMenu = async () => {
  _x.value = x.value > right.value - width.value ? right.value - width.value : x.value
  _y.value = y.value > bottom.value - height.value ? bottom.value - height.value : y.value
  if (_popupMenu.value) {
    _popupMenu.value = false
    await nextTick()
    await new Promise((resolve) => {
      setTimeout(() => {
        return resolve(true)
      }, 100)
    })
  }
  _popupMenu.value = true
}
const handleHidePopupMenu = () => {
  _popupMenu.value = false
}
const currentItem = ref<VItemType>()
const onWrapContextmenuClick = async () => {
  if (!props.popupMenuOptions)
    console.warn('popupMenuOptions is not found')
  _popupMenuOptions.value = props.popupMenuOptions
  currentItem.value = undefined
  handleShowPopupMenu()
}
const onWrapClick = () => {
  handleHidePopupMenu()
}
const onItemContextmenuClick = (item: VItemType) => {
  if (!props.popupMenuItemOptions)
    console.warn('popupMenuItemOptions is not found')
  _popupMenuOptions.value = props.popupMenuItemOptions
  currentItem.value = item
  handleShowPopupMenu()
}
const onMoreIconClick = (item: VItemType) => {
  if (_popupMenu.value) {
    handleHidePopupMenu()
    return
  }
  onItemContextmenuClick(item)
}
const onPopupMenuItemClick = (item: VPopupMenuItemType) => {
  if (item.onClick && isFunction(item.onClick))
    item.onClick(item, currentItem.value)
  emit('update:contextMenuItemClick', { menu: item, data: toRaw(currentItem.value) })
}
// select
const selectedKeys = ref<(number | string)[]>([])
const onItemClick = (item: VItemType) => {
  handleHidePopupMenu()
  if (selectedKeys.value.includes(item.key)) {
    selectedKeys.value = []
    emit('update:select', { key: undefined, selectKeys: toRaw(selectedKeys.value) })
    return
  }
  selectedKeys.value = [item.key]
  emit('update:select', { key: item.key, selectKeys: toRaw(selectedKeys.value) })
}
const onSelectIconClick = (item: VItemType) => {
  const index = selectedKeys.value.findIndex(f => f === item.key)
  if (index > -1) {
    selectedKeys.value.splice(index, 1)
    emit('update:select', { key: undefined, selectKeys: toRaw(selectedKeys.value) })
    return
  }
  selectedKeys.value.push(item.key)
  emit('update:select', { key: item.key, selectKeys: toRaw(selectedKeys.value) })
}
</script>

<template>
  <div class="vimr-wrap">
    <slot name="header">
      <div class="vimr-header">
        <div class="vimr-title">
          {{ props.title }}
        </div>
        <span class="line-x" />
        <div v-if="$slots.navigation" class="vimr-navigation">
          <slot name="navigation">
            <VNavigation :options="props.navigationOptions" />
          </slot>
        </div>
        <span class="line-x" />
      </div>
    </slot>
    <div ref="vimrMainRef" class="vimr-main">
      <slot name="side" />
      <div class="vimr-body" @contextmenu.prevent="onWrapContextmenuClick()" @click="onWrapClick">
        <div class="vimr-body-content">
          <slot v-for="item in props.data" v-bind="item">
            <VItem
              :data="item"
              :selected="selectedKeys.includes(item.key)"
              @contextmenu.prevent.stop="onItemContextmenuClick(item)"
              @click.prevent.stop="onItemClick(item)"
              @more-icon-click="onMoreIconClick"
              @select-icon-click="onSelectIconClick"
            />
          </slot>
        </div>
      </div>
      <slot name="preview" />
      <slot name="uploadPanel" />
      <slot name="uploadTrigger" />
      <UploadToggleButton :right="props.uploadPanelShow ? -400 : 0" @click.prevent.stop="toggleUploadPanel" />
      <VPopupMenu
        ref="popupRef"
        v-model:value="_popupMenu"
        :options="_popupMenuOptions"
        :x="_x"
        :y="_y"
        @update:menu-item-click="onPopupMenuItemClick"
      >
        <slot name="popupMenu" />
      </VPopupMenu>
    </div>
  </div>
</template>

<style scoped lang='less'>
.line-x{
  @apply wfull h-1px bg-black/20 dark:bg-white/20;
}
.vimr-wrap{
  @apply w-full h-full flex flex-col overflow-hidden bg-white dark:bg-black;
  .vimr-header{
    @apply wfull flex flex-col shadow;
    .vimr-title{
      @apply wfull h-12 flex items-center px5 text-xl text-dark dark:text-white;
    }
    .vimr-navigation{
      @apply w-full h-10 flex items-center gap3  px5;
    }
  }
  .vimr-main{
    @apply px5 py2 flex flex-1 min-h-0 relative overflow-hidden  bg-white dark:bg-dark;
    .vimr-body{
      @apply flex-1 min-h-0 overflow-y-auto;
      .vimr-body-content{
        @apply flex flex-wrap gap1 ;
      }
    }
    .vimr-body::-webkit-scrollbar{
      width:6px;
      background-color:rgba(0, 0, 0, 0.1);
    }
      /*定义滚动条轨道：内阴影+圆角*/
      .vimr-body::-webkit-scrollbar-track{
      background-color:rgba(0, 0, 0, 0.1);
    }
      /*定义滑块：内阴影+圆角*/
      .vimr-body::-webkit-scrollbar-thumb{
      border-radius:10px;
      background-color:rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
