<template>
    <div>
      <titles :title="title" @goBack="goBack"></titles>
      <div class="content">
        <van-form  @submit="onSubmit" class="apply">
            <p>基本信息</p>
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
                v-model="username"
                name="申请人"
                label="申请人"
                placeholder="请输入申请人真实姓名"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                v-model="communityName"
                name="社区名"
                label="社区名"
                placeholder="请输入申请社区名"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field
                readonly
                clickable
                name="area"
                :value="value"
                label="社区地址"
                placeholder="请选择社区所在地"
                @click="showArea = true"
            />
            <van-popup v-model="showArea" position="bottom">
            <van-area
                :area-list="areaList"
                @confirm="onConfirm"
                @cancel="showArea = false"
            />
            </van-popup>
            <van-field
                v-model="phone"
                name="联系电话"
                label="联系电话"
                placeholder="请输入您的联系电话"
                :rules="[{ required: true, message: '' }]"
            />
            <van-field name="radio" label="有无办公室">
                <template #input>
                    <van-radio-group v-model="radio" direction="horizontal">
                    <van-radio name="1">有</van-radio>
                    <van-radio name="2">无</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
      </div>
    </div>
</template>
<script>
    import titles from '@/components/titlie.vue';
    import {areaList} from '@vant/area-data'
    export default {
        components:{
            titles
        },
        data() {
            return {
                title:'申请创建社区',
                username:'',
                communityName:'',
                phone:'',
                value: '',
                showArea: false,
                areaList: areaList, 
                radio:'',
            }
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            onSubmit(values) {
                console.log('submit', values);
            },
            onConfirm(values) {
                this.value = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join('/');
                this.showArea = false;
            },
        }
    }
</script>
<style lang="less" scoped>
    /deep/ .top{
        width: 100%;
        height: 96px;
        background-color: #fff;
        padding: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .icon-zuo {
            color: #000;
        }
        .wenzi {
            color: #000;
            margin: auto;
            font-weight: bold;
            font-size: 34px;
        }
    }
    .content{
        background-color: #F3F4F5;
        height: 100vh;

        .apply{
            background-color: #fff;
            position: absolute;
            top: 1.8rem;
            width: 90vw;
            left: 0.5rem;
            border-radius: 0.25rem;

            p{
                font-size: 0.45rem;
                font-weight: bold;
                margin: 0.5rem 0 0.375rem 0.375rem;
            }

            /deep/.van-cell{
                flex-direction: column;
                margin-bottom: 0.25rem;
            }
            /deep/.van-field__label{
                color:#000;
                margin-bottom: 0.2rem;
            }
            /deep/.van-radio__label{
                color: #b2b3b5;
            }
        }
    }
</style>