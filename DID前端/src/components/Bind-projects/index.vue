<template>
    <div>
      <titles :title="title" @goBack="goBack"></titles>
      <div class="content">
       
      </div>
    </div>
</template>
<script>
    import titles from '@/components/titlie.vue';
    export default {
        components:{
            titles
        },
        data() {
            return {
                title:'DID绑定各项目'
            }
        },
        methods:{
            goBack(){
                this.$router.back();
            }
        }
    }
</script>
<style lang="less" scoped>
</style>