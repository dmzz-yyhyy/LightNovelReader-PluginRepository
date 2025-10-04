<script setup lang="ts">
  import { StyleProvider, Themes } from '@varlet/ui'
  import From from './components/From.vue';

  StyleProvider(Themes.md3Light)
</script>

<template>
  <div class="outer">
    <var-card title="UI测试">
      <From/>
    </var-card>
  </div>
</template>

<style scoped>
  .outer{
    width: 300px;
  }
</style>