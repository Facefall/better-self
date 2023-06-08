import { defineConfig, } from "vuepress/config";

module.exports = defineConfig({
    base: "/better-self/",
    title: 'Zhuanxu',
    description: '个人博客',
    extraWatchFiles: [
        '.vuepress/config.ts',
        '**/*.md',
        '**/*.styl'
    ],
    markdown: {
        //https://github.com/cmaas/markdown-it-table-of-contents
        toc: { includeLevel: [1, 2, 3, 4, 5] },
    },
    themeConfig: {
        smoothScroll: true,
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
                path: '/index',
                collapsable: false, // 不折叠
                children: [
                    { title: "个人简言", path: "/" }
                ]
            },
            {
                title: "Typescript + React",
                path: "/Typescript/react",
                children: [
                    {
                        title: "BASIC",
                        path: "/Typescript/basic/setup",
                        children: [
                            { title: "Setup", path: "/Typescript/basic/setup" },
                            {
                                title: "Getting Started", path: "/Typescript/basic/getting-started/typing-component-props",
                                children: [
                                    { title: "Typing Component Props", path: "/Typescript/basic/getting-started/typing-component-props" },
                                    { title: "Function Components", path: "/Typescript/basic/getting-started/function-components" },
                                    // { title: "Hooks", path: "/Typescript/basic/getting-started/hooks" },
                                ]
                            },
                            { title: "Troubleshooting Handbook", path: "/Typescript/basic/troubleshooting-handbook" },
                            { title: "Recommendations React + TypeScript", path: "/Typescript/basic/recommendations" },
                            { title: "Editor Tooling and Integration", path: "/Typescript/basic/editor-tooling-and-integration" },
                            { title: "Linting", path: "/Typescript/basic/linting" },
                            { title: "Examples", path: "/Typescript/basic/examples" },
                        ]
                    },
                    {
                        title: "HOC",
                        path: "/Typescript/hoc/intro",
                        children: [
                            { title: "Intro", path: "/Typescript/hoc/intro" },
                            { title: "Full HOC Example", path: "/Typescript/hoc/full-hoc-example" },
                        ]
                    },
                    {
                        title: "Advanced",
                        path: "/Typescript/advanced/intro",
                        children: [
                            { title: "Intro", path: "/Typescript/advanced/intro" }
                        ]
                    }
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
});