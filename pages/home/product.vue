<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-while bg-shadeTop">
				<block slot="backText">返回</block>
				<block slot="content"></block>
				<block slot="right">
					<text class="cuIcon-dianhua padding-lr" style="font-size: 40upx;"></text>
				</block>
			</cu-custom>
		</view>
		<view class="bg-img flex align-end" style="background-image: url('../../static/1280602914-5d183529018fc_articlex.png');height: 407upx;"></view>
		<view class="bg-white padding">
			<view class="text-bold text-xl margin-bottom-sm">商品名称商品名称商品名称商品名称商品名称</view>
			<view class="text-gray text-sm text-cut margin-bottom-sm">简介简介简介简介简介简介</view>
			<view class="text-red text-xl flex justify-between">
				<view><text class="text-sm">￥</text>64</view>
				<view>
					<button class="cu-btn round sm bg-black">查看规格</button>
				</view>
			</view>
		</view>
		<view class="cu-bar solid-bottom bg-white margin-top-sm">
			<view class="action">
				<text class="cuIcon-title text-red"></text>服务</view>
		</view>
		<view class="bg-white padding text-light">
			上门安装、售后服务
		</view>
		<view class="cu-bar solid-bottom bg-white margin-top-sm">
			<view class="action">
				<text class="cuIcon-title text-red"></text>详情</view>
		</view>
		<view class="bg-white padding">
			<view class="grid col-2">
				<view class="text-light margin-bottom" v-for="(item,index) in 5" :key="index">
					<text class="text-gray margin-right-sm">详情{{ index }}</text>
					<text class="text-black">内容{{ index }}</text>
				</view>
			</view>
			<view class="text-center">
				图文内容
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
</style>
