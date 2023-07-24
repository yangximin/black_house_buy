<template>
	<view class="my-settle-container">
		<label class="radio">
			<radio color="#C00000" :checked="allCheck" @click="handleAllClick" /><text>全选</text>
		</label>

		<view class="amount-box">
			合计 <text class="amount">￥{{totalPrice}}</text>
		</view>
		<view class="btn-settle">
			结算({{checkCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('m_cart', ['checkCount', 'allCheck', 'totalPrice'])
		},
		methods: {
			...mapMutations('m_cart', ['handleAllCheck']),
			handleAllClick(e) {
				this.handleAllCheck(!this.allCheck);
			}
		}

	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 0 0 20rpx;
		align-items: center;
		border-top: 1px solid lightgray;
		box-sizing: border-box;
		z-index: 999;

		.amount-box {
			text {
				color: #c00;
			}
		}

		.btn-settle {
			width: 200rpx;
			height: 100%;
			background-color: #c00;
			text-align: center;
			line-height: 50px;
			color: #fff;
		}

	}
</style>