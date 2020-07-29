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
		<view class="bg-img flex align-end" style="background-image: url('../../static/1280602914-5d183529018fc_articlex.png');height: 407upx;"></view>
		<view class="bg-white padding">
			<view class="text-bold text-xl margin-bottom-sm">商品名称商品名称商品名称商品名称商品名称</view>
			<view class="text-gray text-sm text-cut margin-bottom-sm">简介简介简介简介简介简介</view>
			<view class="text-red text-xl flex justify-between">
				<view><text class="text-sm">￥</text>64</view>
				<view>
					<button class="cu-btn round df bg-black">联系商家</button>
				</view>
			</view>
		</view>
		<view class="cu-bar solid-bottom bg-white margin-top-sm">
			<view class="action">
				<text class="cuIcon-title text-red"></text>服务
			</view>
		</view>
		<view class="bg-white padding text-light">
			上门安装、售后服务
		</view>
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
			<view class="flex margin-bottom-sm text-light" v-for="(item,index) in specs.slice(0, 3)" :key="index">
				<view class="basis-sm">名称{{ index }}</view>
				<view class="basis-sm text-red text-lg"><text class="text-sm">￥</text>123</view>
			</view>
			<view class="text-blue" @tap="show_specs">查看全部</view>
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
			<view class="text-center">
				图文内容
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
							<view class="basis-sm">名称{{ index }}</view>
							<view class="basis-sm text-red text-lg"><text class="text-sm">￥</text>123</view>
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
	export default {
		data() {
			return {
				showSpecsModel:false,
				specs:[
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称",
					"名称"
				]
			}
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
</style>
