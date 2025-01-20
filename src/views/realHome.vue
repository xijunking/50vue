<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router'

// 定义鼠标位置
const mouseX = ref(0);
const mouseY = ref(0);

// 处理鼠标移动事件
const handleMouseMove = (event: any) => {
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;
};

// 动态样式
const cursorStyle = computed(() => ({
    transform: `translate(${mouseX.value}px, ${mouseY.value}px)`,
}));

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
        name: '模糊加载',
        path: '/day4'
    },
    {
        name: '动效列表',
        path: '/day5'
    },
    {
        name: '登录表单',
        path: '/day6'
    },



    {
        name: 'About',
        path: '/about'
    },
]

</script>

<template>
    <div style="position: relative;" @mousemove="handleMouseMove">
        <div class="cursor-background" :style="cursorStyle"></div>
        <div class="main-box">
            <header class="header">
                <h2>50 project</h2>
            </header>

            <div>
                <el-row :gutter="20">
                    <el-col v-for="(item, index) in listarr" :span="4" :key="index" style="margin-bottom: 14px;">
                        <RouterLink :to="item.path">
                            <el-card shadow="hover" class="xcard">{{ item.name }}</el-card>
                        </RouterLink>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>

</template>

<style scoped>
.main-box {
    background-color: #fff;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 100px;
    padding-top: 40px;
    box-sizing: border-box;
}

.header {
    margin-bottom: 20px;
}

.cursor-background {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 128, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    transition: transform 0.05s linear;
}

.xcard {
    text-align: center;
    border: solid 4px #FFFFFF;
    transition: background-color 0.9s ease, border-color 0.9s ease !important;
}

.xcard :hover {
    background-color: #0ea5e8;
    border: solid 4px #000000;
}
</style>