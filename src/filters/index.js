import dayjs from 'dayjs';

/**
 * 时间戳格式化
 * @param {*} val
 * @param {*} format
 * @returns
 */
const dateFilter = (val, format = 'YYYY-MM-DD') => {
	if (!isNaN(val)) {
		val = parseInt(val);
	}

	return dayjs(val).format(format);
};

export default app => {
	app.config.globalProperties.$filters = {
		dateFilter,
	};
};
