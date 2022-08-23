import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{ path: '/login', component: () => import('@/view/Login') },
		{
			path: '/',
			component: () => import('@/Home.vue'), //主页
			children: [
				{ path: 'index', component: () => import('@/view/Index/index.vue'), alias: '/' }, //首页
				{ path: 'authentication', component: () => import('@/view/Authentication/index.vue'), name: 'authentication' }, //个人中心

				{ path: 'chain', name: 'chain', component: () => import('@/components/Chain/index.vue') }, // 公链地址信息
				{ path: 'accountstate/erroridentity', name: 'erroridentity', component: () => import('@/components/Accountstate/erroridentity.vue') } //审核失败
			]
		},
		{ path: '/credit', component: () => import('@/view/Credit/index.vue') }, //信用明细
		{ path: '/accountstate/identity', name: 'identity', component: () => import('@/components/Accountstate/identity.vue') }, //身份认证
		{ path: '/accountstate/index', name: 'accountstate', component: () => import('@/components/Accountstate/index.vue') },
		{ path: '/audit/index', component: () => import('@/components/audit/index.vue') }, //账号信息
		{ path: '/accountstate/approved', component: () => import('@/components/Accountstate/approved.vue') }, //审核失败
		{ path: '/receiving/list', component: () => import('@/view/Receiving/list.vue') } //收付款信息
	]
});
router.beforeEach((to, from, next) => {
	next();
});
export default router;
