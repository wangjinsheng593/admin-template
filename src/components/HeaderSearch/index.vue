<template>
	<div :class="{ show: isShow }" class="header-search">
		<span @click.stop="onShowClick" id="guide-search">
			<svg-icon class-name="search-icon" icon="search"></svg-icon>
		</span>

		<el-select
			ref="headerSearchSelectRef"
			class="header-search-select"
			v-model="search"
			filterable
			default-first-option
			remote
			placeholder="Search"
			:remote-method="querySearch"
			@change="onSelectChange"
		>
			<el-option
				v-for="option in searchOption"
				:key="option.item.path"
				:label="option.item.title.join('>')"
				:value="option.item"
			></el-option>
		</el-select>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { filterRouters } from '@/utils/route';
import { useRouter } from 'vue-router';
import Fuse from 'fuse.js';
import { generateRoutes } from './FuseData';
import { watchSwitchLang } from '@/utils/i18n';
// 数据源
const router = useRouter();
let searchPool = computed(() => {
	const filterRoutes = filterRouters(router.getRoutes());
	return generateRoutes(filterRoutes);
});

// 搜索库相关
// 参数1：搜索的数据源  参数2：配置对象
let fuse;
const initFuse = searchPool => {
	fuse = new Fuse(searchPool, {
		// 是否按优先级进行排序
		shouldSort: true,
		// 匹配长度超过这个值的才会被认为是匹配的
		minMatchCharLength: 1,
		// 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
		// name：搜索的键
		// weight：对应的权重
		keys: [
			{
				name: 'title',
				weight: 0.7,
			},
			{
				name: 'path',
				weight: 0.3,
			},
		],
	});
};
initFuse(searchPool.value);

// 控制search 展示
const isShow = ref(false);
const onShowClick = () => {
	isShow.value = !isShow.value;
};
const headerSearchSelectRef = ref(null);
watch(isShow, val => {
	if (val) {
		// 打开获取焦点
		headerSearchSelectRef.value.focus();
		document.body.addEventListener('click', onClose);
	} else {
		document.body.removeEventListener('click', onClose);
	}
});

// 关闭时间

const onClose = () => {
	// 关闭失去焦点
	headerSearchSelectRef.value.blur();
	isShow.value = false;
	searchOption.value = [];
};

// search 相关
const search = ref('');

// 搜索方法
const searchOption = ref([]);
const querySearch = query => {
	if (query) {
		searchOption.value = fuse.search(query);
	} else {
		searchOption.value = [];
	}
};

// 选中回调
const onSelectChange = val => {
	router.push(val.path);
};

// 处理国际化
watchSwitchLang(() => {
	searchPool = computed(() => {
		const filterRoutes = filterRouters(router.getRoutes());
		return generateRoutes(filterRoutes);
	});
	initFuse(searchPool.value);
});
</script>

<style lang="scss" scoped>
.header-search {
	font-size: 0 !important;
	::v-deep .search-icon {
		cursor: pointer;
		font-size: 18px;
		vertical-align: middle;
	}
	.header-search-select {
		font-size: 18px;
		transition: width 0.2s;
		width: 0;
		overflow: hidden;
		background: transparent;
		border-radius: 0;
		display: inline-block;
		vertical-align: middle;

		::v-deep .el-input__inner {
			border-radius: 0;
			border: 0;
			padding-left: 0;
			padding-right: 0;
			box-shadow: none !important;
			border-bottom: 1px solid #d9d9d9;
			vertical-align: middle;
		}
	}
	&.show {
		.header-search-select {
			width: 210px;
			margin-left: 10px;
		}
	}
}
</style>
