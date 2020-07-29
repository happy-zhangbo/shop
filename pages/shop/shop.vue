<template>
	<view>
		<!-- 头部 -->
		<view class="padding bg-gradual-pink top" :style="[{paddingTop:StatusBar+20+'px'}]">
			<!-- 搜索-->
			<view class="cu-bar search" style="min-height: 0px;">
				<view class="search-form round" @tap="toSearch">
					<text class="cuIcon-search"></text>关键词搜索
					<!-- <input :adjust-position="false" type="text" placeholder="搜索" confirm-type="search" @tap="toSearch"></input> -->
				</view>
				<view class="action">
					<view @tap="toRegion">
						北京市<text class="cuIcon-unfold" style="font-size: 15px;margin-left: 2px;"></text>
					</view>
					
				</view>
			</view>
			<!-- 一级分类-->
			<!-- <scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item text-sm" :class="index==TabCur?'text-bold text-df cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
					一级分类
				</view>
			</scroll-view> -->
			<view class="zaiui-flex-tab margin-top-sm">
				<view class="flex text-white">
					<view class="basis-xxl">
						<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="scrollLeft">
							<block v-for="(item,index) in 10" :key="index">
								<view class="cu-item" :class="index==TabCur?'select':''" @tap="tabSelect" :data-id="index">
									<view class="text-light">一级分类</view>
									<view class="tab-dot bg-white"/>
								</view>
							</block>
						</scroll-view>
					</view>
					<view class="basis-xxs">
						<view class="sort-icon">
							<text class="cuIcon-sort"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view :style="[{paddingTop:CustomBar+68+'px'}]" class="bg-white">
			<scroll-view class="scroll-view_H" enable-flex scroll-x="true" @scroll="scroll" scroll-left="0">
				<view class="scroll-view-item_H margin text-light" v-for="(item,index) in 10" :key="index">
					<image class="cu-avatar round" src="../../static/1280602914-5d183529018fc_articlex.png" mode="aspectFill"></image>
					<view class="text-sm">二级分类{{ index }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="solid-bottom bg-white">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==SortTabCur?'text-red cur':''" v-for="(item,index) in 3" :key="index" @tap="sortTabSelect" :data-id="index">
						排序方式<text class="cuIcon-sort"></text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="">
			<view class="cu-card">
				<view class="cu-item padding-sm" v-for="(item,index) in 5" :key="index" @tap="toShop" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]">
					<view class="flex">
						<view class="basis-xs">
							<image class="cu-avatar round lg" src="../../static/logo.png" mode="aspectFill"></image>
						</view>
						<view class="basis-xl flex align-center">
							<view class="basis-xl">
								<view class="text-bold margin-bottom-sm">商铺名称商铺名称</view>
								<view class="margin-bottom-sm text-sm text-grey text-light">主营一行简介</view>
							</view>
							
							<view class="basis-sm text-sm text-center">
								<view class="cuIcon-locationfill text-light margin-bottom-sm">距离您2.3km</view>
								<button class="cu-btn bg-black sm">电话联系</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				TabCur: 0,
				scrollLeft: 0,
				SortTabCur: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			sortTabSelect(e){
				this.SortTabCur = e.currentTarget.dataset.id;
				//this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			toShop(){
				uni.navigateTo({
					url:"/pages/home/shop"
				})
			},
			toRegion(){
				uni.navigateTo({
					url:"/pages/home/region"
				})
			},
			toSearch(){
				uni.navigateTo({
					url:"/pages/home/search"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		position: fixed;
		width: 100%;
		clear:both;
		z-index: 9999;
	}
	.zaiui-flex-tab {
		position: relative;
		transition: opacity .25s;
		.flex {
			.basis-xxl {
				flex-basis: 90%;
				width: 90%;
				z-index: 1;
			}
			.basis-xxs {
				flex-basis: 10%;
				z-index: 1;
				width: 10%;
			}
			.sort-icon {
				font-size: 55rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
			}
		}
	}
	.nav.z .cu-item {
		height: 64rpx;
		line-height: 64rpx;
		position: relative;
	}
	.nav.z .cu-item.select {
		font-size: 30rpx;
		.tab-dot {
			position: absolute;
			height: 8rpx;
			border-radius: 20rpx;
			bottom: 0;
			left: 0;
			right: 0;
			width: 40rpx;
			margin: auto;
		}
	}
	.nav.z .cu-item.nf.select {
		font-size: inherit;
	}
	.nav.z .cu-item.cur {
		border-bottom: 0;
	}
	
	.zaiui-swiper-box {
		width: 100%;
		.screen-swiper {
			height: 230rpx;
			min-height: 230rpx;
			.swiper-padding {
				padding: 0 25rpx;
			}
		}
	}
	.zaiui-tab-list-title {
		.img-aau {
			width: 101.81rpx;
			margin-top: 12.72rpx;
		}
		.text-right {
			.img-aau {
				margin-right: 14.54rpx;
			}
		}
		.text-left {
			.img-aau {
				margin-left: 14.54rpx;
			}
		}
	}
	
	.scroll-view_H {
		white-space:nowrap;
		width: 100%;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 90upx;
		height: 90upx;
	}
	.scroll-view-item_H image{
		width: 100%;
		height: 100%;
	}
</style>
