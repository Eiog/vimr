<script setup lang='ts'>
import { nextTick, ref, toRaw, watch } from 'vue'
import { useElementBounding, useMouse } from '@vueuse/core'
import type { VItemType, VPopupMenuItemType } from '../index'
import { VItem, VPopupMenu, VPreview, VUploadPanel, VUploadTrigger } from '../index'
import UploadToggleButton from '../v-upload/UploadToggleButton.vue'
import { isFunction } from '../../utils'
import { wrapProps } from './props'
const props = defineProps(wrapProps)
const emit = defineEmits<{
  (e: 'update:contextMenuItemClick', v: { menu: VPopupMenuItemType; data?: VItemType }): void
  (e: 'update:select', v: { key?: number | string; selectKeys: (number | string)[] }): void
  (e: 'update:preview', v: boolean): void
  (e: 'update:upload', v: boolean): void
}>()

const vimrMainRef = ref<HTMLElement | undefined>()
const popupRef = ref<HTMLElement | undefined>()
const { right, bottom } = useElementBounding(vimrMainRef)
const { width, height } = useElementBounding(popupRef)
// preview
const _preview = ref(props.preview)
watch(() => props.preview, (v) => {
  _preview.value = v
})
const onUpdatePreview = (v: boolean) => {
  _preview.value = v
  emit('update:preview', _preview.value)
}
// upload
const _upload = ref(props.upload)
watch(() => props.upload, (v) => {
  _upload.value = v
})
const onUpdateUpload = (v: boolean) => {
  _upload.value = v
  emit('update:upload', _upload.value)
}
const toggleUpload = () => {
  _upload.value = !_upload.value
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
        <div class="vimr-fast-access">
          <span>1</span>
        </div>
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
      <VPreview
        :value="_preview"
        :blur="true"
        @update:value="onUpdatePreview"
      >
        <slot name="preview" />
      </VPreview>
      <VUploadPanel
        :value="_upload"
        :blur="false"
        @update:value="onUpdateUpload"
      >
        <slot name="upload" />
      </VUploadPanel>
      <UploadToggleButton :right="_upload ? -400 : 0" @click.prevent.stop="toggleUpload" />
      <VUploadTrigger />
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
  @apply wfull h-1px bg-gray1;
}
.vimr-wrap{
  @apply w-full h-full flex flex-col overflow-hidden;
  .vimr-header{
    @apply h-22 wfull flex flex-col shadow;
    .vimr-title{
      @apply wfull h-12 flex items-center px5 text-xl;
    }
    .vimr-fast-access{
      @apply w-full h-10 flex items-center gap3  px5;
    }
  }
  .vimr-main{
    @apply px5 py2 flex flex-1 min-h-0 relative overflow-hidden;
    .vimr-body{
      @apply flex-1 min-h-0 overflow-y-auto;
      .vimr-body-content{
        @apply flex flex-wrap gap1 ;
      }
    }
    .vimr-body::-webkit-scrollbar{
      width:6px;
      background-color:#F5F5F5;
    }
      /*定义滚动条轨道：内阴影+圆角*/
      .vimr-body::-webkit-scrollbar-track{
      background-color:#F5F5F5;
    }
      /*定义滑块：内阴影+圆角*/
      .vimr-body::-webkit-scrollbar-thumb{
      border-radius:10px;
      background-color:#ccc;
    }
  }
}
</style>
