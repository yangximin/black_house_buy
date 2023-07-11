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

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
			};
		},
		onLoad() {
			this.getSwiperList()
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
					uni.$showMsg({
						title: "请求成功",
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper-view {
		height: 330rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;

		}
	}
</style>