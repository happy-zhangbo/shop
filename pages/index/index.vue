<template>
	<view>
		<!-- <basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin> -->
		<home v-if="PageCur=='home'"></home>
		<worker v-if="PageCur=='worker'"></worker>
		
		<view class="cu-bar tabbar bg-white shadow foot">
			<!-- <view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view> -->
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">材料</view>
			</view>
			<view class="action" @click="NavChange" data-cur="worker">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'worker'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='worker'?'text-green':'text-gray'">工人</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home'
			}
		},
		onLoad(e) {
			if(undefined !== e.index){
				this.PageCur = e.index;
			}	
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
