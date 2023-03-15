<script setup lang='ts'>
import { VWrap } from 'vimr'
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
    <VWrap :data="data" shadow-xl border rounded-xl />
  </div>
</template>

<style scoped lang='less'>

</style>
