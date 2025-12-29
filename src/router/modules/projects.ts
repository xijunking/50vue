import Day0 from '@/views/projects/Day0.vue'

export default [
    {
        path: '/day0',
        name: 'day0',
        component: Day0,
    },
    {
        path: '/day1',
        name: 'day1',
        component: () => import('@/views/projects/Day1.vue'),
    },
    {
        path: '/day2',
        name: 'day2',
        component: () => import('@/views/projects/Day2.vue'),
    },
    {
        path: '/day3',
        name: 'day3',
        component: () => import('@/views/projects/Day3.vue'),
    },
    {
        path: '/day4',
        name: 'day4',
        component: () => import('@/views/projects/Day4.vue'),
    },
    {
        path: '/day5',
        name: 'day5',
        component: () => import('@/views/projects/Day5.vue'),
    },
    {
        path: '/day6',
        name: 'day6',
        component: () => import('@/views/projects/Day6.vue'),
    },
    {
        path: '/day7',
        name: 'day7',
        component: () => import('@/views/projects/Day7.vue'),
    },
]
