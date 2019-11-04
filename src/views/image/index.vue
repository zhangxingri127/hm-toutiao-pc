<template>
  <div>
    <el-card>
      <div slot="header">
        <!-- 插槽 -->
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div>
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right;" type="success" size="small" @click="open">添加素材</el-button>
      </div>
      <!-- 照片区 -->
      <div class="img_list" v-for="item in images" :key="item.id">
        <img :src="item.url" />
        <div v-show="!reqParams.collect">
          <span
            class="el-icon-star-off"
            @click="toggleStatus(item)"
            :class="{red:item.is_collected}"
          ></span>
          <span class="el-icon-delete" @click="delImages(item.id)"></span>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        class="pager"
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
      <!-- 对话框 -->
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :on-success="handleSuccess"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import local from '@/utils/local';
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      // 总条数
      total: 0,
      // 控制对话框 显示与隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    handleSuccess (res) {
      console.log(res)
      this.$message.success('发表成功')
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    // 获取
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    // 切换收藏和全部
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 页码
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 删除
    async delImages (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了确认
          // 1. 发请求
          await this.$http.delete(`user/images/${id}`)
          // 2. 提示
          this.$message.success('删除成功')
          // 3. 更新列表
          this.getImages()
        })
        .catch(() => {
          // 点击了取消
        })
    },
    // 收藏/取消收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功（改当前图片的状态，提示）
      item.is_collected = data.collect
      this.$message.success(data.collect ? '收藏成功' : '取消收藏成功')
    }
  }
}
</script>

<style scoped lang='less'>
.pager {
  margin-left: 50%;
  transform: translateX(-50%);
}
.img_list {
  margin-top: 20px;
  width: 180px;
  height: 180px;
  position: relative;
  border: 1px dashed #ccc;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    span {
      color: #fff;
      margin: 0 20px;
      &.red {
        color: red;
      }
    }
  }
}
</style>
