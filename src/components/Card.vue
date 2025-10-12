<script setup lang="ts">
  import { ref } from 'vue';
  import { Snackbar } from '@varlet/ui'
  import JSZip from 'jszip';

  type FileList = {
    url: string,
  }[]

  const props = defineProps<{
    plugin: PluginData
    url:string
  }>()

  const loading = ref(false)
  const progressShow = ref(false)
  const progress = ref(0)

  async function download(){
    loading.value = true
    try{
      if(props.plugin.compressed_file_number && props.plugin.compressed_file_number > 0){
        const fileList:FileList = []
        for(let i = 1; i <= props.plugin.compressed_file_number; i++){
          const n = i.toString().padStart(3, '0')
          fileList.push({
            url: `${props.url}${props.plugin.id}/plugin.zip.${n}`,
          })
        }
        await downloadAndMergeParts(fileList, `${props.plugin.name}-${props.plugin.version_name}.apk.lnrp`)
      }else{
        await downloadSingleFile(`${props.url}${props.plugin.id}/plugin.apk.lnrp`, `${props.plugin.name}-${props.plugin.version_name}.apk.lnrp`)
      }
    }catch(e){
      Snackbar({
        content: "下载失败，请重试",
        duration: 1000,
      })
      console.error(e)
    }finally{
      loading.value = false
      progressShow.value = false
    }
  }

  async function downloadSingleFile(url:string, filename:string){
    let response = await fetch(url)
    saveFile(await response.blob(), filename)
  }

  async function downloadAndMergeParts(fileList:FileList, finalFileName:string) {
    progress.value = 0
    progressShow.value = true

    const part = 100 / fileList.length;

    const trackedPromises = fileList.map((data)=>{
      return fetch(data.url).then((response)=>{
        return response.blob();
      }).finally(() => {
        progress.value += part
      })
    })

    const blobs = await Promise.all(trackedPromises)
    const mergedBlob = new Blob(blobs, { type: 'application/octet-stream' });

    const zip = new JSZip();
    const zipData = await zip.loadAsync(mergedBlob);
    const fileBlob = await Object.entries(zipData.files)[0]?.[1].async('blob')

    if (!fileBlob) {
      throw new Error('无法从压缩包中提取文件');
    }
    saveFile(fileBlob, finalFileName)
  }

  function saveFile(file:Blob, filename:string){
    const blobUrl = window.URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    link.style.display = 'none' 
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  }

</script>

<template>
  <var-card :title="props.plugin.name">
    <div>版本: {{ props.plugin.version_name }}</div>
    <div>作者: {{ props.plugin.author }}</div>
    <div>描述: {{ props.plugin.description }}</div>
    <template #extra>
      <div class="bar">
        <var-button 
        type="primary" 
        :loading="loading"
        @click="()=>download()">下载</var-button>
        <var-progress class="progress" v-show="progressShow" :value="progress" />
      </div>
      
    </template>
  </var-card>
</template>

<style scoped>
  .bar{
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
  .progress{
    width: 100%;
    margin-top: 10px;
  }
</style>