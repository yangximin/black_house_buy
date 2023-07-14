<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" :cancel-button="none"></uni-search-bar>
		</view>
		<view v-if="searchResults.length!=0" class="search-result">
			<navigator class="search-item" v-for="(item,index) in searchResults" :key="index"
				:url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
				<text>
					{{item.goods_name}}
				</text>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</navigator>
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<text class="history-tag" v-for="(item,i) in showHistoryList" :key="i"
					@click="gotoGoodsList(item)">{{item}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchResults: [],
				historyList: JSON.parse(uni.getStorageSync("search-history")) || []

			};
		},
		methods: {
			input(e) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.kw = e;
					this.getSearchList();
				}, 500);
			},
			async getSearchList() {
				if (this.kw === '') {
					this.searchResults = [];
					return;
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message;
				this.saveSearchHistory()
			},
			saveSearchHistory() {
				const set = new Set(this.historyList);
				set.delete(this.kw);
				set.add(this.kw);
				this.historyList = Array.from(set);
				uni.setStorageSync("search-history", JSON.stringify(this.historyList))
			},
			clearHistory() {
				this.historyList = [];
				uni.setStorageSync("search-history", '')
			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item,
				})
			}
		},
		computed: {
			showHistoryList() {
				return [...this.historyList].reverse();
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
		background-color: #C00000;
	}

	uni-search-bar {
		flex-direction: row;
		position: relative;
	}

	.search-item {
		line-height: 100rpx;
		color: #2b2b2b;
		width: 100%;
		height: 100rpx;
		font-size: 28rpx;
		display: flex;
		padding: 0 20rpx;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;

		text {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}

	.history-box {
		padding: 20rpx;

		.history-title {}

		.history-list {

			margin: 40rpx 0 0 0;

			.history-tag {
				padding: 10rpx 50rpx;
				background-color: #ccc;
				border-radius: 50px;
				margin-right: 20rpx;
			}
		}
	}
</style>