<template>
  <div id="main-wrap">
      <router-view/>
  </div>
</template>

<script>
export default {
  name:"LayoutIndex", 
}
</script>

<style lang="scss" scoped>
#main-wrap{
    position: fixed;
    left: 201px;
    top: 50px;
    right: 201px;

}
</style>