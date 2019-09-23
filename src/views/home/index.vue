<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="active">
      <van-tab
      v-for="channel in channels"
      :title="channel.name"
      :key="channel.id"
      >
        <!-- 下拉刷新组件 -->
        <van-pull-refresh
        v-model="channel.pullDownLoading"
        @refresh="onRefresh"
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
            >
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item
                  v-for="(img, index) in article.cover.images"
                  :key="index"
                  >
                    <van-image height="80" :src="img" lazy-load/>
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>{{ article.aut_name }}</span>
                    <span>{{ article.comm_count }}评论</span>
                    <span>{{ article.pubdate | relativeTime }}</span>
                  </div>
                  <van-icon name="close" />
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
        <!-- 编辑频道 -->
        <van-popup
          v-model="isChannelEditShow"
          position="bottom"
          :style="{ height: '95%' }"
          round
        >
          <!-- 我的频道 -->
          <div>
            <van-cell title="我的频道">
              <van-button type="danger" size="mini">编辑</van-button>
            </van-cell>
            <van-grid :gutter="10">
              <van-grid-item
                v-for="value in 8"
                :key="value"
                text="文字"
              />
            </van-grid>
          </div>
          <!-- /我的频道 -->

          <!-- 频道推荐 -->
          <div>
            <van-cell title="频道推荐">
            </van-cell>
            <van-grid :gutter="10">
              <van-grid-item
                v-for="value in 8"
                :key="value"
                text="文字"
              />
            </van-grid>
          </div>
          <!-- /频道推荐 -->
        </van-popup>
<!-- /编辑频道 -->
      </van-tab>
      <!-- 面包按钮 -->
      <div slot="nav-right" class="wap-nav" @click="isChannelEditShow = true">
        <van-icon name="wap-nav" size="26" />
      </div>
      <!-- /面包按钮 -->
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
      finished: false,
      isChannelEditShow: true // 这里我们先设置为 true 就能看到弹窗的页面了
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
        channel.pullDownLoading = false
      })
      this.channels = data.data.channels
    },
    async onRefresh () {
      // 1. 请求文章数据
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channelId: currentChannel.id,
        timestamp: Date.now(),
        withTop: 1
      })
      // 2. 将数据添加到当前频道.articles数据中（顶部）
      currentChannel.articles.unshift(...data.data.results)
      // 3. 关闭下拉刷新状态
      currentChannel.pullDownLoading = false
      // 4. 提示用户刷新成功
      this.$toast('刷新成功')
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

<style lang="less" scoped>
.home {
  .van-tabs /deep/ .van-tabs__wrap--scrollable {
    position: fixed;
    top: 46px;
    left: 0;
    right: 16px;
    z-index: 2;
    .wap-nav {
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
    }
  }
  .van-tabs /deep/ .van-tabs__content {
    margin-top: 90px;
  }
  .van_list {
    margin-bottom: 50px;
  }
  .article-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .meta span {
      margin-right: 10px;
    }
  }
}
</style>
