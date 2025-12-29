<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import FluidBackground from '@/components/FluidBackground.vue'

const router = useRouter()

interface GameItem {
    name: string;
    path: string;
    desc?: string;
    icon?: string;
    status: 'active' | 'pending';
}

const gameList: GameItem[] = [
    {
        name: '贪吃蛇',
        path: '/games/snake',
        desc: '经典贪吃蛇游戏，挑战你的反应速度',
        icon: 'IceCream',
        status: 'pending'
    },
    {
        name: '扫雷',
        path: '/games/minesweeper',
        desc: '逻辑与推理的经典挑战',
        icon: 'Trophy',
        status: 'pending'
    },
    {
        name: '俄罗斯方块',
        path: '/games/tetris',
        desc: '消除方块，获得高分',
        icon: 'Moon',
        status: 'active'
    },
]

const handleGameClick = (item: GameItem) => {
    if (item.status === 'pending') {
        // 这里的 ElMessage 需要导入，或者如果项目中已经自动导入则不需要
        // 为了保险起见，我们还是导入一下
        import('element-plus').then(({ ElMessage }) => {
             ElMessage.info(`${item.name} 正在开发中，敬请期待！`)
        })
    } else {
        router.push(item.path)
    }
}
</script>

<template>
    <div class="game-page">
        <FluidBackground />
        
        <div class="content-container">
            <header class="header">
                <div class="header-left">
                    <RouterLink to="/" class="back-btn">
                        <el-icon><ArrowLeft /></el-icon>
                        <span>返回首页</span>
                    </RouterLink>
                    <h2 class="page-title">休闲 <span class="highlight">娱乐</span></h2>
                    <p class="subtitle">放松心情，享受游戏乐趣</p>
                </div>
            </header>

            <div class="grid-container">
                <div 
                    v-for="(item, index) in gameList" 
                    :key="index" 
                    class="game-card"
                    @click="handleGameClick(item)"
                >
                    <div class="card-content">
                        <div class="card-icon">
                            <el-icon><component :is="item.icon || 'Controller'" /></el-icon>
                        </div>
                        <h3 class="card-title">{{ item.name }}</h3>
                        <p class="card-desc">{{ item.desc || '精彩小游戏' }}</p>
                        <div v-if="item.status === 'pending'" class="status-badge">
                            待开发
                        </div>
                    </div>
                    <div class="card-overlay"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.game-page {
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
    background-clip: text;
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

/* Game Card */
.game-card {
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 30px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
}

.game-card:hover {
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
    border-radius: 12px;
    background: rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: #818cf8;
    font-size: 24px;
    transition: all 0.3s ease;
}

.game-card:hover .card-icon {
    background: #6366f1;
    color: #fff;
    transform: scale(1.1) rotate(5deg);
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 10px;
    color: #f1f5f9;
}

.card-desc {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    flex-grow: 1;
}

.status-badge {
    display: inline-block;
    margin-top: 15px;
    padding: 4px 12px;
    background: rgba(148, 163, 184, 0.1);
    border-radius: 20px;
    font-size: 0.8rem;
    color: #94a3b8;
    width: fit-content;
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
        rgba(255, 255, 255, 0.06) 0%, 
        transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}

.game-card:hover .card-overlay {
    opacity: 1;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
