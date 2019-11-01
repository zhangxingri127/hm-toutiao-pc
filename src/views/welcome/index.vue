<template>
  <img src="../../assets/welcome.jpg" alt />
</template>

<script>
export default {
  // 测试代码
  created () {
    this.$http
      .get('articles')
      .then(res => {
        console.log(res.data)
      })
      .catch(() => {
        console.log('error')
      })
  }
}
</script>

<style lang="less" scoped>
img {
  display: block;
  margin: 0 auto;
}
</style>
