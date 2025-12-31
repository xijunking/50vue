<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import FireworksBackground from '@/components/FireworksBackground.vue'

const fireworksBgRef = ref<InstanceType<typeof FireworksBackground> | null>(null)

const timeLeft = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const currentYear = new Date().getFullYear()
const nextYear = currentYear + 1
const targetDate = new Date(`${nextYear}-01-01T00:00:00`).getTime()

let timer: number | null = null

const updateTimer = () => {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    if (timer) clearInterval(timer)
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    // 触发烟花翻倍
    fireworksBgRef.value?.setIntensity('high')
    return
  }

  timeLeft.value.days = Math.floor(distance / (1000 * 60 * 60 * 24))
  timeLeft.value.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  timeLeft.value.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  timeLeft.value.seconds = Math.floor((distance % (1000 * 60)) / 1000)
}

const formatNumber = (num: number) => {
  return num.toString().padStart(2, '0')
}

onMounted(() => {
  updateTimer()
  timer = window.setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="countdown-page">
    <FireworksBackground ref="fireworksBgRef" />
    
    <div class="content">
      <h1 class="title">跨年倒计时</h1>
      <h2 class="subtitle">距离 {{ nextYear }} 年还有</h2>
      
      <div class="timer-container">
        <div class="time-block">
          <div class="number">{{ formatNumber(timeLeft.days) }}</div>
          <div class="label">天</div>
        </div>
        <div class="separator">:</div>
        <div class="time-block">
          <div class="number">{{ formatNumber(timeLeft.hours) }}</div>
          <div class="label">时</div>
        </div>
        <div class="separator">:</div>
        <div class="time-block">
          <div class="number">{{ formatNumber(timeLeft.minutes) }}</div>
          <div class="label">分</div>
        </div>
        <div class="separator">:</div>
        <div class="time-block">
          <div class="number">{{ formatNumber(timeLeft.seconds) }}</div>
          <div class="label">秒</div>
        </div>
      </div>

      <div class="wishes">
        <p>愿新的一年，万事胜意，未来可期！</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #0f172a;
  color: #fff;
  font-family: 'Times New Roman', serif; /* 更庄重的衬线字体 */
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 3rem;
  background: rgba(80, 0, 0, 0.4); /* 深红半透明 */
  backdrop-filter: blur(5px);
  border-radius: 20px;
  border: 2px solid #FFD700; /* 金色边框 */
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1);
}

.title {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to bottom, #FFD700, #FFA500); /* 金色渐变 */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

.subtitle {
  font-size: 1.8rem;
  color: #FFD700;
  margin-bottom: 3rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.timer-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number {
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  color: #FFD700; /* 金色文字 */
  background: linear-gradient(145deg, #8B0000, #4a0000); /* 深红立体背景 */
  padding: 1.5rem 1rem;
  border-radius: 15px;
  min-width: 120px;
  font-variant-numeric: tabular-nums;
  border: 2px solid #B8860B;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), inset 0 2px 5px rgba(255, 255, 255, 0.2);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.label {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #FFA500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: bold;
}

.separator {
  font-size: 4rem;
  font-weight: 700;
  color: #FFD700;
  margin-top: 1rem;
  text-shadow: 0 0 10px #FFD700;
  animation: blink 1s infinite;
}

.wishes {
  font-size: 1.8rem;
  color: #FFF8DC;
  font-family: 'KaiTi', 'STKaiti', serif; /* 尝试使用楷体 */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 215, 0, 0.3);
  padding-top: 2rem;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
    width: 90%;
  }

  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .timer-container {
    gap: 0.5rem;
  }
  
  .number {
    font-size: 2.5rem;
    min-width: 60px;
    padding: 0.8rem 0.4rem;
  }
  
  .separator {
    font-size: 2.5rem;
    margin-top: 0.5rem;
  }

  .wishes {
    font-size: 1.4rem;
  }
}
</style>
