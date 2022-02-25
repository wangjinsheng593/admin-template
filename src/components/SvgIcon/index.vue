<template>
	<!-- 展示外部图标 -->
	<div v-if="isExternal" :style="styleExternalIcon" :class="className" class="svg-external-icon svg-icon"></div>
	<!-- 展示内部部图标 -->
	<svg class="svg-icon" :class="className" aria-hidden="true" v-else>
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate';
import { computed, defineProps } from 'vue';
const props = defineProps({
	// icon 图标
	icon: {
		type: String,
		required: true,
	},
	// 图标类名
	className: {
		type: String,
		default: '',
	},
});
/**
 *判断是否为外部图标
 */
const isExternal = computed(() => external(props.icon));
/** *
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
	mask: `url(${props.icon}) no-repeat 50% 50%`,
	'-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
}));
/** *
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style lang="scss" scope>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
.svg-external-icon {
	background-color: currentColor;
	mask-size: cover !important;
	display: inline-block;
}
</style>
