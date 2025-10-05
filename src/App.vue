<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { StyleProvider, Themes } from '@varlet/ui'
  StyleProvider(Themes.md3Light)

  const url = "https://v6.gh-proxy.com/https://github.com/dmzz-yyhyy/LightNovelReader-PluginRepository/blob/main/data/"

  interface Data {
    plugins: {
      id:string,
      name:string
    }[]
  }

  const data = ref<Data>({plugins:[]})
  const plugins = ref<PluginData[]>([])

  const loading = ref(false)
  const error = ref(false)
  const finished = ref(false)
  
  let first = false
  let index = 0

  const title = computed(()=>document.title)

  async function load() {
    if(!first){
      try{
        let response = await fetch(`${url}plugins.json`)
        data.value = await response.json()
        first = true
      }catch(e){
        console.error(e)
        loading.value = false
        error.value = true
        return
      }
    }

    loading.value = true
    for (let i = 0; i < 5; i++) {
      if(data.value.plugins.length <= index){
        finished.value = true
        break
      }
      try{
        let response = await fetch(`${url}${data.value.plugins[index]?.id}/metadata.json`)
        plugins.value.push(await response.json())
      }catch(e){
        console.error(e)
      }finally{
        index ++
      }
    }
    loading.value = false
  }

</script>

<template>
  <var-app-bar :title="title"/>
  <var-list
    :finished="finished"
    v-model:loading="loading"
    v-model:error="error"
    @load="load"
  >
    <var-cell :key="plugin.id" v-for="plugin in plugins">
      <Card :plugin="plugin" :url="url"/>
    </var-cell>
  </var-list>
</template>

<style scoped>
  .outer{
    width: 300px;
  }
</style>