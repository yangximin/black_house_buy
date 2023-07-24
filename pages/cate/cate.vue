<template>
	<view class="">
		<my-search @myClick="goSearch()"></my-search>
		<view class="cate-view">
			<scroll-view class="scroll-menu-view" :style="{height:wh+'px'}" scroll-y scroll-bar="none">
				<view class="menu-view" :class="{'active':selectMenu===index}" v-for="(item,index) in cateList"
					:key="index" @click="menuClick(item,index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view class="scroll-content-view" :style="{height:wh+'px'}" scroll-y :scroll-top="scrollTop + 'px'">
				<view class=" content-view" v-for="(item,index) in itemContent" :key="index">
					<view class="content-title">
						/ {{item.cat_name}} /
					</view>
					<view class="content-list">
						<view class="content-list-item" v-for="(subItem,subIndex) in item.children" :key="subIndex"
							@click="gotoDetail(subItem)">
							<image :src="subItem.cat_icon"></image>
							<text>{{subItem.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectMenu: 0,
				cateList: [],
				itemContent: [],
				wh: 0,
				scrollTop: 0
			};
		},
		onLoad() {
			this.getCateList();
			const sysInfo = uni.getSystemInfoSync({
				// success: function(res) {
				// 	console.log(res);
				// 	this.wh = res.windowHeight;
				// 	console.log(this.wh);
				// }
			});
			console.log(sysInfo);
			this.wh = sysInfo.windowHeight - 50;;
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg();
				this.cateList = res.message;
				this.itemContent = this.cateList[0].children;
			},
			menuClick(item, index) {
				this.selectMenu = index;
				this.itemContent = item.children;
				this.scrollTop = this.scrollTop === 0 ? "1" : 0;
			},
			gotoDetail(item) {
				// console.log('/subpkg/goods_list/goods_list?cid=' + item.cat_id);
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id,
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	scroll-view {
		& ::-webkit-scrollbar {
			display: none;
			width: 0;
			height: 0;
			color: transparent;
		}
	}

	.cate-view {
		display: flex;
		font-size: 14px;

		.scroll-menu-view {
			width: 200rpx;

			.menu-view {
				line-height: 120rpx;
				text-align: center;
				background-color: #f7f7f7;

				&.active {
					background-color: white;
					position: relative;
					font-weight: 800;

					&::after {
						display: block;
						width: 6rpx;
						height: 64rpx;
						background-color: darkred;
						position: absolute;
						top: 0;
						transform: translateY(50%);
						content: '';
					}
				}

			}
		}
	}

	.scroll-content-view {
		width: 550rpx;

		.content-title {
			line-height: 80rpx;
			text-align: center;
			margin-top: 30rpx;
		}


		.content-list {
			display: flex;
			flex-wrap: wrap;

			.content-list-item {
				width: 33.33%;
				height: 0;
				padding-top: 35%;
				margin-top: 20rpx;
				position: relative;
				text-align: center;
				overflow: hidden;

				image {
					width: 90%;
					height: 70%;
					margin: 10rpx;
					background-color: green;
					top: 0;
					left: 0;
					right: 0;
					bottom: 100rpx;
					position: absolute;
				}

				text {
					bottom: 0;
					left: 0;
					right: 0;
					position: absolute;
					text-align: center;
					;
				}
			}

		}
	}
</style>