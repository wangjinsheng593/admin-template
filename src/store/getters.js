import { MAIN_COLOR } from '@/constant';
import { getItem } from '@/utils/storage';
import { generateColors } from '@/utils/theme';
// 快捷访问
const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	/**
	 *
	 * @param {*} state
	 * @returns true 表示用户信息已存在
	 */
	hasUserInfo: state => {
		return JSON.stringify(state.user.userInfo) !== '{}';
	},

	cssVar: state => {
		return {
			...state.theme.variables,
			...generateColors(getItem(MAIN_COLOR)),
		};
	},
	sidebarOpened: state => state.app.sidebarOpened,
	language: state => state.app.language,
	// 换肤
	mainColor: state => state.theme.mainColor,
};
export default getters;
