<template>
	<el-dialog :title="$t('msg.excel.title')" :model-value="modelValue" @close="closed" width="30%">
		<el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')"></el-input>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
				<el-button type="primary" @click="onConfirm" :loading="loading">{{ $t('msg.excel.confirm') }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { dateFormat } from '@/filters';
import { getUserManageAllList } from '../../../api/user-manage';
import { ref, defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { watchSwitchLang } from '@/utils/i18n';
import { USER_RELATIONS } from './Export2ExcelConstants';

defineProps({
	modelValue: {
		type: Boolean,
		required: true,
	},
});
const emits = defineEmits(['update:modelValue']);
const i18n = useI18n();
let exportDefaultName = i18n.t('msg.excel.defaultName');
const excelName = ref('员工信息列表');
watchSwitchLang(() => {
	exportDefaultName = i18n.t('msg.excel.defaultName');
	excelName.value = exportDefaultName;
});

/**
 * 导出按钮点击事件
 */
const loading = ref(false);
const onConfirm = async () => {
	loading.value = true;
	// 数据
	const allUser = (await getUserManageAllList()).list;
	// 导入工具包
	const excel = await import('@/utils/Export2Excel');
	const data = formatJson(USER_RELATIONS, allUser);
	excel.export_json_to_excel({
		// excel 表头
		header: Object.keys(USER_RELATIONS),
		// excel 数据（二维数组结构）
		data,
		// 文件名称
		filename: excelName.value || exportDefaultName,
		// 是否自动列宽
		autoWidth: true,
		// 文件类型
		bookType: 'xlsx',
	});

	closed();
};
// 当我们使用export_json_to_excel的时候，我买快递的data数据，它必须是一个二维数组
const formatJson = (headers, rows) => {
	return rows.map(item => {
		return Object.keys(headers).map(key => {
			// 角色需要进行特殊处理
			if (headers[key] === 'role') {
				const roles = item[headers[key]];
				return JSON.stringify(roles.map(role => role.title));
			}
			// 时间特殊处理
			if (headers[key] === 'openTime') {
				return dateFormat(item[headers[key]]);
			}

			return item[headers[key]];
		});
	});
};

/**
 * 关闭
 */
const closed = () => {
	emits('update:modelValue', false);
};
</script>
