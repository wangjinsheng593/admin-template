import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant';
import { getItem, setItem } from '../../utils/storage';

export default {
	namespaced: true,
	state: () => ({
		mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
	}),
	mutations: {
		/**
		 * 设置主题色
		 */
		setMainColor(state, newColor) {
			state.mainColor = newColor;
			setItem(MAIN_COLOR, newColor);
		},
	},
	actions: {},
};
