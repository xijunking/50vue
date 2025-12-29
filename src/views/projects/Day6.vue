<!-- 登录表单 -->
<template>
    <div class="login-box">


        <div class="login-content">
            <h2 style="margin-bottom: 20px;">请登录</h2>

            <div class="login-formItem">
                <label class="login-label">邮箱</label>
                <input type="text" class="login-input">
            </div>

            <div class="login-formItem">
                <label class="login-label">密码</label>
                <input type='password' class="login-input">
            </div>

            <button class="login-btn" @click="happyFun">登录</button>

            <div class="footer-text">没有账户 ? <span style="color: #86b5c0;">注册</span></div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const msg = ref('Hello Vue 3.0 + Vite')
console.log(msg.value)

const mesIndex = ref(0)
const mesArr = ref([
    '究竟什么是生活，我也不太懂，但你总要顺应主流社会吧，这是在说什么，',
    '是什么神人在写神文，大概这个人如第一句话这般混乱吧，我想提高自己',
    '以抵消现状带来的焦虑，每每坚持不下来，也会去反思到底什么原因呢，身体原因？意志不够坚定？',
    '我觉得意志不够坚定还是身体原因 为什么又身体原因呢，归根结底这就是命吗',
    '世界太深奥了，每次想到这里 都再找不出其他的答案 深陷虚无主义的陷阱',
])

const happyFun = () => {

    if (mesIndex.value == 4) {
        alert('你太棒了，你终于找到我啦')
    } else {
        alert(mesArr.value[mesIndex.value])
        mesIndex.value = mesIndex.value + 1
    }
    console.log('happyFun')
}


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

.login-content {
    width: 300px;
    height: 400px;
    color: #FFF;
    box-sizing: border-box;
    padding: 20px 40px;
    background-color: #2b4e6c;
    border-radius: 5rpx;
    text-align: center;
    caret-color: #bfa;
}

.login-formItem {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
}

.login-label {
    text-align: left;
}

.login-input {
    width: 100%;
    height: 40px;
    background-color: #2b4e6c;
    border: none;
    border-bottom: solid 3px #FFF;
    color: #FFF;
}


.login-input ::before {
    width: 100%;
    background-color: #2b4e6c;
    border: none;
}

.login-input ::after {
    width: 100%;
    background-color: #2b4e6c;
    border: none;
}

input:focus {
    outline: none;
}

.login-btn {
    width: 100%;
    border-radius: 4px;
    background-color: #add9e6;
    box-sizing: border-box;
    padding: 15px;
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 30px;
}

.footer-text {
    /* margin-top: 20px; */
}
</style>