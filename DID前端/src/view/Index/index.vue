<template>
	<div>
		<div class="container">
			<img class="img4" src="../../../public/img/4.png" alt="" />
			<img class="img5" src="../../../public/img/5.png" alt="" />
			<!-- <img class="img7" src="../../../public/img/7.png" alt="" /> -->
			<div class="renzheng" @click="ksrz" v-show="!show1">{{ $t('home.ksrz') }} 
 
      			<van-icon name="search" class="iconfont      icon-youjiantou" class-prefix="icon" />
      </div>
			<div class="renzheng"  @click="sfyrz" v-show="show1"><img class="img11" src="../../../public/img/11.png" alt=""/> {{ $t('home.sfyrz') }}</div>
			<div class="wenzi">{{ $t('home.xtjj') }}<img class="img8" src="../../../public/img/8.png" alt="" /></div>
			<div class="wenzi1">
				{{ $t('home.jjxq') }}
			</div>
		</div>
		<van-overlay :show="show" :key="1.3">
			<div class="wrapper" @click.stop>
				<div class="maskbox">
					<div style="color: #333333">{{ $t('home.tuijianren') }}</div>
					<div>
						<p @click="show = false">取消</p>
						<p @click="econfirmHandler">确定</p>
					</div>
					<img class="img" src="../../../public/img/13.png" alt="警告" />
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			flag1: false, //认证
			show: false,
      show1: false,
		};
	},
  created() {
   this.show1= this.$parent.authTypeClick()==false?false:true
  },
 
	methods: {
		/* 开始认证 */
		ksrz() {
			this.show = true;
			//this.$router.push({ path: '/accountstate/identity' });
     // this.$router.push({ path:'/login'})
		},
		econfirmHandler() {
			this.show = false;
     // this.$router.push({ path:'/location/index'})
this.$on('telegramClick',(val)=>{
  console.log(1234)
  console.log(val)
})
    if(!telegram){
      console.log(123)
    }else{
      console.log(321)
    }
		},sfyrz(){
      this.$router.push({ path: '/location/index'})
    }
	}
};
</script>

<style lang="less" scoped>
.container {
	width: 100%;
	height: auto;
	background-color: #0e1a34;

	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	padding: 1.3rem 0 0 0;
	background-position: center 4rem;
	background-repeat: no-repeat;
	background-image: url('../../img/6.png');
	box-sizing: border-box;
	.img4 {
    width: 100%;
    height: auto;
		
	}
	.img5 {
    width: 100%;
    height: auto;
		margin: 200px 0;
  
	}
	.img7 {
		width: 5.65rem;
		height: 0.9rem;
		margin-top: 5rem;
	}
	.wenzi {
		margin-top: 2rem;
		color: white;
		text-align: center;
		width: 2.5rem;
		height: auto;
		position: relative;
		font-size: 0.6rem;
		.img8 {
			width: 2.5rem;
			height: 0.3rem;
			height: auto;
			position: absolute;
			bottom: 0;
			left: 0;
		}
	}
	.wenzi1 {
		color: #91979e;
		padding: 2vh 8vw;
		box-sizing: border-box;
		line-height: 8vw;
		text-indent: 6.4vw;
		font-size: 0.5rem;
	}
}
.renzheng {
	width: 5.65rem;
	height: 0.9rem;
	border: 2px solid #2f7aec;
	border-radius: 0.2rem;
	line-height: 0.9rem;
	color: #f8fffe;
	display: block;
	text-align: center;
	font-size: 0.4rem;
	background-color: #122d56;
position: relative;
	img {
		width: 25px;
		height: 25px;
		vertical-align: middle;
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

		div {
			&:nth-child(1) {
				padding: 100px 30px 40px 30px;
				color: #fc7542;
				font-size: 32px;
				line-height: 53px;
				text-align: center;
			}

			&:nth-child(2) {
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

		.img {
			width: 200px;
			height: 200px;
			position: absolute;
			top: -25%;
			left: 50%;
			transform: translate(-50%, 0%);
		}
	}
}
.icon-youjiantou{
 
  font-size: 30px;
  position: absolute;
  top: 5px;
  right: 30px;
}
</style>
