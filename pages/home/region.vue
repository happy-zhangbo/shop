<template>
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">索引</block>
		</cu-custom>
		<city-select
			@cityClick="cityClick"
			:formatName="formatName"
			:activeCity="activeCity"
			:hotCity="hotCity"
			:obtainCitys="obtainCitys"
			:isSearch="true"
			ref="citys"
		></city-select>
	</view>
</template>

<script>
	import citys from './citys.js'
	import citySelect from "@/components/city-select/city-select.vue"
	export default {
		components: {citySelect},
		data() {
			return {
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'title',
				//当前城市
				activeCity: {
					id: 110100,
					title: '南京市'
				},
				//热门城市
				hotCity: [],
				//显示的城市数据
				obtainCitys: [
					{
						id: 0,
						title: '南京'
					},
					{
						id: 1,
						title: '北京'
					},
					{
						id: 2,
						title: '天津'
					},
					{
						id: 3,
						title: '东京'
					}
				]
			}
		},
		onLoad() {
			this.obtainCitys = citys
		},
		methods: {
			cityClick(item) {
				uni.showToast({
					icon: 'none',
					title: 'item: ' + JSON.stringify(item),
					// #ifdef MP-WEIXIN
					duration: 3000,
					// #endif
					mask: true
				})
			}
		}
	}
</script>

<style>

</style>
