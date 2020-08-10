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
        <el-upload class="upload-demo" drag action multiple :http-request="uploadFile">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">上传成功后，可到 History 查看记录，获取外链地址</div>
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
    return {};
  },
  async created() {
    this.envId = this.$cloudbase.config.env;
    try {
      const auth = this.$cloudbase.auth({ persistence: "local" });

      if (!auth.hasLoginState()) {
        await auth.anonymousAuthProvider().signIn();
      }

      console.log("用户id", auth.hasLoginState().user.uid);

      this.isLoginSuccss = true;
    } catch (e) {
      if (e.message.includes("100007")) {
        this.isLoginSuccss = false;
      }
      console.error(e);
      console.log(e.code);
    }
  },
  methods: {
    // 上传文件
    uploadFile(item) {
      console.log(item.file);
      this.file = item.file;
      // this.callFunction();
      this.$cloudbase
        .uploadFile({
          cloudPath: "/cloudbase-pic/" + this.file.name,
          filePath: this.file,
        })
        .then((res) => {
          this.fileID = res.fileID;
          console.log(res.fileID);
        });
    },

    async callFunction() {
      try {
        const res = await this.$cloudbase.callFunction({
          name: "vue-echo",
          data: {
            foo: "bar",
          },
        });
        console.log(res);
        this.callFunctionResult = res;
      } catch (e) {
        this.callFunctionResult = e.message;
      }
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
  /* background-color: blanchedalmond; */
}

.main-title {
  /* height: 100px; */
}

.main-title h5 {
  font-weight: 500;
  color: #e6a23c;
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
