<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <van-tabs v-model="active">
      <van-tab
      v-for = "channel in channels"
      :title = "channel.name"
      :key = "channel.id"
      >{{channel.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0, // 控制当前激活页标签，下标
      channels: [] // 频道列表
    }
  },
  created () {
    this.localAllChannels()
  },
  methods: {
    async localAllChannels () {
      const { data } = await getAllChannels()
      //   console.log(data)
      this.channels = data.data.channels
    }
  }
}
</script>

<style>

</style>
