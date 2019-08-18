# vue-base-template

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Compiles and minifies for test
```
yarn test
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目主要结构
* public：公共文件及静态资源
* src: 开发目录
    + assets: 静态资源
    + components: 公共组件
    + router: 路由配置
    + store: vuex配置
    + styles: 公共样式
    + utils: 工具
    + views: 页面级组件
* .env[module]: 环境变量配置
    + .env.development： 开发环境
    + .env.production: 打包生产环境
    + .env.test: 打包测试环境
* vue.config.js: 配置文件
* package.json: 依赖及脚本配置

### 公共组件
公共组件直接读取components中所有的index.vue,并注册为全局组件，注册名为组件的name属性。
也可在components/index.js修改规则。
    
### 路由配置
路由分为静态路由和动态路由，静态路由为router/index.js中配置的Home和404页面。
动态路由通过utils/addRoutes.js直接读取views下所有的.vue文件并生成路由数据，动态添加。

#### 动态路由组件配置
```
export default {
  name: string,
  title: string,
  pname: string，
  drother： boolean,
  hidden: boolean
}
```
* name: 组件名
* title: 路由标题，ff-menu中显示的文字，若不填则显示name
* pname: 父组件名，不填默认Main
* drother: 默认false，若为true则不加载此路由 
* hidden: 是否在ff-menu中显示 

    
    
