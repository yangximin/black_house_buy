<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="gotoSearch($event)">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>

	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 40
			}
		},
		data() {
			return {

			};
		},
		methods: {
			gotoSearch(event) { //xml中不加括号则
				// console.log(event)
				this.$emit('my-click')
			}
		}

	}
</script>

<style lang="scss">
	.my-search-container {
		// background-color: #c00000;
		overflow: hidden;
		height: 50px;
		display: flex;
		align-items: center;

		.my-search-box {
			background-color: white;
			// border-radius: 40rpx;
			height: 36px;
			width: 100%;
			margin: 0 20rpx;
			line-height: 36px;
			text-align: center;
		}
	}
</style>