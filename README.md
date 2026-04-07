# LOGO图库


## 文件目录

```shell
项目根目录
│
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── theme.json # 主题颜色配置，需要新增模式的时候改这个！！
│
├── .github
│   └── workflows
│
├── logo # logo原图
│
├── logo-dark
│
├── logo-golden
│
├── logo-light
│
└── utils
    └── changeColor.js # 更换 logo 文件夹内 logo文件 的 cls-1 颜色函数

```

### 说明

theme.json

```json
{
    // key: dark对应需要转换至的文件夹及主题颜色名，value是颜色值[cls-1, cls-2]
    // 2026.04.07 修改配色：蓝 > 紫
    "dark": ["#ccc", "#7d86fb"],
    "light": ["#242424", "#615fff"],
    "golden": ["#fedaa3", "#7d86fb"]
}
```


### 具体使用

```shell
npm install
npm run build
```
