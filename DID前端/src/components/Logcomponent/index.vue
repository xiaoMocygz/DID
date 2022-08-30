<template>
  <div class="login">
    <van-form validate-first
              @submit="onSubmit">
      <van-cell-group :border="false">

        <div v-if="$store.state.flag">
          <p class="hint">当前网络</p>
          <van-field class="cell"
                     v-model="value1"
                     readonly
                     arrow-direction="down" />
          <p class="hint">钱包地址</p>
          <van-field readonly
                     class="cell"
                     clearable
                     v-model="wallet" />
        </div>
        <div class="item">
          <p class="hint">邮箱地址</p>
          <van-field class="cell"
                     v-model="email"
                     center
                     @focus="emailFocus()"
                     @blur="emailBlur()"
                     placeholder="请输入邮箱"
                     :rules="[{ validator: emailRule}]" />
          <img class="delete"
               v-show="emailFlag"
               src="../../../public/img/delete.png"
               alt=""
               @click="emailClose" />
        </div>
        <div class="item">
          <p class="hint">密码</p>
          <van-field class="cell"
                     v-model="password"
                     type="password"
                     @focus="passwordFocus()"
                     @blur="passwordBlur()"
                     placeholder="请输入密码"
                     :rules="[{ validator: passwordRule }]" />
          <img class="delete"
               v-show="passwordFlag"
               src="../../../public/img/delete.png"
               alt=""
               @click="passwordClose" />
        </div>

      </van-cell-group>
      <div class="footer">
        <van-button round
                    block
                    :disabled=" email != '' && password != '' ? false : true"
                    color="#1B2945">登录</van-button>
        <p>
          还没有账户
          <span @click="switched()">立即注册</span>
        </p>
      </div>
    </van-form>
  </div>

</template>

<script>
import { yzm, login } from '@/utils/login'
import md5 from 'js-md5';
import cookie from 'js-cookie'
export default {
  name: 'login-index',
  data() {
    return {
      //主链
      value1: localStorage.getItem('netType'),
      //密码
      password: 'a1234567',
      //钱包地址
      wallet: '',
      //邮箱
      email: '2867995062@qq.com',
      //弹出气泡状态
      showPopover: false,
      // 主链分支菜单
      actions: [{ text: 'BSC' }, { text: 'TRX' }, { text: 'HECO' }, { text: 'ETH' }],
      countShow: false,
      time: 60 * 1000,
      emailFlag: false,
      passwordFlag: false
    }
  },
  async mounted() {
    const netType = localStorage.getItem('netType')
    if (netType === 'xxx') {
      this.wallet = window.tronWeb.defaultAddress.base58
      console.log(window.tronWeb.defaultAddress.base58)
    } else if (netType === 'trx') {
      this.wallet = window.tronWeb.defaultAddress.base58
    } else if (netType === 'bsc') {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      this.wallet = accounts[0].toLocaleLowerCase()
    }
    this.value1 = netType
    console.log(this.wallet)
  },
  watch: {
    email: {
      handler(val) {
        this.emailFlag = val.trim().length == 0 ? false : true
      }
    },
    password: {
      handler(val) {
        this.passwordFlag = val.trim().length == 0 ? false : true
      }
    }
  },
  methods: {
    emailClose() {
      this.emailFlag = false
      this.email = ''
    },
    passwordClose() {
      this.passwordFlag = false
      this.password = ''
    },
    // 表单验证成功
    onSubmit(values) {
      this.submit()
    },
    async submit() {
      var {
        data: { code, message ,items}
      } = await login({ email: this.email, password: md5(this.password) })
     if(code ==1)return this.$switch(message, '邮箱格式错误!' , '邮箱未注册!','密码错误!', '钱包地址错误!', '登录错误!')
      this.$Toast.success('登录成功')
      this.$cookie.set('email', this.email)
       this.$cookie.set('password', this.password)
       this.$cookie.set('token',items)
    // localStorage.setItem('email', this.email)
    // localStorage.setItem('password', this.password)
    // localStorage.setItem('token',items)
    },
    passwordRule(val) {
      if (!/^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{6,18}$/.test(val)) {
        this.$Toast.fail('密码不符合规范')
      }
      return true
    },
    emailRule(val) {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)) {
        this.$Toast.fail('请输入正确邮箱')
      }
      return true
    },

    onSelect(action) {
      this.value1 = action.text
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
    gain() {
      //触发获取验证码事件
      //切换倒计时，禁止按钮
      yzm(this.email)
        .then((data) => {
          this.countShow = true
          this.buttonShow = false
          this.$refs.countDown.start()
        })
        .catch((err) => {})
    },
    finish() {
      this.countShow = false
      this.buttonShow = true
      this.$refs.countDown.reset()
    },
    switched() {
      this.$emit('switched')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: calc(100vh - 500px);
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
.van-cell-group {
  height: auto;
}
.footer {
  width: 100%;
  height: auto;
  margin-top: calc(35vh);
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
