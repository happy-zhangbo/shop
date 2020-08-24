<template>
	<view>
		<!-- 头部 -->
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">{{ oneName }}</block>
			<block slot="right">
				<!-- <view @tap="toRegion" class="padding-lr">
					{{ location.title }}<text class="cuIcon-unfold" style="font-size: 15px;margin-left: 2px;"></text>
				</view> -->
			</block>
		</cu-custom>
		<view>
		<view class="bg-white">
			<scroll-view class="scroll-view_H" enable-flex scroll-x="true" @scroll="scroll" scroll-left="0">
				<view class="scroll-view-item_H margin text-light" v-for="(item,index) in twoClass" :key="index" @tap="tabSelect" :data-id="index">
					<image class="cu-avatar round margin-bottom-sm" :src="website.imgHome+item.cover" mode="aspectFill"></image>
					<view class="text-sm text-center" :class="TabCur==index?'text-bold text-red':''">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="solid-bottom bg-white fixed">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==SortTabCur?'text-red cur':''" v-for="(item,index) in sortList" :key="index" @tap="sortTabSelect" :data-id="index">
						{{ item }}<text class="cuIcon-sort"></text>
					</view>
				</view>
			</scroll-view>
		</view>
		</view>
		<view class="">
			<view class="cu-card">
				<view class="cu-item padding-sm" v-for="(item,index) in shopList" :key="index" @tap="toShop(item.id)" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]">
					<view class="flex align-center">
						<view class="flex-sub padding-lr-sm">
							<image class="cu-avatar round xl" :src="website.imgHome+item.cover" mode="aspectFill"></image>
						</view>
						<view class="flex-treble">
							<view class="text-bold margin-bottom-sm text-cut" style="width: 350upx;">{{ item.name }}</view>
							<view class="margin-bottom-sm text-sm text-grey text-light">{{ item.shopInfo }}</view>
							<view class="text-sm text-grey text-light">浏览人数：{{ item.viewCount }}</view>
						</view>
						<view class="flex-treble text-right">
							<block  v-if="SortTabCur == 1">
								<view class="cuIcon-locationfill text-light margin-bottom-sm">{{ item.distance.substr(0,1) === '.'?'0'+item.distance:item.distance }}</view>
							</block>
							<button class="cu-btn bg-black sm">电话联系</button>
						</view>
					</view>
				</view>
			</view>
			<view class="text-gray text-light text-center margin-xl" v-if="shopList.length > 0">
				<view class="cu-load load-cuIcon loading" v-show="isLoad">数据加载中，请稍后</view>
				<view class="" v-show="!isLoad" @tap="SortTabCur == 1?loadNearbyList(twoClass[TabCur].id):loadViewCountList(twoClass[TabCur].id)">点击加载更多</view>
			</view>
		</view>
		<view class="margin-top-xl text-gray text-center text-light"  v-if="shopList.length <= 0">
			<view class="">您所在的地区或者当前分类下</view>
			<view class="">暂时还没有商户入驻</view>
			<view class="">欢迎致电<text class="text-red"> 18010091016 </text>咨询</view>
		</view>
	</view>
</template>

<script>
	import { getTwoList, getNearbyList, getViewCountShop } from '@/api/content/home'
	import website from '@/config/website'
	export default {
		data() {
			return {
				website: website,
				sortList:[
					"浏览量",
				],
				twoClass:[],
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				TabCur: 0,
				isLoad: true,
				scrollLeft: 0,
				SortTabCur: 0,
				scrollTop: 0,
				shopList:[],
				old: {
					scrollTop: 0
				},
				location:{
					'id': '110100',
					'title': '北京市'
				},
				size: 10,
				cur: 0,
				oneName: ""
			}
		},
		onLoad(e){
			var that = this;
			// #ifndef H5
				that.sortList.push("附近商铺")
			// #endif
			
			uni.getStorage({
			    key: 'region',
			    success: function (res) {
					that.location = res.data;
			    }
			});
			that.oneName = e.oneName;
			that.loadTwoClass(e.oneId,e.twoId);
			
			
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.cur = 0;
				this.shopList = [];
				if(this.SortTabCur == 0){
					this.loadViewCountList(this.twoClass[this.TabCur].id)
				}else{
					// #ifndef H5
					this.loadNearbyList(this.twoClass[this.TabCur].id);
					// #endif
				}
				
				
			},
			sortTabSelect(e){
				this.SortTabCur = e.currentTarget.dataset.id;
				this.cur = 0;
				this.shopList = [];
				if(this.SortTabCur == 0){
					this.loadViewCountList(this.twoClass[this.TabCur].id)
				}else{
					// #ifndef H5
					this.loadNearbyList(this.twoClass[this.TabCur].id);
					// #endif
				}
				//this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
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
			loadTwoClass(id,twoId){
				var that = this;
				getTwoList({oneClassid:id}).then(res => {
					that.twoClass = res.data;
					that.twoClass.forEach(function(item,index){
						if(item.id == twoId){
							that.TabCur = index;
						}
					});
					that.cur = 0;
					that.shopList = []
					if(this.SortTabCur == 0){
						that.loadViewCountList(twoId)
					}else{
						// #ifndef H5
						that.loadNearbyList(twoId)
						// #endif
					}
					
				}).catch(err => {
					console.log(err);
				})
			},
			loadViewCountList(twoid){
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				var that = this;
				that.isLoad = true;
				var regionId = this.location.cityCode;
				regionId = regionId.substring(0,regionId.length-2)
				var params = {twoClassid: twoid,regionId:regionId}
				var size = that.size;
				that.cur = that.cur+1;
				getViewCountShop(that.cur, size, params).then(res => {
					that.shopList = that.shopList.concat(res.data.records);
					that.isLoad = false
					uni.hideLoading()
				}).catch(err => {
					console.log(err);
				})
			},
			loadNearbyList(twoid){
				var that = this;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				uni.getLocation({
					success: function (res) {
						var params = { location: res.longitude+","+res.latitude, twoClassid: twoid}
						var size = that.size;
						that.cur = that.cur+1;
						that.isLoad = true;
						getNearbyList(that.cur, size, params).then(res => {
							that.shopList = that.shopList.concat(res.data.records);
							that.isLoad = false
							uni.hideLoading()
						}).catch(err => {
							console.log(err);
						})
					}
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
