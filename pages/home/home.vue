<template>
	<view>
		<!-- 头部 -->
		<view class="padding bg-gradual-pink top" :style="[{paddingTop:StatusBar+20+'px'}]">
			<!-- 搜索-->
			<view class="cu-bar search" style="min-height: 0px;">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input :adjust-position="false" type="text" placeholder="搜索" confirm-type="search"></input>
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
		<!-- 轮播 -->
		<view :style="[{paddingTop:CustomBar+68+'px'}]">
			<view class="zaiui-swiper-box padding-tb bg-white">
				<swiper class="screen-swiper square-dot" autoplay circular indicator-dots>
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<view class="padding-lr">
							<image :src="item.url" mode="widthFix"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="cu-list grid col-5 no-border margin-bottom-sm">
				<view class="cu-item" v-for="(item,index) in 10" :key="index">
					<view class="cuIcon-cardboardfill text-black"></view>
					<text class="text-light">二级分类</text>
				</view>
			</view>
			<!--标题-->
			<view class="margin-bottom-sm zaiui-tab-list-title">
				<view class="flex flex-wrap">
					<view class="basis-sm text-right">
						<image class="img-aau" src="/static/aau.png" lazy-load mode="widthFix"/>
					</view>
					<view class="basis-xs text-center">
						<text class="text-black text-xl text-bold">为您推荐</text>
					</view>
					<view class="basis-sm text-left">
						<image class="img-aau" src="/static/aau.png" lazy-load mode="widthFix"/>
					</view>
				</view>
			</view>
			<view class="grid col-2">
				<view v-for="(item,index) in 5" :key="index" @tap="toShop">
					<view class="cu-card">
						<view class="cu-item shadow" style="margin: 6px;">
							<view>
								<image :src="swiperList[index].url" mode="aspectFill" style="height: 130px;"/>
							</view>
							<view class="padding-sm">
								<view class="text-bold margin-bottom-sm">商铺名称商铺名称商铺名称商铺名称</view>
								<view class="margin-bottom-sm text-grey text-light">主营一行简介</view>
								<view class="text-gray">
									<text class="cuIcon-locationfill text-sm text-light">距离您2.3km</text>
								</view>
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
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
			}
		},
		created() {
			
		},
		methods: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
</style>
