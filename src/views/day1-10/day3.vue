<script setup lang="ts">
import { computed, ref } from 'vue';
const value = ref('')
const realWidth = ref(170)
const value1 = ref(1)
const value2 = ref('block')

const changeWidth = () => {
    value1.value = 0.1
    setTimeout(() => {
        value2.value = 'none'
    }, 480)
}

const inputStyle = computed(() => {
    return {
        transform: `scale(${value1.value}, ${value1.value})`,
        transition: "all 0.5s ease",
        display: value2.value,
    }
})


</script>

<template>
    <div class="search-box">

        <div class="search-content">
            <input class="search-input" :style="inputStyle" v-model="value" placeholder=""
                placeholder-class="input-placeholder" @input="" />

            <el-icon :size="24" color="#333" @click="changeWidth">
                <Search />
            </el-icon>
        </div>

    </div>
</template>

<style scoped>
.search-box {
    width: 100%;
    height: 100vh;
    background-color: #7b5df9;
    display: flex;
    place-items: center;
    justify-content: center;

}

.search-content {
    background-color: red;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}


.search-input {
    height: 20px;
    padding: 15px;
    width: 170px;
    border: none;
    box-sizing: border-box;
}
</style>