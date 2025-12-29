<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
const value = ref('')
const visible = ref(true)
const input = ref<any>(null)
const changeWidth = () => {
    visible.value = visible.value ? false : true
    if (visible.value) {
        focusInput()
    }
}

onMounted(() => {
    focusInput()
})
const focusInput = () => {
    input.value.focus()
}

</script>

<template>
    <div class="search-box">

        <div class="search-content">
            <input :class="visible ? 'search-input' : 'search-input2'" ref="input" v-model="value" placeholder=""
                placeholder-class="input-placeholder" @input="" />

            <el-icon :size="34" color="#333" @click="changeWidth">
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
    background-color: #fff;
    display: flex;
    align-items: center;
}


.search-input {
    height: 40px;
    padding: 15px;
    width: 340px;
    border: none;
    box-sizing: border-box;
    transition: all 0.5s ease;
}

.search-input:focus {
    outline: none;
}

.search-input2 {
    height: 0px;
    padding: 0px;
    width: 0px;
    border: none;
    box-sizing: border-box;
    /* display: none; */
    transition: all 0.5s ease;
}
</style>