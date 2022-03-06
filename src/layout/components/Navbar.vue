<template>
	<div class="navbar">
		<!-- 收缩按钮 -->
		<hamburger class="hamburger-container"></hamburger>
		<breadcrumb id="guide-breadcrumb" class="breadcrumb-container"></breadcrumb>

		<div class="right-menu">
			<guide class="right-menu-item hover-effect" />
			<header-search class="right-menu-item hover-effect"></header-search>
			<screenfull class="right-menu-item hover-effect"></screenfull>
			<theme-picker class="right-menu-item hover-effect"></theme-picker>
			<lang-select class="right-menu-item hover-effect"></lang-select>
			<!-- 头像 -->
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<el-avatar shape="square" :size="40" :src="LogoSmall"></el-avatar>
					<i class="el-icon-s-tools"></i>
				</div>
				<template #dropdown>
					<el-dropdown-menu class="user-dropdown">
						<router-link to="/">
							<el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
						</router-link>
						<a target="_blank" href>
							<el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
						</a>
						<el-dropdown-item divided @click="logout">{{ $t('msg.navBar.logout') }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup>
import Guide from '@/components/Guide';
import Screenfull from '@/components/Screenfull';
import LangSelect from '@/components/LangSelect/index';
import LogoSmall from '@/assets/logo-small.png';
import {} from 'vue';
import { useStore } from 'vuex';
import Hamburger from '../../components/Hamburger/index.vue';
import Breadcrumb from '../../components/Breadcrumb/index.vue';
import ThemePicker from '@/components/ThemeSelect/index';
import HeaderSearch from '@/components/HeaderSearch';

const store = useStore();
const logout = () => {
	store.dispatch('user/logout');
};
</script>

<style lang="scss" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		// :hover 动画
		transition: background 0.5s;
		&:hover {
			background: rgba(0, 0, 0, 0.1);
		}
	}
	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		display: flex;
		align-items: center;
		float: right;
		padding-right: 16px;
		::v-deep .right-menu-item {
			display: inline-block;
			padding: 0 18px 0 0;
			font-size: 24px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
			}
		}

		::v-deep .avatar-container {
			cursor: pointer;
			.avatar-wrapper {
				margin-top: 5px;
				position: relative;
				.el-avatar {
					--el-avatar-background-color: none;
					margin-right: 12px;
				}
			}
		}
	}
}
</style>
