<template>
	<div>
		<div class="top">
			<van-icon size="24px" name="search" class="iconfont icon-zuo" class-prefix="icon" @click="goBack" /> <span class="wenzi">{{ this.title }}</span>
		</div>
	</div>
</template>
<script>
export default {
	props: ['title'],
	methods: {
		goBack() {
			this.$emit('goBack');
		}
	},
	created() {},
	computed: {
		cachesFormSele() {
			return JSON.parse(JSON.stringify(this.$router));
		}
	}
};
</script>

<style lang="less" scoped>
.top {
	width: 100%;
	height: 96px;
	background-color: #ffffff;
	padding:0 20px;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	.icon-zuo {
		color: #333333;
 margin-bottom: 20px;
	}
	.wenzi {
		color: #333333;
		align-self: center;
      margin: auto;
		font-weight: bold;
		font-size: 36px;
	}
}
.iconfont{
  width: 16px;
  height: 28px;
}
</style>
