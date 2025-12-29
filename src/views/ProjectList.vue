<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ArrowLeft, Monitor } from '@element-plus/icons-vue'
import FluidBackground from '@/components/FluidBackground.vue'

const router = useRouter()

interface ListItem {
    name: string;
    path: string;
    desc?: string;
    icon?: string;
}

const listarr: ListItem[] = [
    {
        name: '扩展卡片',
        path: '/day0',
        desc: '点击展开的弹性卡片画廊',
        icon: 'Picture'
    },
    {
        name: '进度步骤',
        path: '/day1',
        desc: '多步骤进度条控制器',
        icon: 'Operation'
    },
    {
        name: '页面旋转',
        path: '/day2',
        desc: '独特的旋转导航菜单交互',
        icon: 'Refresh'
    },
    {
        name: '隐藏搜索',
        path: '/day3',
        desc: '优雅的展开式搜索栏',
        icon: 'Search'
    },
    {
        name: '模糊加载',
        path: '/day4',
        desc: '图片加载过程的模糊渐变效果',
        icon: 'PictureRounded'
    },
    {
        name: '动效列表',
        path: '/day5',
        desc: '带有滚动视差的动态列表',
        icon: 'List'
    },
    {
        name: '登录表单',
        path: '/day6',
        desc: '带有浮动标签的交互式表单',
        icon: 'User'
    },
    {
        name: 'Split Landing',
        path: '/day7',
        desc: '双屏滑动的着陆页设计',
        icon: 'CopyDocument'
    },
]

</script>

<template>
    <div class="project-page">
        <FluidBackground />
        
        <div class="content-container">
            <header class="header">
                <div class="header-left">
                    <RouterLink to="/" class="back-btn">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>返回首页</span>
                    </RouterLink>
                    <h2 class="page-title">50 Projects <span class="highlight">Collection</span></h2>
                    <p class="subtitle">精选 Vue3 交互实战案例</p>
                </div>
            </header>

            <div class="grid-container">
                <RouterLink 
                    v-for="(item, index) in listarr" 
                    :key="index" 
                    :to="item.path"
                    class="project-card"
                >
                    <div class="card-content">
                        <div class="card-icon">
                            <el-icon><Monitor /></el-icon>
                        </div>
                        <h3 class="card-title">{{ item.name }}</h3>
                        <p class="card-desc">{{ item.desc || '交互实战案例' }}</p>
                    </div>
                    <div class="card-overlay"></div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.project-page {
    min-height: 100vh;
    width: 100%;
    background-color: #0f172a;
    color: #fff;
    position: relative;
    font-family: 'Inter', sans-serif;
}

.content-container {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* Header */
.header {
    margin-bottom: 60px;
    animation: fadeInDown 0.8s ease-out;
}

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: #94a3b8;
    margin-bottom: 20px;
    transition: color 0.3s;
    font-size: 0.95rem;
    position: relative;
    z-index: 50;
    text-decoration: none;
}

.back-btn:hover {
    color: #fff;
}

.page-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 10px;
    letter-spacing: -0.5px;
}

.highlight {
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    color: #94a3b8;
    font-size: 1.1rem;
    margin: 0;
}

/* Grid Layout */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    animation: fadeInUp 1s ease-out 0.2s backwards;
}

/* Project Card */
.project-card {
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 30px;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
}

.project-card:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.card-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.card-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: #818cf8;
    font-size: 24px;
    transition: all 0.3s ease;
}

.project-card:hover .card-icon {
    transform: scale(1.1) rotate(5deg);
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    color: #fff;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 10px;
    transition: color 0.3s;
}

.project-card:hover .card-title {
    color: #fff;
}

.card-desc {
    font-size: 0.9rem;
    color: #94a3b8;
    line-height: 1.5;
    margin: 0;
    flex-grow: 1;
}

/* Card Hover Effect */
.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y), 
        rgba(255, 255, 255, 0.06),
        transparent 40%
    );
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
    z-index: 1;
}

.project-card:hover .card-overlay {
    opacity: 1;
}

/* Animations */
@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
    .content-container {
        padding: 20px;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .grid-container {
        grid-template-columns: 1fr;
    }
}
</style>
