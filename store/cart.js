export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++;
			}
			this.commit('m_cart/saveToStorage');
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart));
		},
		updateGoods(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id);
			if (findResult) {
				findResult.goods_state = goods.goods_state !== undefined ? goods.goods_state : findResult.goods_state;
				findResult.goods_count = goods.goods_count || findResult.goods_count;
			}
			// console.log(goods);
			this.commit('m_cart/saveToStorage');
		},
		removeGoods(state, goods) {
			state.cart = state.cart.filter(x => x.goods_id != goods.goods_id);
			this.commit('m_cart/saveToStorage');
		},
		handleAllCheck(state, isCheck) {
			state.cart.forEach(item => item.goods_state = isCheck)
			this.commit('m_cart/saveToStorage');
		}

	},
	getters: {
		total(state) {
			let c = 0;
			state.cart.forEach(goods => c += goods.goods_count);
			// console.log(c)
			return c;
		},
		checkCount(state) {
			const list = state.cart.filter(item => item.goods_state);
			return list.length;
		},
		allCheck(state) {
			const list = state.cart.filter(item => item.goods_state);
			return state.cart.length === list.length;
		},
		totalPrice(state) {
			const list = state.cart.filter(item => item.goods_state);
			let total = 0;
			list.forEach(item => total += item.goods_price)
			return total;
		}

	}
}