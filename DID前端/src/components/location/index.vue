<template>
  <div class="box">
    <titles :title="title"
            @goBack="goBack"></titles>
    <div>
      <router-link to="/location/country">
        <van-cell title="国家"
                  class="country"
                  title-class="cell"
                  is-link
                  :value="value" 
                  value-class="cells"
                  >
                   <template #right-icon>
        
              <van-button 
                
                      icon="arrow"></van-button>
    
        </template>   
                  </van-cell>
      </router-link>

      <van-cell title="省市"
                title-class="cell"
                is-link
                class="city"
                :value="value1"
                v-if="flag">
        <template #right-icon>

          <van-button :disabled="readonly1"
                      @click="startClick"
                      icon="arrow">
          </van-button>
        </template>
      </van-cell>
      <div class="wenzi">当前地区现有 <span> {{shequ}}</span> 个社区</div>
      <van-popup v-model="show"
                 position="bottom">
        <van-area title="选择当前所在地区"
                  :area-list="areaList"
                  @cancel="show= false"
                  @confirm="confirmClick" />
      </van-popup>
      <div class="footer">
        <van-notice-bar class="tongzhi"
                        wrapable
                        :scrollable="false"
                        text="为了便于线下建立推荐关系请谨慎选择当前所在地，一旦绑定不可更改" />
        <van-button round
                    block
                    native-type="submit"
                    color="#1B2945"
                    :disabled="readonly"
                    @click="show2=true">确定，前往下一步</van-button>
      </div>
    </div>
    <van-overlay :show="show2"
                 :key="1.3"
                 :overlay="false">
      <div class="wrapper">
        <div class="maskbox">
          <div class="title"> 通过提示</div>
          <div style="color:#FC7542"
               class="content">确认后将不可修改关系绑定所地区，确定前往下一步？</div>
          <div class="flag">
            <p @click="show2 = false">取消</p>
            <p @click="econfirmHandler">确定</p>
          </div>
        </div>
      </div>
    </van-overlay>

  </div>
</template>
<script>
import titles from '@/components/title1.vue'
export default {
  components: { titles },
  data() {
    return {
      shequ: '1',
      title: '选择所在地',
      value: '',//国家
      show: false,
      flag: true,
      show2: false,
      value1: '',//省市区
      province: '',
      city: '',
      area: '',
      readonly: true,
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市',
          130000: '河北省',
          140000: '山西省',
          150000: '内蒙古自治区',
          210000: '辽宁省',
          220000: '吉林省',
          230000: '黑龙江省',
          310000: '上海市',
          320000: '江苏省',
          330000: '浙江省',
          340000: '安徽省',
          350000: '福建省',
          360000: '江西省',
          370000: '山东省',
          410000: '河南省',
          420000: '湖北省',
          430000: '湖南省',
          440000: '广东省',
          450000: '广西壮族自治区',
          460000: '海南省',
          500000: '重庆市',
          510000: '四川省',
          520000: '贵州省',
          530000: '云南省',
          540000: '西藏自治区',
          610000: '陕西省',
          620000: '甘肃省',
          630000: '青海省',
          640000: '宁夏回族自治区',
          650000: '新疆维吾尔自治区',
          710000: '台湾省',
          810000: '香港特别行政区',
          820000: '澳门特别行政区'
        },
        city_list: {
          110100: '北京市',
          120100: '天津市'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区'
          // ....
        }
      },
      readonly1:true,
    }
  },
  methods: {
    econfirmHandler() {
      this.show2 = false
      this.$router.push({
        name: 'community',
        params: { country: this.value, province: this.province, city: this.city, area: this.area }
      })
    },
    goBack() {
      this.$router.push({ path: '/index' })
    },
    confirmClick(val) {
      this.value1 = ''
      this.show = false
      val[0] ? (this.province = val[0].name) : ''
      val[1] ? (this.city = val[1].name) : ''
      val[2] ? (this.area = val[2].name) : ''
      val.forEach((item, index) => {
        if (item.name) {
          this.value1 += item.name
        }
      })
      this.readonly = false
    },
    startClick() {
      this.show = true
    }
  },
  created() {
    var name = this.$route.params.name
    this.value = name
    if (this.value.length == 0) {
      this.flag = true
    } else {
      if (this.value == '中国') {
        this.readonly = true
        this.flag = true
        this.readonly1=false
      } else {
        this.flag = false
        this.readonly = false
      }
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-button--normal{
  padding: 0 !important;
}


.country {
  margin-top: 20px;
}
.city {
  margin-top: 2px;
}
.cell {
  font-size: 32px !important;
  font-weight: bold;
 
}
.van-cell{
 /deep/ .van-button {
  background: none;
  border: none;
  height: 48px;
  font-size: 32px;
  
}
}
.wenzi {
  color: #999999;
  font-size: 31px;
  text-align: center;
  width: 100%;
  margin-top: 40px;
  span {
    color: black;
    font-size: 34px;
  }
}
.box {
  width: 100%;
  height: calc(100vh - 96px);
  background-color: #f3f4f5;
}
.tongzhi {
  font-size: 28px;
}
/deep/ .van-picker__cancel,
.van-picker__confirm {
  font-size: 32px;
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 90%;
  margin-left: 5%;
  .van-button {
    margin: 60px 0px;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .maskbox {
    width: 590px;
    background-color: #fff;
    border-radius: 20px;
    position: relative;

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      font-size: 36px;
    }
    .content {
      width: 60%;
      height: auto;
      color: #fc7542;
      font-size: 32px;
      line-height: 53px;
      margin: auto;
      text-align: center;
    }

    .flag {
      width: 100%;
      height: 95px;
      line-height: 95px;
      display: flex;
      align-items: center;
      font-size: 32px;
      border-top: 1px solid #f3f4f5;

      p {
        flex: 1;
        text-align: center;
        font-size: 32px;
        height: 100%;

        &:nth-child(1) {
          color: #666666;
          border-right: 1px solid #f3f4f5;
        }

        &:nth-child(2) {
          color: #1b2945;
        }
      }
    }
  }
}
</style>