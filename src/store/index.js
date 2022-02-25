import { createStore } from 'vuex';
import user from './modules/user.js';
import app from './modules/app.js';
import getters from './getters';
import theme from './modules/theme.js';
export default createStore({
	getters,
	modules: {
		app,
		user,
		theme,
	},
});
