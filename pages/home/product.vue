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
		<view class="bg-img flex align-end" :style="{backgroundImage:'url('+website.imgHome+commdity.cover+')'}" style="height: 407upx;"></view>
		
		<view class="bg-white padding">
			<view class="text-bold text-xl margin-bottom-sm">{{ commdity.title }}</view>
			<view class="text-gray text-sm text-cut margin-bottom-sm">{{ commdity.desc }}</view>
			<view class="text-red text-xl flex justify-between">
				<view><text class="text-sm">￥</text>{{ commdity.specifList != null?commdity.specifList[0].price:0 }}</view>
				<view>
					<button class="cu-btn round df bg-black">联系商家</button>
				</view>
			</view>
		</view>
		<!-- <view class="cu-bar solid-bottom bg-white margin-top-sm">
			<view class="action">
				<text class="cuIcon-title text-red"></text>服务
			</view>
		</view>
		<view class="bg-white padding text-light">
			上门安装、售后服务
		</view> -->
		<view class="cu-bar solid-bottom bg-white margin-top-sm">
			<view class="action">
				<text class="cuIcon-title text-red"></text>规格
			</view>
		</view>
		<view class="bg-white padding">
			<view class="flex margin-bottom-sm text-bold">
				<view class="basis-sm">规格名称</view>
				<view class="basis-sm">价格</view>
			</view>
			<view class="flex margin-bottom-sm text-light" v-for="(item,index) in specsList" :key="index">
				<view class="basis-sm">{{ item.title }}</view>
				<view class="basis-sm text-red text-lg"><text class="text-sm">￥</text>{{ item.price }}</view>
			</view>
			<view class="text-blue" @tap="show_specs" v-if="showMore">查看全部</view>
		</view>
		
		<view class="cu-bar solid-bottom bg-white margin-top-sm">
			<view class="action">
				<text class="cuIcon-title text-red"></text>详情
			</view>
		</view>
		<view class="bg-white padding">
			<!-- <view class="grid col-2">
				<view class="text-light margin-bottom" v-for="(item,index) in 5" :key="index">
					<text class="text-gray margin-right-sm">详情{{ index }}</text>
					<text class="text-black">内容{{ index }}</text>
				</view>
			</view> -->
			<view>
				<rich-text :nodes="commdity.content" class="content"></rich-text>
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
						<view class="flex margin-bottom-sm text-light" v-for="(item,index) in commdity.specifList" :key="index">
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
	import { commdity } from '@/api/content/home'
	import website from '@/config/website'
	export default {
		data() {
			return {
				website: website,
				showSpecsModel:false,
				specs:[
					"名称",
					"名称",
					"名称"
				],
				commdity:{
					cover:"timg.gif"
				},
			}
		},
		onLoad(e) {
			var that = this;
			commdity(e.id).then(res => {
				console.log(res);
				that.commdity = res.data;
			}).catch(err => {
				console.log(err)
			})
		},
		computed: {
			specsList(){
				if(this.commdity.specifList != undefined){
					var list = this.commdity.specifList.length > 3 ? this.commdity.specifList.slice(0,3):this.commdity.specifList
					return list
				}
			},
			showMore(){
				if(this.commdity.specifList != undefined){
					return this.commdity.specifList.length > 3
				}
			},
			
		},
		methods: {
			show_specs(){
				this.showSpecsModel = true;
			},
			hideModal(){
				this.showSpecsModel = false;
			}
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
	.content image{
		width: 100%;
	}
</style>
