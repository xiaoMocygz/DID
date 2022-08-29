<template>
  <div>
    <titles :title="title"
            @goBack="goBack"></titles>
    <div class="content"></div>
    <van-cell title="姓名"
              :value="name" />
    <van-cell title="UID"
              :value="UID" />
    <van-cell title="邮箱"
              :value="email" />
    <van-cell title="手机号"
              :value="phone" />
    <van-cell title="所在地"
              :value="address" />
  </div>
</template>

<script>
import titles from '../title1.vue'
export default {
  components: { titles },
  data() {
    return {
      title: '我的推荐人',
      email: '12345@qq.com',
      UID: '123456',
      name: '3245',
      phone:'13546789502',
      address: '湖南-长沙-雨花区'
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 20px;
  background-color: #f3f4f5;
}
/deep/ .van-cell__title {
  width: 20% !important;
  flex: none;
  color: #333333;
  font-weight: 700;
}
/deep/ .van-cell__value {
  text-align: left;
  color: #333333;
}
</style>