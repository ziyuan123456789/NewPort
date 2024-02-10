<template>
  <div id="layout">
     <LayoutHeader/>
     <div id="main"> <LayoutMain/></div>
    
     <!-- <LayoutNav/> -->
  </div>
</template>

<script>
import LayoutHeader from './Headers/index.vue'
import LayoutMain from './Main/Main.vue'
// import LayoutNav from './Nav/Nav.vue'
export default {
  name:"LayoutIndex", 
  components:{LayoutMain,LayoutHeader},
  setup() {
      
  }
}
</script>

<style lang="scss" scoped>

</style>