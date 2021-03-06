var app = new Vue({
	el: '#app',
	data: {
		products: [
      {
        id: 1586934917210,
        unit: '台',
        category: '掌上主機',
        title: 'Switch',
        origin_price: 20000,
        price: 9980,
        description: '想玩就玩',
        content: '動森太好玩惹',
        is_enabled: 1,
        imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
      {
        id: 1196934917910,
        unit: '台',
        category: '主機',
        title: 'PS5 Wifi',
        origin_price: 29999,
        description: '次世代超強規格',
        content: '我也想要換一台 PS5 Wifi',
        price: 9487,
        is_enabled: 0,
        imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
    ],
		tempProduct: {}
	},
	methods: {
		openModal(status, item) {
			switch(status) {
				case 'new':
					$("#productModal").modal("show");
					break;
				case 'edit':
					this.tempProduct = Object.assign({}, item);
					$("#productModal").modal("show");
					break;
				case 'delete':
					this.tempProduct = Object.assign({}, item);
					$("#delProductModal").modal("show");
					break;
			}
		},
		updateProduct() {
			if(this.tempProduct.id) {
				const id = this.tempProduct.id;
				this.products.forEach((item, index) => {
					if(item.id === id) {
						this.products[index] = this.tempProduct;
					}
				});
			}else {
				const id = new Date().getTime();
				this.tempProduct.id = id
				this.products.push(this.tempProduct);
			}
			this.tempProduct = {};
			$("#productModal").modal("hide");
		},
		delProduct() {
			if(this.tempProduct.id) {
				const id = this.tempProduct.id;
				this.products.forEach((item, index) => {
					if(item.id === id) {
						this.products.splice(index, 1);
						this.tempProduct = {};
					}
				})
			}
			$("#delProductModal").modal("hide");
		}
	},
	created() {
	}
})