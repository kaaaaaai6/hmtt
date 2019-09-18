<template>
  <div>
      <van-nav-bar title="登录" />
      <van-cell-group>
        <van-field
        v-model="user.mobile"
        requierd
        clearable
        label="手机号"
        plcaeholder="请输入手机号"
        />
        <van-field
        v-model="user.code"
        requierd
        type = "password"
        label="验证码"
        plcaeholder="请输入验证码"
        />
      </van-cell-group>
    <div class="login-btn">
        <van-button type = "info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },

  methods: {
    async onLogin () {
      const { data } = await request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data: this.user
      })
      console.log(data)
    }
  }
}
</script>

<style lang='less' scoped>
.login-btn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
