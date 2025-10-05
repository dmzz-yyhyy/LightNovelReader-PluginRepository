<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{
    plugin: PluginData
    url:string
  }>()

  const loading = ref(false)

  async function download(url:string, filename:string){
    loading.value = true
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('网络响应异常')
      }
      return response.blob()
    })
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    })
    .catch(error => {
      console.error('下载失败:', error)
    })
    .finally(()=>{
      loading.value = false
    })
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
      @click="()=>download(`${url}${plugin.id}/plugin.apk`, `${props.plugin.name}-${props.plugin.versionName}.apk`)">下载</var-button>
    </template>
  </var-card>
</template>

<style scoped>
  
</style>