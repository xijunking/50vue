import ProjectList from '@/views/ProjectList.vue'
import Home from '@/views/Home.vue'

export default [
    // 首页 (Welcome Page)
    {
        path: '/',
        name: 'welcome',
        component: Home,
    },
    // 项目列表页 (Old Home)
    {
        path: '/projects',
        name: 'projects',
        component: ProjectList,
    },
    // 关于页
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
    },
    // 网址导航页
    {
        path: '/nav',
        name: 'nav',
        component: () => import('@/views/NavPage.vue'),
    },
    // 跨年倒计时
    {
        path: '/newyear',
        name: 'newyear',
        component: () => import('@/views/NewYear/Countdown.vue'),
    },
]
