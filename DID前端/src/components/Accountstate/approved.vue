<template>
	<div>
		<titles @goBack="goBack" :title="title"></titles>
		<div>
			<van-cell-group :border="false" class="field">
				<van-field :border="false" v-model="name" readonly label="姓名" name="name" />
				<van-field v-model="email" :border="false" readonly type="email" name="phone" label="邮箱" />
				<van-field v-model="phone" :border="false" readonly type="number" name="phone" label="手机号" />
				<van-field :border="false" v-model="ID" readonly label="证件号" name="ID" />
				<van-field :border="false" v-model="recommender" readonly label="姓名" name="name" />
			</van-cell-group>
			<van-steps :active="active" finish-icon="checked" direction="vertical" active-color="#38f">
				<van-step>
					<div class="content">
						<div>初审：</div>
						<div>2016-07-12 12:40</div>
					</div>
				</van-step>
				<van-step>
					<div class="content">
						<div>初审：</div>
						<div>2016-07-12 12:40</div>
					</div>
				</van-step>
				<van-step>
					<div class="content">
						<div>初审：</div>
						<div>2016-07-12 12:40</div>
					</div>
				</van-step>
				<van-step>
					<div class="content">
						<div>初审：</div>
						<div>2016-07-12 12:40</div>
					</div>
				</van-step>
			</van-steps>
		</div>
	</div>
</template>

<script>
import titles from '@/components/titlie.vue';
export default {
	name: 'approved',
	data() {
		return {
			title: '身份认证',
			name: '11', //用户名称
			phone: '1', //手机号码
			email: '123344@qq.com', //邮箱
			ID: '44242342', //身份证号码
			recommender: 'xx', //推荐人
			active: '3'
		};
	},
	methods: {
		goBack() {
			this.$router.back();
		}
	},
	components: {
		titles
	}
};
</script>

<style lang="less" scoped>
/deep/ .van-field__label {
	color: black;
	font-weight: bold;
}
.field {
	padding: 32px;
	box-sizing: border-box;
}
.content {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
	box-sizing: border-box;
}
</style>
