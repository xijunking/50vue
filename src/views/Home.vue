<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import FluidBackground from '@/components/FluidBackground.vue'

const router = useRouter()

const goProjects = () => {
  router.push('/projects')
}

const goAbout = () => {
  router.push('/about')
}

const goNav = () => {
  router.push('/nav')
}

const handlePendingFeature = (featureName: string) => {
  ElMessage.info(`${featureName} 功能正在开发中，敬请期待！`)
}
</script>

<template>
  <div class="welcome-container">
    <!-- 抽象流体背景 -->
    <FluidBackground />
    
    <!-- 第一屏：欢迎标题 -->
    <section class="scroll-section">
      <div class="hero-section">
        <h1 class="title">
          Welcome to <span class="highlight">Xijun's Space</span>
        </h1>
        <p class="subtitle">Code · Life · Share</p>
        <p class="description">3.14159265358979323846264338327950288419716939937510...</p>
        <div class="scroll-hint">
          <span>向下滑动探索</span>
          <el-icon class="scroll-icon"><ArrowDown /></el-icon>
        </div>
      </div>
    </section>
    
    <!-- 第二屏：功能入口 -->
    <section class="scroll-section">
      <div class="actions">
        <div class="action-card primary" @click="goProjects">
          <div class="icon-box">
            <el-icon :size="24"><Monitor /></el-icon>
          </div>
          <div class="text-box">
            <h3>Vue Projects</h3>
            <p>交互实战案例集</p>
          </div>
          <el-icon class="arrow"><ArrowRight /></el-icon>
        </div>
        
        <div class="action-card" @click="goNav">
          <div class="icon-box">
            <el-icon :size="24"><Compass /></el-icon>
          </div>
          <div class="text-box">
            <h3>网址导航</h3>
            <p>发现优质资源</p>
          </div>
        </div>
        
        <div class="action-card" @click="router.push('/games')">
          <div class="icon-box">
            <el-icon :size="24"><Controller /></el-icon>
          </div>
          <div class="text-box">
            <h3>休闲娱乐</h3>
            <p>放松一下心情</p>
          </div>
        </div>

        <div class="action-card" @click="goAbout">
          <div class="icon-box">
            <el-icon :size="24"><User /></el-icon>
          </div>
          <div class="text-box">
            <h3>关于我</h3>
            <p>了解更多故事</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 第三屏：特性介绍 -->
    <section class="scroll-section">
      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">🚀</span>
          <h3>实战驱动</h3>
          <p>真实场景交互案例</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🛠️</span>
          <h3>技术栈</h3>
          <p>Vue3 + TS + Vite + ElementPlus</p>
        </div>
        <div class="feature-item">
          <span class="feature-icon">✨</span>
          <h3>持续更新</h3>
          <p>不断探索新的技术领域</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.welcome-container {
  /* 使用 fixed 定位确保占满全屏且不受外部影响 */
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #0f172a; /* 深色背景 */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #fff;
  overflow-y: scroll; /* 允许垂直滚动 */
  scroll-snap-type: y mandatory; /* 开启滚动捕捉 */
  scroll-behavior: smooth;
  overscroll-behavior: none; /* 禁止橡皮筋效果 */
  
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

/* Chrome, Safari, Opera 隐藏滚动条 */
.welcome-container::-webkit-scrollbar {
  display: none;
}

/* 滚动分屏容器 */
.scroll-section {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start; /* 滚动停止时对齐到顶部 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
  padding: 20px;
  box-sizing: border-box;
}

.hero-section {
  text-align: center;
  animation: fadeInDown 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: -1px;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.highlight {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  color: #cbd5e1;
  font-weight: 500;
  margin-bottom: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.description {
  font-size: 1.1rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
  word-break: break-all;
  padding: 0 20px;
}

.scroll-hint {
  margin-top: 60px;
  color: #64748b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  opacity: 0.8;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Action Cards */
.actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 固定两列 */
  gap: 30px;
  width: 100%;
  max-width: 800px;
  animation: fadeInUp 1s ease-out 0.3s backwards;
}

@media (max-width: 768px) {
  .actions {
    grid-template-columns: 1fr; /* 移动端单列 */
    max-width: 400px;
  }
}

.action-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
  height: 100%; /* 确保高度一致 */
}

.action-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.action-card.primary {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-color: rgba(168, 85, 247, 0.3);
}

.action-card.primary:hover {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
}

.icon-box {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all 0.4s ease;
}

.action-card:hover .icon-box {
  background: #fff;
  color: #0f172a;
  transform: scale(1.1);
}

.text-box h3 {
  margin: 0 0 5px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
}

.text-box p {
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
}

.arrow {
  margin-left: auto;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s ease;
}

.action-card:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Features */
.features {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1000px;
  animation: fadeInUp 1s ease-out 0.6s backwards;
}

.feature-item {
  text-align: center;
  padding: 30px;
  border-radius: 20px;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 200px;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.feature-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
}

.feature-item h3 {
  color: #e2e8f0;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.feature-item p {
  color: #64748b;
  font-size: 0.95rem;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
