<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address)=== '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收获地址</button>
		</view>
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：<text>{{address.userName}}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话: <text>{{address.telNumber}}</text>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left2">
					<view class="row2-left">
						收货地址：
					</view>
					<view class="row2-right">
						{{addstr}}
					</view>
				</view>
			</view>

		</view>
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// address: {}
			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			chooseAddress() {
				// console.log(JSON.stringify(this.address));
				uni.chooseAddress({
					success: (succ) => {
						// if (error === null && succ.error === 'chooseAddress:ok') {
						// this.address = succ;
						this.updateAddress(succ)
						// }					
					}
				});

			}
		},
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr']),
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.btnChooseAddress {
			padding: 8rpx 40rpx;
			font-size: 16px;
		}

	}

	.address-info-box {
		padding: 10rpx 10rpx;

		.row1 {
			display: flex;
			justify-content: space-between;
		}

		.row2 {
			margin-top: 20rpx;

			.row2-left {
				flex-shrink: 0;
			}

			.row2-left2 {
				display: flex;
			}
		}
	}

	.address-border {
		height: 10rpx;
	}
</style>