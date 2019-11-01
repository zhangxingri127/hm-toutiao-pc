<template>
  <div>
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
          <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果:</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px;">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="toEdit(scope.row.id)"
              circle
              plain
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delArticle(scope.row.id)"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- layout="prev, pager, next" 当前分页组包含的布局 -->
      <!-- total 总条数 -->
      <!-- page-size 默认一页显示10条 -->
      <!-- current-page 指定当前激活的按钮 -->
      <!-- @current-change 作用：当页码发生改变触发  默认传入当前新的页码 -->
      <el-pagination
        style="margin-top:20px;"
        class="pager"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的参数对象
      // 由axios进行数据提交，字段的值null，axios是不会提交该字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道选项
      channelOptions: [],
      // 日期单位
      dataArr: [],
      // 列表数据
      articles: [],
      // 页码
      total: 0
    }
  },
  created () {
    this.getchannelOptions()
    this.getarticles()
  },
  methods: {
    // 获取频道选项数据
    async getchannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 获取列表信息
    async getarticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', {
        params: this.reqParams
      })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    },
    // 页码改变时间
    pager (newPage) {
      this.reqParams.page = newPage
      this.getarticles()
    },
    // 筛选
    search () {
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      this.getarticles()
    },
    // 日期改变
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 编辑按钮
    toEdit (id) {
      this.$router.push({ path: '/publish', qurey: id })
    },
    // 删除按钮
    async delArticle (id) {
      await this.$http.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除成功')
      // 更新列表
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'></style>
