![cloudbase-pic](https://636f-codeless-0gnhewcwbbca2bba-1251745412.tcb.qcloud.la/cloudbase-pic/2040_cloudbase-pic.png)

# CloudBase-Pic
基于[云开发 CloudBase](https://cloudbase.net/)的开发图床应用, 使用了云开发的静态存储托管功能，上传图片到云存储。基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目一键部署到云开发环境。页面设计参考`SM.MS`




## 截图

![](https://636f-codeless-0gnhewcwbbca2bba-1251745412.tcb.qcloud.la/cloudbase-pic/5894_preview.png)

## 部署

### 步骤一. 准备工作
云开发相关前置知识 [准备云开发环境和 CloudBase CLI 命令工具](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CLI_GUIDE.md)

+  修改环境ID。项目根目录中。找到 `cloudbaserc.json` 修改 `envId`
+ （可选）修改部署到静态托管的目录。找到 `cloudbaserc.json` 下的 `@cloudbase/framework-plugin-website 插件下的`的`cloudPath`。默认为 `pic`
+ （可选）修改上传文件到云存储的目录。找到 `src\APP.vue` 中的 `cloudbasePath` 值，默认为 `cloudbase-pic`


### 步骤二. 部署上传

本地预览
```
npm run dev
```

部署到云开发

```
npm run dev
```

![](https://636f-codeless-0gnhewcwbbca2bba-1251745412.tcb.qcloud.la/cloudbase-pic/40ca_done.png)

:sparkles::sparkles::sparkles:部署成功啦！通过云开发的静态托管域名加/pic，即可访问！



## 计划

1. 增加用户登录功能，保存用户上传图片历史，在 history 标签下可查看到该用户的所有图片。
2. 增加对其他云存储的支持，如阿里云OSS，七牛云等