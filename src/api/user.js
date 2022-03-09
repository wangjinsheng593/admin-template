import request from '@/utils/request';

/**
 *
 * @returns 获取项目功能
 */
export const feature = () => {
	return request({
		url: '/user/feature',
	});
};

/**
 *
 * @returns 获取章节
 */
export const chapter = () => {
	return request({
		url: '/user/chapter',
	});
};
