<template>
	<div>
		<van-tabs v-model="active" swipeable color="#237DF4" background="#1B2945" title-active-color="#fff" title-inactive-color="#8D94A2">
			<van-tab title="待审核">
				<Toaudit ref="start"></Toaudit>
			</van-tab>
			<van-tab title="已审核">
			<Inspect></Inspect>
			</van-tab>
			<van-tab title="打回">
        		<Audited ref="over"></Audited>
			
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import Toaudit from '@/components/audit2/to-audit.vue';
import Audited from '@/components/audit2/audited.vue';
import Inspect from '@/components/audit2/inspect.vue';
export default {
	name: 'audit',
	//审核页面
	components: {
		Toaudit,
		Audited,
		Inspect
	},
	data() {
		return {
			active: 0,
			list: [{ title: '待审核' }, { title: '已审核' }, { title: '检查' }]
		};
	},

	mounted() {},
	methods: {
		// asd(name, title) {
		// 	if (name == 1) {
		// 		this.$nextTick(() => {
		// 			this.$refs.over.show = true;
		// 		});
		// 	}
		// 	this.$nextTick(() => {
		// 		if (name == 1 && this.$refs.start.count && this.$refs.over.show) {
		// 			this.$refs.over.init();
		// 		}
		// 	});
		// 	if (name == 0) {
		// 		this.$refs.start.count = false;
		// 	}
		// }
	}
};
</script>

<style lang="less" scoped>
body{
  background-color:  nome !important;
}</style>
