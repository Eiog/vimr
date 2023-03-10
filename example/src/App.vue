<script setup lang='ts'>
import { Explorer, ExplorerItem } from 'vue-explorer'
const data = [
  {
    key: '1',
    label: '11',
    icon: '',
  },
]
</script>

<template>
  <div>
    <Explorer :data="data">
      <template #default="data">
        <ExplorerItem :data="data" />
      </template>
    </Explorer>
  </div>
</template>

<style scoped lang='less'>

</style>
