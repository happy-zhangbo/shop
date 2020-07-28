<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content"></block>
				<block slot="right">
					<view>
						<text class="cuIcon-dianhua padding-lr" style="font-size: 40upx;"></text>
						<text class="cuIcon-searchlist padding-lr" style="font-size: 50upx;"></text>
					</view>
					
				</block>
			</cu-custom>
		</view>
		<view class="bg-img flex align-end" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg');height: 407upx;">
			<view class="bg-shadeBottom padding padding-top-xl flex-sub">
				<view class="text-bold text-xl margin-bottom-sm">商铺名称商铺名称商铺名称商铺名称</view>
				<view class="text-df text-gray">公告：活动内容活动内容活动内容活动内容</view>
			</view>
		</view>
		<!-- <swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper> -->
		<scroll-view scroll-x class="bg-white nav padding-bottom-sm">
			<view class="cu-item" :class="index==tabTopCur?'text-red cur':''" v-for="(item,index) in tabTop" :key="index" @tap="tabTopSelect" :data-id="index">
				{{ item }}
			</view>
		</scroll-view>
		<view class="VerticalBox" v-if="tabTopCur == 0">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx);">
				<view class="cu-item" :class="index==typeTabCur?'text-red cur':''" v-for="(item,index) in listType" :key="index" @tap="TabSelect"
				 :data-id="index">
					商品分类{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in listType" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-red"></text> 分类标题</view>
					</view>
					
					<view class="cu-list">
						<view class="bg-white flex padding" v-for="(item,index) in 2" :key="index" @tap="toProduct">
							<view class="cu-avatar xl" style="border-radius: 10px;background-image:url(../../static/1280602914-5d183529018fc_articlex.png);"></view>
							<view class="margin-left">
								<view class="text-bold margin-bottom-sm">商品名称商品名称商品名称商品名称</view>
								<view class="text-gray text-sm text-cut margin-bottom-sm">简介简介简介简介简介简介</view>
								<view class="text-red text-xl flex justify-between">
									<view><text class="text-sm">￥</text>64</view>
									<view>
										<button class="cu-btn round sm bg-black">查看规格</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="tabTopCur == 1">
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="cuIcon-location text-black"></text>
						<text class="text-black text-light">北京市朝阳区九鼎建材市场</text>
						<view class="grid col-4 margin-top-sm">
							<view class="margin-lr">
								<image style="height: 100px;border-radius: 3px;" src="../../static/1280602914-5d183529018fc_articlex.png" mode="aspectFill"></image>
							</view>
							<view class="margin-lr">
								<image style="height: 100px;border-radius: 3px;" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="cuIcon-time text-black text-light"></text>
						<text class="text-black text-light">营业时间：09:00 ~ 22:00</text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabTop: ["商品","店铺信息"],
				tabTopCur: 0,
				scrollLeft: 0,
				listType: [],
				typeTabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
				list[i].id = i;
			}
			this.listType = list;
			this.listCur = list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			tabTopSelect(e){
				this.tabTopCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			TabSelect(e) {
				this.typeTabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.listType.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.listType[i].id);
						view.fields({
							size: true
						}, data => {
							this.listType[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.listType[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.listType.length; i++) {
					if (scrollTop > this.listType[i].top && scrollTop < this.listType[i].bottom) {
						this.verticalNavTop = (this.listType[i].id - 1) * 50
						this.typeTabCur = this.listType[i].id
						console.log(scrollTop)
						return false
					}
				}
			},
			toProduct(){
				uni.navigateTo({
					url:"/pages/home/product"
				})
			}
		},
	}
</script>

<style>
	.top{
		position: fixed;
		width: 100%;
		clear:both;
		z-index: 9999;
	}
	.fixed {
		position: fixed;
		z-index: 99;
	}
	
	.VerticalNav.nav {
		width: 160upx;
		font-size: 24upx;
		white-space: initial;
	}
	
	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}
	
	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}
	
	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}
	
	.VerticalBox {
		display: flex;
	}
	
	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
