<template>
	<view>
		<swiper class="swiper-view" :indicator-dots="true" autoplay="true" interval="3000" duration="1000"
			circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>

			</swiper-item>
		</swiper>
		<view class="nav-view">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navItemClick(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor-view">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">

				<view class="floor-title">
					<image :src="item.floor_title.image_src"></image>
				</view>
				<view class="floor-content">
					<navigator class="floor-content-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="floor-content-right">
						<navigator class="floor_content-right-item" v-for="(item,index) in item.product_list" :key="index" :url="item.url"
							v-if="index!=0">
							<image :src="item.image_src" :style="{width:item.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
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
				swiperList: [],
				navList: [],
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status != 200) {
					uni.$showMsg()
				} else {
					this.swiperList = res.message
					// uni.$showMsg({
					// 	title: "请求成功",
					// })
				}
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/catitems")
				if (res.meta.status !== 200) return uni.$showMsg();
				this.navList = res.message;
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/home/floordata")
				if (res.meta.status !== 200) return uni.$showMsg();
				res.message.forEach(item => {
					item.product_list.forEach(subItem=>{
						subItem.url = '/subpkg/goods_list/goods_list?' + subItem.navigator_url.split('?')[1];
					});
				});
				this.floorList = res.message;
			},
			navItemClick(item) {
				if (item.name === "分类") {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		height: 100%;
	}

	.swiper-view {
		height: 330rpx;


		.swiper-item {
			height: 100%;
			width: 100%;

		}
	}

	.nav-view {
		display: flex;
		margin: 20rpx 0rpx;
		justify-content: space-around;

		// align-items: center;
		.nav-item {

			image {
				width: 128rpx;
				height: 140rpx;
			}

			text {}
		}
	}


	.floor-title {
		width: 100%;
		height: 60rpx;
	}

	.floor-content {
		display: flex;
		padding-left: 10rpx;
	}

	.floor-content-right {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	// .floor-content {
	// 	display: flex;

	// 	.floor-content-left {
	// 		height: 466rpx;
	// 		width: 433rpx;
	// 		width: 33.33%;
	// 		background-color: red;
	// 		margin-right: 10rpx;

	// 		image {
	// 			width: 100%;
	// 			height: 100%;
	// 		}
	// 	}

	// 	.floor-content-right {
	// 		display: flex;
	// 		flex-wrap: wrap;
	// 		justify-content: space-between;
	// 		width: 66.66%;

	// 		.floor_content-right-item {
	// 			width: 49%;
	// 			height: 49%;

	// 			image {
	// 				width: 100%;
	// 				height: 100%;
	// 			}
	// 		}
	// 	}
	// }
</style>