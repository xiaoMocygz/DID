<template>
  <div>
    <titles></titles>
  </div>
</template>

<script>
import titles from '@/components/title1.vue'
export default {
data(){
  return {
    title:'省市'
  }
},methods: {
goBack() {
  this.$router.back();
}
},components:{
  titles
}
}
</script>

<style>

</style>