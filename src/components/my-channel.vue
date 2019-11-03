<template>
  <el-form-item label="频道:">
    <el-select :value="value" placeholder="请选择" clearable @change="fn">
      <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getchannelOptions()
  },
  methods: {
    // 获取频道选项数据
    async getchannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang='less'></style>
