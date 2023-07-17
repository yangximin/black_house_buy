<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-detail">
			<text v-if="goods_info.goods_price" class="goods-price">￥{{goods_info.goods_price}}</text>
			<view class="goods-info">
				<text class="goods-title">{{goods_info.goods_name}}</text>
				<view style="width: 1rpx; background-color: lightgray; height: 80rpx;" />
				<view class="goods_collect">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goods_delivery">快递-免运费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
        <view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" 
			:buttonGroup="buttonGroup" @buttonClick="buttonClick"></uni-goods-nav>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},
				options:[{
					icon:'shop',
					text:'店铺'
				},{
					icon:'cart',
					text:'购物车',
					info:2
				}],
				buttonGroup:[{
					text:'加入购物车',
					backgroundColor:'#ff0000',
					color:'#fff'
				},{
					text:'立即购买',
					backgroundColor:'#ffa200',
					color:'#fff'
				}]

			};
		},
		props: {
			goods_id: {
				type: String
			}
		},
		onLoad(options) {
			const goodsId = options.goods_id;
			this.getGoodsDetail(goodsId)
		},
		methods: {
			async getGoodsDetail(goodsId) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: goodsId
				});
				if (res.meta.status !== 200) return uni.$showMsg();
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g ,
					'<img style="display:block;"')
				this.goods_info = res.message;
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		overflow: hidden;
	}

	swiper {
		height: 750rpx;
	}

	.goods-detail {
		// overflow: hidden;
		// margin-top: 20rpx;

		padding: 20rpx;

		.goods-price {
			color: #C00;
			font-size: 26px;
		}

		.goods-info {
			display: flex;
			overflow: hidden;
			align-items: center;

			.goods-title {
				margin-right: 10rpx;
				font-size: 14px;
			}


			.goods_collect {
				width: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: gray;
			}
		}

		.goods_delivery {
			margin-top: 10rpx;
			color: gray;
			clear: both;
		}
	}
	.goods_nav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>