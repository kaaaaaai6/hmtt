<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <van-tabs v-model="active">
      <van-tab
      v-for="channel in channels"
      :title="channel.name"
      :key="channel.id"
      >
      <van-list
      v-model="channel.loading"
      :finished="channel.finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="van_list"
    >
    <van-cell
      v-for="article in channel.articles"
      :key="article.art_id.toString()"
      :title="article.title"
    />
    </van-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { getArticles } from '@/api/article'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0, // 控制当前激活页标签，下标
      channels: [], // 频道列表
      list: [],
      loading: false,
      finished: false
    }
  },

  computed: {
    currentChannel () {
      return this.channels[this.active]
    }
  },

  created () {
    this.localAllChannels()
  },

  methods: {
    async localAllChannels () {
      const { data } = await getAllChannels()
      // 遍历channels,为每一个频道初始化一个 articles 用来存储该频道的数据
      data.data.channels.forEach(channel => {
        channel.articles = []
        channel.loading = false
        channel.finished = false
      })
      this.channels = data.data.channels
    },
    async onLoad () {
      // 1. 请求加载文章列表
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channelId: currentChannel.id,
        timestamp: currentChannel.timestamp || Date.now(),
        withTop: 1
      })
      // console.log(data)
      const { pre_timestamp: preTimestamp, results } = data.data
      // 2. 将得到的文章列表添加到当前频道.articles 中
      currentChannel.articles.push(...results)
      // 3. 本次 onLoad 数据加载完毕，将 loading 设置为 false
      currentChannel.loading = false
      // 4. 判断是否还有下一页数据
      if (!preTimestamp) {
        currentChannel.finished = true
      } else {
        currentChannel.pre_timestamp = preTimestamp
      }
    }

    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       // this.list.push(this.list.length + 1)
    //       const articles = this.currentChannel.articles
    //       articles.push(articles.length + 1)
    //     }
    //     // 加载状态结束
    //     this.currentChannel.loading = false

    //     // 数据全部加载完成
    //     if (this.currentChannel.articles.length >= 40) {
    //       this.currentChannel.finished = true
    //     }
    //   }, 2000)
    // }
  }
}
</script>

<style lang="less">
.home {
  .van_list {
    margin-bottom: 50px
  }
}
</style>
