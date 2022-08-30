<template>
  <div class="box">
	<div class="top">
			<van-icon size="24px" name="search" class="iconfont icon-zuo" class-prefix="icon" @click="goBack" /> <span class="wenzi">{{ this.title }}</span>
	<span class="country">{{ this.country }}</span>	</div>
  <van-notice-bar   wrapable
  :scrollable="false" mode="closeable">为了您的账户安全，请加入所在地的电报群联系管理进行线下建立推荐关系</van-notice-bar>
  <div class="address" v-if="province"> 
    			<van-icon name="search" class="iconfont icon-didian" class-prefix="icon" />
         <div>{{province}} <span v-if="city.length>0">-</span>
         {{city}} <span v-if="area.length>0">-</span>{{area}}
         </div>
  </div>
  <van-cell-group inset class="groups">
  <van-cell   >
     <template #title>
      		<van-icon name="search" class="iconfont icon-shequ" color="#333333" class-prefix="icon" />
    <span class="custom-title">某社区</span>
  
  </template>
  </van-cell>
  <van-cell title="电报群: http://t.me/eotca"  url="http://t.me/eotca" >
      <template #right-icon>
  <span class="wenzi1"> 加入</span>
  </template>
  </van-cell>
</van-cell-group>
  </div>
  
</template>

<script>
import titles from '@/components/title1.vue'
export default {
  data() {
    return {
      title:'所在地社区',
      country:'',
      province:'',
      city:'',
      area:''
    }
  },components:{
    titles
  },methods: {
    goBack() {
      console.log(11)
      this.$router.goBack()
    }
  },created() {
var {country,province,city,area}=  this.$route.params
   this.country=country;
   this.province=province;
   this.city=city;
   this.area=area;
  }
}
</script>

<style lang="less" scoped>
.box{
  width: 100%;
  height: calc(100vh - 96px);
  background-color: #F3F4F5;
}
.top {
	width: 100%;
	height: 96px;
	background-color: #ffffff;
	padding:0 20px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	.icon-zuo {
		color: #333333;
	}
	.wenzi {
		color: #333333;
		align-self: center;
      margin: auto;
		font-weight: bold;
		font-size: 36px;
	}
  .country{
    font-size: 28px;
  }
  .iconfont{
  width: 16px;
  height: 28px;
}
}
.icon-didian{
  font-size: 25px;
}
.address{
  width: 100%;
  display: flex;
  font-size: 28px;
  color:#999999;
  align-items: center;
  padding-left: 30px;
  margin-top: 20px;
}
.icon-shequ{
  font-size: 32px;
}
.wenzi1{
  color:#237FF8;
  font-size: 28px;
}
.groups{
  margin-top: 20px;
}
</style>