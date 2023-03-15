<script setup lang='ts'>
import { Explorer, ExplorerIcon, ExplorerItem } from 'vimr'
const data = [
  {
    key: 'vimr',
    label: 'vimr',
    icon: 'jpg',
  },
  {
    key: 'onu-ui',
    label: 'onu-ui',
    icon: 'jpeg',
  },
  {
    key: 'vue3-starter',
    label: 'vue3-starter',
    icon: 'png',
  },
  {
    key: 'tsup-starter',
    label: 'tsup-starter',
    icon: 'gif',
  },
  {
    key: 'chiyu-admin',
    label: 'chiyu-admin',
    icon: 'mp4',
  },
  {
    key: 'chiyu-server',
    label: 'chiyu-server',
    icon: 'unknown',
  },
  {
    key: 'lfq-mp-wx-client',
    label: 'lfq-mp-wx-client',
    icon: 'folder',
  },
]
</script>

<template>
  <div w-full h-100vh p10>
    <Explorer :data="data" shadow-xl border rounded-xl>
      <template #default="item">
        <ExplorerItem :data="item">
          <template #icon="{ icon }:{icon:any}">
            <ExplorerIcon :type="icon" />
          </template>
        </ExplorerItem>
      </template>
      <template #popup-menu>
        <div w-20 flex flex-col>
          <div>详情</div>
          <div>打开</div>
        </div>
      </template>
    </Explorer>
  </div>
</template>

<style scoped lang='less'>

</style>
