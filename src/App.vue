<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/app/v1_1/articles',
  params: {
    channel_id: 0,
    timestamp: Date.now(),
    with_top: 1
  }
}).then(res => {
  console.log(res.data)
})
export default {
  name: 'App'
}
</script>

<style>

</style>
