<script setup lang='ts'>
import { ref, watch } from 'vue'
import { popupMenuProps } from './props'
const props = defineProps(popupMenuProps)
const emit = defineEmits<{
  (e: 'update:value', v: boolean): void
}>()
const _value = ref(props.value)
watch(() => props.value, (v) => {
  _value.value = v
})

const onClick = () => {
  _value.value = false
  emit('update:value', _value.value)
}
</script>

<template>
  <div class="v-popup-menu" :style="{ transform: `translate(${props.x}px,${props.y})`, visibility: props.value ? 'visible' : 'hidden' }">
    <div v-for="(item, index) in props.options" :key="index" @click="onClick">
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.v-popup-menu{
    @apply fixed transition bg-white p3 rounded-md shadow-md border ;

  }
</style>
