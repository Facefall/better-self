import { defineConfig } from "vuepress/config";

module.exports = defineConfig({
    base: "/better-self/",
    title: 'Zhuanxu',
    description: '个人博客',
    theme: 'reco',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            {
                text: '颛顼的知识店铺',
                items: [
                    { text: 'Github', link: 'https://github.com/Facefall' },
                ]
            }
        ],
        sidebar: [
            {
                title: '欢迎学习',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "个人简言", path: "/" }
                ]
            },
            {
                title: "Typescript 篇",
                path: "/Typescript/tips",
                children: [
                    { title: "技巧", path: "/Typescript/tips" },
                    { title: "react 实战", path: "/Typescript/react" }
                ],
            },
            {
                title: "rust 篇",
                path: "/rust/study",
                children: [
                    { title: "rust 起航", path: "/rust/study", }
                ]
            },
            {
                title: "项目篇",
                path: "/project/e2e",
                children: [
                    { title: "E2E 自动化录制工具", path: "/project/e2e" },
                    { title: "个人 React Table 组件设计", path: "/project/table" }
                ]
            },
            {
                title: "探索篇",
                path: "/explore/vite 原理",
                children: [
                    { title: "vite 原理浅析", path: "/explore/vite" },
                ]
            },
            {
                title: "开发篇",
                path: "/dev/vscode-config",
                children: [
                    { title: "vscode 配置与同步", path: "/dev/vscode-config", },
                    { title: "git 版本控制", path: "/dev/git", },
                    { title: "macos 常用指令、高效工具与配置", path: "/dev/macos" },
                    { title: "开发常用配置（eslint、git workflow 与 commit 规范、ts", path: "/dev/config" },
                ]
            }
        ]
    },
})