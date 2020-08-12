<template>
  <div id="app">
    <div class="nav">
      <div class="nav-main">
        <div class="nav-left">
          <a href="#" id="title">CloudBase Pic</a>
          <a href="#">History</a>
          <a href="https://github.com/codelessrun/cloudbase-pic">About</a>
        </div>
        <div class="nav-right">
          <div>Login</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-title">
        <h1>Image Upload</h1>
        <h5>请勿上传违反中国大陆和香港法律的图片，违者后果自负。</h5>
      </div>
      <el-divider></el-divider>
      <div>
        <el-upload
          class="upload-demo"
          drag
          action
          multiple
          :show-file-list="false"
          :http-request="uploadFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div
            v-for="(item,index) in fileList"
            :key="index"
            class="el-upload__tip upload-success"
            slot="tip"
          >
            <span
              class="copy"
              v-clipboard:copy="item.download_url"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >点击复制链接</span>
            <span
              class="link"
              v-clipboard:copy="item.download_url"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >{{item.download_url}}</span>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-main">Powered by CloudBase Pic.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      cloudbasePath: "cloudbase-pic",
      fileList: [], // 上传成功后的文件列表
    };
  },

  async created() {
    this.envId = this.$cloudbase.config.env;
    try {
      const auth = this.$cloudbase.auth({ persistence: "local" });
      if (!auth.hasLoginState()) {
        await auth.anonymousAuthProvider().signIn();
      }
      this.isLoginSuccss = true;
    } catch (e) {
      if (e.message.includes("100007")) {
        this.isLoginSuccss = false;
      }
    }
  },
  methods: {
    // 上传单个文件
    uploadFile(item) {
      this.file = item.file;
      const name = this.S4() + "_" + this.file.name;
      this.$cloudbase
        .uploadFile({
          cloudPath: this.cloudbasePath + "/" + name,
          filePath: this.file,
        })
        .then((res) => {
          this.fileID = res.fileID;
          this.$cloudbase
            .getTempFileURL({
              fileList: [res.fileID],
            })
            .then((res2) => {
              this.fileList.push(res2.fileList[0]);
              this.$message.success("上传成功");
            });
        });
    },

    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    //复制成功时的回调函数
    onCopy() {
      this.$message.success("链接已复制到剪切板！");
    },
    // 复制失败时的回调函数
    onError() {
      this.$message.error("抱歉，复制失败！");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

#app {
  display: grid;
  grid-template-columns: 10% auto 10%;
  grid-template-rows: 50px auto 80px;
  grid-template-areas:
    "nav nav nav"
    ". main ."
    "bottom bottom bottom";
}
.nav {
  grid-area: nav;
  background-color: #343a40;

  display: grid;
  grid-template-columns: 10% auto 10%;
}

.nav-main {
  grid-column: 2;
  line-height: 50px;
  font-size: 16px;
  color: #6c757d;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
}

.nav-left {
  display: flex;
}

.nav-left a {
  margin-right: 20px;
  font-size: 16px;
  color: #6c757d;
}

#title {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.main {
  min-height: 650px;
  grid-area: main;
}

.main-title h5 {
  font-weight: 500;
  color: #f56c6c;
}

.upload-demo >>> .el-upload {
  width: 100%;
}

.upload-demo >>> .el-upload-dragger {
  width: 100%;
  height: 400px;
}

.upload-demo >>> .el-icon-upload {
  font-size: 100px;
  margin: 150px 0 30px;
}

.upload-demo >>> .el-upload__text {
  font-size: 20px;
}

.upload-success {
  height: 25px;
  line-height: 25px;
  border-radius: 5px;
  border: #55b9f3 1px dotted;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  display: flex;
}

.upload-success .link {
  color: #303133;
}

.upload-success .copy {
  font-size: 13px;
  color: #e6a23c;
  margin-right: 10px;
}

.bottom {
  grid-area: bottom;
  background-color: #f5f5f5;

  display: grid;
  grid-template-columns: 10% auto 10%;
}

.bottom-main {
  grid-column: 2;
  line-height: 80px;
  font-size: 12px;
  color: #6c757d;
}
</style>>
