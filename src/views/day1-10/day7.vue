<!-- bestPage -->
<template>
    <h1>bestPage</h1>
 
    
 <div class="bestPage" style="margin-left: 20px;"> </div>
    
    <div class="time-body">
        batter
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

.bestPage{
    width: 200px;
    height: 200px;
    background-color: #bfa;
    outline: #4682b4 solid 10px;
}
</style>