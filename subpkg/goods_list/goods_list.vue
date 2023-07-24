<template>
	<view class="goods-list">
		<view @click="gotodetail(item)" v-for="(item,index) in goodsList" :key="index">
			<my-goods :item="item" :showRadio="false"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					cid: '',
					query: '',
					pagenum: 1,
					pagesize: 10,
				},
				goodsList: [],
				total: 0,
				isLoading: false,
			};
		},
		onLoad(options) {
			// console.log(options);
			this.queryObj.cid = options.cid || '';
			this.queryObj.query = options.query || '';
			this.getGoodsList();
		},
		methods: {
			async getGoodsList(cb) {
				const {
					pagenum: page,
					pagesize: pageSize
				} = this.queryObj;
				if (page != 1 && page * pageSize >= this.total) {
					uni.$showMsg({
						title: '我是有底线的~'
					})
					return;
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)

				if (res.meta.status !== 200) return uni.$showMsg();
				if (this.queryObj.pagenum == 1) {
					this.goodsList = res.message.goods;
				} else {
					this.goodsList.push(...res.message.goods);
				}
				this.total = res.message.total;
				this.isLoading = false;
				cb && cb();
			},
			gotodetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id,
				})
			}
		},
		onReachBottom() {
			if (this.isLoading) return;
			this.isLoading = true;
			this.queryObj.pagenum += 1;
			this.getGoodsList();
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.isLoading = false;
			this.goodsList = [];
			this.getGoodsList(() => uni.stopPullDownRefresh());
		}
	}
</script>

<style lang="scss">

</style>