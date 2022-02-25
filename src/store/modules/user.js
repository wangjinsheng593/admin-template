import { login, getUserInfo } from '@/api/sys';
import md5 from 'md5';
import { setItem, getItem, removeAllItem } from '@/utils/storage';
import { TOKEN } from '@/constant/index';
import router from '@/router';
import { setTimeStamp } from '@/utils/auth';

/** *
 *  this.commit('user/setToken', data.data.data.token);
 *  vuex 分为两种命名空间：
 * 1. 全局命名空间
 * 2. 局部命名空间
 * 当我们给 module 添加上 namespace 为 true 的时候，该模块的命名空间为《局部命名空间》。
 * 如果想要触发局部命名空间的 mutation、action 则需要在触发时增加 命名空间的前缀：store.commit('user（命名空间前缀）/ 具体的motation')
 */
export default {
	namespaced: true,
	state: () => ({
		userInfo: {},
		token: getItem(TOKEN) || '',
	}),

	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setToken(state, token) {
			state.token = token;
			setItem(TOKEN, token);
		},
	},

	actions: {
		/**
		 * 登入请求动作
		 */
		login({ commit }, userInfo) {
			const { username, password } = userInfo;
			return new Promise((resolve, reject) => {
				login({
					username,
					password: md5(password),
				})
					.then(data => {
						commit('setToken', data.token);
						// 跳转
						router.push('/');
						// 保存登录时间
						setTimeStamp();
						resolve();
					})
					.catch(err => {
						reject(err);
					});
			});
		},

		/**
		 * 获取用户信息
		 */
		async getUserInfo({ commit }) {
			const res = await getUserInfo();
			commit('setUserInfo', res);
			return res;
		},

		/**
		 * 退出登录
		 */
		logout({ commit }) {
			this.commit('user/setToken', '');
			this.commit('user/setUserInfo', {});
			removeAllItem();
			router.push('/login');
		},
	},
};
