<template>
	<div class="not_content">
		<div>
			<div class="content">
				<div class="cont_title">
					<p>11</p>
					<p>提交时间:</p>
				</div>
				<div class="number">
					<p>手机号:</p>
					<p>证件号:</p>
				</div>
				<p>证件及手持证件照</p>
				<div class="imgs">
					<van-image class="left" src="../../../public/img/1.png" lazy-load @click="imgClick(1, 0)" fit="cover" alt="">
						<div></div>
					</van-image>
					<van-image src="../../../public/img/1.png" lazy-load @click="imgClick(1, 1)" fit="cover" alt="" />
				</div>

				<van-image-preview v-model="imgShow" :images="images" :show-index="false">
					<template v-slot:cover>
						<div v-if="previewShow" @click="imgShow = false" class="shade-left"></div>
					</template>
				</van-image-preview>

				<div class="buttons">
					<van-button plain round type="info" @click="nopass(index)">打回</van-button>
					<van-button round type="info" @click="sure(1, index)">通过</van-button>
				</div>
			</div>
		</div>
		<div>
			<van-empty class="null" image="error" description="暂没有审核内容" />
		</div>
		<van-popup round v-model="show" position="bottom" :style="{ height: 'auto' }">
			<div class="shang">
				<div class="cancel" @click="show = false">取消</div>
				<div class="title">打回原因</div>
				<div class="confirm" @click="confirmClick">确定</div>
			</div>
			<div class="zhong">
				<div class="type">
					<span>类型</span>
					<van-popover v-model="showPopover" get-container="icon" trigger="click"  class="popover">
              <div class="sjx"></div>
						恶意操作的用户及进行通过的推荐人节点将扣取相应的信用分
						<template #reference>
							<van-icon id="icon" name="search" size="28px" color="#FC7542" class="iconfont icon-tishi" class-prefix="icon" />
						</template>
					</van-popover>
				</div>
				<div class="reason">
					<div class="item" v-for="(item, index) in type" :key="index" :class="item.flag ? 'check' : ''" @click="typeCheck(item.title)">
						{{ item.title }}
					</div>
				</div>
			</div>
			<div class="xia">
				<div class="type">
					<span>具体原因</span>
				
				</div>
				<div class="textarea">
					<van-field v-model="message" rows="4" show-word-limit autosize type="textarea" placeholder="请输入留言" maxlength="200" />
				</div>
			
			</div>
		</van-popup>
  <van-overlay :show="show2" :key="1.3" :overlay="false">
			<div class="wrapper">
				<div class="maskbox">
          <div class="title"> 通过提示</div>
					<div style="color: #333333" class="content">请确保可审核信息无误，确定通过审核？</div>
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
import { Toast, ImagePreview } from 'vant';
import { EotcKyc } from '@/api/trxRequest';
export default {
	name: 'to-audit',
	//待审核组件
	components: {
		[ImagePreview.Component.name]: ImagePreview.Component
	},
	data() {
		return {
			message: '',
			show: false,
			list: [],
     show2: false,
			index: null,
			type: [
				{ title: '信息有误', flag: true },
				{ title: '恶意提交', flag: false }
			], //类型
			reason: [
				{ title: '信息不全', flag: false },
				{ title: '信息错误', flag: false },
				{ title: '证件照有误', flag: false },
				{ title: '证件照不清晰', flag: false }
			], //具体原因
			imgShow: false,
			images: [],
			previewShow: false,
			typeFlag: true,
			show1: true,
			showPopover: false
		};
	},
	mounted() {},
	methods: {
    econfirmHandler(){},
		popoverClick() {
			//	this.showPopover = !this.showPopover;
			console.log(this.showPopover);
		},
		confirmClick() {
			this.show = false;
		},
		typeCheck(item) {
			this.type.forEach((item1) => {
				if (item1.title == item) {
					item1.flag = this.typeCheck;
				} else {
					item1.flag = !this.typeCheck;
				}
			});
		},
		//具体原因
		reasonCheckd(item) {
			item.flag = !item.flag;
			console.log(item.flag);
		},
		nopass(index) {
			this.show = true;
			this.index = index;
		},
		onConfirm(value, index) {
			this.show = false;
			let data = this.list[this.index];
			EotcKyc({ uid: data.UID, kyc: -1, msg: value }).then((res) => {
				if (res.data.State > 0) {
					this.count = true;
					this.list.splice(this.index, 1);
				}
			});
		},
		onCancel() {
			this.show = false;
			Toast('取消');
		},
		imgClick(item, index) {
			if (index == 0) {
				this.previewShow = true;
				this.images = [item.Img1];
			} else {
				this.previewShow = false;
				this.images = [item.Img2];
			}
			this.imgShow = true;
		},
		init() {
			EotcKyc({}).then((data) => {
				let list = data.data;
				for (let i of list) {
					if (i.Kyc == 1) {
						i.Img1 = this.$store.state.url + i.Img1;
						i.Img2 = this.$store.state.url + i.Img2;
						i.Img3 = this.$store.state.url + i.Img3;
						this.list.push(i);
					}
				}
			});
		},
		sure(data, index) {
         this.show2=true;
			// let uid = data.UID;
			// let kyc = 2;
			// EotcKyc({ uid: uid, kyc: kyc }).then((res) => {
			// 	if (res.data.State > 0) {
			// 		this.count = true;
			// 		this.list.splice(index, 1);
			// 	}
			// });
		}
	}
};
</script>

<style lang="less" scoped>
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
  
	    .title{
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
/deep/ .van-popover {
  position: relative;
}
.sjx{
  position: absolute;
  top: -20px;
  left: 11%;
  width: 0;
	height: 0;
  border-left:10px solid transparent;
	border-right:10px solid transparent;
	border-bottom:20px solid #f3f4f5;


}
/deep/ .van-popover__arrow {

   display:none

}
/deep/ .van-popover__content {
	width: 680px !important;
  height:150px !important;
  background-color: #f3f4f5 ;
	height: auto;
  padding: 26px;
  box-sizing: border-box;
  font-size: 28px;
}
/deep/ .van-popover{
  left: 0.44rem !important;
} 
/deep/ .van-field__control {
	border-radius: 20px;
	border: 1px solid #c8cfde;
	padding: 5px 20px;
}
.check {
	border: 3px solid #237ff8;
	background-color: #fff !important;
	color: #237ff8;
}
.shang {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 95px;
	border-bottom: 1px solid #f3f4f5;
	.cancel {
		font-size: 32px;
		color: gray;
	}
	.title {
		width: 50%;
		font-size: 36px;
		text-align: center;
	}
	.confirm {
		font-size: 28px;
	}
}
.zhong {
	margin-top: 20px;
	.type {
		display: flex;
		align-items: center;
		font-size: 32px;
		padding-left: 35px;
	}
	.reason {
		display: flex;
		margin-top: 30px;
		.item {
			width: calc(94px * 2);
			height: calc(34px * 2);
			font-size: 28px;
			background-color: #f3f4f5;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20px;
			margin-left: 35px;
		}
	}
}
.xia {
	margin-top: 20px;
  padding-bottom: 40px;
	.type {
		display: flex;
		align-items: center;
		font-size: 32px;
		padding: 0 35px;
		justify-content: space-between;
		.item {
			color: #237ff8;
			font-size: 28px;
			display: flex;
			align-items: center;
		}
	}
	.reason {
		display: flex;
		flex-wrap: wrap;
		.item {
			width: calc(94px * 2);
			height: calc(34px * 2);
			font-size: 28px;
			background-color: #f3f4f5;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20px;
			margin-left: 35px;

			margin-top: 40px;
		}
	}
}
.not_content {
	padding: 24px;
	background: #f3f4f5;
	min-height: calc(100vh - 228px);
	.null {
		min-height: calc(100vh - 228px);
	}
	.content {
		padding: 22px 30px 40px;
		margin-bottom: 24px;
		background: #fff;
		font-size: 28px;
		color: #333;
		border-radius: 28px;
		.cont_title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 52px;
			p:first-child {
				font-size: 32px;
				font-weight: bold;
			}
			p:last-child {
				color: #999;
			}
		}
		.number {
			margin-bottom: 30px;
			p:first-child {
				margin-bottom: 16px;
			}
		}
		.imgs {
			padding: 16px 0 40px;
			display: flex;
			justify-content: space-around;
			/deep/.van-image {
				width: 284px;
				height: 190px;
				border-radius: 10px;
				overflow: hidden;
			}
			.right {
				position: relative;
				div {
					width: 60%;
					height: 100%;
					-webkit-backdrop-filter: blur(8px);
					backdrop-filter: blur(8px);
					position: absolute;
					right: 0;
					top: 0;
				}
			}
			.left {
				position: relative;
				div {
					width: 60%;
					height: 100%;
					-webkit-backdrop-filter: blur(8px);
					backdrop-filter: blur(8px);
					position: absolute;
					top: 0;
				}
			}
		}
		.buttons {
			display: flex;
			justify-content: space-around;
			/deep/.van-button--normal {
				padding: 0 96px;
			}
		}
	}
}
// .cover {
//   width: 100vw;
//   height: 100vh;
//   color: #fff;
//   font-size: 100px;
//   opacity: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   p {
//     transform: rotate(-30deg);
//   }
// }
.shade-right {
	position: absolute;
	left: 40vw;
	width: 60vw;
	height: 100vh;
	-webkit-backdrop-filter: blur(8px);
	backdrop-filter: blur(8px);
}
.shade-left {
	width: 60vw;
	height: 100vh;
	-webkit-backdrop-filter: blur(8px);
	backdrop-filter: blur(8px);
}
</style>
