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
        { path: 'accountstate/erroridentity', name: 'erroridentity', component: () => import('@/components/Accountstate/erroridentity.vue') } //审核失败
      ]
    },
    { path: '/credit', component: () => import('@/view/Credit/index.vue') }, //信用明细
    { path: '/accountstate/identity', name: 'identity', component: () => import('@/components/Accountstate/identity.vue') }, //身份认证
    { path: '/accountstate/index', name: 'accountstate', component: () => import('@/components/Accountstate/index.vue') },
    { path: '/audit/index', component: () => import('@/components/audit/index.vue') }, //推荐人审核
    { path: '/accountstate/approved', component: () => import('@/components/Accountstate/approved.vue') }, //审核失败
    { path: '/receiving/list', component: () => import('@/view/Receiving/list.vue') }, //收付款信息
    { path: '/chain', name: 'chain', component: () => import('@/components/Chain/index.vue') }, // 公链地址信息
    { path: '/projects', name: 'projects', component: () => import('@/components/Bind-projects/index.vue') }, // 绑定各项目
    { path: '/community/information', component: () => import('@/components/community/information.vue') }, // 社区信息
    { path: '/community/create', component: () => import('@/components/community/create.vue') }, // 申请创建社区
    { path: '/audit1/index', component: () => import('@/components/audit1/index.vue') }, //上级节点审核
    { path: '/audit2/index', component: () => import('@/components/audit2/index.vue') }, //中高级节点审核
    { path: '/location/index', name: 'location', component: () => import('@/components/location/index.vue') }, //选择所在地
    { path: '/location/country', component: () => import('@/components/location/country.vue') }, //选择国家
    { path: '/community/index', name: 'community', component: () => import('@/components/community/index.vue') },//所在地社区
    { path: '/information/index', component: () => import('@/components/information/index.vue') },//账号信息
    { path: '/information/recommender', component: () => import('@/components/information/recommender.vue') },//推荐人
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;
