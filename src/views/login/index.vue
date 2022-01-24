<template>
    <div class="login-container">
        <el-form class="login-form">
            <div class="title-conteiner">
                <h3 class="title">用户登录</h3>
            </div>

            <!-- 用户名 -->
            <el-form-item>
                <span class="svg-container">
                    <el-icon><avatar /></el-icon>
                </span>
                <el-input
                    placeholder="username"
                    name="username"
                    type="text"
                ></el-input>
            </el-form-item>

            <!-- 用户名 -->
            <el-form-item>
                <span class="svg-container">
                    <el-icon><avatar /></el-icon>
                </span>
                <el-input placeholder="password" name="password"></el-input>
                <span class="show-pwd">
                    <el-icon><avatar /></el-icon>
                </span>
            </el-form-item>
            <el-button type='primary' style="width:100%;margin-bottom:30px">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
// 导入组件可以直接使用
import { Avatar } from '@element-plus/icons'
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
