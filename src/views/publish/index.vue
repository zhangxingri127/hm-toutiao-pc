<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <!-- 插槽 -->
        <my-bread>文章发布</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.status">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <my-publish></my-publish>
        </el-form-item>
        <!-- 频道 -->
        <my-channel v-model="articleForm.channel_id"></my-channel>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
          <el-button>存入草稿</el-button>
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
        status: 1,
        title: null,
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
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
