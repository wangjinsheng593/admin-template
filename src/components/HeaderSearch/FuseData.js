import path from 'path';
import i18n from '@/i18n';
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
	// 创建result 数据
	let res = [];
	for (const route of routes) {
		// 创建path和title的item
		const data = {
			path: path.resolve(basePath, route.path),
			title: [...prefixTitle],
		};

		// 当前存在meta时，使用i18n进行国际化解析，组成新的title
		// 动态路由不允许被检索
		// 使用正则匹配出动态路由
		const re = /.*\/:.*/; // 只要有:(冒号)都被默认为是动态路由
		if (route.meta && route.meta.title && !re.exec(route.path)) {
			const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`);
			data.title = [...data.title, i18nTitle];
			res.push(data);
		}
		// 存在children时，迭代进行处理
		if (route.children) {
			const tempRoutes = generateRoutes(route.children, data.path, data.title);
			if (tempRoutes.length >= 1) {
				res = [...res, ...tempRoutes];
			}
		}
	}

	return res;
};
