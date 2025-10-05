<script setup lang="ts">
  import { ref } from 'vue';
  import { Snackbar } from '@varlet/ui'

  const props = defineProps<{
    plugin: PluginData
    url:string
  }>()

  const loading = ref(false)

  async function download(url:string, filename:string){
    loading.value = true
    try{
      let response = await fetch(url)
      const blobUrl = window.URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      link.style.display = 'none' 
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    }catch(e){
      Snackbar({
        content: "下载失败，请重试",
        duration: 1000,
      })
      console.error(e)
      
    }finally{
      loading.value = false
    }
  }

</script>

<template>
  <var-card :title="props.plugin.name">
    <div>版本: {{ props.plugin.versionName }}</div>
    <div>作者: {{ props.plugin.author }}</div>
    <div>描述: {{ props.plugin.description }}</div>
    <template #extra>
      <var-button 
      type="primary" 
      :loading="loading"
      @click="()=>download(`${url}${plugin.id}/plugin.apk.lnrp`, `${props.plugin.name}-${props.plugin.versionName}.apk.lnrp`)">下载</var-button>
    </template>
  </var-card>
</template>

<style scoped>
  
</style>