<template>
  <div>
    <div class="btn_box">
      <img @click="open" :src="baseUrl" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <!-- 素材库 -->
        <el-tab-pane label="素材库" name="image">
          <!-- 图片区域 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_box">
            <div
              :class="{selected:selectedImageUrl === item.url}"
              class="img_list"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
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
        </el-tab-pane>
        <!-- 上传图片 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import local from '@/utils/local';
// eslint-disable-next-line semi
import baseUrl from '../assets/default.png';
export default {
  data () {
    return {
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表遍历数组
      images: [],
      // 总条数
      total: 0,
      // 控制对话框 显示与隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      uploadImageUrl: null,
      // 上传图片请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // 当前选中的图片地址
      selectedImageUrl: null,
      // 引入图片
      baseUrl
    }
  },
  name: 'my-publish',
  methods: {
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 对话框的确认按钮
    confirmImage () {
      if (this.activeName === 'image') {
        this.baseUrl = this.selectedImageUrl
        this.dialogVisible = false
      } else {
        this.baseUrl = this.uploadImageUrl
        this.dialogVisible = false
      }
    },
    // 上传成功
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
      this.message.success('上传成功')
    },
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.reqParams.page = 1
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      this.getImages()
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
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_box {
  margin-top: 20px;
  .img_list {
    width: 150px;
    height: 120px;
    position: relative;
    border: 1px dashed #ccc;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>
