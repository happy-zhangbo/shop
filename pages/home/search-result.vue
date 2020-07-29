<template>
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">搜索结果</block>
		</cu-custom>
		
		<view class="cu-bar solid-bottom bg-white">
			<view class="action">
				<view class="flex justify-between">
					<view>搜索结果：<text class="text-red">电脑</text></view>
				</view>
			</view>
		</view>
		<view class="cu-card" v-for="(item,index) in 5" :key="index" @tap="toShop">
			<view class="cu-item padding">
				<view class="flex">
					<view class="basis-xs">
						<image class="cu-avatar round xl" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg" mode="aspectFill"></image>
					</view>
					<view class="basis-xl padding-lr-sm">
						<view class="text-bold text-lg text-black margin-bottom-sm">商铺名称商铺名称商铺名称商铺名称商铺名称</view>
						
						<view class="flex justify-between">
							<view class="margin-bottom-sm text-gray text-light">主营一行简介主营一...</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-locationfill text-light">距离您2.3km</text>
							</view>
						</view>
						
					</view>
				</view>
				<view>
					<scroll-view class="scroll-view_H" enable-flex scroll-x="true" @scroll="scroll" scroll-left="0">
						<view class="scroll-view-item_H margin-sm text-light" v-for="(item,index) in 5" :key="index"  @tap="toShop(1)">
							<image src="../../static/1280602914-5d183529018fc_articlex.png" mode="aspectFill"></image>
							<view class="text-sm">
								商品<text class="text-red">电脑</text></view>
							<view class="text-red text-df" style="font-weight: 700;">
								<text class="text-sm">￥</text>64
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			toShop(){
				uni.navigateTo({
					url:"/pages/home/shop"
				})
			},
		}
	}
</script>

<style>
	.scroll-view_H {
		white-space:nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 25%;
		height: 100%;
	}
	.scroll-view-item_H image{
		width: 100%;
		height: 180upx;
		border-radius: 5rpx;
	}
</style>
