<script setup lang="ts">
  import { useCounterStore } from './stores/counter';
  const store = useCounterStore()

</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <div>Counter: {{ store.count }}</div>
  <button @click="store.increment()">Increment</button>
</template>

<style scoped></style>
