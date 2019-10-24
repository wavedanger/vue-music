# vue-music

#### 作品预览

<img src="http://wavedanger.gitee.io/vue-music-online/images/index.gif" alt="主界面" width="250">
<img src="http://wavedanger.gitee.io/vue-music-online/images/player.gif" alt="播放页面" width="250">
<img src="http://wavedanger.gitee.io/vue-music-online/images/songlist.gif" alt="歌曲列表" width="250">
<br>
<img src="http://wavedanger.gitee.io/vue-music-online/images/search.gif" alt="搜索页面" width="250">
<img src="http://wavedanger.gitee.io/vue-music-online/images/user.gif" alt="个人中心" width="250">
<img src="http://wavedanger.gitee.io/vue-music-online/images/disc.gif" alt="歌单详情" width="250">
<!-- ![主界面](http://wavedanger.gitee.io/vue-music-online/image/index.gif)
![播放页面](http://wavedanger.gitee.io/vue-music-online/image/player.gif)
![歌曲列表](http://wavedanger.gitee.io/vue-music-online/image/songlist.gif)
![搜索页面](http://wavedanger.gitee.io/vue-music-online/image/search.gif)
![个人中心](http://wavedanger.gitee.io/vue-music-online/image/user.gif)
![歌单详情](http://wavedanger.gitee.io/vue-music-online/image/disc.gif) -->

#### 技术栈

1. 前端

- Vue：用于构建用户界面的 MVVM 框架。它的核心是响应的数据绑定和组件系统。
- vue-router：为单页面应用提供的路由系统，项目上线前使用了 Lazy Loading Routes 技术来实现异步加载优化性能。
- vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷。
- vue-lazyload：第三方图片懒加载库，优化页面加载速度。
- better-scroll：iscroll 的优化版，使移动端滑动体验更加流畅。
- stylus：css 预编译处理器。
- ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用。

2. 后端

- Node.js：利用 Express 起一个本地测试服务器。
- jsonp：服务端通讯。实现跨域获取 QQ 音乐数据。
- axios：服务端通讯。结合 Node.js 代理后端请求，实现跨域获取 QQ 音乐数据。

3. 其它

- webpack：项目的编译打包,本项目利用其打包生成的前端资源，在生产环境下模拟运行。
- vue-cli：Vue 脚手架工具，快速搭建项目。
- eslint：代码风格检查工具，规范代码格式。
- vConsole：移动端调试工具，在移动端输出日志。
- Git:Git 是目前世界上最先进的分布式版本控制系统。本项目利用 git 和码云平台，实现项目的版本控制。

#### 设计

1. Vue-cli 主要项目结构

```
├─build                 // 保存一些webpack的初始化配置,项目构建
│ ├─build.js            // 生产环境构建
│ ├─check-version.js    // 检查npm、node版本
│ ├─vue-loader.conf.js  // webpack loader配置
│ ├─webpack.base.conf.js// webpack基础配置
│ ├─webpack.dev.conf.js // 开发环境配置，构建本地开发服务器
│ ├─webpack.prod.conf.js// 生产环境的配置
│
├─config                // config文件夹保存一些项目初始化的配置
│ ├─dev.env.js          // 开发环境的配置
│ ├─index.js            // 项目一些配置变量
│ ├─prod.env.js         // 生产环境的配置
│
├─dist                  // 打包后的项目
├─node_modules          // 依赖包
│
├─src                   // 源码目录
│ ├─api                 // 和后端请求相关的代码，包括ajax和jsonp的请求
│ ├─base                // 基础组件
│ ├─common              // 公共资源
│ ├─components          // 业务组件
│ ├─router              // 路由
│ ├─store               // vuex状态管理
│ ├─App.vue             // 是项目入口文件
│ ├─main.js             // 是项目的核心文件，入口
├─static                // 静态资源目录
├─.babelrc              // Babel的配置文件
├─.editorconfig         // 代码规范配置文件
├─.gitignore            // git忽略配置文件
├─.postcssrc.js         // postcss插件配置文件
├─index.html            // 页面入口文件
├─package-lock.json     // 项目包管控文件
├─package.json          // 项目配置
└─README.md             // 项目说明书
```

2. 基础组件

- confirm：确认对话框组件
- listview：通讯录列表组件
- loading：加载态组件
- no-result：无结果展示组件
- progress-bar：进度条组件
- progress-circle：圆形进度条组件
- scroll：移动端滚动组件
- search-box：搜索框组件
- search-list：搜索列表组件
- slider：轮播图组件
- switches：开关切换组件
- top-tip：顶部消息提示组件
- song-list：歌曲列表组件

3. 业务组件

- add-song：添加歌曲到列表组件
- disc：歌单详情页组件
- m-header：页面头部组件
- music-list：歌曲列表页面组件
- player：播放器内核组件
- playlist：播放列表组件
- rank：排行榜页面组件
- recommend：推荐页面组件
- search：搜索页面组件
- singer：歌手页面组件
- singer-detail：歌手详情页组件
- suggest：搜索提示列表组件
- tab：顶部导航栏组件
- top-list：排行榜详情页组件
- user-center：用户中心页组件

#### 安装与运行

1. git clone https://gitee.com/wavedanger/vue-music.git
2. cd vue-music
3. npm install //安装依赖
4. npm run dev //服务端运行 访问 http://localhost:8080
5. npm run build //项目打包
