<!-- 倒计时 -->
<template>
    <div class="time-body">
        登录
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('Hello Vue 3.0 + Vite')
console.log(msg.value)





</script>

<style scoped>
.login-box {
    width: 100%;
    height: 100vh;
    background-color: #4682b4;
    display: flex;
    place-items: center;
    place-content: center;
}
</style>