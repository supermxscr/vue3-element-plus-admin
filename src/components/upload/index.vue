<template>
  <div class="upload">
    <el-upload 
      v-if="type == 'single'"
      class="avatar-uploader"
      :action="upUrl"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>
    <view v-if="type == 'multiple'">
      <el-upload
        :action="upUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          width="100%"
          :src="dialogImageUrl"
          alt="img"
        >
      </el-dialog>
    </view>
    <view v-if="type == 'file'">
      <el-upload
        class="upload-demo"
        drag
        :action="upUrl"
        multiple
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
    </view>
  </div>
</template>

<script>
import API from "@/api/api-config.js";
export default {
  props: {
    defaultValue: {
      type: String || Array,
      default: null
    },
    type: {
      type: String,
      default: 'single',
      validator: (value) => {
        return ['single', 'multiple'].indexOf(value) !== -1 
      }
    },
  },
  data() {
    return {
      upUrl: API.uploadUrl,
      imageUrl: null,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
    };
  },
  mounted() {
    if (typeof this.defaultValue == 'string') {
      this.imageUrl = this.defaultValue
    }else if(Array.isArray(this.defaultValue)){
      this.init()
    }
  },
  methods: {
    init() {
      for (const i in this.imageUrl) {
        this.fileList.push({ name: i, url: this.imageUrl[i] });
      }
    },
    handleRemove(file) {
      // console.log(file)
      this.imageUrl.forEach((v, index) => {
        if (v == file.response.data) {
          this.imageUrl.splice(index, 1);
        }
      });
      this.$emit("uploaddefaultValueUrl", this.imageUrl);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.imageUrl.push(this.dialogImageUrl);
    },
    handleSuccess(res) {
      // console.log(res)
      if(this.type == 'single'){
        this.imageUrl = res.data
      }else {
        this.imageUrl.push(res.data)
      }
      this.$emit("uploaddefaultValueUrl", this.imageUrl);
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isLt5M;
    },
  },
};
</script>

<style lang="less">
.upload {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    .el-upload-dragger {
      width: 100%;
      border: none;
    }
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
}
</style>
