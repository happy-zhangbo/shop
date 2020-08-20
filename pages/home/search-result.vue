<template>
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">搜索结果</block>
		</cu-custom>
		
		<view class="cu-bar solid-bottom bg-white">
			<view class="action">
				<view class="flex justify-between">
					<view>搜索结果：<text class="text-red">{{ keyword }}</text></view>
				</view>
			</view>
		</view>
		<view class="cu-card" v-for="(item,index) in result" :key="index" @tap="toShop(item.id)">
			<view class="cu-item padding">
				<view class="flex">
					<view class="basis-xs">
						<image class="cu-avatar round lg" :src="website.imgHome+item.cover" mode="aspectFill"></image>
					</view>
					<view class="basis-xl padding-lr-sm">
						<view class="text-bold text-lg text-black margin-bottom-sm">{{ item.name }}</view>
						
						<view class="flex justify-between">
							<view class="margin-bottom-sm text-gray text-light">{{ item.shopInfo }}</view>
							<!-- <view class="text-gray text-sm">
								<text class="cuIcon-locationfill text-light">距离您2.3km</text>
							</view> -->
						</view>
						
					</view>
				</view>
				<view>
					<scroll-view class="scroll-view_H" enable-flex scroll-x="true" @scroll="scroll" scroll-left="0">
						<view class="scroll-view-item_H margin-sm text-light" v-for="(commodity,index) in item.commodityVOList" :key="index" :data-id="item.id" :data-cid="commodity.id" :data-typeid="commodity.categoriesId" @tap="toShopAndCommodity">
							<image :src="website.imgHome+commodity.cover" mode="aspectFill"></image>
							<view class="text-sm">
								<rich-text :nodes="commodity.title"></rich-text>
							</view>
							<view class="text-red text-df" style="font-weight: 700;">
								<text class="text-sm">￥</text>{{ commodity.specifList[0].price}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="text-center margin-top-xl text-gray">
			对不起，没有搜索到您想要的商品
		</view>
	</view>
</template>

<script>
	import { getSearchResult } from '@/api/content/home' 
	import website from '@/config/website'
	export default {
		data() {
			return {
				website: website,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				keyword:"",
				result:[]
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			var that = this;
			getSearchResult({keyword:e.keyword}).then(res => {
				that.keyword = e.keyword;
				that.result = res.data;
				uni.hideLoading()
			}).catch(err => {
				console.log("检索失败")
				uni.hideLoading()
			})
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			toShop(id){
				uni.navigateTo({
					url:"/pages/home/shop?id="+id
				})
			},
			toShopAndCommodity(e){
				var id = e.currentTarget.dataset.id;
				var cid = e.currentTarget.dataset.cid;
				var typeid = e.currentTarget.dataset.typeid;
				uni.navigateTo({
					url:"/pages/home/shop?id="+id+"&cid="+cid+"&typeid="+typeid
				})
			}
		}
	}
</script>

<style>
	em{
		color: red;
	}
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
