<template>
	<div class="login-container">
		<el-form ref="loginFromRef" :model="loginForm" :rules="loginRules" class="login-form">
			<div class="title-container">
				<h3 class="title">{{ $t('msg.login.title') }}</h3>
			</div>
			<!-- 用户名 -->
			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon="user"></svg-icon>
				</span>
				<el-input v-model="loginForm.username" placeholder="username" name="username" type="text"></el-input>
			</el-form-item>
			<!-- 密码 -->
			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon="password"></svg-icon>
				</span>
				<el-input v-model="loginForm.password" placeholder="password" :type="passwordType" name="password"></el-input>
				<span class="show-pwd">
					<span class="svg-container" @click="onChangePwsTy">
						<svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
					</span>
				</span>
			</el-form-item>
			<el-button @click="handlerLogin" type="primary" :loading="loading" style="width: 100%; margin-bottom: 30px">{{ $t('msg.login.loginBtn') }}</el-button>
			<div class="tips" v-html="$t('msg.login.desc')"></div>
		</el-form>
	</div>
</template>

<script setup>
import { validatePassword } from '../../utils/rules';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
// 数据源
const loginForm = ref({
	username: 'super-admin',
	password: '123456',
});

// 验证规则
const i18n = useI18n();
const loginRules = ref({
	username: [
		{
			required: true,
			trigger: 'blur',
			message: i18n.t('msg.login.usernameRule'),
		},
	],
	password: [
		{
			required: true,
			trigger: 'blur',
			validator: validatePassword(),
		},
	],
});

// 处理密码框文本显示
const passwordType = ref('password');

const onChangePwsTy = () => {
	if (passwordType.value === 'password') {
		passwordType.value = 'text';
	} else {
		passwordType.value = 'password';
	}
};

// 处理登录
const loading = ref(false);
const store = useStore();
const loginFromRef = ref(null);
const handlerLogin = () => {
	loginFromRef.value.validate(valid => {
		if (!valid) return;
		loading.value = true;
		store
			.dispatch('user/login', loginForm.value)
			.then(res => {
				loading.value = false;
			})
			.catch(() => {
				loading.value = false;
			});
	});
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;

		::v-deep .el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}

		::v-deep .el-input {
			display: inline-block;
			height: 47px;
			width: 85%;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $light_gray;
				height: 47px;
				caret-color: $cursor;
			}
		}
	}

	.tips {
		font-size: 16px;
		line-height: 28px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}

		::v-deep .lang-select {
			position: absolute;
			top: 4px;
			right: 0;
			background-color: white;
			font-size: 22px;
			padding: 4px;
			border-radius: 4px;
			cursor: pointer;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
