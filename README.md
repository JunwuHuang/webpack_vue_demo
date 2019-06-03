# 使用webpack搭建vuejs开发环境(vue,vue-router,babel,babel-polyfill)
repo地址: https://github.com/JunwuHuang/webpack_vue_demo

## 目录
+ [前言](#前言)
+ [起步](#起步)
+ [babel配置](#babel配置)
+ [vue相关的webpack配置](#vue相关的webpack配置)
+ [可能遇到的错误](#可能遇到的错误)

## 前言
此次练习之前先简单了解过了[webpack](https://webpack.docschina.org/),大概浏览了下[webpack指南](https://webpack.docschina.org/guides/)的内容。平时开发[vue](https://cn.vuejs.org/)的时候都是用的[@vue/cli](https://cli.vuejs.org/zh/)还从未手动搭建过cli，于是这个cli是跟着[vue-loader](https://vue-loader.vuejs.org/zh/)的文档走的。

## 起步
```javascript
// webpack.config.js
const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/main.js')
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin()
  ]
}
```

从以上的webpack.config.js中，可以看到这里我们需要安装若干个loader

这里要注意的一点是，```vue-style-loader```是不需要我们自己装的，在[vue-style-loader项目的readme](https://github.com/vuejs/vue-style-loader)中可以看到:
>However, since this is included as a dependency and used by default in vue-loader, in most cases you don't need to configure this loader yourself.

这个loader已经包含在了vue-loader里面(是vue-loader的依赖项之一),所以我们不要再重复安装

这里也看到了```babel-loader```也就是用了babel，在我印象中[babel](https://www.babeljs.cn/)配置起来是比较复杂的，所以以下shell我就先没有安装babel-loader

```shell
    npm install -D vue-loader vue-template-compiler css-loader
```

## babel配置
> 参考[《使用 Babel》](https://www.babeljs.cn/setup#installation)
1. Choose your tool (try CLI)
    > 选择webpack选项

1. Installation
    ```shell
        npm install -D babel-loader @babel/core
    ```

1. Usage
    这里列出了配置与使用的方法，我们只需参考其中的配置方法
    ```javascript
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
    ```
    可以看到这里的配置与我们上面提到配置文件中，唯一的不同是多了一个```exclude: /node_modules/```,于是我在以上配置文件中，加了这一项

1. Create ```.babelrc``` configuration file

    为了启用babel，我们还需要创建一个```.babelrc```文件:

    我们可以通过[env preset](https://babeljs.io/docs/en/babel-preset-env)去使用es2015+的语法
    ```shell
        npm install -D @babel/preset-env
    ```
    通过```.babelrc```文件启用```env preset```:
    ```javascript
    // .babelrc
    {
        "presets": ["@babel/preset-env"]
    }
    ```


> 以上就已经配置好了基础的babel功能，但是在平时开发中会经常使用一些es2015+的api，这时我还需要配置[polyfill](https://babeljs.io/docs/en/babel-polyfill)

安装：
```shell
    npm install -S @babel/polyfill
```
配置：
```javascript
  // webpack.config.js
  module.exports = {
    entry: ["@babel/polyfill", "./app/js"],
  };
```

> vue开发中，我们大部分时候会使用vue-router并使用路由懒加载功能，这时，还需配置[@babel/plugin-syntax-dynamic-import
](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/)

安装：
```shell
    npm install -D @babel/plugin-syntax-dynamic-import
```
配置：
```javascript
  // .babelrc
  {
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
  }
```


## vue相关的webpack配置
+ 自动管理index.html文件:参考[webpack的管理输出](https://webpack.docschina.org/guides/output-management/)
  安装：
  ```shell
      npm install -D html-webpack-plugin clean-webpack-plugin
  ```
  配置：
  ```javascript
    // webpack.config.js
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    module.exports = {
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: "public/index.html"
        })
      ],
    };
  ```
+ 使用[观察模式与webpack-dev-server](https://webpack.docschina.org/guides/development/)
  安装：
  ```shell
      npm install -D webpack-dev-server
  ```
  配置：
  ```javascript
    // webpack.config.js
    module.exports = {
      mode: "development",
      devServer: {
        contentBase: "./dist"
      },
    };
  ```
+ 在package.json中添加两个shell
  ```json
  {
    "scripts": {
      "serve": "webpack-dev-server --open --hot --watch --progress",
      "build": "npx webpack --config webpack.config.js"
    }
  }
  ```

## 可能遇到的错误
+ 没有安装vuejs:
  ```shell
    Module not found: Error: Can’t resolve 'App.vue' in somepath
  ```