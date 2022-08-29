<template>
  <div>
    <van-form validate-first
              @submit="onSubmit">
      <p class="rule">EOTC采用严格的邀请注册制</p>

      <van-cell-group :border="false">

        <div v-if="$store.state.flag">
          <p class="hint">当前网络</p>
          <van-field class="cell"
                     v-model="value1"
                     readonly
                     is-link
                     arrow-direction="down" />
          <p class="hint">钱包地址</p>
          <van-field class="cell"
                     readonly
                     clearable
                     v-model="wallet" />
        </div>
<div class="items">
        <p class="hint">邮箱地址</p>
        <van-field class="cell"
                   v-model="email"
                   center
                   autocomplete="off"
                   placeholder="请输入邮箱"
                   :rules="[{ validator: emailRule }]"
                   @focus="emailFocus()"
                   @blur="emailBlur()">
          <template #button>
            <van-button size="small"
                        class="cell_button"
                        v-show="!countShow"
                        :class="{ button_action: buttonShow && !countShow }"
                        :disabled="!buttonShow"
                        @click="gain">
              <span>发送验证码</span>
            </van-button>
            <van-count-down ref="countDown"
                            v-show="countShow"
                            format="ss秒"
                            @finish="finish"
                            :auto-start="false"
                            :time="time" />
          </template>
        </van-field>
  <img class="delete"
               v-show="emailFlag"
               src="../../../public/img/delete.png"
               alt=""
               @click="emailClose" />
        </div>
        <div class="item">

        <p class="hint">邮箱验证码</p>
        <van-field class="cell"
                   autocomplete="off"
                   v-model="verification"
                   placeholder="请输入邮箱验证码"
                   :rules="[{ validator:verificationRule}]" 
                    @focus="verificationFocus()"
                   @blur="verificationBlur()"
                   />
 <img class="delete"
               v-show="verificationFlag"
               src="../../../public/img/delete.png"
               alt=""
               @click="verificationClose" />
                   </div>
                   <div class="item">
        <p class="hint">密码</p>
        <van-field class="cell"
                   v-model="password"
                   type="password"
                   placeholder="密码必须包含小写字母和数字（6~18）"
                   :rules="[{ validator: passwordRule }]" 
                      @focus="passwordFocus()"
                   @blur="passwordBlur()"/>
                    <img class="delete"
               v-show="passwordFlag"
               src="../../../public/img/delete.png"
               alt=""
               @click="passwordClose" />
                   </div>
                   <div class="item">
        <p class="hint">确认密码</p>
        <van-field class="cell"
                   v-model="password1"
                   type="password"
                   placeholder="请再次输入登录密码"
                   :rules="[{ validator: passwordRule1}]"
                       @focus="passwordFocus1()"
                   @blur="passwordBlur1()" />
                       <img class="delete"
               v-show="passwordFlag1"
               src="../../../public/img/delete.png"
               alt=""
               @click="passwordClose1" />
                   </div>

        <p class="hint">填写邀请地址</p>
        <van-field class="cell"
                   clearable
                   :readonly="readShow"
                   v-model="invite" />
      </van-cell-group>
      <van-checkbox shape="round"
                    class="check"
                    checked-color="#1B2945"
                    v-model="checked">
        我已阅读并同意
        <span>《用户协议》</span>
      </van-checkbox>
      <div class="footer">
        <van-button round
                    block
                    :disabled=" email != '' && verification != '' && password1 !='' && checked ? false : true"
                    color="#1B2945">确定注册</van-button>
        <p>
          已有账户
          <span @click="switched()">去登录</span>
        </p>
      </div>
    </van-form>
  </div>
</template>
<!--  -->
<script>
import md5 from 'js-md5'
import { yzm, register } from '@/utils/login'
import { Toast } from 'vant'
export default {
  name: 'my-signin',
  data() {
    return {
      //主链
      value1: +localStorage.getItem('netType'),
      //密码
      password: 'a1234567',
      //确认密码
      password1: 'a1234567',
      //邮箱
      email: '2867995062@qq.com',
      //验证码
      verification: '',
      //邀请地址
      invite: '534324632',
      //钱包地址
      wallet: '',
      //弹出气泡状态
      showPopover: false,
      // 主链分支菜单
      actions: [{ text: 'BSC' }, { text: 'TRX' }, { text: 'HECO' }, { text: 'ETH' }],
      //获取验证码按钮状态
      buttonShow: false,
      //倒计时切换
      countShow: false,
      time: 60 * 1000,
      //复选框
      checked: false,
      readShow: false,emailFlag:false,verificationFlag:false,passwordFlag:false,passwordFlag1:false,inviteFlag:false
    }
  },
  watch: {
    email: {
      handler(val) {
        this.emailFlag = val.trim().length == 0 ? false : true
      }
    },
     verification: {
      handler(val) {
        this.verificationFlag = val.trim().length == 0 ? false : true
      }
    },
    password: {
      handler(val) {
        this.passwordFlag = val.trim().length == 0 ? false : true
      }
    },
    password1: {
      handler(val) {
        this.passwordFlag1 = val.trim().length == 0 ? false : true
      }
    },
      invite: {
      handler(val) {
        this.inviteFlag = val.trim().length == 0 ? false : true
      }
    }
  },
  
  methods: {
    inviteClose() {
      this.inviteFlag = false
      this.invite = ''
    },
     inviteFocus() {
      if (this.invite != '') {
        this.inviteFlag = true
      }
    },
    inviteBlur() {
      if (this.invite == '') {
        this.inviteFlag = false
      }
    },
     passwordClose1() {
      this.password1Flag = false
      this.password1 = ''
    },
      passwordFocus1() {
      if (this.password1 != '') {
        this.passwordFlag1 = true
      }
    },
    passwordBlur1() {
      if (this.password1 == '') {
        this.passwordFlag1 = false
      }
    },
      passwordClose() {
      this.passwordFlag = false
      this.password = ''
    },
      passwordFocus() {
      if (this.password != '') {
        this.passwordFlag = true
      }
    },
    passwordBlur() {
      if (this.password == '') {
        this.passwordFlag = false
      }
    },
     emailClose() {
      this.emailFlag = false
      this.email = ''
    },
     emailFocus(val) {
      this.buttonShow = true
      if (this.email != '') {
        this.emailFlag = true
      }
    },
    emailBlur() {
      if (this.email != '') {
        this.buttonShow = true
      } else {
        this.buttonShow = false
        this.emailFlag = false
      }
    },
     verificationClose() {
      this.verificationFlag = false
      this.verification = ''
    },
    verificationFocus(val) {
      if (this.verification != '') {
        this.verificationFlag = true
      }
    },
    verificationBlur() {
      if (this.verification == '') {
        this.verificationFlag = false
      }
    },
    emailRule(val) {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)) {
      this.$Toast.fail('请输入正确邮箱');
      } else {
        return true
      }
    },
    passwordRule(val) {
      if (!/^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{6,18}$/.test(val)) {
        this.$Toast.fail('密码不符合规范')  
      }
      return true
    },
    verificationRule(val) {     
      if (val.length != 6) {
        this.$Toast.fail('验证码格式不对')
      }
      return true
    },
    passwordRule1(val) {
      if (val.trim().length) {
        if (!this.password == val.trim()) {
        this.$Toast.fail('确认密码与密码不一致')
        }
      } else {
         this.$Toast.fail('请输入密码')
      }
      return true
    },
    // 表单验证成功
    async onSubmit(values) {
      if (this.verification.length ==6) {
        var {
          data: { code, message }
        } = await register({ email: this.email, password: md5(this.password), code: this.verification, refUserId: this.invite })
     if(code==1)return this.$switch(message,'邮箱格式错误','验证码错误','请勿重复注册','邀请码错误')
     this.$Toast.success('注册成功!')
   this.$emit('switched')
      }
    },
    onSelect(action) {
      this.value1 = action.text
    },
   
    gain() {
      //触发获取验证码事件
      //切换倒计时，禁止按钮
      yzm(this.email).then((data) => {
        this.countShow = true
        this.buttonShow = false
        this.$refs.countDown.start()
      })
    },
    finish() {
      this.countShow = false
      this.buttonShow = true
      this.$refs.countDown.reset()
    },
    switched() {
      this.$emit('switched')
    }
  }, 
  async mounted() {
    const netType = localStorage.getItem('netType')
    if (netType === 'xxx') {
      this.wallet = window.tronWeb.defaultAddress.base58
    } else if (netType === 'trx') {
      this.wallet = window.tronWeb.defaultAddress.base58
    } else if (netType === 'bsc') {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      this.wallet = accounts[0].toLocaleLowerCase()
      console.log(accounts[0].toLocaleLowerCase())
    }
    this.value1 = netType

    if (this.$route.query.pid != undefined) {
      this.invite = this.$route.query.pid
      this.readShow = true
    }
  },
}

</script>

<style lang="less" scoped>
.items {
  width: 100%;
  height: auto;
  position: relative;
  .delete {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 85px;
    right: 200px;
  }
}
.item {
  width: 100%;
  height: auto;
  position: relative;
  .delete {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 80px;
    right: 100px;
  }
}
p {
  margin: 0;
}
.rule {
  font-size: 28px;
  color: #1b2945;
  margin-bottom: 30px;
}
/deep/.van-popover__wrapper {
  width: 100%;
}
.cell {
  border: 1px solid #c8cfde;
  border-radius: 16px;
  margin-bottom: 30px;
  font-size: 28px;
  .cell_button {
    background: #fff;
    border-color: #fff;
    // border-radius: 5px;
    color: #999;
  }
  .button_action {
    background: #1b2945;
    // border-radius: 5px;
    color: #fff;
  }
}
.hint {
  font-size: 28px;
  margin-bottom: 20px;
}
.check {
  font-size: 28px;
  span {
    color: #2483ff;
  }
}
.footer {
  margin-top: 38px;
  p {
    font-size: 28px;
    margin-top: 40px;
    text-align: center;
    span {
      color: #2483ff;
    }
  }
}
</style>
