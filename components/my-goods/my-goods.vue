<template>
	<view class="goods-item">
		<label class="radio">
			<radio :checked="item.goods_state" v-if="showRadio" color="#C00" @click="radioClick" />
		</label>
		<view class="goods-img">
			<image :src="item.goods_small_logo||defaultPic"></image>
		</view>
		<view class="goods-content">
			<text class="goods-title">{{item.goods_name}}</text>
			<view class="goods-bottom">
				<text class="goods-price">￥{{item.goods_price|tofixed}}</text>
				<uni-number-box v-if="showRadio" :min="1" :value="item.goods_count" @change="changeNum">

				</uni-number-box>
			</view>
		</view>
	</view>
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
			},
			showRadio: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClick() {
				this.$emit('radio-change', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state,
				})
			},
			changeNum(e) {
				// console.log(e);
				this.$emit('num-change', {
					goods_id: this.item.goods_id,
					goods_count: e
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		height: 240rpx;
		margin: 20rpx;
		padding: 20rpx 0;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
	}

	.goods-img {
		width: 200rpx;
		margin-right: 20rpx;
		height: 100%;
		flex-shrink: 0;
	}

	.goods-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		height: 100%;
		width: 100%;

		.goods-bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.goods-price {
				font-size: 16px;
				color: #c00;
			}
		}

		.goods-title {
			font-size: 13px;
		}


	}
</style>