<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action class="123">
			<uni-swipe-action-item v-for="(item,i) in cart" :key="i" :right-options="options"
				@click="swipeActionClickHandler(item)">
				<my-goods :item="item" :showRadio="true" @radio-change="radioChangeHandler"
					@num-change="numChangeHandle"></my-goods>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>

</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		computed: {
			...mapGetters('m_cart', ['total']),
			...mapState('m_cart', ['cart']),
		},
		onShow() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ""
			})
		},
		methods: {
			radioChangeHandler(goods) {
				this.updateGoods(goods);
			},
			numChangeHandle(goods) {
				this.updateGoods(goods);
			},
			swipeActionClickHandler(goods) {
				// console.log(goods);
				this.removeGoods(goods)
			},
			...mapMutations('m_cart', ['updateGoods', "removeGoods"])
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}

	.cart-container {
		padding-bottom: 50px;
	}
</style>