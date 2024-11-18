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
        name: 'day0',
        path: '/day0'
    },
    {
        name: 'day1',
        path: '/day1'
    },
    {
        name: 'day2',
        path: '/day2'
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
            <h2>50 small project</h2>
        </header>

        <el-row :gutter="20">
            <el-col v-for="(item, index) in listarr" :span="4" :key="index">
                <RouterLink :to="item.path">
                    <el-card shadow="hover">{{ item.name }}</el-card>
                </RouterLink>
            </el-col>
        </el-row>

    </div>
</template>

<style scoped>
.main-box {
    background-color: #fff;
    width: 100%;
    height: 600px;
    margin: 80px auto;
}

.header {
    margin-bottom: 20px;
}
</style>