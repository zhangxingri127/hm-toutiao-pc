<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <!-- 插槽 -->
        <my-bread>文章{{$route.query.id?'修改':'发布'}}</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <!-- 富文本框 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件 -->
          <div v-if="articleForm.cover.type ===1">
            <my-publish v-model="articleForm.cover.images[0]"></my-publish>
          </div>
          <div v-if="articleForm.cover.type ===3">
            <my-publish v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-publish>
          </div>
        </el-form-item>
        <!-- 频道 -->
        <my-channel v-model="articleForm.channel_id"></my-channel>
        <el-form-item v-if="!$route.query.id">
          <el-button type="primary" @click="creat(false)">发表</el-button>
          <el-button @click="creat(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本样式
// eslint-disable-next-line semi
import 'quill/dist/quill.core.css';
// eslint-disable-next-line semi
import 'quill/dist/quill.snow.css';
// eslint-disable-next-line semi
import 'quill/dist/quill.bubble.css';
// eslint-disable-next-line semi
// 导入富文本组件
// eslint-disable-next-line semi
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      articleId: null
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    // 修改
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '保存草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    // 新建
    async creat (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '保存草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 获取
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get(`articles/${this.articleId}`)
      this.articleForm = data
    }
  },
  watch: {
    '$route.query.id': function (newVal, oldVal) {
      if (newVal) {
        this.getArticle(newVal)
      } else {
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
