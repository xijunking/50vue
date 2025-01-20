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


            <button class="login-btn">登录</button>

            <div class="footer-text">没有账户 ? <span style="color: #86b5c0;">注册</span></div>
        </div>

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

.footer-text{
    /* margin-top: 20px; */
}

</style>