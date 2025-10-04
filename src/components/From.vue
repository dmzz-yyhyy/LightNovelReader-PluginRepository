<script setup lang="ts">
  import { ref } from 'vue'

  const disabled = ref(false)
  const readonly = ref(false)

  const radio = ref(1)
  const checkbox = ref([])
  const switcher = ref(false)
  const select = ref("")

</script>

<template>
  <var-form 
    ref="form" 
    :disabled="disabled"
    :readonly="readonly" 
    scroll-to-error="start"
  >
    <var-space direction="column" :size="[14, 0]">
      <var-button block type="primary">按钮</var-button>
      <var-radio-group v-model="radio">
        <var-radio :checked-value="1">选项1</var-radio>
        <var-radio :checked-value="2">选项2</var-radio>
      </var-radio-group>
      <var-checkbox-group v-model="checkbox">
        <var-checkbox :checked-value="1">多选1</var-checkbox>
        <var-checkbox :checked-value="2">多选2</var-checkbox>
        <var-checkbox :checked-value="3">多选3</var-checkbox>
      </var-checkbox-group>
      <var-switch variant v-model="switcher"/>
      <var-input variant="outlined" placeholder="请输入文本"/>
      <var-select variant="outlined" placeholder="请选择一个选项" v-model="select">
        <var-option label="选项1" />
        <var-option label="选项2" />
      </var-select>
    </var-space>
  </var-form>
</template>