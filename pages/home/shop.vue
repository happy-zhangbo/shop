<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content"></block>
				<block slot="right">
					<view>
						<text class="cuIcon-dianhua padding-lr" style="font-size: 40upx;"></text>
						<!-- <text class="cuIcon-forwardfill padding-lr" style="font-size: 50upx;"></text> -->
					</view>
				</block>
			</cu-custom>
		</view>
		<view class="bg-img flex align-end" style="height: 407upx;" :style="{backgroundImage:'url('+imgHome+shopInfo.cover+')'}">
			<view class="bg-shadeBottom padding padding-top-xl flex-sub">
				<view class="flex justify-between align-end" style="margin-bottom: 10upx;">
					<view class="basis-xl">
						<view class="text-bold text-xl">{{ shopInfo.name }}</view>
						<view class="flex align-center">
							<text class='cu-tag radius bg-red sm'>公告</text>
							<text class="margin-left-sm">{{ shopInfo.announcement }}</text>
						</view>
					</view>
				</view>
				<view class="text-df">{{ shopInfo.shopInfo }}{{ shopInfo.shopInfo }}</view>
				
				
				
				
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
		<view class="VerticalBox padding-bottom-sm" v-if="tabTopCur == 0">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx);">
				<view class="cu-item" :class="index==typeTabCur?'text-red cur':''" v-for="(item,index) in listType" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in listType" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-red"></text> {{ item.name }}</view>
					</view>
					
					<view class="cu-list">
						<view class="bg-white padding" v-if="item.commodityVOList.length <= 0">
							<view class="text-light text-center text-sm text-gray">
								这个分类下没有商品
							</view>
						</view>
						<view class="bg-white flex padding" v-for="(item,index) in item.commodityVOList" :key="index" @tap="toProduct(item.id)">
							<view class="cu-avatar xl" :style="{backgroundImage:'url('+imgHome+item.cover+')'}" style="border-radius: 5px; width: 50%;"></view>
							<view class="margin-left" style="width: 100%;">
								<view class="text-bold margin-bottom-sm">{{ item.title }}</view>
								<view class="text-gray text-sm margin-bottom-sm">{{ item.desc }}</view>
								<view class="text-red text-xl flex justify-between">
									<view><text class="text-sm">￥</text>{{ item.specifList[0].price }}</view>
									<view>
										<button class="cu-btn round sm bg-black" @tap.stop="show_specs(item.specifList)">查看规格</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="tabTopCur == 1">
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-location text-black"></text>
						<text class="text-black text-light">{{ shopInfo.address }}</text>
						<view class="grid col-4 margin-top-sm">
							<view class="margin-lr-sm" v-for="(item,index) in shopCoverArrayImg" :key="index">
								<image style="height: 100px;border-radius: 3px;" :src="imgHome+item" mode="aspectFit"></image>
							</view>

						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-time text-black text-light"></text>
						<text class="text-black text-light">店铺公告：{{ shopInfo.announcement}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-time text-black text-light"></text>
						<text class="text-black text-light">店铺介绍：{{ shopInfo.shopInfo}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-time text-black text-light"></text>
						<text class="text-black text-light">营业时间：{{ shopInfo.openingHours}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-dianhua text-black text-light"></text>
						<text class="text-black text-light">联系方式：{{ shopInfo.contactInfo}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showSpecsModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">所有规格</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-tb-sm bg-white">
					<view class="flex margin-bottom-sm text-bold">
						<view class="basis-sm">规格名称</view>
						<view class="basis-sm">价格</view>
					</view>
					<scroll-view scroll-y="true" style="height: 300px;">
						<view class="flex margin-bottom-sm text-light" v-for="(item,index) in specs" :key="index">
							<view class="basis-sm">{{ item.title }}</view>
							<view class="basis-sm text-red text-lg"><text class="text-sm">￥</text>{{ item.price }}</view>
						</view>
					</scroll-view>
				</view>
				<!-- <view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-black solid-left" @tap="hideModal">关闭</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { inShop } from "@/api/content/home"
	export default {
		data() {
			return {
				tabTop: ["商品","店铺信息"],
				tabTopCur: 0,
				scrollLeft: 0,
				listType: [],
				typeTabCur: 0,
				shopInfo:{},
				mainCur: 0,
				imgHome:"http://image.lonelysky.com.cn/",
				verticalNavTop: 0,
				load: true,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				showSpecsModel:false,
				specs:[
					"名称",
					"名称",
					"名称",
					"名称"
				]
			}
		},
		
		onLoad(e) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			var that = this;
			inShop(e.id).then(res =>{
				console.log(res);
				that.shopInfo = res.data;
				that.listType = res.data.categoriesVOList;
			}).catch(err => {
				console.log(err);
			})
			
			
			// let list = [{}];
			// for (let i = 0; i < 26; i++) {
			// 	list[i] = {};
			// 	list[i].name = String.fromCharCode(65 + i);
			// 	list[i].id = i;
			// }
			// this.listType = list;
			//this.listCur = list[10];
		},
		onReady() {
			uni.hideLoading()
		},
		computed:{
			shopCoverArrayImg(){
				var list = this.shopInfo.coverArray.split(",")
				return list
			}
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
						let view = uni.createSelectorQuery().select("#main-" + i);
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
						return false
					}
				}
			},
			toProduct(id){
				uni.navigateTo({
					url:"/pages/home/product?id="+id
				})
			},
			show_specs(specsArray){
				this.specs = specsArray
				this.showSpecsModel = true;
			},
			hideModal(){
				this.showSpecsModel = false;
			},
			
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
