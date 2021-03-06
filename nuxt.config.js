module.exports = {
    router: {
        linkActiveClass: "active",
        extendRoutes(routes, resolve) {
            console.log(routes);
            // 把数组清空即可清除基于pages默认生成的路由表
            routes.splice(0);
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    children: [
                        {
                            path: '', // 默认子路由
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/')
                        },
                        {
                            path: '/login', // 默认子路由
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/register', // 默认子路由
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/profile/:username/:tab?',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings')
                        },
                        {
                            path: '/editor/:slug?',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article')
                        }
                    ]
                }
            ])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 80
    },
    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
};
