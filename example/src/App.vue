<script setup lang='ts'>
import { VWrap } from 'vimr'
import type { VItemType } from 'vimr'
const data: VItemType[] = [
  {
    key: 'vimr',
    label: 'vimr',
    type: 'jpg',
  },
  {
    key: 'onu-ui',
    label: 'onu-ui',
    type: 'jpeg',
  },
  {
    key: 'vue3-starter',
    label: 'vue3-starter',
    type: 'png',
  },
  {
    key: 'tsup-starter',
    label: 'tsup-starter',
    type: 'gif',
  },
  {
    key: 'chiyu-admin',
    label: 'chiyu-admin',
    type: 'mp4',
  },
  {
    key: 'chiyu-server',
    label: 'chiyu-server',
    type: 'unknown',
  },
  {
    key: 'lfq-mp-wx-client',
    label: 'lfq-mp-wx-client',
    type: 'folder',
  },
]
</script>

<template>
  <div w-full h-100vh p10>
    <VWrap :data="data" shadow-xl border rounded-xl />
  </div>
</template>

<style scoped lang='less'>

</style>
