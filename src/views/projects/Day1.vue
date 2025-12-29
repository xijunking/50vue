<script setup lang="ts">
import { ref } from 'vue';

const data = ref([0,1, 2, 3, 4, 5])

const dataIndex = ref(0)

</script>

<template>
    <div class="about">

        <div v-for="(i, index) in data" class="step-body">
            <div class="stepbox" :style="{ borderColor: i >= dataIndex ? 'red' : 'blue' }">
                {{ i }}
            </div>

            <div class="stepLine" :style="{ backgroundColor: i >= dataIndex ? 'red' : 'blue' }">

            </div>
        </div>
    </div>

    <div class="footer-btn">
        <button
        @click="()=>{
            dataIndex = dataIndex - 1
        }"
        >上一步</button>
        <button
        @click="()=>{
            dataIndex = dataIndex + 1
        }"
        >下一步</button>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        /* min-height: 100vh; */
        display: flex;
        align-items: center;
        /* background-color: #fab; */

    }
}

.stepbox {
    width: 60px;
    height: 60px;
    background: #bfa;
    border-radius: 50%;
    border: solid 5px skyblue;
    margin: 0 auto;
    text-align: center;
    line-height: 60px;
    transition: border-color 0.3s ease;
}

.stepLine {
    width: 60px;
    height: 10px;
    background-color: skyblue;
    margin: 0 auto;
    transition: background-color 1s ease;
}

.step-body {
    display: flex;
    /* place-content: center; */
    place-items: center;
    /* background-color: #abf; */
}

.step-body:last-child .stepLine {
    display: none;
}

.footer-btn {
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}
</style>