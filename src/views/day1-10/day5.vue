<!-- 动效列表 -->
<script setup lang="ts">
import { computed, ref, type Directive } from 'vue';

const listData = ref<number[]>(Array.from({ length: 100 }, (_, i) => i))

// 可见性处理函数
const handleVisibility = (isVisible: boolean, entry: IntersectionObserverEntry) => {
    console.log(`record1 Element ${entry.target.innerHTML} is visible: ${isVisible}`);
};

// 自定义指令 v-visible
const vVisible: Directive = {
    mounted(el: any, binding) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const isVisible = entry.isIntersecting;
                    el.style.transition = 'transform 0.5s ease-in-out';
                    if (isVisible) {
                        if ((el.innerHTML / 1) % 2 === 0) {
                            el.style.transform = 'translateX(-150px)';
                        } else {
                            el.style.transform = 'translateX(150px)';
                        }
                    } else {
                        if ((el.innerHTML / 1) % 2 === 0) {
                            el.style.transform = 'translateX(150px)';
                        } else {
                            el.style.transform = 'translateX(-150px)';
                        }
                    }

                    binding.value(isVisible, entry); // 调用传入的回调函数
                });
            },
            {
                root: null, // 默认视口
                threshold: 0.1, // 元素至少 10% 可见时触发
            }
        );

        observer.observe(el);

        // 将 observer 保存到元素上，便于后续清理
        (el as any).__vueObserver__ = observer;
    },
    unmounted(el: HTMLElement) {
        // 在元素销毁时断开观察器
        const observer = (el as any).__vueObserver__;
        if (observer) {
            observer.disconnect();
            delete (el as any).__vueObserver__;
        }
    },
};

</script>

<template>
    <div class="roll-container">
        <div v-for="(item, index) in listData" :key="index" class="roll-body" v-Visible="handleVisibility"
            :style="{ transform: `translateX(${index % 2 === 0 ? 300 : -300}px)`, }">
            {{ index }}
        </div>
    </div>

</template>

<style scoped>
.roll-body {
    width: 340px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    color: #000;
    font-size: 26 px;
    /* background-color: #bfa; */
    border: solid 5px #4c4c4c;
    margin-bottom: 20px;
}

.roll-container {
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    place-items: center;
}
</style>