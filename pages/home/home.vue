<template>
	<view>
		<!-- 头部 -->
		<view class="padding bg-gradual-pink top" :style="[{paddingTop:StatusBar+20+'px'}]">
			<!-- 搜索-->
			
			<view class="cu-bar search">
				<!-- <view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big114004.jpg);"></view> -->
				<view class="action"  @tap="toRegion">
					<text>{{ location.cityName }}</text>
					<text class="cuIcon-triangledownfill" style="font-size: 15px;margin-left: 2px;"></text>
				</view>
				<view class="search-form radius" @tap="toSearch">
					<text class="cuIcon-search"></text>
					<input :adjust-position="false" type="text" placeholder="搜索商品关键词" confirm-type="search"></input>
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
		<view :style="[{paddingTop:CustomBar+100+'px'}]">
			<view class="zaiui-swiper-box padding-tb-sm bg-white">
				<swiper class="screen-swiper square-dot" autoplay circular indicator-dots>
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<view class="padding-lr">
							<image :src="website.imgHome+item.imgPath" mode="widthFix"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="cu-list grid col-3 no-border margin-bottom-sm">
				<view class="cu-item" v-for="(item,index) in twoClass" :key="index" @tap="toShopList(item.id)">
					<view class="text-center">
						<image class="" :src="website.imgHome+item.cover" style="width: 100upx;height: 100upx;"></image>
					</view>
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
				<view v-for="(item,index) in shopList" :key="index" @tap="toShop(item.id)" >
					<view class="cu-card" >
						<view class="cu-item shadow" style="margin: 6px;">
							<view>
								<image :src="website.imgHome+item.cover" mode="aspectFill" style="height: 130px;"/>
							</view>
							<view class="padding-sm">
								<view class="text-bold text-lg margin-bottom-sm text-cut">{{ item.name }}</view>
								<view class="margin-bottom-sm text-grey text-light text-cut">{{ item.shopInfo }}</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-locationfill text-light">浏览过人数 {{ item.viewCount }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>	
			</view>
			<view class="text-gray text-light text-center margin-xl">
				<view class="cu-load load-cuIcon loading" v-if="isLoad">数据加载中，请稍后</view>
				<view class="" v-else @tap="loadRecommend(oneClass[TabCur].id)">点击加载更多</view>
			</view>
			
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import { getOneList, getTwoList, getRecommendList, index_swiper, getCity } from '@/api/content/home'
	import website from '@/config/website'
	export default {
		data() {
			return {
				website: website,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isLoad: true,
				loadText: "",
				TabCur: 0,
				scrollLeft: 0,
				cardCur: 0,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				oneClass:[],
				twoClass:[],
				shopList:[],
				location:{
					'cityCode': '110100',
					'title': '北京市'
				},
				size: 10,
				cur: 0,
			}
		},
		created() {
			var that = this;
			
			uni.getStorage({
			    key: 'region',
			    success: function (res) {
					that.location = res.data;
			    },
				fail: function(err){
					uni.getLocation({
						success: function (res) {
							var location = res.longitude+","+res.latitude
							getCity({location:location}).then(res => {
								uni.setStorage({
								    key: 'region',
								    data: res.data,
								    success: function () {
								        that.location = res.data;
								    }
								})
								
							})
						}
					})
				}
			});
			this.loadOneClass();
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
				this.cur = 0;
				this.shopList = [];
				this.TabCur = e.currentTarget.dataset.index;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				var id = e.currentTarget.dataset.id;
				
				this.loadTwoClass(id)
				this.loadRecommend(id)
				this.loadIndexSwiper(id)
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			toShop(id){
				uni.navigateTo({
					url:"/pages/home/shop?id="+id
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
			toShopList(twoId){
				var one_id = this.oneClass[this.TabCur].id
				uni.navigateTo({
					url:"/pages/home/shop-list?oneId="+one_id+"&twoId="+twoId
				})
			},
			loadOneClass(){
				var that = this;
				getOneList().then(res => {
					that.oneClass = res.data;
					that.loadTwoClass(res.data[0].id)
					that.loadRecommend(res.data[0].id)
					that.loadIndexSwiper(res.data[0].id)
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
				that.isLoad = true;
				var regionId = this.location.cityCode;
				regionId = regionId.substring(0,regionId.length-2)
				var size = this.size;
				this.cur = this.cur+1;
				getRecommendList(this.cur, size, {oneClassid:id,regionId:regionId}).then(res => {
					that.shopList = that.shopList.concat(res.data.records);
					that.isLoad = false
				}).catch(err => {
					console.log(err);
				})
			},
			loadIndexSwiper(id){
				var that = this;
				index_swiper({oneClassid:id}).then(res => {
					
					that.swiperList = res.data;
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
