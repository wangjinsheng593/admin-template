// ESLint 配置文件遵循 commonJS 的导出规则，所导出的对象就是 ESLint 的配置对象
// 文档：https://eslint.bootcss.com/docs/user-guide/configuring
module.exports = {
	// 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
	root: true,
	// env 表示启用 ESLint 检测的环境
	env: {
		// 在 node 环境下启动 ESLint 检测
		node: true,
		browser: true,
		commonjs: true,
		es6: true,
	},
	// ESLint 中基础配置需要继承的配置
	extends: ['plugin:vue/vue3-essential', '@vue/standard'],
	// 解析器
	parserOptions: {
		parser: 'babel-eslint',
	},

	// rules： 需要修改的启用规则及其各自的错误级别
	/**
	 * 错误级别分为三种：
	 * "off" 或 0 - 关闭规则
	 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
	 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
	 */
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		// "space-before-function-paren": [2, "always"], //函数定义时括号前面需要有空格
		'space-before-function-paren': 'off',

		//0--不启用； 1--出现问题会有警告； 2--出现问题会报错
		// 强制使用一致的缩进  'indent': 'off'
		indent: ['off', 2],
		//	quotes: [2, 'single'], // 强制使用一致的反勾号、双引号或单引号
		quotes: 'off',
		//semi: [2, 'always'], //语句强制分号结尾
		semi: 'off',
		'comma-dangle': 'off',

		//eqeqeq: [2, 'allow-null'], // 必须使用全等
		eqeqeq: ['off'], // 关闭要求使用 === he !==
		'space-in-parens': ['error', 'never'],
		// 'vue/script-indent': [2, 'tab', { baseIndent: 1 }],
		'vue/html-indent': [2, 'tab', { baseIndent: 1 }],
		'no-undef': 2, //不可以有未声明的变量
		'no-redeclare': 2, //禁止重复声明变量

		'no-func-assign': 2, //禁止重复的函数声明
		// "spaced-comment": 2, //注释前要有空格
		'arrow-spacing': [2, { before: true, after: true }], //箭头前后括号
		'block-spacing': [2, 'always'], // 块级作用域缩进
		'brace-style': [2, '1tbs', { allowSingleLine: true }], // 大括号风格，允许写在一行
		'comma-spacing': [2, { before: false, after: true }], // 逗号前后的空格
		'comma-style': [2, 'last'], // 逗号风格，换行时在行首还是行尾
		'eol-last': 2, // 文件以单一的换行符结束
		'generator-star-spacing': [2, { before: true, after: true }], // generate函数的前后空格
		'jsx-quotes': [2, 'prefer-single'], // jsx使用单引号
		'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号添加后空格
		'keyword-spacing': [2, { before: true, after: true }], // 关键字前后空格
		'new-parens': 2, // new时必须加小括号
		'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
		'no-dupe-args': 2, //函数参数不能重复
		'no-dupe-class-members': 2, //对象成员不能重复
		'no-duplicate-case': 2, //switch中的case标签不能重复
		'no-empty-pattern': 2, // 禁止空解构
		'no-eval': 2, //禁止使用eval
		'no-extra-parens': [2, 'functions'], //禁止非必要的括号
		'no-func-assign': 2, //禁止重复的函数声明
		'no-invalid-regexp': 2, //禁止无效的正则表达式
		'no-irregular-whitespace': 2, //不能有不规则的空格
		'no-mixed-spaces-and-tabs': 2, //禁止混用tab和空格
		'no-multi-spaces': [2, { ignoreEOLComments: true }], //不能用多余的空格
		'no-multiple-empty-lines': [2, { max: 1 }], //空行最多不能超过2行
		'no-redeclare': 2, //禁止重复声明变量
		'no-regex-spaces': 2, //禁止在正则表达式字面量中使用多个空格
		'no-trailing-spaces': 2, //一行结束后面不要有空格
		'no-undef': 2, //不能有未定义的变量
		'no-whitespace-before-property': 2, // 对象键之前无空格
		'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }], //换行时运算符在行尾还是行首
		'padded-blocks': [2, 'never'], //块语句内行首行尾不能空行
		'semi-spacing': [2, { before: false, after: true }], //分号前后空格
		'space-before-blocks': [2, 'always'], //不以新行开始的块{前面需要有空格
		'space-in-parens': [2, 'never'], //小括号里面不需要有空格
		'space-infix-ops': 2, //中缀操作符周围需要有空格
		'space-unary-ops': [2, { words: true, nonwords: false }], //一元运算符的前/后要不要加空格
		'spaced-comment': [2, 'always', { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }], //注释风格需要有空格
		'template-curly-spacing': [2, 'never'], //模板中{}包裹的变量不需要空格
		'wrap-iife': [2, 'any'], //立即执行函数表达式的小括号风格任意一种都可以
		'yield-star-spacing': [2, 'both'], // generate 函数 yeild风格
		// "prefer-const": 2, //优先使用const
		'object-curly-spacing': [2, 'always', { objectsInObjects: false }], //大括号内是否允许不必要的空格
		'no-tabs': ['error', { allowIndentationTabs: true }],
	},
};
