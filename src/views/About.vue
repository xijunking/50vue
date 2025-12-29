<template>
  <div class="about-page">
    <FluidBackground />
    
    <div class="content-container">
      <header class="about-header">
        <div class="back-btn" @click="router.push('/')">
          <el-icon><ArrowLeft /></el-icon>
          <span>返回首页</span>
        </div>
      </header>

      <main class="profile-card">
        <div class="avatar-container">
          <img src="/head.jpg" alt="Avatar" class="avatar" />
        </div>
        
        <h1 class="name">Xijun</h1>
        <p class="quote">心守当下，力行所事。</p>
        
        <div class="divider"></div>
        
        <div class="contact-info">
          <a href="mailto:xijun2131@qq.com" class="contact-item">
            <el-icon><Message /></el-icon>
            <span>xijun2131@qq.com</span>
          </a>
          
          <a href="https://github.com/xijunking" target="_blank" class="contact-item">
            <el-icon><Link /></el-icon>
            <span>github.com/xijunking</span>
          </a>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import FluidBackground from '@/components/FluidBackground.vue'
import { ArrowLeft, Message, Link } from '@element-plus/icons-vue'

const router = useRouter()
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  width: 100%;
  background-color: #0f172a;
  color: #fff;
  position: relative;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.about-header {
  position: absolute;
  top: 40px;
  left: 20px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #94a3b8;
  transition: color 0.3s;
}

.back-btn:hover {
  color: #fff;
}

.profile-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  animation: fadeInUp 1s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.avatar-container {
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1e293b;
}

.name {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 16px;
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.quote {
  font-size: 1.2rem;
  color: #94a3b8;
  font-style: italic;
  margin: 0 0 40px;
  line-height: 1.6;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  margin: 0 auto 40px;
  width: 80%;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 320px;
  justify-content: center;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
  color: #fff;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .about-header {
    position: static;
    margin-bottom: 40px;
  }
}
</style>
