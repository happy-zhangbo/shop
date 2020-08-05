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
							<block v-for="(item,index) in oneClass" :key="index">
								<view class="cu-item" :class="index==TabCur?'select':''" @tap="tabSelect" :data-index="index" :data-id="item.id">
									<view class="text-light">{{ item.name }}</view>
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
			<view class="zaiui-swiper-box padding-tb-sm bg-white">
				<swiper class="screen-swiper square-dot" autoplay circular indicator-dots>
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<view class="padding-lr">
							<image :src="item.url" mode="widthFix"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="cu-list grid col-3 no-border margin-bottom-sm">
				<view class="cu-item" v-for="(item,index) in twoClass" :key="index">
					<view class="cuIcon-cardboardfill text-black"></view>
					<text class="text-light">{{ item.name }}</text>
				</view>
			</view>
			<!--标题-->
			<view class="margin-bottom-sm zaiui-tab-list-title">
				<view class="flex flex-wrap">
					<view class="basis-sm text-right">
						<image class="img-aau" src="/static/aau.png" lazy-load mode="widthFix"/>
					</view>
					<view class="basis-xs text-center">
						<text class="text-black text-xl text-bold">推荐商铺</text>
					</view>
					<view class="basis-sm text-left">
						<image class="img-aau" src="/static/aau.png" lazy-load mode="widthFix"/>
					</view>
				</view>
			</view>
			<view class="margin-top-xl text-light"  v-if="shopList.length <= 0">
				<view class="text-center">暂时还没有商铺加盟</view>
				<view class="text-center">欢迎致电<text class="text-red">18010091016</text>咨询</view>
			</view>
			<view class="grid col-2">	
				<view v-for="(item,index) in shopList" :key="index" @tap="toShop" >
					<view class="cu-card" >
						<view class="cu-item shadow" style="margin: 6px;">
							<view>
								<image :src="imgHome+item.cover" mode="aspectFill" style="height: 130px;"/>
							</view>
							<view class="padding-sm">
								<view class="text-bold text-lg margin-bottom-sm text-cut">{{ item.name }}</view>
								<view class="margin-bottom-sm text-grey text-light text-cut">{{ item.shopInfo }}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-light">距离您2.3km</text>
								</view>
							</view>
						</view>
					</view>
				</view>	
			</view>
			<view class="text-gray text-light text-center margin-xl">
				<view class="cu-load load-cuIcon" :class="!isLoad?'loading':'over'" >数据加载中，请稍后</view>
			</view>
			
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import { getOneList, getTwoList, getRecommendList } from '@/api/content/home'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isLoad: true,
				loadText: "",
				TabCur: 0,
				scrollLeft: 0,
				cardCur: 0,
				imgHome:"http://image.lonelysky.com.cn/",
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
				oneClass:[],
				twoClass:[],
				shopList:[]
			}
		},
		created() {
			this.loadOneClass();
		},
		onReachBottom() {
			console.log(123)
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
				this.TabCur = e.currentTarget.dataset.index;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				var id = e.currentTarget.dataset.id;
				
				this.loadTwoClass(id)
				this.loadRecommend(id)
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
			},
			toSearch(){
				uni.navigateTo({
					url:"/pages/home/search"
				})
			},
			loadOneClass(){
				var that = this;
				getOneList().then(res => {
					that.oneClass = res.data;
					that.loadTwoClass(res.data[0].id)
					that.loadRecommend(res.data[0].id)
				}).catch(err => {
					console.log(err);
				})
			},
			loadTwoClass(id){
				var that = this;
				getTwoList({oneClassid:id}).then(res => {
					that.twoClass = res.data;
				}).catch(err => {
					console.log(err);
				})
			},
			loadRecommend(id){
				var that = this;
				that.isLoad = true
				getRecommendList({oneClassid:id}).then(res => {
					that.shopList = res.data.records;
					that.isLoad = false
				}).catch(err => {
					console.log(err);
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
