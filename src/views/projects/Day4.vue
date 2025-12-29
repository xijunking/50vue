<!-- 模糊加载 -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const loadingText = ref(0)
const loadingColor = ref<any>(1)


const lodingFun = () => {
    for (let i = 0; i < 101; i++) {
        setTimeout(() => {
            loadingText.value = i
            loadingColor.value = (101 - i) < 11 ? `0${(101 - i)}` : (101 - i)
        }, i * 10)

    }
}

onMounted(() => {
    lodingFun()
})

</script>

<template>
    <div class="loding-box" v-if="loadingText <= 99" :style="{ backgroundColor: `rgba(255, 255, 255, .${loadingColor})` }">
    </div>
    <div class="loding-text" v-if="loadingText <= 99">{{ loadingText }}%</div>
    <img class="loding-img"
        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        alt="">
</template>

<style scoped>
.loding-box {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    filter: blur(6px);
    z-index: 999;
}

.loding-img {
    width: 100%;
    height: 100vh;
}

.loding-text {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    font-weight: 700;
    font-size: 80px;
    color: #000000;
    z-index: 9999;
}
</style>