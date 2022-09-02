<!-- 
 * @Author: webQDI svb1474155018@163.com
 * @Date: 2022-05-25 15:00
 * @update 2022-05
 * @LastEditTime: 
 * @FilePath: \etoc514\src\views\rightItem\chain.vue
 -->

<template>
  <div>
    <titles :title="title" @goBack="goBack"></titles>
    <div class="content">
      <!-- <p>账号信息</p>
      <div class="text">
        <van-cell
          v-for="(item, key) in chainList"
          :key="key"
          :title="item"
          @click="showPopup(item)"
        >
          <van-icon name="arrow" v-if="item.label != ''" />
        </van-cell> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { MemberWallet } from "@/api/trxRequest";
import titles from '@/components/titlie.vue';
export default {
  components:{
    titles
  },
  data() {
    return {
      chainList: [],
      title:'各公链绑定地址'
    };
  },
  // mounted() {
  //   this.init();
  // },
  methods: {
    goBack() {
			this.$router.back();
		},
    // showPopup(item) {
    //   if (item.toLowerCase() == localStorage.getItem("netType")) {
    //     this.$router.push({
    //       name: "chainDetails",
    //       params: { addressItem: item },
    //     });
    //   } else {
    //     this.$router.push({
    //       name: "chainOther",
    //       params: { addressItem: item },
    //     });
    //   }
    // },
    // init() {
    //   MemberWallet({ uid: localStorage.getItem("uid"), net: "" }).then(
    //     (res) => {
    //       let data = res.data;
    //       let list = [];
    //       for (let i of data) {
    //         if (i.net == localStorage.getItem("netType")) {
    //           list.unshift(i.net);
    //         } else {
    //           list.push(i.net);
    //         }
    //       }
    //       for (let j = 0; j < list.length; j++) {
    //         list[j] = list[j].toUpperCase();
    //       }
    //       list = new Set(list);
    //       this.chainList = list;
    //     }
    //   );
    // },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding-top: 32px;
}
</style>