<template>
	<block>
		<view class="goods-img">
			<image :src="item.goods_small_logo||defaultPic"></image>
		</view>
		<view class="goods-content">
			<text class="goods-title">{{item.goods_name}}</text>
			<text class="goods-price">￥{{item.goods_price|tofixed}}</text>
		</view>
	</block>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props: {
			item: {
				type: Object,
				default: {}
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-img {
		width: 200rpx;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.goods-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		width: 100%;

		.goods-title {
			font-size: 13px;
		}

		.goods-price {
			font-size: 16px;
			color: #c00;
		}
	}
</style>