
import { userSign } from "@/utils/web3"
import request from '@/utils/request'
//let address = "";
let cutdownFlag = true;
let isok = false;
function jiaoyi (val) {
  window.location.href = "index.html?id=" + val;
}
import $router from "@/router"
import { Toast } from 'vant';
import {
  GetCode, RegEotc
} from "@/api/trxRequest"
// import router from '@/router';
//
//注册
export const register = ({ email, password, code, refUserId }) => {
  const data = {
    mail: email,//邮箱
    password,//密码
    refUserId,//推荐人
    otype: localStorage.getItem('netType') || '',//trx
    code,//验证码
    walletAddress: localStorage.getItem('myaddress') || '',//钱包地址
    sign: localStorage.getItem('mysign') || ''//签名
  }
  return request({ method: 'POST', url: '/api/user/register', data })
}
export const login = ({ email, password, code, refUserId }) => {
  if (email != null && password != null) {
    const data = {
      mail: email,//邮箱
      password,//密码
      otype: localStorage.getItem('netType') || '',//trx
      walletAddress: localStorage.getItem('myaddress') || '',//钱包地址
      sign: localStorage.getItem('mysign') || ''//签名
    }
    return request({ method: 'POST', url: '/api/user/login', data })
  } else {
    const data = {
      otype: localStorage.getItem('netType') || '',//trx
      walletAddress: localStorage.getItem('myaddress') || '',//钱包地址
      sign: localStorage.getItem('mysign') || ''//签名
    }
    return request({ method: 'POST', url: '/api/user/login', data })
  }
}
function fmenu () {
  var fhmh = document.getElementById("fhmh");
  var dmenu = document.getElementById("dmenu");
  if (fhmh.getAttribute("data-dropdowns") != "nav") {
    fhmh.setAttribute("data-dropdowns", "nav");
    dmenu.setAttribute("data-dropdowns", "true");
  }
  else {
    fhmh.setAttribute("data-dropdowns", "");
    dmenu.setAttribute("data-dropdowns", "");
  }
}
export const yzm = function (email) {
  return new Promise(function (resolve, reject) {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '加载中',
    });
    var mail = email
    var reg0 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg0.test(mail)) {
      Toast('电子邮箱格式有误');
      reject()
      return
    }
    GetCode({ regPhone: email }).then(data => {
      Toast.success('成功')
      // alert(data.data.message)
      resolve()
    }).catch(err => {
      if (err.response.status == 429) {
        Toast.fail('操作频繁')
        reject()
      }
    })
  })
}
// function test() {
//     window.switched(); // 直接通过window方法去调用methods中对应方法
//     }
export const reg = function (that, value1, wallet, email, verification, loginStatic, invite = '', checked = '') {
  // //console.log('win',Window)
  //console.log('this', that)
  //钱包地址
  var wallet_ads = wallet;
  //邮箱
  var mail = email
  //验证码
  var code1 = verification
  //邀请码
  var yqm = invite
  //网络
  // 测试网络固定
  // var otype= localStorage.getItem("netType")
  // var otype = value1

  var sign = localStorage.getItem("mysign");


  //用户协议
  var isok = checked

  var reg0 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var reg1 = /^\d{6}$/;
  var reg2 = /[@]/im;
  if (sign == null || sign == "") {
    userSign(window.signMes, null);
    return false;
  }
  if (wallet_ads.length < 30) {
    Toast("钱包地址获取失败");
    return false;
  }
  if (!reg0.test(mail)) {
    Toast("邮箱输入错误");
    return false;
  }

  if (loginStatic == 0) {
    if (!isok) {
      Toast("请阅读用户协议");
      return false;
    }
  }
  if (code1.length > 5) {
    if (loginStatic == 0) {
      RegEotc({ userid: mail, pwd: wallet_ads, yzm: code1, pid: yqm, sign: sign }).then(data => {
        //console.log(data)
        var it = data.data;
        if (it.State != "x" && it.State != 0) {
          Toast.success('注册成功');
          $router.push({
            name: "index"
          })
        }
        else {
          Toast.fail('验证码或邀请码不正确');
        }
      })
    } else {
      /* 
        "walletAddress": "string",
"otype": "string",
"sign": "string",
"refUserId": "string",
"mail": "string",
"code": "string",
"password": "string"
      */
      RegEotc({ userid: mail, pwd: wallet_ads, yzm: code1, pid: yqm, sign: sign }).then(data => {
        var it = data.data;
        if (it.State == 3) {
          Toast.success('登录成功');
          $router.push({
            name: "index"
          })
        }
        else if (it.State == 'x') {
          Toast.fail('验证码不正确');
        } else {
          Toast.fail('用户尚未注册');
          that.switched()
          return false

        }
      })
    }
  }
  else Toast("请输入正确的验证码");
}