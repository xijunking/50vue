<script setup lang="ts">
import { RouterLink } from 'vue-router'
interface ListItem {
    name: string;
    path: string;
}

const listarr: ListItem[] = [
    // {
    //     name: 'realHome',
    //     path: '/'
    // },
    {
        name: '扩展卡片',
        path: '/day0'
    },
    {
        name: '进度步骤',
        path: '/day1'
    },
    {
        name: '页面旋转',
        path: '/day2'
    },
    {
        name: '隐藏搜索',
        path: '/day3'
    },



    {
        name: 'About',
        path: '/about'
    },
]

</script>

<template>
    <div class="main-box">

        <header class="header">
            <h2>50 project</h2>
        </header>

        <div>
            <el-row :gutter="20">
                <el-col v-for="(item, index) in listarr" :span="4" :key="index" style="margin-bottom: 14px;">
                    <RouterLink :to="item.path">
                        <el-card shadow="hover">{{ item.name }}</el-card>
                    </RouterLink>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.main-box {
    background-color: #fff;
    width: 100%;
    height: 100px;
    margin: 0 auto;
    padding: 100px;
    padding-top: 40px;
    box-sizing: border-box;
}

.header {
    margin-bottom: 20px;
}
</style>