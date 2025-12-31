<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Fireworks } from 'fireworks-js'

const containerRef = ref<HTMLDivElement | null>(null)
let fireworks: Fireworks | null = null

onMounted(() => {
  if (containerRef.value) {
    fireworks = new Fireworks(containerRef.value, {
      hue: {
        min: 0,
        max: 360
      },
      delay: {
        min: 15,
        max: 30
      },
      rocketsPoint: {
        min: 0,
        max: 100
      },
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 150,
      trace: 3,
      traceSpeed: 10,
      explosion: 5,
      intensity: 30,
      flickering: 50,
      lineStyle: 'round',
      lineWidth: {
        explosion: {
          min: 1,
          max: 3
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 50,
        max: 80
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      }
    })
    fireworks.start()
  }
})

const setIntensity = (level: 'normal' | 'high') => {
  if (!fireworks) return
  
  // @ts-ignore
  fireworks.updateOptions({
    delay: level === 'high' ? { min: 5, max: 10 } : { min: 15, max: 30 },
    particles: level === 'high' ? 300 : 150,
    trace: level === 'high' ? 5 : 3,
    explosion: level === 'high' ? 10 : 5,
    intensity: level === 'high' ? 60 : 30,
    brightness: level === 'high' ? { min: 70, max: 100 } : { min: 50, max: 80 },
    opacity: level === 'high' ? 0.8 : 0.5
  })
}

defineExpose({ setIntensity })

onUnmounted(() => {
  if (fireworks) {
    fireworks.stop()
  }
})
</script>

<template>
  <div ref="containerRef" class="fireworks-bg"></div>
</template>

<style scoped>
.fireworks-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle at bottom, #1a0b0b 0%, #000000 100%);
}
</style>
