import formula from '@/constant/formula.json';
import rgbHex from 'rgb-hex';
import color from 'css-color-function';
import axios from 'axios';
/**
 * 把生成的样式表写入到style中
 * @param {*} elNewStyle  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = elNewStyle => {};

/**
 * 根据主题色，生成最新的样式表
 */
export const generateNewStyle = primaryColor => {
	// 1.根据主色生成色值表
	const colors = generateColors(primaryColor);
	console.log('colors:', colors);
	// 2.获取当前element-puls的默认样式表，并且把 需要进行替换的色值打上标志
	// 3.遍历生成的色值表，在默认样式表中进行全局替换
};

/**
 * 根据主色生成色值表
 */
export const generateColors = primary => {
	if (!primary) return;
	const colors = {
		primary,
	};
	Object.keys(formula).forEach(key => {
		const value = formula[key].replace(/primary/g, primary);
		colors[key] = '#' + rgbHex(color.convert(value));
	});
	return colors;
};

/**
 * 获取当前 element-plus 的默认样式表
 */
export const getOriginalStyle = async () => {
	// 获取当的element-puls的版本号
	const version = require('element-plus/package.json').version;
	// element-plus的css路径不变，只有版本是变的
	const url = `https://unpkg.com/element-plus@${version}/dist/index.css`;
	const { data } = await axios(url);
	console.log('data:', data);
};
