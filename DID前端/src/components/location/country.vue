<template>
  <div class="box">
    <titles :title="title" @goBack="goBack"></titles>
    <van-search v-model="value" placeholder="请输入搜索关键词"   shape="round" @input="inputClick" />
 
    
  <div class="cells">
          <van-cell   v-for="(item, index) in cell" :key="index" @click="dj(item,index)" >
    <template #title>
   {{item.name}}
  </template>
  
   <template #right-icon>
    <van-icon name="search"  class="iconfont item1 icon-xuanze" class-prefix="icon"/>
  </template>
  </van-cell>
  </div>
 <div class="xx"></div>
<van-cell-group>
  <van-cell   v-for="(item, index) in country" :key="index" @click="dj(item,index)">
    <template #title>
   {{item.name}}
  </template>
   <template #right-icon>
    <van-icon name="search"  class="iconfont item icon-xuanze" class-prefix="icon"/>
  </template>
  </van-cell>
</van-cell-group>
		
  </div>
</template>

<script>
import titles from '@/components/title1.vue';
import country from './country';

export default {
data(){
  return {
    title:'国家',
    country:[],
    value:'',
    cell:[],
  readonly: false,
country1:[]
  }
},methods: {
goBack() {
  this.$router.back();
},
dj(item, index) {

setTimeout(()=>{
  this.$router.push({name:'location',params:{name:item.name}})
},300)
  var cell= document.getElementsByClassName('item')
  for (var i=0; i<cell.length; i++){
    cell[i].style.color="white"
  }
 cell[index].style.color="blue"
   var cell1= document.getElementsByClassName('item1')
  for (var i=0; i<cell1.length; i++){
    cell1[i].style.color="white"
  }
 cell1[index].style.color="blue"

},
inputClick(val){

       this.cell=this.country1.filter((item,index)=> item.name.indexOf(val)!=-1)
}
},components:{
  titles
},created() {
this.country=country
this.country1=country
},
}
</script>

<style lang="less" scoped>
/deep/ .van-cell{
  font-size: 32px;
}

.box{
  width: 100%;
  height: calc(100vh);
  background-color: #F3F4F5;
  box-sizing: border-box;
}
.group{
  margin-bottom: 100px !important;
}

/deep/ .van-search{
  margin-top: 2px;
}
.cells{
  width: 100%;
  height: auto;
  background-color: #fff;
 
  margin-bottom: 40px;
}
.iconfont {
		color: white ;
		font-size: 60px;
		//	background-color: red !important;
	}
</style>