<template>
  <!-- 筛选内容卡片 -->
  <el-card>
    <div slot="header">
      <!-- 插槽 -->
      <my-bread>内容管理</my-bread>
    </div>
    <el-form label-width="80px" size="small">
      <el-form-item label="状态:">
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道:">
        <el-select v-model="reqParams.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelOpthins"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期:">
        <!-- v-model绑定两个值 起始日期,结束日期 -->
        <el-date-picker
          v-model="dataArr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道选项
      channelOpthins: [
        { value: 1, label: '体育' },
        { value: 2, label: '新闻' }
      ],
      // 日期单位
      dataArr: []
    }
  }
}
</script>

<style scoped lang='less'></style>
