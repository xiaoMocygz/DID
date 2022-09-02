<template>
	<div id="container">
		<!-- 认证信息 -->
		<div class="box">
			<div class="top">
				<div class="left">
					<img src="../../../public/img/2.png" alt="" />
				</div>
				<div class="right">
					<span class="rz">{{ $t('authentication.wrz') }}</span
					><span class="uid">UID123456</span>
				</div>
				<van-icon name="search" class="iconfont icon-shezhi Icon" @click="informationClick" class-prefix="icon" />
			</div>
			<div class="bottom">
				<div class="left">
					<img src="../../../public/img/11.png" alt="" />
					<span>{{ $t('authentication.sfwrz') }}</span>
				</div>
				<div class="right" @click="xyfClick">信用分 <span class="wenzi">0</span></div>
			</div>
		</div>
		<!-- cell 列表 -->
		<div class="list">
			<van-cell-group :border="false">
				<van-cell class="cell" :border="false" @click="flag = !flag">
					<template #title>
						<van-icon name="search" class="iconfont icons icon-shenhe" class-prefix="icon" />
						<span class="custom-title">认证审核</span>
						<span class="dian"></span>
					</template>
					<template #right-icon>
						<van-icon name="search" class="iconfont icon-shang" class-prefix="icon" v-if="flag" />
						<van-icon name="search" class="iconfont icon-xia" class-prefix="icon" v-if="!flag" />
					</template>
				</van-cell>
				<div v-show="!flag">
					<router-link to="/audit/index">
						<van-cell class="cell" :border="false">
							<template #title>
								<van-icon name="search" class="iconfont icon-shenhe yincang" class-prefix="icon" />
								<span class="custom-title item">推荐人审核</span>
							</template>
							<template #right-icon>
								<van-icon name="search" class="iconfont icon-you" class-prefix="icon" />
							</template>
						</van-cell>
					</router-link>
			<router-link to="/audit1/index">
        		<van-cell class="cell">
						<template #title>
							<van-icon name="search" class="iconfont icon-shenhe yincang" class-prefix="icon" />
							<span class="custom-title item">上级节点审核</span>
						</template>
						<template #right-icon>
							<van-icon name="search" class="iconfont icon-you" class-prefix="icon" />
						</template>
					</van-cell>
      </router-link>
				<router-link to="/audit2/index">
          	<van-cell class="cell">
						<template #title>
							<van-icon name="search" class="iconfont icon-shenhe yincang" class-prefix="icon" />
							<span class="custom-title item">中高级节点审核</span>
						</template>
						<template #right-icon>
							<van-icon name="search" class="iconfont icon-you" class-prefix="icon" />
						</template>
					</van-cell>
        </router-link>
				</div>
				<van-cell class="cell" v-for="(item, index) in list" :key="index" :border="false" @click="cellClick(item.url)">
					<template #title>
						<van-icon name="search" title-class="van" :class="'iconfont icons  ' + item.icon" class-prefix="icon" />
						<span class="custom-title">{{ item.name }}</span>
					</template>
					<template #right-icon>
						<div v-if="item.name == '身份信息'" class="sfxx"><span style="color: #848c90">未认证</span><span style="color: #aa5342">审核失败</span><span style="color: #2a8bff">审核中</span></div>
						<van-icon name="search" class="iconfont icon-you" class-prefix="icon" />
					</template>
				</van-cell>
			</van-cell-group>
		</div>
		<div class="signOut" @click="show = true">{{ $t('authentication.tcdl') }}</div>
		<van-overlay :show="show" :key="1.3">
			<div class="wrapper" @click.stop>
				<div class="maskbox">
					<div class="shang">退出提示</div>
					<div style="color: #333333" class="zhong">{{ $t('authentication.tcts') }}</div>
					<div class="xia">
						<p @click="show = false">{{ $t('authentication.qx') }}</p>
						<p @click="econfirmHandler">{{ $t('authentication.qr') }}</p>
					</div>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ icon: 'icon-shenfenxinxi', name: '身份信息' },
				{ icon: 'icon-fukuanxinxi', name: '收付款信息', url: 'receiving/list' },
				{ icon: 'icon-bangdinggongliandizhi', name: '各公链绑定地址', url: 'chain' },
				{ icon: 'icon-bangdingxiangmu', name: '绑定各项目',url:'projects'},
				{ icon: 'icon-fukuanxinxi', name: '社区信息',url:'community/information' },
				{ icon: 'icon-bangdingxiangmu', name: '申请创建社区' ,url:'community/create'},
				{ icon: 'icon-lianxifangshi', name: '社区审批' },
				{ icon: 'icon-tuandui', name: '我的团队' },
				{ icon: 'icon-tuandui', name: '邀请好友' }
			],
			flag: true,
			shenhe: false,
			show: false,
			screenHeight: document.body.clientHeight
		};
	},
	methods: {
    informationClick(){
      this.$router.push({ path:'/information/index'})
    },
		jiantou() {
			this.flag = !this.flag;
		},
		xyfClick() {
			this.$router.push({ path: '/credit' });
		},
		cellClick(url) {
			this.$router.push({ path: url });
		},
		econfirmHandler() {
			this.show = false;
		}
	},
	mounted() {
		this.screenHeight = document.body.clientHeight;
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
		.shang {
			text-align: center;
			font-size: 40px;
			margin-top: 30px;
		}
		.zhong {
			padding: 40px 30px 40px 30px;
			color: #fc7542;
			font-size: 32px;
			line-height: 53px;
			text-align: center;
		}

		.xia {
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
.Icon {
	color: white;
	font-size: 60px;
	position: absolute;
	top: 20px;
	right: 30px;
}
.yincang {
	visibility: hidden;
}
.signOut {
	color: white;
	font-size: 32px;
	text-align: center;
	// position: absolute;
	// left: 45%;
	// bottom: 60px;
	margin: 30px 0px;
}
/deep/ .cell {
	width: 90vw;
	display: flex;
	justify-content: space-between;
	height: 96px;
	align-items: center;
	img {
		width: 5vw;
		height: 5vw;
		margin-right: 5vw;
	}
}
.box {
	width: 690px !important;
	height: 276px;
	margin: 30px;
	background: linear-gradient(to right, #2a8bff, #51d3fa);
	border-radius: 20px;
	position: relative;
	.top {
		display: flex;
		padding: 30px;
		box-sizing: border-box;
		.left {
			width: 96px;
			height: 96px;
			border-radius: 50%;
			background-color: white;
			img {
				width: 54px;
				height: 54px;
			}
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.right {
			display: flex;
			flex-direction: column;
			height: 1.2rem;
			justify-content: space-around;
			margin-left: 0.25rem;
			color: white;
			.rz {
				font-size: 36px;
				font-weight: bold;
			}
			.uid {
				font-size: 28px;
				opacity: 0.7;
			}
		}
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		padding: 0 30px;
		box-sizing: border-box;

		.left {
			display: flex;
			justify-content: center;
			height: 1rem;
			align-items: center;
			img {
				width: 32px;
				height: 40px;
				margin-right: 20px;
			}
			font-size: 30px;
			opacity: 0.5;
			color: white;
		}
		.right {
			width: 4rem;
			height: 1rem;
			border-radius: 1rem;
			border: 0.015rem solid white;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #2483f7;
			font-size: 30px;
			.wenzi {
				font-weight: 700;
				margin-left: 0.2rem;
			}
		}
	}
}
.list {
	/deep/.van-cell-group {
		//	border: none !important;
	}
	/deep/.cell {
		position: relative;
		//	border: none !important;
	}
	/deep/.van-cell::after {
		border: none !important;
	}
	/deep/.van-cell--borderless {
		border: none !important;
	}
	/deep/.van-cell {
		width: 100%;
		background-color: #111a39 !important;
		padding: 0.1rem 0.4rem !important;
		//		border: none !important;
	}
	/deep/ .van-cell__title {
		display: flex;
		align-content: center;
	}
	.iconfont {
		color: white !important;
		font-size: 26px;
		//	background-color: red !important;
	}
	.icons {
		font-size: 60px;
	}
	.icon-you,
	.icon-shang,
	.icon-xia {
		color: grey !important;
		font-size: 40px;
	}
	.item {
		padding-left: 30px;
	}
	.dian {
		display: block;
		width: 15px;
		height: 15px;
		background-color: red;
		border-radius: 50%;
		position: absolute;
		top: 32px;
		left: 210px;
	}
	.custom-title {
		color: white;
		margin-left: 3vw;
		font-size: 30px;
	}
}
#container {
	width: 100vw;
	height: calc(100% + 46px) !important;
	background-color: #111a39;
	overflow-y: scroll;
	position: absolute;
	top: calc(92px);
}
</style>
