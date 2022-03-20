// 专门处理权限路由的模块
import { publicRoutes, privateRoutes } from '@/router';

export default {
	namespaced: true,
	state: () => ({
		// 路由表：初始时所拥有得路由表
		routes: publicRoutes,
	}),
	mutations: {
		/**
		 * 增加路由:公共路由+新增路由
		 */
		setRoutes(state, newRoutes) {
			state.routes = [...publicRoutes, ...newRoutes];
		},
	},
	actions: {
		/**
		 * 根据权限数据刷选路由
		 * @param {*} context
		 * @param {*} menus 权限数据
		 */
		filterRoutes(context, menus) {
			// 刷选之后，获取到的需要通过addRoute进行添加的路由表数组
			const routes = [];
			menus.forEach(key => {
				routes.push(...privateRoutes.filter(item => item.name === key));
			});
			// 所有不匹配的路由，全部进去404的路由配置
			// 注意：该配置必须要在所有路由指定之后
			routes.push({
				path: '/:catchAll(.*)',
				redirect: '/404',
			});
			context.commit('setRoutes', routes);
			return routes;
		},
	},
};
